import { tool } from "langchain";
import { z } from "zod";
import { TOOL_NAMES } from "../events";
import { formatContext, retrieveKnowledge } from "../rag/retriever";

/**
 * `searchVlirtzKnowledgeBase` — retrieval tool for the sales agent.
 *
 * The agent must call this before answering questions about what Vlirtz can
 * build, how it works, pricing approach, or past projects, so answers are
 * grounded in real site content rather than the model's assumptions.
 */

const schema = z.object({
  query: z
    .string()
    .min(2)
    .describe(
      "The visitor's question, rephrased as a standalone search query. " +
        "Include the technical terms they used.",
    ),
});

/** How many passages to retrieve. Enough context without flooding the prompt. */
const TOP_K = 4;

/**
 * Builds the knowledge base search tool.
 *
 * @param onRetrieval - Optional hook for logging which backend served the
 *   query, used by the route to record analytics.
 */
export function createSearchKnowledgeBaseTool(onRetrieval?: (info: {
  query: string;
  source: string;
  hits: number;
}) => void) {
  return tool(
    async ({ query }) => {
      const result = await retrieveKnowledge(query, TOP_K);

      onRetrieval?.({
        query,
        source: result.source,
        hits: result.chunks.length,
      });

      return formatContext(result);
    },
    {
      name: TOOL_NAMES.searchKnowledgeBase,
      description:
        "Search Vlirtz's knowledge base for facts about its services, " +
        "technical capabilities, process, and past work. Call this before " +
        "answering any question about what Vlirtz does or can build.",
      schema,
    },
  );
}
