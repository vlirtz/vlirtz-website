import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { agentConfig } from "../config";
import type {
  AgentStore,
  ConversationTurn,
  LeadInput,
  LeadRecord,
} from "./types";

/**
 * PostgreSQL implementation of {@link AgentStore}, backed by Prisma 7 and the
 * `pg` driver adapter.
 *
 * This module is only imported when `DATABASE_URL` is set (see `db/index.ts`),
 * which keeps the Prisma client out of the bundle for key-less deployments.
 */

/**
 * Reuses one client across hot reloads in development. Without this, every
 * recompile would open a new connection pool and exhaust Postgres.
 */
const globalForPrisma = globalThis as unknown as {
  vlirtzPrisma?: PrismaClient;
};

/**
 * Returns the shared Prisma client, creating it on first use.
 */
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.vlirtzPrisma) return globalForPrisma.vlirtzPrisma;

  const adapter = new PrismaPg(agentConfig.database.url ?? "");
  const client = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.vlirtzPrisma = client;
  }

  return client;
}

/** Strips `undefined` values so Prisma does not overwrite columns with null. */
function definedFields(input: LeadInput) {
  const fields: Record<string, unknown> = {};
  const keys = [
    "name",
    "email",
    "companyName",
    "projectDetails",
    "budget",
    "timeline",
    "status",
    "score",
    "bookingRequested",
  ] as const;

  for (const key of keys) {
    const value = input[key];
    if (value !== undefined && value !== null) fields[key] = value;
  }

  return fields;
}

/** Converts a Prisma row into the shared {@link LeadRecord} shape. */
function toLeadRecord(row: {
  id: string;
  name: string | null;
  email: string | null;
  companyName: string | null;
  projectDetails: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  score: number;
  bookingRequested: boolean;
  createdAt: Date;
}): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    companyName: row.companyName,
    projectDetails: row.projectDetails,
    budget: row.budget,
    timeline: row.timeline,
    status: row.status as LeadRecord["status"],
    score: row.score,
    bookingRequested: row.bookingRequested,
    createdAt: row.createdAt,
  };
}

/**
 * Builds the PostgreSQL-backed store.
 */
export function createPrismaLeadStore(): AgentStore {
  const prisma = getPrismaClient();

  /**
   * Resolves the conversation row id for a widget session, creating the row if
   * this is the session's first write.
   */
  async function conversationIdFor(
    sessionId: string | null | undefined,
  ): Promise<string | null> {
    if (!sessionId) return null;
    const conversation = await prisma.conversation.upsert({
      where: { sessionId },
      create: { sessionId },
      update: {},
      select: { id: true },
    });
    return conversation.id;
  }

  return {
    kind: "postgres",

    async upsertLead(input) {
      const conversationId = await conversationIdFor(input.sessionId);
      const fields = definedFields(input);

      // One lead per conversation: update it as the visitor reveals more.
      const existing = conversationId
        ? await prisma.lead.findFirst({
            where: { conversationId },
            orderBy: { createdAt: "desc" },
            select: { id: true },
          })
        : null;

      const row = existing
        ? await prisma.lead.update({
            where: { id: existing.id },
            data: fields,
          })
        : await prisma.lead.create({
            data: { ...fields, conversationId },
          });

      return toLeadRecord(row);
    },

    async ensureConversation(meta) {
      await prisma.conversation.upsert({
        where: { sessionId: meta.sessionId },
        create: {
          sessionId: meta.sessionId,
          sourceUrl: meta.sourceUrl ?? null,
          userAgent: meta.userAgent ?? null,
        },
        update: {},
      });
    },

    async appendTurns(sessionId: string, turns: ConversationTurn[]) {
      if (turns.length === 0) return;

      const conversationId = await conversationIdFor(sessionId);
      if (!conversationId) return;

      await prisma.message.createMany({
        data: turns.map((turn) => ({
          conversationId,
          role: turn.role,
          content: turn.content,
          toolName: turn.toolName ?? null,
        })),
      });
    },

    async listLeads(limit = 50) {
      const rows = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      return rows.map(toLeadRecord);
    },
  };
}
