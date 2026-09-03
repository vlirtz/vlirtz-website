import Link from "next/link";
import {
  agentDevelopmentMarkets,
  getOtherAgentMarkets,
} from "@/lib/agent-development";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AgentMarketLinksProps = {
  /** Current market slug, excluded from the list. Omit on the hub page. */
  currentSlug?: string;
};

/**
 * Links to every agent-development market page.
 *
 * This is the main internal path into the pages targeting
 * "ai agent development {city}", so it runs on the hub and on each market
 * page, giving every city page inbound links from its siblings rather than
 * from the hub alone.
 */
export function AgentMarketLinks({ currentSlug }: AgentMarketLinksProps) {
  const markets = currentSlug
    ? getOtherAgentMarkets(currentSlug)
    : agentDevelopmentMarkets;

  if (markets.length === 0) {
    return null;
  }

  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="By market"
            title={currentSlug ? "Agent development in other markets" : "Where we build agents"}
            description="Each market page covers the workflows we are actually asked to build there, the regulators that shape the design, and pricing in the local currency."
          />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market, index) => (
            <Link
              key={market.slug}
              href={`/services/ai-agent-development/${market.slug}`}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white p-6 ring-1 ring-line transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo">
                {market.country}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-navy">
                {market.city}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {market.useCases
                  .slice(0, 2)
                  .map((useCase) => useCase.sector)
                  .join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
