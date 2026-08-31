import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getAllPosts } from "@/lib/posts";
import { services, site } from "@/lib/site";
import type { KnowledgeChunk } from "./types";

/**
 * Builds the knowledge corpus from content that already lives in this repo.
 *
 * Used in two places:
 * - `scripts/ingest.ts` embeds these chunks and upserts them into Pinecone.
 * - `rag/localSearch.ts` searches them directly when Pinecone is not
 *   configured, so the agent can still answer service questions with real
 *   Vlirtz facts instead of refusing.
 *
 * Keeping one corpus builder means the offline fallback and the vector index
 * never disagree about what the agency actually offers.
 */

/** Chunk size in characters. Roughly 250 tokens, a good RAG default. */
const CHUNK_SIZE = 1000;

/** Overlap keeps sentences that straddle a boundary retrievable. */
const CHUNK_OVERLAP = 150;

/**
 * Splits long text into overlapping chunks on natural boundaries.
 */
async function splitText(text: string): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  return splitter.splitText(text);
}

/**
 * Removes Markdown syntax that adds noise to embeddings without adding meaning.
 */
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_`>]/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Turns the structured service and company facts in `lib/site.ts` into prose
 * chunks, so questions like "what do you actually do?" retrieve real answers.
 */
function buildCompanyChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "company-overview",
      title: `About ${site.name}`,
      source: `${site.url}/about`,
      text: [
        `${site.name} (${site.legalName}) is an AI software agency based in ${site.address.city}, ${site.address.country}.`,
        site.description,
        `Tagline: ${site.tagline}`,
        `Founded ${site.founded}. Working hours ${site.hours}.`,
        `Contact: ${site.email}, ${site.phone}.`,
      ].join(" "),
    },
  ];

  for (const service of services) {
    chunks.push({
      id: `service-${service.slug}`,
      title: service.title,
      source: `${site.url}/services#${service.slug}`,
      text: `${service.title}. ${service.short} ${service.summary}`,
    });
  }

  return chunks;
}

/**
 * Chunks every blog post in `content/posts`.
 */
async function buildPostChunks(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  for (const post of getAllPosts()) {
    const body = stripMarkdown(post.content);
    const parts = await splitText(`${post.title}. ${post.description}\n\n${body}`);

    parts.forEach((text, index) => {
      chunks.push({
        id: `post-${post.slug}-${index}`,
        title: post.title,
        source: `${site.url}/blog/${post.slug}`,
        text,
      });
    });
  }

  return chunks;
}

/**
 * Builds the full local corpus: company and service facts plus every blog post.
 */
export async function buildLocalCorpus(): Promise<KnowledgeChunk[]> {
  const [companyChunks, postChunks] = await Promise.all([
    Promise.resolve(buildCompanyChunks()),
    buildPostChunks(),
  ]);

  return [...companyChunks, ...postChunks];
}

/**
 * Chunks arbitrary scraped page text, used by the ingest script for URLs that
 * are not part of this repository.
 */
export async function chunkScrapedPage(input: {
  url: string;
  title: string;
  text: string;
}): Promise<KnowledgeChunk[]> {
  const parts = await splitText(input.text);

  // A slug keeps ids readable and stable across re-ingests of the same URL.
  const slug = input.url
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return parts.map((text, index) => ({
    id: `page-${slug}-${index}`,
    title: input.title,
    source: input.url,
    text,
  }));
}
