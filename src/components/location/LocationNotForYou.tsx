import { Container } from "@/components/ui/Container";

type LocationNotForYouProps = {
  city: string;
  reasons: string[];
};

/**
 * Honest disqualifiers for a market.
 *
 * Saying who should not hire us does two useful things: it reads as
 * credibility to buyers who have sat through vendors claiming to fit every
 * brief, and it pre-filters the enquiries that would waste a first call.
 * The market pages carry a market-specific version because the real reasons
 * differ (procurement entity requirements in Zurich, language in Copenhagen).
 */
export function LocationNotForYou({ city, reasons }: LocationNotForYouProps) {
  if (reasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-navy py-20 text-white">
      <Container className="max-w-3xl">
        <div data-reveal className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
            Straight answers
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            When we are not the right partner in {city}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
            We would rather lose the enquiry than the second month of a project.
            If any of these describe you, say so on the first call and we will
            tell you honestly whether to keep talking.
          </p>
        </div>
        <ul className="mt-10 space-y-4">
          {reasons.map((reason, index) => (
            <li
              key={reason.slice(0, 48)}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-white/5 p-6 text-sm leading-6 text-white/80 ring-1 ring-white/10"
            >
              {reason}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
