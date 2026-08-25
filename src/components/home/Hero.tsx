import { site, services } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Homepage hero: full-bleed office video behind the headline, CTA, and the
 * three service pillars shown as glass cards over the image, matching the
 * layout of the original site.
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy bg-cover bg-center pb-10 pt-24 text-white lg:pb-16 lg:pt-32"
      style={{ backgroundImage: "url(/videos/coding-poster.jpg)" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/coding-poster.jpg"
        aria-hidden
      >
        <source src="/videos/coding-office.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/70" />

      <Container className="relative">
        <div className="reveal-load mx-auto max-w-2xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20">
            EU-based company
          </p>
          <h1 className="mx-auto mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.4rem]">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-6 text-lg leading-8 text-white/80">
            We build AI agents, guide your AI strategy, and fill your pipeline
            with qualified leads.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.slug}
              data-reveal
              data-delay={String(index)}
              className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/15 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">{service.short}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
