import type { AgentDevelopmentMarket } from "./types";

/** AI agent development in Stockholm, the one market where we are local. */
export const stockholm: AgentDevelopmentMarket = {
  slug: "stockholm",
  city: "Stockholm",
  country: "Sweden",
  metaTitle: "AI Agent Development in Stockholm",
  metaDescription:
    "AI agent development in Stockholm by VLIRTZ. We build one workflow at a time, on your real data, with human review gates and an evaluation set you keep. On-site workshops as the default.",
  keywords: [
    "AI agent development Stockholm",
    "AI agents Stockholm",
    "build AI agent Stockholm",
    "AI agent developer Stockholm",
    "autonomous AI agents Sweden",
  ],
  heroKicker: "Built from Stockholms lan",
  heroHeading: "AI agent development in Stockholm",
  heroDescription:
    "We build AI agents that run one real workflow end to end, in the tools your team already uses, with a human on every decision that is expensive to undo. Based in Stockholms lan, so the workshops happen in your office.",
  marketAngle:
    "Stockholm buyers have usually seen an agent demo that worked on curated data and failed on theirs. We start by measuring your workflow as it actually runs, then build the thin version on your messiest records first.",
  useCases: [
    {
      title: "Reconciliation exception handling",
      sector: "Fintech and payments",
      body: "High-volume ledgers throw a steady stream of mismatches that a person resolves by checking three systems. The agent assembles that context, proposes the resolution, and applies it where the pattern is unambiguous. Anything that moves funds stays behind human approval.",
    },
    {
      title: "Merchant and customer onboarding checks",
      sector: "Fintech and payments",
      body: "Document collection, register lookups, and the sanity checks a compliance analyst performs before approving an account. The agent gathers and cross-references, then hands a complete file to the analyst with the discrepancies flagged rather than buried.",
    },
    {
      title: "Support ticket triage with lookup",
      sector: "Consumer software and gaming",
      body: "Most tickets need someone to check an account state, an order, or a log before answering. The agent does that lookup, drafts the reply, and routes anything unusual to a human with the evidence already attached.",
    },
    {
      title: "Logistics exception triage",
      sector: "Logistics and e-commerce",
      body: "Shipment and inventory exceptions where one experienced person is both the bottleneck and the single point of failure. The agent handles the cases where their judgement is genuinely a rule, and escalates the rest with the context assembled.",
    },
    {
      title: "Inbound lead qualification",
      sector: "Professional services",
      body: "Enrich an inbound enquiry from public sources, score it against what a good client actually looks like for you, and draft a first response. Sales time goes to the enquiries worth a call.",
    },
  ],
  sections: [
    {
      heading: "Why we build the thin version before the agent",
      body: [
        "The first working thing we hand a Stockholm client is usually not an agent. It is a narrow tool that does one step of the workflow on their real data, including the records with missing fields and inconsistent formatting.",
        "This is not caution, it is speed. A prototype on real data is the fastest available way to find out that a third of the source rows are missing something the process depends on, or that the workflow everyone described has three undocumented exceptions. Discovering that in the first week changes what we build. Discovering it in month three means rebuilding.",
        "It also gives you an early, cheap exit. If the thin version shows the data is not usable, you have spent days rather than a full build budget, and the honest recommendation is a data project first. We have made that recommendation and we would rather make it than deliver something that quietly underperforms.",
      ],
    },
    {
      heading: "Where the human stays, and why that is a design decision",
      body: [
        "Every agent we build starts read-only and draft-first. It reads the sources of truth, proposes an action, and a person approves it. Actions that are expensive or awkward to reverse stay behind that gate permanently if that is the right answer for the workflow.",
        "Autonomy is something a system earns by demonstrating accuracy on your own evaluation set, over real volume, not something switched on at launch because it demos better. In Swedish fintech and payments work this is rarely controversial, because the cost of a wrong action is obvious and Finansinspektionen's expectations around reversibility point the same way.",
        "The practical consequence is that a draft-and-approve agent is far easier to make genuinely reliable than an autonomous one, and it captures most of the time saving. The bottleneck in these workflows is almost always the lookup and assembly, not the final click.",
      ],
    },
    {
      heading: "What being in Stockholms lan changes about the build",
      body: [
        "Agent projects fail on context far more often than on capability. The engineer does not know that the finance team ignores one field because it has been wrong since a 2019 migration, or that the exception queue is actually triaged by someone in a different department. That knowledge does not survive a written brief.",
        "Because we are based in Stockholms lan, the observation session where that surfaces is the default rather than a line item cut for budget. Kickoff, mid-build review and handover training happen in your office. Workshops can run in Swedish; delivery documentation stays in English by default because it tends to outlive team changes.",
        "For Stockholm clients this is the concrete argument for hiring locally over hiring remotely, and it is the one part of our offer that a remote competitor genuinely cannot match.",
      ],
    },
  ],
  currency: "SEK",
  pricingBands: [
    {
      name: "Agent feasibility review",
      scope:
        "We measure the workflow, assess whether your data supports it, and tell you whether an agent is the right answer. Includes a scoped build proposal.",
      amount: "SEK 22,000-45,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow end to end, integrated with your tools, human review gates, evaluation set, audit logging, runbook and handover.",
      amount: "SEK 135,000-340,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "Additional workflow",
      scope:
        "A second or third agent reusing the orchestration, retrieval and evaluation harness from the first.",
      amount: "SEK 90,000-225,000",
      timeline: "2 to 3 weeks each",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "SEK 10,000-28,000 per month",
      timeline: "Rolling",
    },
  ],
  faq: [
    {
      question: "How long does it take to build an AI agent?",
      answer:
        "A scoped single-workflow agent is typically two to four weeks from kickoff to handover, with a feasibility review of one to two weeks ahead of it if the use case is not settled. Anything quoted at under a week is a demo, and anything open-ended is a warning sign.",
    },
    {
      question: "How much does AI agent development cost in Stockholm?",
      answer:
        "A scoped build is the usual entry point. What moves the number is how many systems the agent touches, how usable your data already is, how expensive a wrong action would be, and whether your team or ours operates it afterwards. Our pricing page publishes the bands and the drivers.",
    },
    {
      question: "Will the agent act on its own or ask permission?",
      answer:
        "It starts read-only and draft-first, and anything expensive to undo stays behind human approval. Autonomy is earned by demonstrating accuracy on your evaluation set over real volume, not enabled at launch. For many workflows draft-and-approve is the permanent right answer, and it still captures most of the time saving.",
    },
    {
      question: "What do we actually own at the end?",
      answer:
        "The code and configuration in your own repository, running on infrastructure you control, plus the evaluation set, the audit logging and a runbook. There is no VLIRTZ platform you have to keep paying for to keep your workflow running.",
    },
    {
      question: "Which frameworks and models do you use?",
      answer:
        "We are deliberately not tied to one. Most builds use an orchestration layer such as LangGraph with a hosted model, and a vector store for retrieval, but the choice follows your data residency and latency constraints rather than our preference. Retrieval quality matters more to the outcome than which model sits behind it.",
    },
    {
      question: "Do you work on-site in Stockholm?",
      answer:
        "Yes, and it is the default rather than an exception. We are based in Stockholms lan, so the observation sessions, kickoff and handover training happen in your office. That is where the undocumented exceptions surface, and they rarely surface over video.",
    },
    {
      question: "Can you build agents that work in Swedish?",
      answer:
        "Yes. Handling Swedish-language input and output is straightforward, and workshops can run in Swedish. Delivery documentation is in English by default because it tends to survive team changes, but we will write it in Swedish if you prefer.",
    },
    {
      question: "What if the agent gets something wrong?",
      answer:
        "It will, and the design question is whether mistakes are caught before they cost anything. That is what the review gates, the evaluation set built from your real failures, and the audit log on every tool call are for. We measure the baseline first so you can tell whether the finished system is actually better than the process it replaced.",
    },
    {
      question: "Do we need an AI strategy first?",
      answer:
        "No, and most Stockholm clients do not have one. A specific workflow that costs you time or revenue is a better starting point than a strategy document, because it gives the first build something measurable to aim at.",
    },
  ],
  relatedPostSlugs: [
    "ai-agent-development",
    "hiring-an-ai-agency-stockholm",
    "ai-agent-development-cost",
  ],
  dateModified: "2026-09-03",
};
