import { randomUUID } from "node:crypto";
import { z } from "zod";

/**
 * Request validation and session handling for `/api/agent/chat`.
 *
 * The widget is public and unauthenticated, so every field is validated and
 * bounded before it reaches the model. This caps prompt-injection surface and
 * stops a crafted request from running up an OpenAI bill.
 */

/** Longest single visitor message. Generous for a chat widget. */
const MAX_MESSAGE_LENGTH = 4000;

/** Turns kept from the client. Older turns are dropped to bound the context. */
const MAX_HISTORY_TURNS = 24;

export const chatTurnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
});

export const chatRequestSchema = z.object({
  /** The visitor's new message. */
  message: z.string().min(1).max(MAX_MESSAGE_LENGTH),
  /** Prior turns, oldest first. Omitted on the first request. */
  history: z.array(chatTurnSchema).max(200).optional(),
  /** Session id from a previous response; a new one is issued when absent. */
  sessionId: z.string().min(8).max(64).optional(),
  /** Page the widget is embedded on, stored for attribution. */
  sourceUrl: z.string().max(500).optional(),
});

export type ChatTurn = z.infer<typeof chatTurnSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;

/**
 * Builds the message list sent to the agent.
 *
 * Only the most recent {@link MAX_HISTORY_TURNS} turns are kept, then the new
 * visitor message is appended.
 */
export function buildHistory(request: ChatRequest): ChatTurn[] {
  const previous = (request.history ?? []).slice(-MAX_HISTORY_TURNS);
  return [...previous, { role: "user" as const, content: request.message }];
}

/**
 * Returns the caller's session id, or issues a new one.
 *
 * The id is opaque and generated server-side when missing, so it can be trusted
 * as a grouping key even though the client echoes it back.
 */
export function resolveSessionId(request: ChatRequest): string {
  return request.sessionId ?? `sess_${randomUUID()}`;
}
