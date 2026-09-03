import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  agentDevelopmentMarkets,
  getAgentMarketBySlug,
} from "@/lib/agent-development";
import { getLocationBySlug } from "@/lib/locations";
import {
  createPageMetadata,
  getAgentServiceJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
} from "@/lib/seo";
import { AgentDeliveryStages } from "@/components/agent/AgentDeliveryStages";
import { AgentFaq } from "@/components/agent/AgentFaq";
import { AgentHero } from "@/components/agent/AgentHero";
import { AgentLimits } from "@/components/agent/AgentLimits";
import { AgentMarketLinks } from "@/components/agent/AgentMarketLinks";
import { AgentPrinciples } from "@/components/agent/AgentPrinciples";
import { LocationSections } from "@/components/location/LocationSections";
import { PricingBands } from "@/components/pricing/PricingBands";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { AgentUseCases } from "@/components/agent/AgentUseCases";

type AgentMarketPageProps = {
  params: Promise<{ city: string }>;
};

/**
 * Builds static paths for every market with an agent-development page.
 */
export function generateStaticParams() {
  return agentDevelopmentMarkets.map((market) => ({ city: market.slug }));
}

/**
 * Builds metadata for one agent-development market page.
 */
export async function generateMetadata({
  params,
}: AgentMarketPageProps): Promise<Metadata> {
  const { city } = await params;
  const market = getAgentMarketBySlug(city);
  if (!market) {
    return {};
  }

  return createPageMetadata({
    title: market.metaTitle,
    description: market.metaDescription,
    path: `/services/ai-agent-development/${market.slug}`,
    keywords: market.keywords,
    dateModified: market.dateModified,
  });
}

/**
 * Agent-development landing page for one market, targeting
 * "ai agent development {city}".
 *
 * Before these pages existed, nothing on the site targeted that query
 * family at all: `/locations/{city}` aims at "ai software agency {city}",
 * which is a different intent. The two are deliberately kept distinct, with
 * this page answering "how would you build this for me" and the market page
 * answering "who are you and can you work here".
 */
export default async function AgentMarketPage({ params }: AgentMarketPageProps) {
  const { city } = await params;
  const market = getAgentMarketBySlug(city);

  if (!market) {
    notFound();
  }

  // The sibling market page always exists for these four cities, but treat
  // it as optional so a future agent market without one cannot 500 here.
  const location = getLocationBySlug(market.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "AI Agent Development", path: "/services/ai-agent-development" },
    { name: market.city },
  ];

  return (
    <>
      <JsonLd data={getAgentServiceJsonLd(market)} />
      <JsonLd data={getFaqJsonLd(market.faq)} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />

      <Breadcrumbs crumbs={crumbs} />
      <AgentHero
        kicker={market.heroKicker}
        heading={market.heroHeading}
        description={market.heroDescription}
        angle={market.marketAngle}
      />

      <LocationSections sections={market.sections} />
      <AgentUseCases city={market.city} useCases={market.useCases} />
      <AgentDeliveryStages city={market.city} />
      <AgentPrinciples />

      <PricingBands
        title={`What an AI agent costs in ${market.city}`}
        currency={market.currency}
        bands={market.pricingBands}
      />

      <AgentLimits />

      {location ? (
        <section className="bg-white py-20">
          <Container className="max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
              More about working with us in {market.city}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              This page covers how we build agents. The {market.city} market
              page covers the rest: the regulators that shape a project there,
              the sectors we see most, and when we are the wrong partner.
            </p>
            <Link
              href={`/locations/${location.slug}`}
              className="mt-6 inline-flex text-sm font-medium text-indigo underline underline-offset-4"
            >
              {location.metaTitle}
            </Link>
          </Container>
        </section>
      ) : null}

      <AgentFaq
        title={`AI agent development in ${market.city}: common questions`}
        items={market.faq}
        relatedPostSlugs={market.relatedPostSlugs}
        dateModified={market.dateModified}
      />
      <AgentMarketLinks currentSlug={market.slug} />
    </>
  );
}
