import { agentDevelopmentMarkets } from "@/lib/agent-development";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getLocalBusinessJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/site";
import { AgentDeliveryStages } from "@/components/agent/AgentDeliveryStages";
import { AgentFaq } from "@/components/agent/AgentFaq";
import { AgentHero } from "@/components/agent/AgentHero";
import { AgentLimits } from "@/components/agent/AgentLimits";
import { AgentMarketLinks } from "@/components/agent/AgentMarketLinks";
import { AgentPrinciples } from "@/components/agent/AgentPrinciples";
import { PricingBands } from "@/components/pricing/PricingBands";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LAST_REVIEWED = "2026-09-03";

export const metadata = createPageMetadata({
  title: "AI Agent Development",
  description:
    "AI agent development by VLIRTZ. We build one workflow at a time, on your real data, with human review gates, an evaluation set you keep, and the code in your own repository.",
  path: "/services/ai-agent-development",
  keywords: [
    "AI agent development",
    "AI agent development services",
    "build an AI agent",
    "custom AI agents",
    "agentic AI development",
    "AI agent development company",
  ],
  dateModified: LAST_REVIEWED,
});

/**
 * Service hub for AI agent development, targeting the head term.
 *
 * Deliberately about method rather than markets: what an agent is, how we
 * build one, what it will not do, and what it costs. The market pages
 * beneath it carry the city-specific use cases, so the hub and its children
 * answer different questions instead of competing.
 */
const hubFaq = [
  {
    question: "What is an AI agent, as opposed to a chatbot?",
    answer:
      "A chatbot answers. An agent acts. It reads your sources of truth, plans across several steps, calls the tools it needs, and either completes the task or hands a human a decision with the context already assembled. The interesting engineering is in the tool use and the guardrails, not in the conversation.",
  },
  {
    question: "How long does it take to build an AI agent?",
    answer:
      "Two to four weeks from kickoff to handover for one scoped workflow, with a one-to-two week feasibility review ahead of it if the use case is not settled. Anything quoted at under a week is a demo rather than a system, and an open-ended timeline should worry you.",
  },
  {
    question: "How much does AI agent development cost?",
    answer:
      "A scoped single-workflow build is the usual entry point. What moves the number is how many systems the agent touches, how usable your data already is before anyone cleans it, how expensive a wrong action would be, and whether your team or ours operates it afterwards. Bands and drivers are on the pricing page.",
  },
  {
    question: "Will the agent act autonomously?",
    answer:
      "It starts read-only and draft-first, and anything expensive or awkward to undo stays behind a human approval gate. Autonomy is earned by demonstrating accuracy on your own evaluation set over real volume, not enabled at launch because it demos better. For many workflows draft-and-approve is the permanent right answer and still captures most of the value.",
  },
  {
    question: "Which frameworks and models do you use?",
    answer:
      "We are deliberately not tied to one. Most builds use an orchestration layer such as LangGraph with a hosted model and a vector store for retrieval, but the choice follows your data residency, latency and cost constraints. Retrieval quality affects the result far more than which model sits behind it.",
  },
  {
    question: "What do we own at the end?",
    answer:
      "Code and configuration in your own repository, running on infrastructure you control, plus the evaluation set, the audit logging and a runbook. There is no VLIRTZ platform you have to keep paying for to keep your own workflow running.",
  },
  {
    question: "Do you build one agent or a whole platform?",
    answer:
      "One, first, always. We decline company-wide assistant scopes, because a single workflow that is measured and shipped tells you more about whether this approach works for you than any roadmap, and it is recoverable if the answer turns out to be no. Additional workflows reuse the first one's infrastructure and cost less.",
  },
  {
    question: "How do you prove the agent actually works?",
    answer:
      "We measure the existing workflow before building anything, so there is a baseline. Then we build an evaluation set from your real historical cases, including the ones the agent gets wrong, and report accuracy against known-correct outcomes. Without that set nobody can safely change a prompt or swap a model later.",
  },
];

