import type { PricingBand } from "@/lib/locations";
import { displayAmount, PRICING_CONFIRMED } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PricingBandsProps = {
  title: string;
  currency: string;
  bands: PricingBand[];
  /** Set false on the pricing page itself, where the link would be circular. */
  showPricingLink?: boolean;
};

/**
 * Renders indicative engagement bands in a given currency.
 *
 * Shared by the market pages, the agent-development pages and the pricing
 * page, so the numbers and their framing can never drift apart.
 *
 * Published pricing is the strongest signal the page-1 competitors have that
 * VLIRTZ did not: the top two results for "ai agent development amsterdam"
 * are both pricing pages. See `docs/seo-baseline.md`.
 *
 * Amounts pass through `displayAmount`, so while pricing is unconfirmed the
 * scope and timeline copy still renders but each amount shows "On request".
 * That keeps the structural SEO value without publishing a number nobody
 * approved. See `src/lib/pricing.ts`.
 */
export function PricingBands({
  title,
  currency,
  bands,
  showPricingLink = true,
}: PricingBandsProps) {
  if (bands.length === 0) {
    return null;
  }

  const description = PRICING_CONFIRMED
    ? `Indicative bands in ${currency}, excluding VAT. Where you land depends on how many systems the agent touches, how usable your data already is, and how expensive a wrong action would be.`
    : `We quote in ${currency} for this market. Where you land depends on how many systems the agent touches, how usable your data already is, and how expensive a wrong action would be. Ask and you get a range on the first call, not the third.`;

  return (
    <section className="bg-white py-20">
      <Container className="max-w-4xl">
        <div data-reveal>
          <SectionHeading eyebrow="Pricing" title={title} description={description} />
        </div>

        <div className="mt-10 space-y-4">
          {bands.map((band, index) => (
            <article
              key={band.name}
              data-reveal
              data-delay={String(index % 3)}
              className="rounded-3xl bg-fog p-6 ring-1 ring-line sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-lg font-semibold text-navy">{band.name}</h3>
                <p className="text-lg font-semibold text-indigo">
                  {displayAmount(band.amount)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{band.scope}</p>
              <p className="mt-3 text-sm font-medium text-navy">
                Timeline:{" "}
                <span className="font-normal text-muted">{band.timeline}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {showPricingLink ? (
            <Button href="/pricing" variant="secondary">
              Full pricing breakdown
            </Button>
          ) : null}
          <Button href="/contact">Get a range for your workflow</Button>
        </div>
      </Container>
    </section>
  );
}
