/**
 * Knowledge base ingestion for the Vlirtz sales agent.
 *
 * Pipeline: gather source text → chunk it → embed with OpenAI → upsert into
 * Pinecone. The index is created automatically if it does not exist.
 *
 * Usage:
 *   npm run ingest                      Repo content (services, blog posts)
 *   npm run ingest -- --site            Crawl every URL in the site's sitemap
 *   npm run ingest -- https://a.com/x   Scrape specific URLs
 *   npm run ingest -- --site --dry-run  Show what would be ingested
 *
 * Requires OPENAI_API_KEY, PINECONE_API_KEY, and PINECONE_INDEX_NAME unless
 * --dry-run is passed.
 */
import "./loadEnv";

import * as cheerio from "cheerio";
import { agentConfig, capabilities } from "../src/lib/agent/config";
import {
  buildLocalCorpus,
  chunkScrapedPage,
} from "../src/lib/agent/rag/corpus";
import {
  ensurePineconeIndex,
  upsertChunks,
} from "../src/lib/agent/rag/pinecone";
import type { KnowledgeChunk } from "../src/lib/agent/rag/types";

/** Politeness delay between page fetches, in milliseconds. */
const FETCH_DELAY_MS = 250;

/** Skip pages with less text than this; they carry no useful context. */
const MIN_PAGE_CHARS = 200;

type Options = {
  urls: string[];
  crawlSite: boolean;
  dryRun: boolean;
};

/**
 * Parses argv into ingestion options.
 */
function parseArgs(argv: string[]): Options {
  const options: Options = { urls: [], crawlSite: false, dryRun: false };

  for (const arg of argv) {
    if (arg === "--site") options.crawlSite = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg.startsWith("http")) options.urls.push(arg);
    else if (arg.startsWith("--url=")) options.urls.push(arg.slice(6));
    else console.warn(`[ingest] ignoring unknown argument: ${arg}`);
  }

  return options;
}

/** Pauses execution, used to avoid hammering the target site. */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches a page and extracts its title and readable body text.
 *
 * Navigation, scripts, and styles are removed first so the embeddings describe
 * page content rather than the site chrome repeated on every page.
 */
async function scrapePage(
  url: string,
): Promise<{ url: string; title: string; text: string } | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "VlirtzIngestBot/1.0 (+https://vlirtz.com)" },
    });

    if (!response.ok) {
      console.warn(`[ingest] ${url} returned ${response.status}, skipping.`);
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      console.warn(`[ingest] ${url} is not HTML (${contentType}), skipping.`);
      return null;
    }

    const $ = cheerio.load(await response.text());
    $("script, style, noscript, nav, header, footer, svg, form").remove();

    const title =
      $("h1").first().text().trim() ||
      $("title").text().trim() ||
      new URL(url).pathname;

    const text = ($("main").text() || $("body").text())
      .replace(/\s+/g, " ")
      .trim();

    if (text.length < MIN_PAGE_CHARS) {
      console.warn(`[ingest] ${url} has too little text, skipping.`);
      return null;
    }

    return { url, title, text };
  } catch (error) {
    console.warn(`[ingest] failed to fetch ${url}:`, error);
    return null;
  }
}

/**
 * Reads `<loc>` entries from the site's `sitemap.xml`.
 */
async function discoverSitemapUrls(baseUrl: string): Promise<string[]> {
  const sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();
  console.info(`[ingest] reading ${sitemapUrl}`);

  try {
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      console.warn(`[ingest] sitemap returned ${response.status}.`);
      return [];
    }

    const $ = cheerio.load(await response.text(), { xmlMode: true });
    const urls = $("loc")
      .map((_, element) => $(element).text().trim())
      .get()
      .filter(Boolean);

    return [...new Set(urls)];
  } catch (error) {
    console.warn("[ingest] could not read sitemap:", error);
    return [];
  }
}

/**
 * Collects every chunk to ingest, from the repo and from any requested URLs.
 */
async function collectChunks(options: Options): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  const urls = [...options.urls];
  if (options.crawlSite) {
    urls.push(...(await discoverSitemapUrls(agentConfig.ingestBaseUrl)));
  }

  // With no URLs requested, ingest the content that ships with this repo.
  if (urls.length === 0) {
    const local = await buildLocalCorpus();
    console.info(`[ingest] ${local.length} chunk(s) from repo content.`);
    chunks.push(...local);
    return chunks;
  }

  const unique = [...new Set(urls)];
  console.info(`[ingest] scraping ${unique.length} page(s)…`);

  for (const [index, url] of unique.entries()) {
    const page = await scrapePage(url);

    if (page) {
      const pageChunks = await chunkScrapedPage(page);
      chunks.push(...pageChunks);
      console.info(
        `[ingest] ${index + 1}/${unique.length} ${url} → ${pageChunks.length} chunk(s)`,
      );
    }

    if (index < unique.length - 1) await sleep(FETCH_DELAY_MS);
  }

  return chunks;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const chunks = await collectChunks(options);

  if (chunks.length === 0) {
    console.error("[ingest] nothing to ingest.");
    process.exit(1);
  }

  const characters = chunks.reduce((sum, chunk) => sum + chunk.text.length, 0);
  console.info(
    `[ingest] ${chunks.length} chunk(s), ~${Math.round(characters / 1000)}k characters.`,
  );

  if (options.dryRun) {
    console.info("\n[ingest] dry run, nothing written. Sample chunk:\n");
    console.info(chunks[0]);
    return;
  }

  if (!capabilities.hasPinecone || !capabilities.hasOpenAI) {
    console.error(
      "\n[ingest] missing configuration. Set OPENAI_API_KEY, " +
        "PINECONE_API_KEY, and PINECONE_INDEX_NAME in .env.local, " +
        "or re-run with --dry-run.",
    );
    process.exit(1);
  }

  await ensurePineconeIndex();

  console.info(
    `[ingest] embedding with ${agentConfig.openai.embeddingModel} and ` +
      `upserting into "${agentConfig.pinecone.indexName}"…`,
  );

  await upsertChunks(chunks, 50, (completed, total) => {
    console.info(`[ingest] ${completed}/${total} vectors upserted`);
  });

  console.info("\n[ingest] done. The agent will now retrieve from Pinecone.\n");
}

main().catch((error) => {
  console.error("[ingest] failed:", error);
  process.exit(1);
});
