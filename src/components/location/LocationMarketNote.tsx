import type { Location } from "@/lib/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationMarketNoteProps = {
  location: Location;
};

/**
 * Market-specific context: sectors, timezone, and data-protection law.
 * Kept as real, checkable facts rather than filler, since this section
 * is what makes the page more than a template with the city swapped.
 */
export function LocationMarketNote({ location }: LocationMarketNoteProps) {
  return (
    <section className="bg-fog py-20">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-reveal>
          <SectionHeading
            eyebrow={`Working in ${location.country}`}
            title={`What ${location.kind === "region" ? "European" : location.city} companies ask us first`}
          />
          <p className="mt-6 text-base leading-7 text-muted">
            {location.marketNote}
          </p>
        </div>
        <aside
          data-reveal="image"
          data-delay="1"
          className="rounded-3xl bg-white p-8 ring-1 ring-line"
        >
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-medium text-navy">Time zone</dt>
              <dd className="mt-1 text-muted">{location.timezone}</dd>
            </div>
            <div>
              <dt className="font-medium text-navy">Data protection</dt>
              <dd className="mt-1 text-muted">{location.dataLaw}</dd>
            </div>
            <div>
              <dt className="font-medium text-navy">Sectors we see most</dt>
              <dd className="mt-1 text-muted">{location.sectors.join(", ")}</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </section>
  );
}
