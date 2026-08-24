import Image from "next/image";
import { aboutGallery } from "@/lib/gallery";
import { formatAddressBlock, site } from "@/lib/site";
import { PhotoGrid } from "@/components/media/PhotoGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About VLIRTZ, the AI software agency in Stockholm",
  description:
    "VLIRTZ is a Stockholm-based AI software agency founded by Borja Javierre i Moyano. We build AI agents, advise on AI strategy, and run AI lead generation.",
  path: "/about",
  keywords: [
    "AI software agency Stockholm",
    "software agency Stockholm",
    "Borja Javierre",
  ],
});

/**
 * About page with founder story, location, and campaign gallery.
 */
export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal-load">
            <p className="inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
              EU-based company
            </p>
            <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
              Your trusted software development partner
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              VLIRTZ is a Stockholm AI software agency. We help companies
              implement agents, decide what is worth building, and put AI to
              work on finding customers.
            </p>
          </div>
          <Image
            src={site.founder.image}
            alt={`${site.founder.name}, founder of VLIRTZ`}
            width={720}
            height={720}
            className="reveal-load-image reveal-load-delay-1 h-auto w-full rounded-3xl object-cover"
            priority
          />
        </Container>
      </section>

      <section className="bg-fog py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal>
            <SectionHeading
              eyebrow="A short story about us"
              title={`${site.founder.firstName} started VLIRTZ in late 2025`}
            />
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>
                {site.founder.name} founded VLIRTZ to help businesses that needed
                software actually implemented, websites, workflows, portals,
                dashboards, and now AI agents that do real work in those
                systems.
              </p>
              <p>
                His background is software development and electrical
                engineering. Before VLIRTZ he also spent time in business,
                sales, and marketing in other ventures, which is why the work
                here sits between product, delivery, and getting customers.
              </p>
              <p>
                The brand is based in Stockholms län and works with clients in
                Europe and the Middle East.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact">Contact</Button>
            </div>
          </div>
          <aside
            data-reveal="image"
            data-delay="1"
            className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
          >
            <Image
              src="/images/reach-map.jpg"
              alt="VLIRTZ work marked across Europe and the Middle East"
              width={900}
              height={560}
              className="h-48 w-full object-cover"
            />
            <div className="p-8">
              <h2 className="text-xl font-semibold text-navy">Our location</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Based in Stockholms län. We serve clients across Europe and the
                Middle East.
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-navy">Location</dt>
                  {formatAddressBlock().map((line) => (
                    <dd key={line} className="text-muted">
                      {line}
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="font-medium text-navy">Hours</dt>
                  <dd className="text-muted">{site.hours}</dd>
                </div>
                <div>
                  <dt className="font-medium text-navy">Founder</dt>
                  <dd className="text-muted">{site.founder.name}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div data-reveal>
            <SectionHeading
              eyebrow="Our gallery"
              title="How we show the work"
              description="Campaign visuals, studio photographs, and the Europe-Middle East map from the original site."
            />
          </div>
          <div className="mt-10">
            <PhotoGrid images={aboutGallery} />
          </div>
        </Container>
      </section>
    </>
  );
}
