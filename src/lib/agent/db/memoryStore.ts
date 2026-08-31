import { randomUUID } from "node:crypto";
import type {
  AgentStore,
  ConversationMeta,
  ConversationTurn,
  LeadInput,
  LeadRecord,
} from "./types";

/**
 * Process-local implementation of {@link AgentStore}.
 *
 * This is what runs when `DATABASE_URL` is not set. It keeps the agent fully
 * functional for local development, previews, and CI without a database, and it
 * logs every captured lead so nothing shared in a demo is silently lost.
 *
 * Data lives for the lifetime of the server process only. Set `DATABASE_URL` to
 * persist leads properly.
 */
export function createMemoryLeadStore(): AgentStore {
  const leads = new Map<string, LeadRecord>();
  const transcripts = new Map<string, ConversationTurn[]>();
  const conversations = new Map<string, ConversationMeta>();

  /** Finds an existing lead for a session, or by email when no session matches. */
  function findExisting(input: LeadInput): LeadRecord | undefined {
    if (input.sessionId) {
      for (const lead of leads.values()) {
        if (lead.sessionId === input.sessionId) return lead;
      }
    }
    if (input.email) {
      for (const lead of leads.values()) {
        if (lead.email === input.email) return lead;
      }
    }
    return undefined;
  }

  return {
    kind: "memory",

    async upsertLead(input) {
      const existing = findExisting(input);

      const merged: LeadRecord = {
        id: existing?.id ?? randomUUID(),
        createdAt: existing?.createdAt ?? new Date(),
        sessionId: input.sessionId ?? existing?.sessionId ?? null,
        // A later turn only overwrites a field when it actually carries a value.
        name: input.name ?? existing?.name ?? null,
        email: input.email ?? existing?.email ?? null,
        companyName: input.companyName ?? existing?.companyName ?? null,
        projectDetails: input.projectDetails ?? existing?.projectDetails ?? null,
        budget: input.budget ?? existing?.budget ?? null,
        timeline: input.timeline ?? existing?.timeline ?? null,
        status: input.status ?? existing?.status ?? "NEW",
        score: input.score ?? existing?.score ?? 0,
        bookingRequested:
          input.bookingRequested ?? existing?.bookingRequested ?? false,
      };

      leads.set(merged.id, merged);

      console.info(
        "[vlirtz-agent] lead captured (in-memory, set DATABASE_URL to persist):",
        {
          name: merged.name,
          email: merged.email,
          company: merged.companyName,
          status: merged.status,
          score: merged.score,
        },
      );

      return merged;
    },

    async ensureConversation(meta) {
      if (!conversations.has(meta.sessionId)) {
        conversations.set(meta.sessionId, meta);
      }
    },

    async appendTurns(sessionId, turns) {
      const existing = transcripts.get(sessionId) ?? [];
      transcripts.set(sessionId, [...existing, ...turns]);
    },

    async listLeads(limit = 50) {
      return [...leads.values()]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit);
    },
  };
}
