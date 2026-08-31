import Image from "next/image";
import { services } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "AI agent development, consulting and lead generation",
  description:
    "VLIRTZ services: custom AI agents, AI consulting, and AI lead generation for companies in Stockholm, Europe, and the Middle East.",
  path: "/services",
  keywords: [
    "AI agent development",
    "AI consulting Stockholm",
    "AI lead generation",
    "AI software agency Stockholm",
  ],
});

const extras = [
  {
    title: "What you get",
    points: [
      "A scoped first version you can put in front of real users",
      "Clear ownership of data, tools, and human review",
      "Working sessions with the people who will run the system",
    ],
  },
  {
    title: "How we work",
    points: [
      "Start from the business problem, not a model name",
      "Prefer systems your team can operate after we leave",
      "Measure whether the work saved time or created revenue",
    ],
  },
];

/**
 * Services page covering the three VLIRTZ offers.
 */
export default function ServicesPage() {
  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <Container className="reveal-load mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
            EU-based company
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
            AI solutions built for your business
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Custom AI agents, expert AI consulting, and AI lead generation.
            Solutions built to put AI to work for your business.
          </p>
        </Container>
      </section>

      <section className="bg-fog py-20">
        <Container>
          <div data-reveal>
            <SectionHeading
              eyebrow="Our services"
              title="Expert AI software development and consulting"
              description="Work tailored for companies in Europe and the Middle East that want a partner in Stockholm."
            />
          </div>
          <div className="mt-12 grid gap-6">
            {services.map((service) => (
              <article
                key={service.slug}
                id={service.slug}
                data-reveal
                className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-line md:grid-cols-[280px_1fr]"
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={560}
                  height={420}
                  className="h-56 w-full object-cover md:h-full"
                />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-semibold text-navy">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                    {service.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {extras.map((block, index) => (
            <article
              key={block.title}
              data-reveal
              data-delay={String(index)}
              className="rounded-3xl bg-fog p-8"
            >
              <h2 className="text-xl font-semibold text-navy">{block.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                {block.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
        <Container className="mt-12 flex flex-wrap items-center gap-4">
          <Button href="/contact">Talk about a project</Button>
          <Button href="/locations" variant="secondary">
            See where we work
          </Button>
        </Container>
      </section>
    </>
  );
}
