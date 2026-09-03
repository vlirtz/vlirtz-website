import { commitments, guardrails, nonClaims } from "@/lib/method";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
} from "@/lib/seo";
import { AgentDeliveryStages } from "@/components/agent/AgentDeliveryStages";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LAST_REVIEWED = "2026-09-03";

export const metadata = createPageMetadata({
  title: "How we work",
  description:
    "The commitments VLIRTZ publishes instead of case-study numbers: how we measure before building, the guardrails on every agent, our data residency policy, and what we explicitly do not claim.",
  path: "/how-we-work",
  keywords: [
    "AI agency methodology",
    "AI agent guardrails",
    "AI project delivery process",
    "GDPR AI data residency",
    "how to choose an AI agency",
  ],
  dateModified: LAST_REVIEWED,
});

const methodFaq = [
  {
    question: "Why do you publish commitments instead of case studies?",
    answer:
      "Because we were founded in late 2025 and do not yet have client outcomes we are permitted to publish. Rather than invent a number or stay silent, we publish exactly how we work and what we will be held to. When real case studies exist they will appear with names or clear anonymisation.",
  },
  {
    question: "How do we verify any of this before hiring you?",
    answer:
      "Ask us to walk through the guardrails against your specific workflow on the first call, and ask what we would refuse to automate in it. A vendor who cannot name anything they would keep behind a human gate has not thought about your risk.",
  },
  {
    question: "What happens if the project does not work?",
    answer:
      "The baseline measurement is what makes that answerable rather than a matter of opinion. If the agent does not beat the process it replaced on your own historical cases, we say so. Because the first engagement is deliberately one scoped workflow, that outcome costs you a scoped build rather than a transformation budget.",
  },
  {
    question: "Do you sign NDAs and work under our processor agreements?",
    answer:
      "Yes to both. NDAs are standard. We would rather work inside your existing data processing agreements than insist on our own paperwork, which is usually faster through procurement anyway.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "VLIRTZ is founder-led and deliberately small, so the person you speak to on the first call is the person building the system. There are no account managers between you and the engineering, and no offshore delivery team you were not told about.",
  },
];

/**
 * Methodology and commitments page: the Path B proof strategy.
 *
 * Every page-1 competitor for our target queries publishes verifiable
 * proof, usually quantified client outcomes. VLIRTZ has none yet and will
 * not fabricate any, so this page competes by publishing the process,
 * the guardrails and the explicit non-claims instead. See `src/lib/method.ts`
 * for the reasoning and `docs/seo-baseline.md` for the competitor analysis.
 */
export default function HowWeWorkPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "How we work" }];

  return (
    <>
      <JsonLd data={getFaqJsonLd(methodFaq)} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />

      <section className="bg-white py-16 lg:py-20">
        <Container className="reveal-load mx-auto max-w-3xl text-center">
          <p className="mx-auto inline-flex rounded-full bg-ice px-4 py-1.5 text-sm font-medium text-indigo">
            How we work
          </p>
          <h1 className="mt-6 text-4xl font-semibold text-navy sm:text-5xl">
            What we commit to, and what we do not claim
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Most agency pages this deep into a site are a list of adjectives.
            This one is a list of things that would be obvious if we failed
            them, plus a plain statement of where we are a younger firm than
            the alternatives.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Talk about a workflow</Button>
            <Button href="/pricing" variant="secondary">
              See pricing
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20">
        <Container className="max-w-3xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="Commitments"
              title="Six things we will be held to"
              description="Each of these is written so that failing it would be visible to you, which is the only kind of commitment worth publishing."
            />
          </div>
          <dl className="mt-10 space-y-4">
            {commitments.map((item, index) => (
              <div
                key={item.title}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-fog p-6 ring-1 ring-line"
              >
                <dt className="text-base font-semibold text-navy">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <AgentDeliveryStages />

      <section className="bg-fog py-20">
        <Container className="max-w-4xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="Guardrails"
              title="What we apply to every agent that can act"
              description="An agent that can take actions can take wrong ones. These are the six controls that go on by default, before anyone asks."
            />
          </div>
          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {guardrails.map((item, index) => (
              <div
                key={item.name}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-white p-6 ring-1 ring-line"
              >
                <dt className="text-base font-semibold text-navy">{item.name}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-navy py-20 text-white">
        <Container className="max-w-3xl">
          <div data-reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
              Straight answers
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              What we do not claim
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg">
              The agencies competing with us for your search publish numbers we
              cannot match yet. Rather than leave you to guess where the gaps
              are, here they are.
            </p>
          </div>
          <dl className="mt-10 space-y-4">
            {nonClaims.map((item, index) => (
              <div
                key={item.claim}
                data-reveal
                data-delay={String(index % 3)}
                className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <dt className="text-base font-semibold">{item.claim}</dt>
                <dd className="mt-2 text-sm leading-6 text-white/75">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div data-reveal>
            <SectionHeading eyebrow="FAQ" title="Questions about how we work" />
          </div>
          <dl className="mt-10 space-y-6">
            {methodFaq.map((item, index) => (
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
