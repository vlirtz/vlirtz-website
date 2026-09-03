import type { LocationFaqItem, LocationSection, PricingBand } from "@/lib/locations";

export type { LocationFaqItem, LocationSection, PricingBand };

/**
 * A workflow shape we are repeatedly asked to build in a given market.
 *
 * Kept concrete on purpose. "Customer service automation" tells a buyer
 * nothing; "reconciliation exceptions across a payments ledger, with a human
 * approving anything that moves funds" tells them whether we understand
 * their problem.
 */
export type AgentUseCase = {
  title: string;
  /** The sector or function this comes from. */
  sector: string;
  /** What the agent actually does, and where the human stays. */
  body: string;
};

/**
 * Per-market content for `/services/ai-agent-development/[city]`.
 *
 * Deliberately a different angle from the matching `/locations/[city]` page.
 * The location page answers "who are you and can you work in my market".
 * This one answers "how do you build an agent and what would you build for
 * me". Overlapping city pages that answer the same question compete with
 * each other, which is the cannibalisation problem this split avoids.
 */
export type AgentDevelopmentMarket = {
  /** Matches the corresponding `Location` slug. */
  slug: string;
  city: string;
  country: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroKicker: string;
  /** Visible H1. Exact match for "ai agent development {city}". */
  heroHeading: string;
  heroDescription: string;
  /** One-line summary of what makes this market's builds distinctive. */
  marketAngle: string;
  useCases: AgentUseCase[];
  sections: LocationSection[];
  /** Indicative bands, in this market's currency. */
  currency: string;
  pricingBands: PricingBand[];
  faq: LocationFaqItem[];
  relatedPostSlugs: string[];
  dateModified: string;
};
