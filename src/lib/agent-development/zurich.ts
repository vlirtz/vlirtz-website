import type { AgentDevelopmentMarket } from "./types";

/** AI agent development for Zurich, delivered remotely from Stockholm. */
export const zurich: AgentDevelopmentMarket = {
  slug: "zurich",
  city: "Zurich",
  country: "Switzerland",
  metaTitle: "AI Agent Development in Zurich",
  metaDescription:
    "AI agent development for Zurich companies by VLIRTZ. Draft-and-approve agents with full audit trails, scoped against revFADP and FINMA expectations before any data moves.",
  keywords: [
    "AI agent development Zurich",
    "AI agents Zurich",
    "build AI agent Switzerland",
    "AI agent developer Zurich",
    "agentic AI Switzerland",
  ],
  heroKicker: "Built for Switzerland, from Stockholm",
  heroHeading: "AI agent development in Zurich",
  heroDescription:
    "We build AI agents for Swiss companies where a wrong action is expensive: draft-and-approve by design, every tool call logged, and the data residency answer written down before anything moves.",
  marketAngle:
    "Swiss buyers have met the vendors who demo well and cannot deploy. In regulated Zurich work the constraint is rarely model capability, it is auditability and reversibility, so that is where our engineering effort goes.",
  useCases: [
    {
      title: "Client documentation drafting",
      sector: "Private banking and wealth management",
      body: "Portfolio commentary, client reporting and research synthesis, drafted by the agent and signed off by a relationship manager. Nothing reaches a client without a human approving it, which is both a regulatory constraint and the design we would choose anyway.",
    },
    {
      title: "Claims file assembly and triage",
      sector: "Insurance and reinsurance",
      body: "The agent gathers the file, cross-references policy terms, flags the discrepancies and ranks the queue. The decision stays with an underwriter, who now receives a complete file instead of assembling one.",
    },
    {
      title: "Submission review support",
      sector: "Reinsurance",
      body: "High-volume submission intake where most cases follow the pattern and the exceptions genuinely need judgement. The agent handles the assembly and the pattern-matching; the exceptions escalate with context attached.",
    },
    {
      title: "Regulated documentation workflows",
      sector: "Pharma and med-tech",
      body: "Documentation review against internal standards and applicable requirements. The EU AI Act classification question is real here, because a workflow touching clinical or safety data can sit a tier higher than assumed, so we resolve it at scoping.",
    },
    {
      title: "Internal research synthesis",
      sector: "Commodities trading",
      body: "Pulling together market and counterparty information from internal and licensed sources into a briefing, with every claim traceable back to its source document rather than asserted by the model.",
    },
  ],
  sections: [
    {
      heading: "Draft-and-approve is not a limitation here, it is the architecture",
      body: [
        "In most Zurich engagements the client tells us early that nothing may reach a customer, a regulator or a ledger without a human signing it off. Vendors sometimes treat that as a constraint to be negotiated down. We treat it as a gift.",
        "A draft-and-approve agent is dramatically easier to make genuinely reliable than an autonomous one. The failure mode is a human rejecting a bad draft, which costs seconds, rather than a wrong action propagating into a system of record. And it still captures most of the value, because in these workflows the expensive part is the assembly and cross-referencing, not the final click.",
        "It also means the system can go live sooner. There is no long tail of guardrail engineering required to make autonomous action safe, because the autonomy is not there. If accuracy on your evaluation set later justifies loosening a specific gate, that is a decision made with evidence rather than at launch.",
      ],
    },
    {
      heading: "What FINMA actually changes about the engineering",
      body: [
        "FINMA's outsourcing expectations are frequently treated as a legal annex. They are architecture constraints. They determine what may be delegated to a third party, what has to remain auditable, and what must stay reversible, and each of those is a decision that has to be made before the first line of code rather than after.",
        "Concretely: every tool call the agent makes is logged with its inputs and the reasoning behind it, so an incident is investigable. Access is role-scoped. Any action affecting a system of record has a defined rollback. And the boundary between what the agent may do directly and what requires human approval is documented as part of the design, not discovered during a review.",
        "Retrofitting this into a system built without it means rebuilding it. That is the single most common reason we see Swiss AI pilots fail to reach production, and it is entirely avoidable.",
      ],
    },
    {
      heading: "The data residency map, before anything moves",
      body: [
        "Every Swiss engagement starts with a written map: each processing step, the named provider handling it, the region the data sits in, and the legal basis under revFADP and, where EU residents' data is involved, GDPR. That document exists before any customer data moves, and you keep it.",
        "Where a capability is only available from a provider that cannot offer Swiss or EU processing, we put the trade-off in front of you as an explicit scoping decision. Sometimes the answer is a smaller model in an acceptable region and a slightly worse result. Sometimes it is that the workflow is not yet a good candidate. Both beat discovering the problem in an audit.",
        "Because Switzerland sits outside the EU and the EEA while most Zurich companies still process EU residents' data, the common situation is being in scope for revFADP and GDPR simultaneously. That dual scope is the actual complexity, and a vendor who has not noticed it is a risk.",
      ],
    },
  ],
  currency: "CHF",
  pricingBands: [
    {
      name: "Agent feasibility review",
      scope:
        "Workflow measurement, data assessment, and a revFADP and FINMA scoping note. Includes a scoped build proposal.",
      amount: "CHF 1,900-3,800",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow end to end, human approval gates, full audit trail, evaluation set, documented rollback, runbook and handover.",
      amount: "CHF 11,500-28,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "Additional workflow",
      scope:
        "A second or third agent reusing the orchestration, retrieval and audit infrastructure from the first.",
      amount: "CHF 7,500-19,000",
      timeline: "2 to 3 weeks each",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "CHF 850-2,400 per month",
      timeline: "Rolling",
    },
  ],
  faq: [
    {
      question: "How long does it take to build an AI agent?",
      answer:
        "Two to four weeks from kickoff to handover for a scoped single-workflow agent, plus a one-to-two week feasibility review that includes the revFADP and FINMA scoping. Swiss engagements carry more up-front compliance mapping than EU ones, and that is real work rather than paperwork.",
    },
    {
      question: "How much does AI agent development cost in Switzerland?",
      answer:
        "A scoped build is the usual entry point. Swiss projects carry additional compliance mapping, which shows in the band. What else moves the number is systems touched, data usability, cost of a wrong action, and who operates it afterwards. The pricing page publishes the ranges.",
    },
    {
      question: "How do you handle revFADP and Swiss data residency?",
      answer:
        "With a written map, before any customer data moves: each processing step, the named provider, the region the data sits in, and the legal basis under revFADP and under GDPR where EU residents' data is involved. Data can stay in Switzerland or the EU depending on the capability. You keep the document.",
    },
    {
      question: "Will the agent take actions autonomously?",
      answer:
        "In Swiss regulated work, generally no, and deliberately so. It drafts and a human approves. That is easier to make reliable, faster to deploy, and aligned with FINMA's expectations around reversibility. It also captures most of the value, since the expensive part of these workflows is the assembly rather than the final decision.",
    },
    {
      question: "What does FINMA mean for the architecture?",
      answer:
        "It determines what can be delegated, what stays auditable, and what must remain reversible. Practically: every tool call logged with its inputs, role-scoped access, a defined rollback for anything touching a system of record, and a documented boundary between agent action and human approval. Retrofitting this means rebuilding, which is the most common reason Swiss pilots stall before production.",
    },
    {
      question: "Does the EU AI Act apply to us?",
      answer:
        "Not directly, since Switzerland is outside the EU and the EEA, but it does if you place an AI system on the EU market, which covers much of Zurich's pharma and financial sector. Most Swiss clients are in scope for revFADP and the EU AI Act at once. Pharma workflows touching clinical or safety data can also classify a tier higher than expected, so we resolve that at scoping.",
    },
    {
      question: "Do you work in German?",
      answer:
        "No. Our working language is English and documentation is delivered in English. Most Zurich technical and financial teams work comfortably in English, but if you need German-language facilitation and deliverables, a local agency will serve you better and we will say so on the first call.",
    },
    {
      question: "Why hire a Stockholm team instead of a Zurich one?",
      answer:
        "For some projects you should hire locally, particularly if you need people in the building several days a week. Where we fit is when you want the regulatory literacy without the local overhead: identical time zone, Nordic senior engineering rates rather than Swiss ones, and travel for the sessions that genuinely need a room.",
    },
    {
      question: "What do we own at the end?",
      answer:
        "Code and configuration in your own repository, on infrastructure you control, plus the evaluation set, the audit trail and a runbook. There is no platform of ours you must keep paying for to keep your workflow running.",
    },
  ],
  relatedPostSlugs: [
    "ai-regulation-europe",
    "ai-agent-development",
    "choosing-an-ai-agency",
  ],
  dateModified: "2026-09-03",
};
