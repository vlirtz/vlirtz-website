import Image from "next/image";
import Link from "next/link";
import { hasAgentMarket } from "@/lib/agent-development";
import type { Location } from "@/lib/locations";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationServicesProps = {
  location: Location;
};

/**
 * The three service pillars, restated for this market.
 *
 * The AI Agent Development card deep-links to that market's dedicated
 * agent-development page where one exists, falling back to the service hub
 * otherwise. That link is the main internal path into the pages targeting
 * "ai agent development {city}", so it matters more than it looks.
 *
 * @see hasAgentMarket for which cities have a dedicated page.
 */
export function LocationServices({ location }: LocationServicesProps) {
  const agentPageExists = hasAgentMarket(location.slug);

  /** Resolves the deepest available link for a service in this market. */
  const hrefFor = (slug: string): string => {
    if (slug === "ai-agent-development") {
      return agentPageExists
        ? `/services/ai-agent-development/${location.slug}`
        : "/services/ai-agent-development";
    }
    return `/services#${slug}`;
  };

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
                <Link
                  href={hrefFor(service.slug)}
                  className="mt-5 inline-flex text-sm font-medium text-indigo underline underline-offset-4"
                >
                  {service.slug === "ai-agent-development" && agentPageExists
                    ? `How we build agents in ${location.city}`
                    : `More on ${service.title.toLowerCase()}`}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
