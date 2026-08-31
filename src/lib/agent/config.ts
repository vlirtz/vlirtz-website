import { CAL_LINK } from "./calLink";

/**
 * Single source of truth for the sales agent's environment configuration.
 *
 * Every integration is optional. Each `has*` flag tells the rest of the system
 * whether the real service is reachable, so the agent can fall back to a local
 * implementation instead of throwing at import time or at build time.
 */

/** Chat model used for the agentic loop when an OpenAI key is present. */
const DEFAULT_CHAT_MODEL = "gpt-4o-mini";

/** Embedding model used by both the ingest script and the retrieval tool. */
const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";

/** Dimension of {@link DEFAULT_EMBEDDING_MODEL}, used when creating an index. */
const DEFAULT_EMBEDDING_DIMENSION = 1536;

/**
 * Reads an environment variable and normalises blank strings to `undefined`,
 * so a key left empty in `.env` behaves the same as a missing key.
 */
function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Splits `PINECONE_ENVIRONMENT` into a serverless cloud and region pair.
 *
 * Pinecone dropped pod "environments" in favour of serverless cloud/region, but
 * the variable name is still what most teams have in their secret manager. Both
 * `us-east-1` and `aws:us-east-1` are accepted; the cloud defaults to `aws`.
 */
function parsePineconeEnvironment(raw: string | undefined): {
  cloud: string;
  region: string;
} {
  const fallback = { cloud: "aws", region: "us-east-1" };
  if (!raw) return fallback;

  const [first, second] = raw.split(":").map((part) => part.trim());
  if (second) return { cloud: first || fallback.cloud, region: second };

  // A bare value such as "us-east-1" or the legacy "us-east-1-aws".
  const legacy = first.match(/^(.*)-(aws|gcp|azure)$/);
  if (legacy) return { cloud: legacy[2], region: legacy[1] };

  return { cloud: fallback.cloud, region: first || fallback.region };
}

const openAiApiKey = readEnv("OPENAI_API_KEY");
const databaseUrl = readEnv("DATABASE_URL");
const pineconeApiKey = readEnv("PINECONE_API_KEY");
const pineconeIndexName = readEnv("PINECONE_INDEX_NAME");
const pineconeEnvironment = parsePineconeEnvironment(
  readEnv("PINECONE_ENVIRONMENT"),
);

export const agentConfig = {
  openai: {
    apiKey: openAiApiKey,
    chatModel: readEnv("OPENAI_CHAT_MODEL") ?? DEFAULT_CHAT_MODEL,
    embeddingModel: readEnv("OPENAI_EMBEDDING_MODEL") ?? DEFAULT_EMBEDDING_MODEL,
    embeddingDimension: DEFAULT_EMBEDDING_DIMENSION,
  },
  database: {
    url: databaseUrl,
  },
  pinecone: {
    apiKey: pineconeApiKey,
    indexName: pineconeIndexName ?? "vlirtz-knowledge-base",
    namespace: readEnv("PINECONE_NAMESPACE") ?? "",
    cloud: pineconeEnvironment.cloud,
    region: pineconeEnvironment.region,
  },
  /** Public Cal.com booking link surfaced by the widget and the agent. */
  calLink: CAL_LINK,
  /** Site origin crawled by `npm run ingest` when no URL is passed. */
  ingestBaseUrl: readEnv("INGEST_BASE_URL") ?? "https://vlirtz.com",
} as const;

/**
 * Which live integrations are wired up right now.
 *
 * The agent reads these instead of checking `process.env` directly, so the
 * fallback behaviour is decided in exactly one place.
 */
export const capabilities = {
  /** A real chat model is available; otherwise the scripted demo model runs. */
  hasOpenAI: Boolean(openAiApiKey),
  /** Pinecone is reachable; otherwise retrieval reads the local corpus. */
  hasPinecone: Boolean(pineconeApiKey && pineconeIndexName),
  /** PostgreSQL is reachable; otherwise leads are kept in memory. */
  hasPostgres: Boolean(databaseUrl),
} as const;

/**
 * Human-readable summary of the active integrations, logged once on the first
 * agent request so a misconfigured deployment is obvious in the server logs.
 */
export function describeCapabilities(): string {
  return [
    `model=${capabilities.hasOpenAI ? agentConfig.openai.chatModel : "demo (no OPENAI_API_KEY)"}`,
    `retrieval=${capabilities.hasPinecone ? `pinecone:${agentConfig.pinecone.indexName}` : "local corpus"}`,
    `leads=${capabilities.hasPostgres ? "postgres" : "in-memory"}`,
  ].join(" | ");
}
