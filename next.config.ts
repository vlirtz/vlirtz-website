import type { NextConfig } from "next";

/**
 * Legacy URLs from the original Hostinger site.
 */
const legacyRedirects = [
  { source: "/about-software-development", destination: "/about" },
  {
    source: "/services-software-development-ai-consulting-ai-agent-development",
    destination: "/services",
  },
  { source: "/contact-software-development", destination: "/contact" },
];

/**
 * Blog consolidation, September 2026.
 *
 * Twelve posts averaging roughly 500 words were merged into six substantial
 * ones. Two problems were being fixed:
 *
 * 1. Thin content. Half-length posts do not compete for anything, and a
 *    dozen of them dilute the site's topical focus rather than building it.
 *
 * 2. Cannibalisation. Several posts targeted the same commercial queries as
 *    the landing pages. `ai-software-agency-stockholm` and
 *    `software-agency-stockholm` competed with each other, with the
 *    homepage, and with /locations/stockholm for the same term.
 *
 * The blog now targets informational intent and the landing pages own the
 * commercial queries, so the two support each other instead of competing.
 * These are permanent redirects so the retired URLs pass their (modest)
 * accumulated equity to the consolidated destination.
 */
const blogConsolidationRedirects = [
  {
    source: "/blog/from-idea-to-working-ai-agent",
    destination: "/blog/ai-agent-development",
  },
  {
    source: "/blog/ai-lead-generation-amsterdam",
    destination: "/blog/ai-lead-generation",
  },
  {
    source: "/blog/ai-lead-generation-zurich",
    destination: "/blog/ai-lead-generation",
  },
  {
    source: "/blog/ai-lead-generation-dubai-europe",
    destination: "/blog/ai-lead-generation",
  },
  {
    source: "/blog/ai-agency-zurich-vs-amsterdam",
    destination: "/blog/choosing-an-ai-agency",
  },
  {
    source: "/blog/ai-software-agency-amsterdam-copenhagen",
    destination: "/blog/choosing-an-ai-agency",
  },
  {
    source: "/blog/ai-consulting-zurich-swiss-companies",
    destination: "/blog/ai-regulation-europe",
  },
  {
    source: "/blog/ai-software-agency-stockholm",
    destination: "/blog/hiring-an-ai-agency-stockholm",
  },
  {
    source: "/blog/software-agency-stockholm",
    destination: "/blog/hiring-an-ai-agency-stockholm",
  },
  // Sent to the market page rather than a post: this slug targeted
  // "ai consulting stockholm", which /locations/stockholm now owns.
  {
    source: "/blog/ai-consulting-stockholm",
    destination: "/locations/stockholm",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyRedirects, ...blogConsolidationRedirects].map(
      (redirect) => ({ ...redirect, permanent: true }),
    );
  },
};

export default nextConfig;
