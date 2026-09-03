import { deliveryStages } from "@/lib/agent-development";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type AgentDeliveryStagesProps = {
  /** Optional market name, used to make the heading market-specific. */
  city?: string;
};

/**
 * How a scoped agent build actually runs, stage by stage.
 *
 * Published in this much detail on purpose. A buyer comparing vendors can
 * tell the difference between a process that starts by measuring the
 * existing workflow and one that starts by choosing a framework, and the
 * first is the one that ships something usable.
 *
 * The stages are identical in every market, so they live in
 * `src/lib/agent-development/shared.ts` rather than being duplicated.
 */
export function AgentDeliveryStages({ city }: AgentDeliveryStagesProps) {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-4xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="How we build"
            title={
              city
                ? `A ${city} agent build, week by week`
                : "How a scoped agent build runs"
            }
            description="Two to four weeks from kickoff to handover. The order matters more than the tooling: measure first, prototype on real data second, close the loop third."
          />
        </div>
        <ol className="mt-12 space-y-6">
          {deliveryStages.map((stage, index) => (
            <li
              key={stage.step}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-fog p-7 ring-1 ring-line sm:p-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-2xl font-semibold text-indigo">
                  {stage.step}
                </span>
                <h3 className="text-lg font-semibold text-navy">{stage.name}</h3>
                <span className="text-sm text-muted">{stage.duration}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{stage.body}</p>
              <p className="mt-4 text-sm text-navy">
                <span className="font-medium">You end up with:</span>{" "}
                <span className="text-muted">{stage.deliverable}</span>
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
