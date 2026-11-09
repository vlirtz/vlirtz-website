import Image from "next/image";
import { aboutGallery } from "@/lib/gallery";
import { formatAddressBlock, site } from "@/lib/site";
import { PhotoGrid } from "@/components/media/PhotoGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Meet The Team | VLIRTZ",
  description:
    "Meet Borja Javierre i Moyano, Founder & Senior AI/ML Software Engineer at VLIRTZ, a Stockholm-based AI software agency.",
  path: "/meet-the-team",
  keywords: [
    "AI software agency Stockholm",
    "software agency Stockholm",
    "Borja Javierre",
  ],
});

/**
 * Team page with founder story, location, and campaign gallery.
 */
export default function MeetTheTeamPage() {
  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal-load">
            <p className="inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
              EU-based company
            </p>
            <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
              Meet The Team
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-navy">
              {site.founder.name}
            </h2>
            <p className="mt-2 text-lg font-medium text-indigo">
              {site.founder.role}
            </p>
            <p className="mt-6 text-lg leading-8 text-muted">
              Borja leads VLIRTZ&apos;s AI/ML and software engineering work from
              Stockholm, partnering directly with clients from discovery through
              delivery.
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
              eyebrow="Founder-led delivery"
              title={`Meet ${site.founder.firstName}`}
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
                engineering, and VLIRTZ is built on that engineering
                foundation. AI/ML is where we focus today, but we still take on
                general full-stack web and mobile development. Before VLIRTZ he also spent time in business,
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
              eyebrow="Behind the scenes"
              title="How we show the work"
              description="Campaign visuals, studio photographs, and the Europe-Middle East map from the original site."
            />
          </div>
          <div className="mt-10">
            <PhotoGrid images={aboutGallery} />
          </div>
        </Container>
      </section>

      <section className="bg-fog py-16">
        <Container>
          <div data-reveal>
            <SectionHeading
              eyebrow="About"
              title="About VLIRTZ"
              description={site.description}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
