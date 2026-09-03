import Link from "next/link";
import { locations } from "@/lib/locations";
import { PRICING_CONFIRMED } from "@/lib/pricing";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
} from "@/lib/seo";
import { CostDrivers } from "@/components/pricing/CostDrivers";
import { EngagementList } from "@/components/pricing/EngagementList";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LAST_REVIEWED = "2026-09-03";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "What AI agent development, AI consulting and AI lead generation cost at VLIRTZ. Engagement bands, what is included, what moves a quote, and running cost separated from build cost.",
  path: "/pricing",
  keywords: [
    "AI agent development cost",
    "AI agent development price",
    "AI consulting cost",
    "AI agency pricing",
    "how much does an AI agent cost",
  ],
  dateModified: LAST_REVIEWED,
});

const pricingFaq = [
  {
    question: "How much does it cost to build an AI agent?",
    answer:
      "A scoped single-workflow build is the usual entry point, with a shorter feasibility review ahead of it when the use case is not yet settled. What moves the number is how many systems the agent touches, how usable your data already is before anyone cleans it, how expensive a wrong action would be, and whether your team or ours operates it afterwards.",
  },
  {
    question: "Why publish ranges instead of a fixed price?",
    answer:
      "Because a fixed price quoted before anyone has looked at your data is either padded to cover the worst case or about to be revised. The ranges here are real, and the drivers that determine where you land inside them are published alongside so you can estimate before speaking to us.",
  },
  {
    question: "Do you charge hourly?",
    answer:
      "Not by preference. Scoped engagements with a defined outcome align our incentives with yours better than an hourly rate, which rewards us for taking longer. For genuinely open-ended advisory work we will agree a day rate, but we will usually suggest a scoped alternative first.",
  },
  {
    question: "What is not included in a build?",
    answer:
      "A second workflow is scoped separately. Data cleanup where the source records are unusable is a separate project, and we will say so during discovery rather than absorbing it silently. Ongoing operation is a retainer you choose rather than something bundled in.",
  },
  {
    question: "What does it cost to run once it is built?",
    answer:
      "Model and API usage is usually the smallest line, often tens of euros a month for a single-workflow agent at moderate volume. Hosting and vector storage is typically a low fixed cost. Maintenance is the real recurring expense, because models and your source systems both change, and an unmaintained agent degrades quietly rather than failing loudly.",
  },
  {
    question: "Will you tell us not to build something?",
    answer:
      "Yes, and it has happened. If discovery shows the source data cannot support the workflow, or that the useful deliverable is a documented process rather than software, that is the recommendation you get. It is a worse outcome for our invoice and a better one for your budget.",
  },
  {
    question: "Do you quote in local currency?",
    answer:
      "Yes. Each market page carries the same engagements priced in that market's currency: SEK for Stockholm, DKK for Copenhagen, CHF for Zurich, EUR for Amsterdam and the wider EU, and AED for Dubai. Amounts exclude VAT.",
  },
  {
    question: "Is there a minimum engagement?",
    answer:
      "In practice the feasibility review is the smallest thing worth buying from us. Below that there is not enough time to measure the workflow properly, and a recommendation made without measurement is the thing we are trying to avoid selling.",
  },
];

/**
 * Pricing page.
 *
 * The highest-leverage single page in the SEO plan: in the September 2026
 * SERP review the top two results for "ai agent development amsterdam" were
 * both pricing pages, and the leading Copenhagen result published a full
 * band from discovery to platform build. See `docs/seo-baseline.md`.
 *
 * Amounts are gated behind `PRICING_CONFIRMED` so the structure ships
 * without asserting numbers nobody has approved. See `src/lib/pricing.ts`.
 */
export default function PricingPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Pricing" }];

  return (
    <>
      <JsonLd data={getFaqJsonLd(pricingFaq)} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="bg-white py-16 lg:py-20">
        <Container className="reveal-load mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
            Pricing
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
            What this costs
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Most agencies make you extract this over three calls. Here are the
            shapes of work we sell, what each one includes, what it excludes,
            and what moves a quote inside a range.
          </p>
          {PRICING_CONFIRMED ? null : (
            <p className="mt-6 rounded-3xl bg-fog p-5 text-sm leading-6 text-muted ring-1 ring-line">
              We are finalising published amounts for each engagement. In the
              meantime the scope, timeline and cost drivers below are accurate,
              and you will get a real range on the first call rather than the
              third.
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Get a range for your workflow</Button>
            <Button href="/services/ai-agent-development" variant="secondary">
              How we build
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Container className="max-w-3xl">
          <div data-reveal className="space-y-14">
            <article>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                How we price, and why
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                <p>
                  We sell scoped engagements with a defined outcome rather than
                  hours. An hourly rate pays us for taking longer, which is the
                  wrong incentive on work where the goal is a system that runs
                  without us.
                </p>
                <p>
                  Every band on this page is a range rather than a fixed number,
                  because a fixed price quoted before anyone has looked at your
                  data is either padded to cover the worst case or about to be
                  revised. What we publish instead are the drivers that decide
                  where inside the range you land, so you can estimate yourself
                  before speaking to us.
                </p>
                <p>
                  Build cost and running cost are separated deliberately. They
                  get conflated constantly, and the second one is where people
                  are surprised.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <EngagementList />
      <CostDrivers />

      <section className="bg-fog py-20">
        <Container className="max-w-3xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="By market"
              title="The same engagements in your currency"
              description="Each market page prices this catalogue locally, alongside the regulators and sectors specific to that market."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="flex items-baseline justify-between rounded-2xl bg-white px-5 py-4 text-sm ring-1 ring-line transition-transform hover:-translate-y-0.5"
                  >
                    <span className="font-medium text-navy">{location.city}</span>
                    <span className="text-muted">{location.currency}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div data-reveal>
            <SectionHeading eyebrow="FAQ" title="Questions about pricing" />
          </div>
          <dl className="mt-10 space-y-6">
            {pricingFaq.map((item, index) => (
              <div
                key={item.question}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-fog p-6 ring-1 ring-line"
              >
                <dt className="text-lg font-semibold text-navy">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-xs text-muted">
            This page was last reviewed on{" "}
            <time dateTime={LAST_REVIEWED}>3 September 2026</time>.
          </p>
        </Container>
      </section>
    </>
  );
}
