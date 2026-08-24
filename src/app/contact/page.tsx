import { formatAddressBlock, site } from "@/lib/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { GoogleMap } from "@/components/media/GoogleMap";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { createPageMetadata, getLocalBusinessJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact our software development agency in Stockholm",
  description:
    "Contact VLIRTZ in Stockholm for AI agent development, AI consulting, or AI lead generation. Email info@vlirtz.com or use the form.",
  path: "/contact",
  keywords: ["contact VLIRTZ", "AI agency Stockholm", "software agency Stockholm"],
});

/**
 * Contact page with form, NAP details, and a map matching Google Business.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="reveal-load mx-auto max-w-2xl text-center">
            <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
              EU-based company
            </p>
            <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              We are here to help with AI agents, consulting, and lead
              generation. Send a note and we will reply.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div data-reveal>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="font-medium text-navy">Contact</dt>
                  <dd>
                    <a href={site.phoneHref} className="text-indigo">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-navy">Support</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-indigo">
                      {site.email}
                    </a>
                  </dd>
                </div>
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
              </dl>
            </div>
            <div
              data-reveal="image"
              className="rounded-3xl bg-fog p-6 ring-1 ring-line sm:p-8"
            >
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-fog py-16">
        <Container>
          <div data-reveal>
            <h2 className="text-2xl font-semibold text-navy">Our location</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Based in Kungsängen, Stockholms län. We work with clients across
              Europe and the Middle East.
            </p>
            <div className="mt-8">
              <GoogleMap />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
