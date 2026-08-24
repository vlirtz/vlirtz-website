import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * About teaser shown on the homepage. The founder photo lives on /about only.
 */
export function AboutPreview() {
  return (
    <section className="bg-white py-20">
      <Container data-reveal>
        <div className="max-w-xl">
          <SectionHeading
            eyebrow="About Vlirtz"
            title="A dedicated AI software agency in Stockholm"
            description="We work with companies that want AI agents, a clear implementation plan, or a more reliable way to find interested buyers, across Europe and the Middle East."
          />
          <p className="mt-5 text-base leading-7 text-muted">
            Expert AI software development tailored to the problem in front of
            you. We do not stop at a slide deck. We stay until the system is
            useful.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              Learn
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
