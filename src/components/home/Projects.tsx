import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projects = [
  {
    src: "/images/github-screen.jpg",
    alt: "Close-up of a GitHub landing page on a monitor",
    title: "Built on modern tooling",
    text: "We ship with the same platforms and workflows serious engineering teams already use, not a legacy stack with AI bolted on.",
  },
  {
    src: "/images/scrabble-team-lead.jpg",
    alt: "Scrabble tiles spelling team, lead, and succeed",
    title: "Team. Lead. Succeed.",
    text: "AI agent development and consulting built around one goal: giving your team the edge to close more, faster.",
  },
  {
    src: "/images/xcode-laptop.jpg",
    alt: "Laptop showing a code editor next to an app preview on a phone",
    title: "From code to shipped product",
    text: "AI agents and software built end to end, from architecture to the product your team actually uses.",
  },
  {
    src: "/images/reach-map.jpg",
    alt: "Map of VLIRTZ work across Europe and the Middle East",
    title: "Stockholm, and clients across Europe and the Gulf",
    text: "Headquartered in Stockholm, working with companies in Zurich, Amsterdam, Copenhagen, Dubai, and beyond.",
  },
];

/**
 * Project gallery mixing our own workspace and campaign photography.
 */
export function Projects() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Our projects"
            title="Work that shows how we talk about AI"
            description="A look at how we build, and where we work."
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
                alt={project.alt}
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
