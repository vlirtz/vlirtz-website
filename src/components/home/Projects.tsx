import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projects = [
  {
    src: "/images/hero-times-square.jpg",
    title: "Campaign work",
    text: "Brand and campaign assets for AI agent development, consulting and lead generation.",
  },
  {
    src: "/images/ad-1.jpg",
    title: "AI agents for your needs",
    text: "Street and digital creative around reasoning and acting on multi-step tasks.",
  },
  {
    src: "/images/ad-2.jpg",
    title: "Ready for AI agents",
    text: "Positioning work that asks a simple question: is the business ready for agents?",
  },
  {
    src: "/images/reach-map.jpg",
    title: "Europe and Middle East reach",
    text: "Delivery aimed at clients across both regions, the same map from the original site.",
  },
];

/**
 * Project gallery that keeps the current site's campaign mockups.
 */
export function Projects() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Our projects"
            title="Work that shows how we talk about AI"
            description="Explore the campaign and product visuals we use to explain the three things we do."
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-reveal="image"
              data-delay={String(index % 2)}
              className="overflow-hidden rounded-3xl bg-fog ring-1 ring-line"
            >
              <Image
                src={project.src}
                alt={project.title}
                width={900}
                height={700}
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-navy">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
