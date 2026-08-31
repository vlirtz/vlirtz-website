import {
  BaseChatModel,
  type BaseChatModelParams,
  type BindToolsInput,
} from "@langchain/core/language_models/chat_models";
import {
  AIMessage,
  type BaseMessage,
  HumanMessage,
  ToolMessage,
} from "@langchain/core/messages";
import type { ChatResult } from "@langchain/core/outputs";
import { agentConfig } from "./config";
import { TOOL_NAMES } from "./events";

/**
 * Scripted chat model used when `OPENAI_API_KEY` is absent.
 *
 * It is not a stub: it drives the same LangGraph agent through the same tools,
 * so the widget, the tool-status indicators, retrieval, and lead capture are all
 * exercisable before any keys exist. Replies are assembled from real retrieved
 * context rather than invented, and it never claims to be the production model.
 *
 * Setting `OPENAI_API_KEY` replaces this with `ChatOpenAI` automatically.
 */

/** Signals a question that should be answered from the knowledge base. */
const CAPABILITY_HINTS = [
  "service", "services", "do you", "can you", "build", "help", "offer",
  "capab", "agent", "consult", "lead", "price", "pricing", "cost", "how much",
  "process", "work", "stack", "tech", "experience", "case", "project",
  "who are you", "what is", "vlirtz",
];

/** Signals the visitor wants to talk to a human. */
const BOOKING_HINTS = [
  "book", "call", "meeting", "demo", "schedule", "talk", "chat with",
  "speak", "consultation", "available",
];

const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;

/** Flattens message content, which may be a string or content blocks. */
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
    .join(" ");
}

/** True when any hint appears in the text. */
function matchesAny(text: string, hints: string[]): boolean {
  const lower = text.toLowerCase();
  return hints.some((hint) => lower.includes(hint));
}

/** Extracts the first three sentences of retrieved context. */
function summariseContext(context: string): string {
  const body = context
    .replace(/^Retrieved[^\n]*\n/, "")
    .replace(/\[\d+\][^\n]*\n/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = body.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 3).join(" ");
}

export class DemoChatModel extends BaseChatModel {
  private boundTools: BindToolsInput[] = [];

  constructor(fields?: BaseChatModelParams) {
    super(fields ?? {});
  }

  /** @inheritdoc */
  _llmType(): string {
    return "vlirtz-demo";
  }

  /** @inheritdoc */
  _combineLLMOutput(): Record<string, never>[] {
    return [];
  }

  /**
   * Returns a copy carrying the bound tools, matching the contract LangGraph
   * relies on when it binds the agent's tools to the model.
   */
  bindTools(tools: BindToolsInput[]): DemoChatModel {
    const next = new DemoChatModel();
    next.boundTools = [...this.boundTools, ...tools];
    return next;
  }

  /** True when the agent has the named tool available. */
  private hasTool(name: string): boolean {
    return this.boundTools.some((candidate) => {
      const named = candidate as { name?: string };
      return named.name === name;
    });
  }

  /**
   * Produces the next message: either a tool call or the final reply.
   *
   * Termination is guaranteed because each tool is only requested when no
   * `ToolMessage` for it exists yet in the current history.
   */
  async _generate(messages: BaseMessage[]): Promise<ChatResult> {
    const humanMessages = messages.filter((message) =>
      HumanMessage.isInstance(message),
    );
    const toolMessages = messages.filter((message) =>
      ToolMessage.isInstance(message),
    );

    const lastHuman = humanMessages.at(-1);
    const question = lastHuman ? textOf(lastHuman) : "";
    const conversation = humanMessages.map(textOf).join(" ");

    const calledTool = (name: string) =>
      toolMessages.some((message) => message.name === name);

    // 1. Ground the answer before replying to a capability question.
    const shouldSearch =
      this.hasTool(TOOL_NAMES.searchKnowledgeBase) &&
      !calledTool(TOOL_NAMES.searchKnowledgeBase) &&
      (matchesAny(question, CAPABILITY_HINTS) || question.length > 24);

    if (shouldSearch) {
      return this.toolCallResult(TOOL_NAMES.searchKnowledgeBase, {
        query: question || "Vlirtz services",
      });
    }

    // 2. Capture the lead as soon as an email appears.
    const email = conversation.match(EMAIL_PATTERN)?.[0];
    const wantsBooking = matchesAny(conversation, BOOKING_HINTS);

    if (
      this.hasTool(TOOL_NAMES.saveLead) &&
      !calledTool(TOOL_NAMES.saveLead) &&
      email
    ) {
      return this.toolCallResult(TOOL_NAMES.saveLead, {
        email,
        projectDetails: question.slice(0, 400),
        bookingRequested: wantsBooking,
        score: wantsBooking ? 75 : 45,
      });
    }

    // 3. Compose the reply from whatever context was retrieved.
    return this.textResult(
      this.composeReply({
        question,
        context: toolMessages
          .filter(
            (message) => message.name === TOOL_NAMES.searchKnowledgeBase,
          )
          .map((message) => textOf(message))
          .at(-1),
        leadSaved: calledTool(TOOL_NAMES.saveLead),
        wantsBooking,
      }),
    );
  }

  /**
   * Builds the visitor-facing reply text.
   */
  private composeReply(input: {
    question: string;
    context?: string;
    leadSaved: boolean;
    wantsBooking: boolean;
  }): string {
    const parts: string[] = [];

    if (input.leadSaved) {
      parts.push(
        "Thanks, I have your details. Pick a slot that suits you and we will " +
          `map this out properly: ${agentConfig.calLink}`,
      );
      parts.push(
        "Bring your current stack and the workflow you want automated.",
      );
      return parts.join(" ");
    }

    if (input.context && !input.context.startsWith("NO_MATCHING_CONTEXT")) {
      const summary = summariseContext(input.context);
      if (summary) parts.push(summary);
    }

    if (parts.length === 0) {
      parts.push(
        "I can help with AI agent development, AI consulting, and AI lead " +
          "generation. Tell me what you are trying to build and I will point " +
          "you at the right approach.",
      );
    }

    if (input.wantsBooking) {
      parts.push(`You can book a discovery call here: ${agentConfig.calLink}`);
    } else {
      parts.push("What are you looking to build?");
    }

    parts.push(
      "(Demo mode: set OPENAI_API_KEY to enable the full agent.)",
    );

    return parts.join(" ");
  }

  /** Wraps a tool request as a {@link ChatResult}. */
  private toolCallResult(
    name: string,
    args: Record<string, unknown>,
  ): ChatResult {
    const message = new AIMessage({
      content: "",
      tool_calls: [
        { name, args, id: `demo-${name}-${Date.now()}`, type: "tool_call" },
      ],
    });

    return { generations: [{ text: "", message }], llmOutput: {} };
  }

  /** Wraps plain reply text as a {@link ChatResult}. */
  private textResult(text: string): ChatResult {
    return {
      generations: [{ text, message: new AIMessage({ content: text }) }],
      llmOutput: {},
    };
  }
}
