import Image from "next/image";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Longer service descriptions used on the homepage below the about teaser.
 */
export function ServiceDetails() {
  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Innovative AI architect solutions"
            description="Expert AI software development services for teams that want something shipped, not another workshop."
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
                <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{service.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
