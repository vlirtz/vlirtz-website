/**
 * Pricing disclosure for the /pricing page and the per-market price bands.
 *
 * WHY THIS FILE HAS A FLAG
 * ------------------------
 * Published pricing is the single strongest ranking and conversion signal the
 * page-1 competitors have that VLIRTZ does not. In the September 2026 SERP
 * review, the top two results for "ai agent development amsterdam" were both
 * pricing pages, and the leading Copenhagen result published a full band from
 * discovery to platform build. See `docs/seo-baseline.md`.
 *
 * The amounts below are DRAFTS derived from the engagement shapes already
 * described on the site (a scoped two-to-four week build, a four-week
 * consulting sequence). They have not been confirmed by the founder, and
 * publishing a price nobody agreed to is worse than publishing none.
 *
 * So the numbers are gated. While `PRICING_CONFIRMED` is false, every page
 * renders the engagement structure, what is included, and what drives cost,
 * but shows `PRICE_ON_REQUEST` instead of an amount. That keeps almost all of
 * the SEO value (the structure and the process copy are the bulk of the text)
 * without asserting a number.
 *
 * TO PUBLISH PRICES: review every `amount` in this file and in each market
 * file under `src/lib/locations/`, correct them, then set the flag to true.
 */

/**
 * Set to true only after the amounts in this file and in every market file
 * under `src/lib/locations/` have been reviewed and approved.
 */
export const PRICING_CONFIRMED = false;

/** Shown in place of an amount while pricing is unconfirmed. */
export const PRICE_ON_REQUEST = "On request";

/**
 * Resolves an indicative amount for display, respecting the confirmation gate.
 *
 * @param amount - The draft amount from a market or engagement definition.
 * @returns The amount when pricing is confirmed, otherwise "On request".
 */
export function displayAmount(amount: string): string {
  return PRICING_CONFIRMED ? amount : PRICE_ON_REQUEST;
}

/** A sitewide engagement model, priced in EUR as the reference currency. */
export type Engagement = {
  slug: string;
  name: string;
  /** Who this shape is the right answer for. */
  bestFor: string;
  amount: string;
  timeline: string;
  /** Concrete deliverables. */
  includes: string[];
  /** Scope boundaries, stated plainly so the band means something. */
  excludes: string[];
};

export const engagements: Engagement[] = [
  {
    slug: "discovery",
    name: "AI opportunity review",
    bestFor:
      "Teams with several candidate use cases and no agreed order of work. Ends in a written recommendation, including a recommendation not to build where that is the honest answer.",
    amount: "EUR 2,000-4,000",
    timeline: "1 to 2 weeks",
    includes: [
      "Workshops with the people who own the workflow",
      "Volume and handling-time measurement on the real process, not an estimate",
      "Candidate use cases ranked by payback and delivery risk",
      "A written recommendation with a scoped first build",
    ],
    excludes: [
      "Any production code",
      "Access to your production systems",
      "Vendor or model procurement on your behalf",
    ],
  },
  {
    slug: "scoped-agent-build",
    name: "Scoped agent build",
    bestFor:
      "One well-understood workflow that a human runs today and that needs to run consistently. This is most of our work.",
    amount: "EUR 12,000-30,000",
    timeline: "2 to 4 weeks",
    includes: [
      "One AI agent running one workflow end to end",
      "Integration with the tools that workflow already touches",
      "Human review gates on every action that is expensive to undo",
      "An evaluation set built from your real cases, including the failures",
      "Runbook and handover so your team can operate it without us",
    ],
    excludes: [
      "A second workflow, which is scoped separately",
      "Data cleanup where source records are unusable",
      "Ongoing operation, which is a separate retainer",
    ],
  },
  {
    slug: "consulting-sequence",
    name: "AI consulting sequence",
    bestFor:
      "Organisations that need an architecture and rollout plan their own engineers will implement, rather than a delivery partner.",
    amount: "EUR 8,000-18,000",
    timeline: "4 weeks",
    includes: [
      "Target architecture with the build-versus-buy calls made explicit",
      "Data residency and processor mapping against your regulator",
      "A rollout sequence with a measurable checkpoint per stage",
      "Working sessions with your engineers, not a handover deck",
    ],
    excludes: [
      "Implementation, though we can quote it separately",
      "Ongoing architecture governance",
    ],
  },
  {
    slug: "platform-build",
    name: "Multi-workflow build",
    bestFor:
      "Companies that have already put one agent into production with us and want the next three, sharing evaluation and observability.",
    amount: "From EUR 45,000",
    timeline: "3 months and up",
    includes: [
      "Several agents on shared orchestration and retrieval",
      "Shared evaluation harness and observability",
      "Role-based permissions and audit logging",
      "Staged rollout with a rollback path at each stage",
    ],
    excludes: [
      "An open-ended retainer with no defined outcome",
      "Work we have not scoped against a measured baseline",
    ],
  },
  {
    slug: "sustain",
    name: "Sustain retainer",
    bestFor:
      "Systems already in production that need model updates, drift monitoring, and someone on the hook when something breaks.",
    amount: "EUR 900-2,500 per month",
    timeline: "Rolling, 30 days notice",
    includes: [
      "Monitoring, drift checks, and model or prompt updates",
      "Defined response time on failures",
      "A monthly note on what changed and what it cost",
    ],
    excludes: [
      "New workflows or new integrations",
      "Unlimited feature development",
    ],
  },
];

/**
 * What actually moves a quote inside a band. Published because a range with
 * no explanation reads as a guess, and because these are the questions we
 * would ask on a first call anyway.
 */
export const costDrivers = [
  {
    driver: "Number of systems the agent touches",
    detail:
      "One system is straightforward. A workflow spanning a CRM, a mailbox, and a database costs more in integration and error handling than it does in model work.",
  },
  {
    driver: "How usable your data already is",
    detail:
      "Retrieval on clean, well-structured documents is cheap. Retrieval over scanned PDFs, inconsistent record structures, or three competing sources of truth is where budgets actually go.",
  },
  {
    driver: "Cost of a wrong action",
    detail:
      "An agent that drafts a reply for a human to approve needs far less guardrail engineering than one that issues a refund or files a regulatory return.",
  },
  {
    driver: "Regulatory scope",
    detail:
      "Work under FINMA, Finansinspektionen, or medical-device rules carries documentation and audit obligations that are real engineering effort, not paperwork added at the end.",
  },
  {
    driver: "Who operates it afterwards",
    detail:
      "If your team takes over, we spend more on runbooks and evaluation tooling up front. If we sustain it, that shifts into the retainer instead.",
  },
];

/**
 * Ongoing running cost, separated from build cost because buyers routinely
 * conflate the two and then get surprised by the second invoice.
 */
export const runningCosts = [
  {
    item: "Model and API usage",
    detail:
      "Typically the smallest line. A single-workflow agent at moderate volume usually runs tens of euros per month, not hundreds.",
  },
  {
    item: "Hosting and vector storage",
    detail:
      "Usually a low fixed cost, and often absorbed into infrastructure you already pay for.",
  },
  {
    item: "Maintenance",
    detail:
      "The real recurring cost. Models change, your source systems change, and an agent nobody maintains degrades quietly rather than failing loudly.",
  },
];
