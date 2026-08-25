import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * About teaser shown on the homepage, paired with two workspace and brand
 * photos. The founder photo itself lives on /about only.
 */
export function AboutPreview() {
  return (
    <section className="bg-white py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal>
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
        <div className="grid grid-cols-2 gap-4" data-reveal="image">
          <Image
            src="/images/workspace-macbook.jpg"
            alt="MacBook on a desk showing a code editor"
            width={500}
            height={620}
            className="h-full w-full rounded-3xl object-cover"
          />
          <Image
            src="/images/vercel-desk.jpg"
            alt="Developer desk with a Develop, Preview, Ship mug and code on screen"
            width={500}
            height={620}
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
