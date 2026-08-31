import { buildLocalCorpus } from "./corpus";
import type { KnowledgeChunk, RetrievedChunk } from "./types";

/**
 * Keyword retrieval over the local corpus, used when Pinecone is not
 * configured.
 *
 * This is a real BM25-style ranker rather than a stub: it returns genuinely
 * relevant passages from the site's own content, so the agent answers service
 * questions correctly before any vector index exists. Pinecone still gives
 * better semantic recall once `PINECONE_API_KEY` is set.
 */

/** Words too common in this corpus to carry ranking signal. */
const STOP_WORDS = new Set([
  "a", "about", "after", "all", "also", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "but", "by", "can", "do", "does", "for",
  "from", "get", "had", "has", "have", "how", "i", "if", "in", "into", "is",
  "it", "its", "me", "my", "of", "on", "or", "our", "so", "than", "that", "the",
  "their", "them", "then", "there", "these", "they", "this", "to", "up", "us",
  "was", "we", "were", "what", "when", "which", "who", "why", "will", "with",
  "would", "you", "your",
]);

/** BM25 term-frequency saturation. */
const K1 = 1.5;

/** BM25 length normalisation. */
const B = 0.75;

/** Splits text into lowercase content words. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9åäöéèü+#.]+/i)
    .map((token) => token.replace(/^\.+|\.+$/g, ""))
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

type IndexedChunk = KnowledgeChunk & {
  tokens: string[];
  /** Term frequencies within this chunk. */
  frequencies: Map<string, number>;
};

type LocalIndex = {
  chunks: IndexedChunk[];
  /** Number of chunks containing each term. */
  documentFrequency: Map<string, number>;
  averageLength: number;
};

let indexPromise: Promise<LocalIndex> | undefined;

/**
 * Builds the inverted index once per process and caches it.
 */
function getLocalIndex(): Promise<LocalIndex> {
  if (indexPromise) return indexPromise;

  indexPromise = buildLocalCorpus().then((corpus) => {
    const documentFrequency = new Map<string, number>();

    const chunks: IndexedChunk[] = corpus.map((chunk) => {
      // The title is weighted by repeating it, a cheap and effective boost.
      const tokens = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
      const frequencies = new Map<string, number>();

      for (const token of tokens) {
        frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
      }
      for (const term of frequencies.keys()) {
        documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
      }

      return { ...chunk, tokens, frequencies };
    });

    const totalLength = chunks.reduce((sum, c) => sum + c.tokens.length, 0);

    return {
      chunks,
      documentFrequency,
      averageLength: chunks.length > 0 ? totalLength / chunks.length : 0,
    };
  });

  return indexPromise;
}

/**
 * Scores one chunk against the query terms using BM25.
 */
function scoreChunk(
  chunk: IndexedChunk,
  queryTerms: string[],
  index: LocalIndex,
): number {
  const totalDocs = index.chunks.length;
  let score = 0;

  for (const term of queryTerms) {
    const frequency = chunk.frequencies.get(term);
    if (!frequency) continue;

    const docsWithTerm = index.documentFrequency.get(term) ?? 0;
    const idf = Math.log(
      1 + (totalDocs - docsWithTerm + 0.5) / (docsWithTerm + 0.5),
    );

    const normalisation =
      index.averageLength > 0 ? chunk.tokens.length / index.averageLength : 1;
    const denominator = frequency + K1 * (1 - B + B * normalisation);

    score += idf * ((frequency * (K1 + 1)) / denominator);
  }

  return score;
}

/**
 * Returns the `topK` most relevant local chunks for a query.
 *
 * Chunks with a zero score are dropped, so an unrelated question yields an
 * empty list and the agent can say it does not know rather than inventing an
 * answer from irrelevant context.
 */
export async function searchLocalCorpus(
  query: string,
  topK = 4,
): Promise<RetrievedChunk[]> {
  const index = await getLocalIndex();
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0 || index.chunks.length === 0) return [];

  return index.chunks
    .map((chunk) => ({
      id: chunk.id,
      text: chunk.text,
      title: chunk.title,
      source: chunk.source,
      score: scoreChunk(chunk, queryTerms, index),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
