import { ChatOpenAI } from "@langchain/openai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { createAgent } from "langchain";
import { agentConfig, capabilities } from "./config";
import { DemoChatModel } from "./demoModel";
import { buildSystemPrompt } from "./prompt";
import { createSaveLeadTool } from "./tools/saveLead";
import { createSearchKnowledgeBaseTool } from "./tools/searchKnowledgeBase";
import type { LeadRecord } from "./db/types";

/**
 * Assembles the LangGraph ReAct agent for a single request.
 *
 * The agent is built per request because its tools are bound to that request's
 * session id and event callbacks. Construction is cheap (no network calls), and
 * this avoids leaking one visitor's session into another's tool calls.
 */

/** Stops a misbehaving loop from burning tokens. Two tools need very few steps. */
const RECURSION_LIMIT = 12;

/**
 * Returns the chat model for this request.
 *
 * Falls back to {@link DemoChatModel} when `OPENAI_API_KEY` is missing so the
 * widget stays usable without keys.
 */
function createChatModel(): BaseChatModel {
  if (!capabilities.hasOpenAI) return new DemoChatModel();

  return new ChatOpenAI({
    apiKey: agentConfig.openai.apiKey,
    model: agentConfig.openai.chatModel,
    // Low but not zero: consultative replies should vary, facts come from RAG.
    temperature: 0.3,
    maxRetries: 2,
    streaming: true,
  });
}

export type AgentHooks = {
  /** Called when the retrieval tool runs, for analytics. */
  onRetrieval?: (info: { query: string; source: string; hits: number }) => void;
  /** Called after a lead is persisted, so the route can notify the widget. */
  onLeadSaved?: (lead: LeadRecord) => void;
};

/**
 * Builds a configured agent plus the recursion limit to invoke it with.
 *
 * @param sessionId - Widget session, bound into the lead capture tool.
 * @param visitorTurns - Visitor message count, used by the booking guardrail.
 * @param hooks - Optional callbacks for streaming UI events and analytics.
 */
export function createVlirtzAgent(
  sessionId: string,
  visitorTurns: number,
  hooks: AgentHooks = {},
) {
  const tools = [
    createSearchKnowledgeBaseTool(hooks.onRetrieval),
    createSaveLeadTool(sessionId, hooks.onLeadSaved),
  ];

  const agent = createAgent({
    model: createChatModel(),
    tools,
    systemPrompt: buildSystemPrompt(visitorTurns),
  });

  return { agent, recursionLimit: RECURSION_LIMIT };
}
