import type { LocalRegulator } from "@/lib/locations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type LocationRegulatorsProps = {
  city: string;
  regulators: LocalRegulator[];
};

/**
 * Named regulators and legal frameworks for a market.
 *
 * This block does two jobs. For readers it answers the compliance question
 * buyers in regulated markets ask first, with enough specificity to show we
 * have actually read the rules. For search it builds real topical relevance
 * through named entities (revFADP, FINMA, Datatilsynet, WBSO) rather than
 * through repetition of the city name, which is what thin city pages do.
 *
 * Both the short and full names are rendered, since buyers search for both.
 */
export function LocationRegulators({ city, regulators }: LocationRegulatorsProps) {
  if (regulators.length === 0) {
    return null;
  }

  return (
    <section className="bg-fog py-20">
      <Container className="max-w-3xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="Compliance"
            title={`The rules that shape an AI project in ${city}`}
            description="We scope against these before any customer data moves, not after a contract is signed. Each one changes the architecture, not just the paperwork."
          />
        </div>
        <dl className="mt-10 space-y-4">
          {regulators.map((regulator, index) => (
            <div
              key={regulator.name}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white p-6 ring-1 ring-line"
            >
              <dt>
                <span className="text-lg font-semibold text-navy">
                  {regulator.name}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {regulator.fullName}
                </span>
              </dt>
              <dd className="mt-3 text-sm leading-6 text-muted">
                {regulator.note}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
