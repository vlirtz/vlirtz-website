import type { Location } from "@/lib/locations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type LocationHeroProps = {
  location: Location;
};

/**
 * Hero for a market/location page. Framing stays honest about remote
 * delivery for every market except Stockholm, where VLIRTZ is based.
 */
export function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="reveal-load mx-auto max-w-2xl text-center">
        <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
          {location.heroKicker}
        </p>
        <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
          AI Software Agency &amp; AI Consulting in {location.city}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          {location.heroDescription}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Talk to us</Button>
          <Button href="/services" variant="secondary">
            See services
          </Button>
        </div>
      </Container>
    </section>
  );
}
