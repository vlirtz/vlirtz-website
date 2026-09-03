import type { Location } from "@/lib/locations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type LocationHeroProps = {
  location: Location;
};

/**
 * Hero for a market/location page.
 *
 * The H1 comes from `location.heroHeading` rather than being assembled here,
 * because each market needs an exact match for its own primary query. The
 * previous version hard-coded "AI Software Agency & AI Consulting in {city}",
 * which stacked two head terms into one heading and split the intent.
 *
 * Framing stays honest about remote delivery for every market except
 * Stockholm, where VLIRTZ is actually based.
 */
export function LocationHero({ location }: LocationHeroProps) {
  const isHeadquarters = location.slug === "stockholm";

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="reveal-load mx-auto max-w-3xl text-center">
        <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
          {location.heroKicker}
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
          {location.heroHeading}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          {location.heroDescription}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact">
            {isHeadquarters ? "Meet in Stockholm" : "Talk about a project"}
          </Button>
          <Button href="/pricing" variant="secondary">
            See pricing
          </Button>
        </div>
      </Container>
    </section>
  );
}
