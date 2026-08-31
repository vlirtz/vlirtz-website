import Image from "next/image";
import type { Location } from "@/lib/locations";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationServicesProps = {
  location: Location;
};

/**
 * The three service pillars, restated with the location's name so the
 * page carries city-level keyword relevance in real, readable sentences.
 */
export function LocationServices({ location }: LocationServicesProps) {
  return (
    <section className="bg-white py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="What we do here"
            title={`AI agent development, AI consulting, and AI lead generation for ${location.city}`}
            description={`Every engagement starts with one workflow, not a platform pitch, whether your team is in ${location.city} or working with us fully remote.`}
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.slug}
              data-reveal="image"
              data-delay={String(index)}
              className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={720}
                height={480}
                className="h-44 w-full object-cover"
              />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-navy">
                  {service.title} in {location.city}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {service.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
