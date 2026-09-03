/**
 * Shared types for market/location pages.
 *
 * VLIRTZ is headquartered in Stockholms lan only. Every other market is
 * served remotely, with travel when a project calls for it. Copy in every
 * market file must stay honest about that and never imply a local office
 * that does not exist.
 *
 * Each market gets genuinely distinct content (named regulators, real local
 * sectors, its own FAQ and disqualifiers) rather than a template with the
 * city swapped in, since thin near-duplicate "doorway" pages are a
 * documented Google Search spam pattern.
 */

/** A question and answer pair rendered into visible copy and FAQPage JSON-LD. */
export type LocationFaqItem = {
  question: string;
  answer: string;
};

/**
 * A named regulator, supervisory authority, or legal framework that applies
 * in this market. Used to build real topical relevance instead of repeating
 * the city name, and to answer the compliance question buyers ask first.
 */
export type LocalRegulator = {
  /** Short name as buyers in the market say it, e.g. "IMY" or "revFADP". */
  name: string;
  /** Expanded name, so the page carries both forms for search. */
  fullName: string;
  /** What it means for an AI project, in one or two sentences. */
  note: string;
};

/**
 * A long-form prose block. Three or four of these per market carry most of
 * the page's word count and all of its genuinely local substance.
 */
export type LocationSection = {
  heading: string;
  /** One string per rendered paragraph. */
  body: string[];
};

/**
 * An indicative price band shown on market pages and the pricing page.
 *
 * Amounts are strings so each market can quote its own currency and its own
 * rounding, e.g. "SEK 45,000-90,000" or "CHF 5,000-9,000". Numbers only
 * render when pricing has been confirmed; see `src/lib/pricing.ts`.
 */
export type PricingBand = {
  /** Engagement name, e.g. "Scoped agent build". */
  name: string;
  /** What the buyer actually receives. */
  scope: string;
  /** Indicative amount in this market's currency, excluding VAT. */
  amount: string;
  /** Calendar time from kickoff to handover. */
  timeline: string;
};

export type Location = {
  slug: string;
  city: string;
  /** Country or region label used in headings and titles. */
  country: string;
  /** "city" for a single market, "region" for the pan-European page. */
  kind: "city" | "region";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroKicker: string;
  /**
   * The visible H1. Kept as an exact match for this market's primary query
   * rather than stacking several service keywords into one heading, which
   * splits intent and ranks for none of them well.
   */
  heroHeading: string;
  heroDescription: string;
  timezone: string;
  dataLaw: string;
  /** Currency used for indicative pricing in this market. */
  currency: string;
  sectors: string[];
  marketNote: string;
  /** Named authorities and frameworks that govern AI work in this market. */
  localRegulators: LocalRegulator[];
  /** Long-form, market-specific prose. Three or four blocks per market. */
  sections: LocationSection[];
  /** Indicative engagement bands in this market's currency. */
  pricingBands: PricingBand[];
  /**
   * Honest disqualifiers. Saying who should not hire us reads as credibility
   * and pre-filters the enquiries that waste everyone's time.
   */
  notForYouIf: string[];
  faq: LocationFaqItem[];
  /** Slugs of related blog posts, most relevant first. */
  relatedPostSlugs: string[];
  /**
   * ISO date of the last substantive content review. Feeds the sitemap and
   * the visible "last reviewed" line, so freshness signals are real rather
   * than every page claiming to have changed today.
   */
  dateModified: string;
};
