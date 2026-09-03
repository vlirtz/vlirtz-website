/**
 * Registry for `/services/ai-agent-development` and its market pages.
 *
 * Only the four priority search markets have a page. Publishing one per city
 * we do not actually know well would be a doorway-page pattern, so a market
 * earns a page when there is genuinely market-specific substance to write.
 */
import { amsterdam } from "./amsterdam";
import { copenhagen } from "./copenhagen";
import { stockholm } from "./stockholm";
import { zurich } from "./zurich";
import type { AgentDevelopmentMarket } from "./types";

export type { AgentDevelopmentMarket, AgentUseCase } from "./types";
export {
  agentLimits,
  buildPrinciples,
  deliveryStages,
  type DeliveryStage,
} from "./shared";

export const agentDevelopmentMarkets: AgentDevelopmentMarket[] = [
  stockholm,
  copenhagen,
  zurich,
  amsterdam,
];

/**
 * Looks up one agent-development market by its city slug.
 *
 * @param slug - The city slug from the route, e.g. "amsterdam".
 * @returns The market, or undefined when the city has no page.
 */
export function getAgentMarketBySlug(
  slug: string,
): AgentDevelopmentMarket | undefined {
  return agentDevelopmentMarkets.find((market) => market.slug === slug);
}

/**
 * Whether a city has a dedicated agent-development page.
 *
 * Used by the market pages to decide whether to deep-link their
 * "AI Agent Development" service card, rather than hard-coding the list of
 * covered cities in a component.
 *
 * @param slug - A location slug.
 */
export function hasAgentMarket(slug: string): boolean {
  return agentDevelopmentMarkets.some((market) => market.slug === slug);
}

/**
 * Returns every agent-development market except the given one.
 *
 * @param slug - The market to exclude, normally the current page.
 */
export function getOtherAgentMarkets(slug: string): AgentDevelopmentMarket[] {
  return agentDevelopmentMarkets.filter((market) => market.slug !== slug);
}
