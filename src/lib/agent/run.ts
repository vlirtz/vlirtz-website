import { AIMessage, type BaseMessage, ToolMessage } from "@langchain/core/messages";
import { createVlirtzAgent, type AgentHooks } from "./agent";
import { type AgentEvent, toolLabel } from "./events";
import type { ChatTurn } from "./session";

/**
 * Translates a LangGraph agent run into the {@link AgentEvent} stream the chat
 * widget consumes.
 *
 * Two stream modes are used together:
 * - `messages` carries chat-model output, which is where assistant tokens come
 *   from. With a streaming model each chunk is a delta.
 * - `updates` carries per-node state updates, which is where tool calls and
 *   tool results are detected.
 *
 * Tokens are only read from `messages` and tool events only from `updates`, so
 * nothing is emitted twice even though the final message appears in both.
 */

/** Node that runs the chat model in a `createAgent` graph. */
const MODEL_NODE = "model_request";

/** Node that executes tools in a `createAgent` graph. */
const TOOLS_NODE = "tools";

/** Flattens message content into plain text. */
function textOf(message: BaseMessage): string {
  const { content } = message;
  if (typeof content === "string") return content;

  return content
    .map((part) =>
      typeof part === "string"
        ? part
        : "text" in part && typeof part.text === "string"
          ? part.text
          : "",
    )
    .join("");
}

/** Narrows an unknown stream payload to a `[mode, data]` tuple. */
function asChunkTuple(chunk: unknown): [string, unknown] | null {
  if (!Array.isArray(chunk) || chunk.length < 2) return null;
  const [mode, data] = chunk;
  return typeof mode === "string" ? [mode, data] : null;
}

/** Extracts the messages array from one node's state update. */
function messagesFromUpdate(update: unknown): BaseMessage[] {
  if (!update || typeof update !== "object") return [];
  const { messages } = update as { messages?: unknown };
  return Array.isArray(messages) ? (messages as BaseMessage[]) : [];
}

export type AgentRunResult = {
  /** Full assistant reply, for persistence. */
  reply: string;
  /** Tools the agent invoked, in order. */
  toolsUsed: string[];
};

/**
 * Runs the agent and yields UI events as they happen.
 *
 * The generator returns the assembled reply so the caller can persist the turn
 * after the stream finishes.
 *
 * @param input.history - Prior turns plus the visitor's new message.
 * @param input.sessionId - Widget session id.
 * @param input.hooks - Callbacks forwarded to the agent's tools.
 */
export async function* runAgent(input: {
  history: ChatTurn[];
  sessionId: string;
  hooks?: AgentHooks;
}): AsyncGenerator<AgentEvent, AgentRunResult> {
  const visitorTurns = input.history.filter(
    (turn) => turn.role === "user",
  ).length;

  const { agent, recursionLimit } = createVlirtzAgent(
    input.sessionId,
    visitorTurns,
    input.hooks,
  );

  const stream = await agent.stream(
    {
      messages: input.history.map((turn) => ({
        role: turn.role,
        content: turn.content,
      })),
    },
    { streamMode: ["updates", "messages"], recursionLimit },
  );

  let reply = "";
  const toolsUsed: string[] = [];
  /** Tool calls announced but not yet resolved, keyed by tool call id. */
  const openToolCalls = new Map<string, string>();

  for await (const rawChunk of stream) {
    const tuple = asChunkTuple(rawChunk);
    if (!tuple) continue;

    const [mode, payload] = tuple;

    if (mode === "messages") {
      // payload is [message, metadata]
      if (!Array.isArray(payload)) continue;
      const [message, metadata] = payload as [BaseMessage, Record<string, unknown>];

      if (metadata?.langgraph_node !== MODEL_NODE) continue;
      if (!AIMessage.isInstance(message)) continue;

      const text = textOf(message);
      if (text) {
        reply += text;
        yield { type: "token", value: text };
      }
      continue;
    }

    if (mode !== "updates" || !payload || typeof payload !== "object") continue;

    const updates = payload as Record<string, unknown>;

    for (const message of messagesFromUpdate(updates[MODEL_NODE])) {
      if (!AIMessage.isInstance(message)) continue;

      for (const call of message.tool_calls ?? []) {
        const id = call.id ?? `${call.name}-${openToolCalls.size}`;
        openToolCalls.set(id, call.name);
        toolsUsed.push(call.name);

        yield {
          type: "tool_start",
          id,
          name: call.name,
          label: toolLabel(call.name),
        };
      }
    }

    for (const message of messagesFromUpdate(updates[TOOLS_NODE])) {
      if (!ToolMessage.isInstance(message)) continue;

      const id = message.tool_call_id;
      const name = message.name ?? openToolCalls.get(id) ?? "tool";
      openToolCalls.delete(id);

      yield {
        type: "tool_end",
        id,
        name,
        ok: message.status !== "error",
      };
    }
  }

  // Close any tool call whose result never arrived, so the widget does not keep
  // showing a spinner after the stream ends.
  for (const [id, name] of openToolCalls) {
    yield { type: "tool_end", id, name, ok: false };
  }

  return { reply, toolsUsed };
}
