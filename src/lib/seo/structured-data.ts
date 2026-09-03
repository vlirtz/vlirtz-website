import type { AgentDevelopmentMarket } from "@/lib/agent-development";
import type { FaqItem } from "@/lib/faq";
import type { Location, LocationFaqItem } from "@/lib/locations";
import { PRICING_CONFIRMED } from "@/lib/pricing";
import { site } from "@/lib/site";
import { ORGANIZATION_ID } from "./organization";

/** A single crumb in a breadcrumb trail. Omit `path` for the current page. */
export type Breadcrumb = {
  name: string;
  path?: string;
};

/**
 * BreadcrumbList JSON-LD.
 *
 * Google uses this to render the breadcrumb path in place of the raw URL in
 * search results, which measurably helps click-through on deep pages like
 * /services/ai-agent-development/stockholm.
 *
 * @param crumbs - Ordered trail, starting at the site root.
 */
export function getBreadcrumbJsonLd(crumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: new URL(crumb.path, site.url).toString() } : {}),
    })),
  };
}

/**
 * Service JSON-LD for a market page, scoped with areaServed so it stays
 * distinct from the sitewide LocalBusiness entry.
 *
 * Price bands are only emitted once pricing has been confirmed, because
 * publishing an unapproved `offers` node would put a number into Google's
 * index that nobody signed off on. See `src/lib/pricing.ts`.
 */
export function getLocationServiceJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI software development and consulting",
    name: location.metaTitle,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": location.kind === "region" ? "Place" : "City",
      name: location.city,
    },
    description: location.metaDescription,
    url: `${site.url}/locations/${location.slug}`,
    ...(PRICING_CONFIRMED
      ? {
          offers: location.pricingBands.map((band) => ({
            "@type": "Offer",
            name: band.name,
            description: band.scope,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: location.currency,
              description: band.amount,
            },
          })),
        }
      : {}),
  };
}

/**
 * Service JSON-LD for an agent-development market page.
 *
 * Narrower `serviceType` than the market pages on purpose, so the two page
 * types describe different services to Google rather than competing as
 * near-duplicate entities for the same city.
 */
export function getAgentServiceJsonLd(market: AgentDevelopmentMarket) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI agent development",
    name: market.metaTitle,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "City", name: market.city },
    description: market.metaDescription,
    url: `${site.url}/services/ai-agent-development/${market.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `AI agent use cases in ${market.city}`,
      itemListElement: market.useCases.map((useCase) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: useCase.title,
          category: useCase.sector,
          description: useCase.body,
        },
      })),
    },
  };
}

/**
 * FAQPage JSON-LD for any list of question and answer pairs.
 *
 * @param items - Q&A pairs, which must also be visible in the page copy.
 */
export function getFaqJsonLd(items: FaqItem[] | LocationFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * FAQPage JSON-LD for a market page's Q&A block.
 *
 * @deprecated Prefer `getFaqJsonLd(location.faq)`. Kept as a thin alias so
 * existing call sites keep working.
 */
export function getLocationFaqJsonLd(location: Location) {
  return getFaqJsonLd(location.faq);
}
