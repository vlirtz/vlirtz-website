/**
 * Domain types for the sales agent's persistence layer.
 *
 * These types are deliberately independent of Prisma's generated types so the
 * in-memory fallback and the PostgreSQL implementation share one contract, and
 * so nothing outside `db/prismaStore.ts` needs the generated client to compile.
 */

export type LeadStatus = "NEW" | "QUALIFIED" | "CALL_BOOKED" | "DISQUALIFIED";

export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM" | "TOOL";

/** What the `saveLeadToPostgres` tool collects from the conversation. */
export type LeadInput = {
  name?: string | null;
  email?: string | null;
  companyName?: string | null;
  projectDetails?: string | null;
  budget?: string | null;
  timeline?: string | null;
  status?: LeadStatus;
  score?: number;
  bookingRequested?: boolean;
  /** Widget session that produced the lead. */
  sessionId?: string | null;
};

/** A persisted lead, as returned to callers. */
export type LeadRecord = LeadInput & {
  id: string;
  status: LeadStatus;
  score: number;
  bookingRequested: boolean;
  createdAt: Date;
};

/** A single stored chat turn. */
export type ConversationTurn = {
  role: MessageRole;
  content: string;
  toolName?: string | null;
};

/** Metadata captured the first time a session is seen. */
export type ConversationMeta = {
  sessionId: string;
  sourceUrl?: string | null;
  userAgent?: string | null;
};

/**
 * Storage contract used by the agent tools.
 *
 * Implemented by `createMemoryLeadStore` (default) and `createPrismaLeadStore`
 * (when `DATABASE_URL` is set). Every method is best-effort: implementations
 * must not throw for transient storage problems, because a failed write should
 * never break a live sales conversation.
 */
export interface AgentStore {
  /** Label used in logs and in the tool's response to the model. */
  readonly kind: "postgres" | "memory";

  /**
   * Creates or updates the lead for a session, merging newly shared fields
   * over the previously known values.
   */
  upsertLead(input: LeadInput): Promise<LeadRecord>;

  /** Ensures a conversation row exists for the session. */
  ensureConversation(meta: ConversationMeta): Promise<void>;

  /** Appends turns to a session's stored transcript. */
  appendTurns(sessionId: string, turns: ConversationTurn[]): Promise<void>;

  /** Most recent leads first. Used by the analytics endpoint and tests. */
  listLeads(limit?: number): Promise<LeadRecord[]>;
}
