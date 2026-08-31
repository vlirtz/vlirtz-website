import Image from "next/image";
import { services } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Longer service descriptions used on the homepage below the about teaser,
 * paired with a brand image on the left, matching the original site layout.
 */
export function ServiceDetails() {
  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            align="center"
            eyebrow="What we do"
            title="Innovative AI architect solutions"
            description="Expert AI software development services tailored to meet your business needs effectively. Our team of experts brings only exceptional results."
          />
          <p className="mx-auto mt-2 max-w-3xl text-center text-base font-semibold text-navy sm:text-lg">
            We don&apos;t stop until you&apos;re happy with the results.
          </p>
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <Image
            src="/images/ad-2.jpg"
            alt="VLIRTZ street advertisement asking if your business is ready for AI agents"
            width={700}
            height={860}
            data-reveal="image"
            className="h-full w-full rounded-3xl object-cover"
          />
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={service.slug} data-reveal data-delay={String(index)}>
                <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{service.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
