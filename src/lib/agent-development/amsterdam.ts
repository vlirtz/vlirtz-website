import type { AgentDevelopmentMarket } from "./types";

/** AI agent development for Amsterdam, delivered remotely from Stockholm. */
export const amsterdam: AgentDevelopmentMarket = {
  slug: "amsterdam",
  city: "Amsterdam",
  country: "Netherlands",
  metaTitle: "AI Agent Development in Amsterdam",
  metaDescription:
    "AI agent development for Amsterdam companies by VLIRTZ. Working prototype on your real data in week one, published price bands, GDPR-native, WBSO-compatible documentation.",
  keywords: [
    "AI agent development Amsterdam",
    "AI agents Amsterdam",
    "build AI agent Netherlands",
    "AI agent developer Amsterdam",
    "AI agent development cost Netherlands",
  ],
  heroKicker: "Built for the Netherlands, from Stockholm",
  heroHeading: "AI agent development in Amsterdam",
  heroDescription:
    "We build AI agents that run one real workflow end to end. Something working on your own data in the first week or two, published price bands, and a human on every action that moves money.",
  marketAngle:
    "Dutch operators want to see it working before they will discuss a roadmap, and they ask the price in the first ten minutes. Both instincts are right, so we publish the bands and build the prototype first.",
  useCases: [
    {
      title: "Reconciliation and dispute handling",
      sector: "Fintech and payments",
      body: "High-volume ledger mismatches and chargeback cases where resolution means checking several systems. The agent assembles context and proposes the resolution. Anything moving funds stays behind human approval, because a wrong action here costs money directly.",
    },
    {
      title: "Merchant onboarding checks",
      sector: "Fintech and payments",
      body: "Register lookups, document collection and the sanity checks a compliance analyst runs before approval. The agent gathers and cross-references, then hands over a complete file with discrepancies flagged.",
    },
    {
      title: "Freight document extraction",
      sector: "Logistics and supply chain",
      body: "Customs paperwork, manifests and delivery exceptions across formats never designed to be machine-readable. Retrieval quality decides the outcome here rather than reasoning ability, and we scope it on that basis.",
    },
    {
      title: "Support and sales-ops triage",
      sector: "Scale-ups",
      body: "The classic scale-up bottleneck: a small team drowning in requests that each need a lookup before they can be answered. Narrow, measurable, painful enough that people actually adopt the result, which makes it a good first project.",
    },
    {
      title: "Listing and content moderation queues",
      sector: "Marketplaces",
      body: "Policy checks at volume where most cases are clear and the edge cases matter. The agent handles the clear ones and routes the rest with the policy citation attached. Anything affecting a user's access to the platform keeps a human in the loop.",
    },
  ],
  sections: [
    {
      heading: "Prototype in week one, roadmap last",
      body: [
        "Dutch clients have been unusually direct with us about wanting to see something work before discussing strategy, and it has shaped how we sequence a build. The first deliverable runs on your data, including the messy records. Not a demo on a curated sample.",
        "The reason is not showmanship. A prototype on real data is the fastest way to find out that thirty percent of your source records are missing a field the workflow depends on, or that the process everyone described has three undocumented exceptions. That discovery is worth more than any strategy document, and it arrives in week one rather than month three.",
        "Only after that do we close the agent loop, and only after that discuss a roadmap. Roadmaps written before anyone has touched the data are fiction, and Amsterdam operators seem to spot that faster than most markets.",
      ],
    },
    {
      heading: "What it costs, and what moves the number",
      body: [
        "We publish bands rather than making you extract them over three calls. The vendors Dutch buyers actually find in search publish their numbers, and treating price as a secret mostly wastes the time of people who were never going to fit the budget anyway.",
        "What moves a quote inside a band: how many systems the agent has to touch, how usable your data already is before anyone cleans it, how expensive a wrong action would be, and whether your team or ours operates it afterwards. A range quoted without those drivers is a guess dressed as an estimate.",
        "We also separate build cost from running cost, because they get conflated and the second one causes the surprises. Model and API usage is usually the smallest line. Maintenance is the real recurring cost, since models change, your source systems change, and an unmaintained agent degrades quietly rather than failing loudly.",
      ],
    },
    {
      heading: "WBSO, and why the documentation matters",
      body: [
        "Development work with genuine technical uncertainty often qualifies for the Dutch WBSO R&D tax credit, which materially lowers the net cost of a build. Agent work frequently involves exactly that kind of uncertainty, particularly around retrieval quality and evaluation on messy real-world data.",
        "We structure our engineering documentation so the work is legible to a WBSO application: what was uncertain at the outset, what was attempted, what was measured, and what was concluded. That is documentation worth having regardless, because it is also what lets someone change the system safely a year later.",
        "To be clear about the boundary: we are not tax advisors and we do not assess eligibility or file on your behalf. Your own advisor does that. What we can do is make sure the engineering record supports the claim rather than working against it.",
      ],
    },
  ],
  currency: "EUR",
  pricingBands: [
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
  ],
  faq: [
    {
      question: "How much does AI agent development cost in Amsterdam?",
      answer:
        "We publish bands rather than making you ask three times. A scoped single-workflow build is the usual entry point, with a shorter feasibility review ahead of it if the use case is not settled. What moves the number is systems touched, data usability, cost of a wrong action, and who operates it afterwards. Full breakdown on the pricing page.",
    },
    {
      question: "How quickly will we see something working?",
      answer:
        "The first deliverable runs on your own data, including the messy records, usually inside the first week or two. That is deliberate. A prototype on real data surfaces the missing fields and undocumented exceptions that would otherwise derail the project in month three.",
    },
    {
      question: "How long does the whole build take?",
      answer:
        "Two to four weeks from kickoff to handover for a scoped single-workflow agent. Anything quoted at under a week is a demo rather than a system, and anything open-ended should worry you.",
    },
    {
      question: "Does our agent project qualify for WBSO?",
      answer:
        "Development with genuine technical uncertainty often does, and agent work frequently involves exactly that around retrieval quality and evaluation on messy data. We structure the engineering documentation so the work is legible to an application, but your own tax advisor assesses eligibility and files it. We are not tax advisors.",
    },
    {
      question: "Will the agent act on its own?",
      answer:
        "It starts read-only and draft-first, and anything expensive to undo stays behind human approval. For Dutch fintech work in particular, anything that moves funds keeps a human gate permanently. Autonomy is earned on your evaluation set over real volume, not switched on at launch.",
    },
    {
      question: "What about the AP and automated decisions?",
      answer:
        "It matters if your workflow ranks, scores or filters people. The Dutch authority has been among Europe's more assertive on automated risk scoring, so anything touching hiring, credit or access to services needs deliberate classification and a documented human review step rather than an assumption that it is low risk.",
    },
    {
      question: "Which frameworks and models do you use?",
      answer:
        "We are not tied to one. Most builds use an orchestration layer such as LangGraph with a hosted model and a vector store for retrieval, but the choice follows your data residency and latency constraints. Retrieval quality affects the outcome more than which model sits behind it, which is where the engineering effort actually belongs.",
    },
    {
      question: "What do we own at the end?",
      answer:
        "Code and configuration in your own repository, running on infrastructure you control, plus the evaluation set, the audit logging and a runbook. There is no platform of ours you have to keep paying for.",
    },
    {
      question: "Do you have an office in Amsterdam?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Dutch clients remotely, travelling for kickoff and key milestones. There is no time difference at all, so the working day overlaps completely.",
    },
  ],
  relatedPostSlugs: [
    "ai-agent-development",
    "ai-agent-development-cost",
    "choosing-an-ai-agency",
  ],
  dateModified: "2026-09-03",
};
