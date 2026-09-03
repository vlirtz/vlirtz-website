import type { AgentUseCase } from "@/lib/agent-development";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AgentUseCasesProps = {
  city: string;
  useCases: AgentUseCase[];
};

/**
 * The workflow shapes we are repeatedly asked to build in a market.
 *
 * Deliberately specific. "Customer service automation" tells a buyer
 * nothing about whether we understand their problem; naming the sector, the
 * actual workflow, and where the human stays does. This is also the section
 * that carries the market's sector vocabulary, which is what builds topical
 * relevance for the city query.
 */
export function AgentUseCases({ city, useCases }: AgentUseCasesProps) {
  if (useCases.length === 0) {
    return null;
  }

  return (
    <section className="bg-fog py-20">
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Use cases"
            title={`What we are asked to build in ${city}`}
            description="Real workflow shapes from this market, with the point where a human stays in the loop stated for each one."
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <article
              key={useCase.title}
              data-reveal
              data-delay={String(index % 3)}
              className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-line"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo">
                {useCase.sector}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-navy">
                {useCase.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{useCase.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
