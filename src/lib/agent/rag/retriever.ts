import { searchLocalCorpus } from "./localSearch";
import { queryPinecone } from "./pinecone";
import type { RetrievalResult } from "./types";

/**
 * Single entry point for knowledge base retrieval.
 *
 * Tries Pinecone first and falls back to local keyword search when Pinecone is
 * unconfigured, unreachable, or returns nothing useful. Callers get the same
 * shape either way and never need to know which backend answered.
 */
export async function retrieveKnowledge(
  query: string,
  topK = 4,
): Promise<RetrievalResult> {
  const pineconeChunks = await queryPinecone(query, topK);

  if (pineconeChunks && pineconeChunks.length > 0) {
    return { chunks: pineconeChunks, source: "pinecone" };
  }

  // An empty (but successful) Pinecone response usually means the index has not
  // been ingested yet, so the local corpus is the better answer.
  const localChunks = await searchLocalCorpus(query, topK);
  return { chunks: localChunks, source: "local" };
}

/**
 * Formats retrieved chunks as the context block handed back to the model.
 *
 * Sources are numbered so the agent can reference them naturally, and an empty
 * result returns an explicit "no match" instruction rather than a blank string,
 * which measurably reduces hallucination.
 */
export function formatContext(result: RetrievalResult): string {
  if (result.chunks.length === 0) {
    return [
      "NO_MATCHING_CONTEXT",
      "The knowledge base has no passage covering this question.",
      "Say you want to confirm the specifics with the team, then offer the",
      "discovery call instead of guessing.",
    ].join(" ");
  }

  const passages = result.chunks.map((chunk, index) =>
    [
      `[${index + 1}] ${chunk.title} (${chunk.source})`,
      chunk.text.trim(),
    ].join("\n"),
  );

  return [
    `Retrieved ${result.chunks.length} passage(s) via ${result.source}:`,
    "",
    passages.join("\n\n"),
  ].join("\n");
}
