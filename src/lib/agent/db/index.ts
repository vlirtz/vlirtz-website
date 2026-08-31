import { capabilities } from "../config";
import { createMemoryLeadStore } from "./memoryStore";
import type { AgentStore } from "./types";

/**
 * Resolves the store the agent should use, preferring PostgreSQL and falling
 * back to the in-memory implementation.
 */

let storePromise: Promise<AgentStore> | undefined;

/**
 * Loads the Prisma-backed store, or `null` when it cannot be used.
 *
 * The import is dynamic so the Prisma client is never loaded (or required to be
 * generated) for deployments without `DATABASE_URL`. A failure here is
 * downgraded to a warning: losing lead persistence is much better than a chat
 * widget that 500s mid-conversation.
 */
async function tryCreatePostgresStore(): Promise<AgentStore | null> {
  if (!capabilities.hasPostgres) return null;

  try {
    const { createPrismaLeadStore } = await import("./prismaStore");
    return createPrismaLeadStore();
  } catch (error) {
    console.warn(
      "[vlirtz-agent] DATABASE_URL is set but the Prisma client could not be " +
        "loaded. Run `npx prisma generate`. Falling back to in-memory leads.",
      error,
    );
    return null;
  }
}

/**
 * Returns the process-wide {@link AgentStore} singleton.
 */
export function getAgentStore(): Promise<AgentStore> {
  if (!storePromise) {
    storePromise = tryCreatePostgresStore().then(
      (store) => store ?? createMemoryLeadStore(),
    );
  }
  return storePromise;
}

export type { AgentStore } from "./types";
