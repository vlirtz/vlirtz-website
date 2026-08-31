import { NextResponse } from "next/server";
import { describeCapabilities } from "@/lib/agent/config";
import { getAgentStore } from "@/lib/agent/db";
import { type AgentEvent, encodeAgentEvent } from "@/lib/agent/events";
import { checkRateLimit, clientKey } from "@/lib/agent/rateLimit";
import { runAgent } from "@/lib/agent/run";
import {
  buildHistory,
  chatRequestSchema,
  resolveSessionId,
} from "@/lib/agent/session";
import type { ConversationTurn } from "@/lib/agent/db/types";

/**
 * Streaming endpoint for the Vlirtz sales agent.
 *
 * Responds with newline-delimited JSON (one `AgentEvent` per line) so the widget
 * can render tokens and tool-status indicators as they happen. See
 * `src/lib/agent/events.ts` for the protocol.
 */

/** Node runtime: the agent uses Prisma, `pg`, and `node:crypto`. */
export const runtime = "nodejs";

/** Never cache a conversation turn. */
export const dynamic = "force-dynamic";

/** Logged once per process so a misconfigured deployment is obvious. */
let loggedCapabilities = false;

/**
 * Handles one visitor message and streams the agent's response.
 */
export async function POST(request: Request) {
  const limit = checkRateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Give it a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let parsed;
  try {
    parsed = chatRequestSchema.safeParse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  if (!parsed.success) {
    return NextResponse.json(
      { error: "That message could not be read. Try rephrasing it." },
      { status: 400 },
    );
  }

  if (!loggedCapabilities) {
    console.info(`[vlirtz-agent] ${describeCapabilities()}`);
    loggedCapabilities = true;
  }

  const chatRequest = parsed.data;
  const sessionId = resolveSessionId(chatRequest);
  const history = buildHistory(chatRequest);

  const stream = createEventStream({
    sessionId,
    history,
    sourceUrl: chatRequest.sourceUrl,
    userAgent: request.headers.get("user-agent"),
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      // Stops nginx and similar proxies from buffering the stream.
      "X-Accel-Buffering": "no",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/**
 * Builds the NDJSON response body for one agent run.
 *
 * Persistence happens after the stream closes so a slow database write never
 * delays the visitor's reply.
 */
function createEventStream(input: {
  sessionId: string;
  history: ReturnType<typeof buildHistory>;
  sourceUrl?: string;
  userAgent: string | null;
}): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      /** Serialises and enqueues one event. */
      const send = (event: AgentEvent) => {
        controller.enqueue(encoder.encode(encodeAgentEvent(event)));
      };

      send({ type: "session", sessionId: input.sessionId });

      const toolsUsed: string[] = [];

      try {
        const run = runAgent({
          history: input.history,
          sessionId: input.sessionId,
          hooks: {
            onLeadSaved: (lead) => {
              send({ type: "lead_saved", email: lead.email ?? null });
            },
            onRetrieval: (info) => {
              console.info(
                `[vlirtz-agent] retrieval via ${info.source}: ` +
                  `"${info.query}" → ${info.hits} hit(s)`,
              );
            },
          },
        });

        // Manual iteration keeps the generator's return value, which carries
        // the assembled reply for persistence.
        let step = await run.next();
        while (!step.done) {
          const event = step.value;
          if (event.type === "tool_start") toolsUsed.push(event.name);
          send(event);
          step = await run.next();
        }

        const { reply } = step.value;
        send({ type: "done" });

        await persistTurn({ ...input, reply, toolsUsed });
      } catch (error) {
        console.error("[vlirtz-agent] run failed:", error);
        send({
          type: "error",
          message:
            "Something went wrong on our side. Try again, or email " +
            "info@vlirtz.com and we will pick it up.",
        });
      } finally {
        controller.close();
      }
    },
  });
}

/**
 * Stores the visitor message, the assistant reply, and any tool usage.
 *
 * Failures are logged and swallowed: analytics must never surface as an error
 * to a visitor who already received their answer.
 */
async function persistTurn(input: {
  sessionId: string;
  history: ReturnType<typeof buildHistory>;
  sourceUrl?: string;
  userAgent: string | null;
  reply: string;
  toolsUsed: string[];
}): Promise<void> {
  try {
    const store = await getAgentStore();

    await store.ensureConversation({
      sessionId: input.sessionId,
      sourceUrl: input.sourceUrl ?? null,
      userAgent: input.userAgent,
    });

    const visitorMessage = input.history.at(-1);
    const turns: ConversationTurn[] = [];

    if (visitorMessage) {
      turns.push({ role: "USER", content: visitorMessage.content });
    }
    for (const toolName of input.toolsUsed) {
      turns.push({ role: "TOOL", content: `called ${toolName}`, toolName });
    }
    if (input.reply) {
      turns.push({ role: "ASSISTANT", content: input.reply });
    }

    await store.appendTurns(input.sessionId, turns);
  } catch (error) {
    console.warn("[vlirtz-agent] could not persist conversation:", error);
  }
}