export default function AgentDevelopmentHubPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "AI Agent Development" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "AI agent development",
          name: "AI Agent Development",
          description:
            "Design and build of AI agents that perceive context, plan across steps, and act in existing tools and workflows, with humans in control of the important decisions.",
          provider: { "@id": `${site.url}/#organization` },
          url: `${site.url}/services/ai-agent-development`,
          areaServed: agentDevelopmentMarkets.map((market) => ({
            "@type": "City",
            name: market.city,
          })),
        }}
      />
      <JsonLd data={getLocalBusinessJsonLd()} />
      <JsonLd data={getFaqJsonLd(hubFaq)} />
      <JsonLd data={getBreadcrumbJsonLd(crumbs)} />

      <Breadcrumbs crumbs={crumbs} />
      <AgentHero
        kicker="AI agent development"
        heading="AI agent development"
        description="We build AI agents that run one real workflow end to end, in the tools your team already uses, with a human on every decision that is expensive to undo."
        angle="Most agent projects fail on context rather than capability. So we measure your workflow as it actually runs before we build anything, and the first working thing you see runs on your own messiest records."
      />

      <section className="bg-white pb-20">
        <Container className="max-w-3xl">
          <div data-reveal className="space-y-14">
            <article>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                What an AI agent actually is
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                <p>
                  A chatbot answers questions. An agent does work. It reads the
                  systems that hold the truth about a case, plans across several
                  steps, calls the tools it needs, and either finishes the task
                  or hands a person a decision with the evidence already
                  gathered.
                </p>
                <p>
                  That distinction matters because it moves where the difficulty
                  sits. Nobody struggles to make a model produce fluent text. The
                  hard parts are getting the right context in front of it
                  reliably, giving it tools that fail safely, and knowing when it
                  is wrong. Almost all of the engineering on a real agent build
                  goes into those three things rather than into the model.
                </p>
                <p>
                  It also changes the risk. An agent that can act can act wrongly,
                  which is why every build we do starts read-only and draft-first,
                  and why the boundary between what it may do alone and what needs
                  a human is a design decision made at the start rather than a
                  setting adjusted later.
                </p>
              </div>
            </article>

            <article>
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">
                One workflow, not a platform
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                <p>
                  The most common request we decline is the company-wide
                  assistant. It sounds like a pilot and behaves like a platform
                  commitment: broad scope, no measurable baseline, and no honest
                  way to tell whether it worked.
                </p>
                <p>
                  A single workflow gives you the opposite. We can measure how
                  long it takes today, how many cases run through it, and where it
                  stalls. Four weeks later we can tell you whether the agent
                  handles those cases more consistently than the process it
                  replaced, using your own historical records as the test. If the
                  answer is no, you have spent one scoped build rather than a
                  transformation budget.
                </p>
                <p>
                  Once one workflow is in production, the second and third cost
                  less, because the orchestration, retrieval and evaluation
                  harness already exist. That is the order that gets companies to
                  three working agents. Starting with three rarely gets them to
                  one.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <AgentDeliveryStages />
      <AgentPrinciples />
      <AgentLimits />

      <section className="bg-white py-20">
        <Container className="max-w-3xl">
          <div data-reveal>
            <SectionHeading
              eyebrow="Adjacent services"
              title="When an agent is not the right first step"
              description="Sometimes the honest answer is that you need a decision made or a pipeline filled before anything gets built."
            />
            <div className="mt-8 space-y-4 text-base leading-7 text-muted">
              <p>
                If the harder question is which use case is worth doing at all,
                our AI consulting sequence produces the architecture and rollout
                plan your own engineers implement, without a build attached.
              </p>
              <p>
                If the problem is a pipeline rather than a workflow, AI lead
                generation identifies and scores prospects from public and
                first-party signals so sales time goes to people who are
                genuinely interested.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PricingBands
        title="What AI agent development costs"
        currency="EUR"
        bands={[
          {
            name: "Agent feasibility review",
            scope:
              "We measure the workflow, assess whether your data supports it, and tell you whether an agent is the right answer. Includes a scoped build proposal.",
            amount: "EUR 2,000-4,000",
            timeline: "1 to 2 weeks",
          },
          {
            name: "Scoped agent build",
            scope:
              "One workflow end to end, integrated with your tools, human review gates, evaluation set, audit logging, runbook and handover.",
            amount: "EUR 12,000-30,000",
            timeline: "2 to 4 weeks",
          },
          {
            name: "Additional workflow",
            scope:
              "A second or third agent reusing the orchestration, retrieval and evaluation harness from the first.",
            amount: "EUR 8,000-20,000",
            timeline: "2 to 3 weeks each",
          },
          {
            name: "Sustain retainer",
            scope:
              "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
            amount: "EUR 900-2,500 per month",
            timeline: "Rolling",
          },
        ]}
      />

      <AgentMarketLinks />
      <AgentFaq
        title="Questions we get about AI agent development"
        items={hubFaq}
        relatedPostSlugs={["ai-agent-development"]}
        dateModified={LAST_REVIEWED}
      />
    </>
  );
}
