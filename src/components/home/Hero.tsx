import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Homepage hero: full-bleed office video behind the EU badge, headline and CTAs.
 * Plays muted and loops; reduced-motion users see the still frame only.
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy bg-cover bg-center py-24 text-white lg:py-32"
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

      <Container className="reveal-load relative mx-auto max-w-2xl text-center">
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
          <Button href="/contact">Get in touch</Button>
          <Button href="/services" variant="secondary">
            Learn
          </Button>
        </div>
      </Container>
    </section>
  );
}
