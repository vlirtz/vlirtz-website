import { Pinecone, type Index, type RecordMetadata } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { agentConfig, capabilities } from "../config";
import type { KnowledgeChunk, RetrievedChunk } from "./types";

/**
 * Pinecone and OpenAI embedding wrappers.
 *
 * Every export here returns `null` (or throws a clear, actionable error in the
 * ingest script's case) when the relevant keys are missing, so importing this
 * module is always safe — including during `next build` with an empty `.env`.
 */

/** Metadata stored alongside each vector, used to rebuild the chunk on read. */
export type ChunkMetadata = RecordMetadata & {
  text: string;
  title: string;
  source: string;
};

/**
 * Returns a Pinecone client, or `null` when `PINECONE_API_KEY` is not set.
 */
export function getPineconeClient(): Pinecone | null {
  if (!agentConfig.pinecone.apiKey) return null;
  return new Pinecone({ apiKey: agentConfig.pinecone.apiKey });
}

/**
 * Returns the configured Pinecone index handle, or `null` when Pinecone is not
 * fully configured (both an API key and an index name are required).
 */
export function getPineconeIndex(): Index<ChunkMetadata> | null {
  if (!capabilities.hasPinecone) return null;

  const client = getPineconeClient();
  if (!client) return null;

  return client.index<ChunkMetadata>(agentConfig.pinecone.indexName);
}

/**
 * Returns an OpenAI embeddings client, or `null` without an API key.
 */
export function getEmbeddings(): OpenAIEmbeddings | null {
  if (!agentConfig.openai.apiKey) return null;

  return new OpenAIEmbeddings({
    apiKey: agentConfig.openai.apiKey,
    model: agentConfig.openai.embeddingModel,
  });
}

/**
 * Embeds a query and returns the closest chunks from Pinecone.
 *
 * Returns `null` when Pinecone or OpenAI embeddings are unavailable, which
 * signals the caller to fall back to local keyword search. Network and index
 * errors are also reported as `null` rather than thrown, so a Pinecone outage
 * degrades retrieval quality instead of breaking the conversation.
 */
export async function queryPinecone(
  query: string,
  topK = 4,
): Promise<RetrievedChunk[] | null> {
  const index = getPineconeIndex();
  const embeddings = getEmbeddings();
  if (!index || !embeddings) return null;

  try {
    const vector = await embeddings.embedQuery(query);

    const namespace = agentConfig.pinecone.namespace;
    const response = await index.query({
      vector,
      topK,
      includeMetadata: true,
      ...(namespace ? { namespace } : {}),
    });

    return response.matches
      .map((match) => {
        const metadata = match.metadata;
        if (!metadata?.text) return null;

        return {
          id: match.id,
          text: String(metadata.text),
          title: String(metadata.title ?? "Vlirtz"),
          source: String(metadata.source ?? agentConfig.ingestBaseUrl),
          score: match.score ?? 0,
        } satisfies RetrievedChunk;
      })
      .filter((chunk): chunk is RetrievedChunk => chunk !== null);
  } catch (error) {
    console.warn(
      "[vlirtz-agent] Pinecone query failed, falling back to local search.",
      error,
    );
    return null;
  }
}

/**
 * Embeds chunks and upserts them into Pinecone in batches.
 *
 * Used by `scripts/ingest.ts`. Unlike the read path this throws on failure,
 * because a partial ingest should fail loudly in CI rather than look successful.
 *
 * @param chunks - Chunks to embed and store.
 * @param batchSize - Vectors per upsert request.
 * @param onProgress - Called after each batch with the running total.
 */
export async function upsertChunks(
  chunks: KnowledgeChunk[],
  batchSize = 50,
  onProgress?: (completed: number, total: number) => void,
): Promise<void> {
  const index = getPineconeIndex();
  const embeddings = getEmbeddings();

  if (!index) {
    throw new Error(
      "Pinecone is not configured. Set PINECONE_API_KEY and PINECONE_INDEX_NAME.",
    );
  }
  if (!embeddings) {
    throw new Error("OpenAI is not configured. Set OPENAI_API_KEY.");
  }

  const namespace = agentConfig.pinecone.namespace;

  for (let start = 0; start < chunks.length; start += batchSize) {
    const batch = chunks.slice(start, start + batchSize);
    const vectors = await embeddings.embedDocuments(
      batch.map((chunk) => chunk.text),
    );

    await index.upsert({
      records: batch.map((chunk, offset) => ({
        id: chunk.id,
        values: vectors[offset],
        metadata: {
          text: chunk.text,
          title: chunk.title,
          source: chunk.source,
        },
      })),
      ...(namespace ? { namespace } : {}),
    });

    onProgress?.(Math.min(start + batch.length, chunks.length), chunks.length);
  }
}

/**
 * Creates the serverless index if it does not exist yet.
 *
 * The cloud and region come from `PINECONE_ENVIRONMENT`; dimension and metric
 * match the configured OpenAI embedding model.
 */
export async function ensurePineconeIndex(): Promise<void> {
  const client = getPineconeClient();
  if (!client) {
    throw new Error("Pinecone is not configured. Set PINECONE_API_KEY.");
  }

  const name = agentConfig.pinecone.indexName;
  const existing = await client.listIndexes();

  if (existing.indexes?.some((index) => index.name === name)) return;

  console.info(`[ingest] creating Pinecone index "${name}"…`);
  await client.createIndex({
    name,
    dimension: agentConfig.openai.embeddingDimension,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: agentConfig.pinecone.cloud,
        region: agentConfig.pinecone.region,
      },
    },
    waitUntilReady: true,
    suppressConflicts: true,
  });
}
