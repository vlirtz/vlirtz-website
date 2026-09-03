import { costDrivers, runningCosts } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * What moves a quote inside a band, and what the thing costs to run.
 *
 * Both halves matter. A range without drivers reads as a guess, and buyers
 * routinely conflate build cost with running cost and are then surprised by
 * the second invoice, so the two are separated explicitly here.
 */
export function CostDrivers() {
  return (
    <>
      <section className="bg-fog py-20">
        <Container className="max-w-4xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="What moves the number"
              title="Why two projects with the same description cost differently"
              description="These are the questions we would ask on a first call anyway. Published so you can work out roughly where you land before speaking to us."
            />
          </div>
          <dl className="mt-10 space-y-4">
            {costDrivers.map((item, index) => (
              <div
                key={item.driver}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-white p-6 ring-1 ring-line"
              >
                <dt className="text-base font-semibold text-navy">
                  {item.driver}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-4xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="Running cost"
              title="What it costs to keep running, separately from building it"
              description="These get conflated, and the second one causes the surprises. The model bill is almost never the expensive part."
            />
          </div>
          <dl className="mt-10 grid gap-4 md:grid-cols-3">
            {runningCosts.map((item, index) => (
              <div
                key={item.item}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-fog p-6 ring-1 ring-line"
              >
                <dt className="text-base font-semibold text-navy">{item.item}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
