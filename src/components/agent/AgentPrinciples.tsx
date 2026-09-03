import { buildPrinciples } from "@/lib/agent-development";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Architectural positions we hold across every agent build.
 *
 * These are the questions that separate a vendor who has shipped an agent
 * into production from one who has shipped a demo: bounded autonomy, an
 * evaluation set, audit logging, retrieval quality, and code ownership.
 * Publishing our answers lets a buyer compare us against a vendor who
 * cannot answer them at all.
 */
export function AgentPrinciples() {
  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="How we build"
            title="Positions we hold on every build"
            description="These are decisions we make the same way every time, because each one is a reason agent projects fail when it goes the other way."
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildPrinciples.map((item, index) => (
            <article
              key={item.principle}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white p-7 ring-1 ring-line"
            >
              <h3 className="text-base font-semibold text-navy">
                {item.principle}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
