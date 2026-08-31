/**
 * Shared retrieval types for the knowledge base.
 */

/** A chunk of source text ready to be embedded and upserted. */
export type KnowledgeChunk = {
  /** Stable, deterministic id so re-ingesting updates instead of duplicating. */
  id: string;
  text: string;
  title: string;
  /** Page URL or repository path the chunk came from. */
  source: string;
};

/** A chunk returned by a search, with its relevance score. */
export type RetrievedChunk = KnowledgeChunk & {
  /** Higher is more relevant. Scales differ between Pinecone and local search. */
  score: number;
};

/** Where a set of results came from, surfaced in logs and tool output. */
export type RetrievalSource = "pinecone" | "local";

export type RetrievalResult = {
  chunks: RetrievedChunk[];
  source: RetrievalSource;
};
