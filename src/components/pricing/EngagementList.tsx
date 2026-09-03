import { displayAmount, engagements } from "@/lib/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The full engagement catalogue, with scope boundaries.
 *
 * The `excludes` list is the part that makes a band mean anything. A range
 * with no stated boundary is a guess, and publishing what is not included
 * pre-empts the scope argument that otherwise arrives in week three.
 */
export function EngagementList() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-4xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="Engagements"
            title="The five shapes of work we sell"
            description="Reference amounts in EUR, excluding VAT. Market pages quote the same engagements in local currency."
          />
        </div>

        <div className="mt-12 space-y-6">
          {engagements.map((engagement, index) => (
            <article
              key={engagement.slug}
              id={engagement.slug}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-fog p-7 ring-1 ring-line sm:p-9"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-xl font-semibold text-navy">
                  {engagement.name}
                </h3>
                <p className="text-lg font-semibold text-indigo">
                  {displayAmount(engagement.amount)}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted">
                {engagement.bestFor}
              </p>

              <p className="mt-4 text-sm text-navy">
                <span className="font-medium">Timeline:</span>{" "}
                <span className="text-muted">{engagement.timeline}</span>
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-navy">Included</h4>
                  <ul className="mt-3 space-y-2">
                    {engagement.includes.map((item) => (
                      <li key={item} className="text-sm leading-6 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy">Not included</h4>
                  <ul className="mt-3 space-y-2">
                    {engagement.excludes.map((item) => (
                      <li key={item} className="text-sm leading-6 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
