import Link from "next/link";
import { getOtherLocations } from "@/lib/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationOtherMarketsProps = {
  /** The current market, excluded from the list. */
  slug: string;
};

/**
 * Cross-links every other market from a market page.
 *
 * Before this existed, market pages were reachable only from the footer and
 * the /locations hub, which starved them of internal link equity. Linking
 * markets to each other gives every city page inbound links from five
 * sibling pages instead of one hub.
 */
export function LocationOtherMarkets({ slug }: LocationOtherMarketsProps) {
  const others = getOtherLocations(slug);

  if (others.length === 0) {
    return null;
  }

  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Other markets"
            title="Where else we work"
            description="Headquartered in Stockholm, working with companies across Europe and the Gulf. Each market page covers its own regulators, sectors and pricing."
          />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((location, index) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white p-6 ring-1 ring-line transition-transform hover:-translate-y-0.5"
            >
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-indigo">
                {location.kind === "region" ? "Region" : location.country}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-navy">
                {location.city}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {location.sectors.slice(0, 3).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
