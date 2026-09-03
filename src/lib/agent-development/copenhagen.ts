import type { AgentDevelopmentMarket } from "./types";

/** AI agent development for Copenhagen, delivered remotely from Stockholm. */
export const copenhagen: AgentDevelopmentMarket = {
  slug: "copenhagen",
  city: "Copenhagen",
  country: "Denmark",
  metaTitle: "AI Agent Development in Copenhagen",
  metaDescription:
    "AI agent development for Copenhagen companies by VLIRTZ. One workflow at a time, built on your real data with human review gates, GDPR-native and delivered remotely from Stockholm.",
  keywords: [
    "AI agent development Copenhagen",
    "AI agents Copenhagen",
    "build AI agent Denmark",
    "AI agent developer Copenhagen",
    "autonomous AI agents Denmark",
  ],
  heroKicker: "Built for Denmark, from Stockholm",
  heroHeading: "AI agent development in Copenhagen",
  heroDescription:
    "We build AI agents that run one real workflow end to end, integrated with the Danish systems your team already uses, with a human on every decision that is expensive to undo.",
  marketAngle:
    "Danish buyers ask the operational questions early, which we consider a good sign. So this page leads with what the agent will and will not do rather than with what it could theoretically become.",
  useCases: [
    {
      title: "Regulatory document cross-checking",
      sector: "Life sciences and pharma",
      body: "Submissions and supplier qualification files where the work is reading and cross-referencing rather than deciding. The agent assembles the file, flags inconsistencies against the source documents, and leaves the judgement with a regulatory affairs specialist.",
    },
    {
      title: "Adverse event intake triage",
      sector: "Life sciences",
      body: "Incoming reports arriving in inconsistent formats that must be classified and routed within a deadline. The agent extracts the structured fields and proposes a classification; a human confirms it, because the cost of a wrong classification here is not recoverable.",
    },
    {
      title: "Alarm and alert prioritisation",
      sector: "Cleantech and energy",
      body: "Operational monitoring that produces far more alerts than anyone can read, where the important one is buried in noise. The agent assembles context around each alert and ranks it. It does not resolve them, because in this setting a false negative is expensive.",
    },
    {
      title: "Shipping document extraction",
      sector: "Maritime and logistics",
      body: "Bills of lading, customs paperwork and manifests across formats never designed to be machine-readable. This work lives or dies on retrieval quality rather than reasoning, and we scope it accordingly.",
    },
    {
      title: "Bookkeeping classification",
      sector: "Consumer brands and SMEs",
      body: "Transaction classification and payout reconciliation against e-conomic, Billy or Dinero. High volume, rules mostly written down, and an obvious human gate on anything that changes a filed figure.",
    },
  ],
  sections: [
    {
      heading: "Documentation-heavy workflows are the good candidates",
      body: [
        "Copenhagen's sector mix produces an unusually high share of workflows where the bottleneck is reading and cross-checking rather than deciding. Life sciences submissions, supplier qualification, maritime paperwork, adverse event intake. These are strong agent candidates for a specific reason: the source material is written down, and the correct answer is verifiable after the fact.",
        "That verifiability is what makes a real evaluation set possible. We can take two hundred historical cases, run the agent against them, and tell you its accuracy against known-correct outcomes. Workflows where the right answer is a matter of judgement do not give you that, and they are much harder to deploy responsibly.",
        "So when a Danish client brings us a menu of candidate workflows, the ones we push towards are almost always the document-heavy ones, even when they seem less exciting than the customer-facing option.",
      ],
    },
    {
      heading: "The Danish integrations that decide the estimate",
      body: [
        "An agent that cannot reach your systems is not useful, and Danish businesses run on a specific stack. Accounting and invoicing usually means e-conomic, Billy or Dinero. Public sector and public-adjacent work often means case management in WorkZone. Identity and payment flows touch MitID and NemKonto.",
        "None of these are exotic, but they are not what a generic AI vendor has built against before. The difference between a two-day integration and a two-week one is almost always whether someone read the API's pagination, rate-limit and error behaviour before quoting.",
        "We scope against the actual API rather than the marketing page, and we say plainly when a system's interface will not support what the workflow needs. That answer arrives at scoping, not halfway through a build.",
      ],
    },
    {
      heading: "NIS2 and why logging is build scope",
      body: [
        "If you are an in-scope entity in energy, transport or health, NIS2 reaches the agent more than most clients expect. The incident reporting and supply-chain security obligations land on the logging and access control around the system, not merely on the model.",
        "In practice this means every tool call the agent makes is recorded with its inputs and the decision behind it, access is role-scoped, and there is a documented path for what happens during an incident. We treat all of that as engineering work in the build rather than paperwork assembled before signature.",
        "The same logging is what makes the system investigable when something does go wrong, so this is not compliance overhead sitting on top of a working system. It is part of what makes it a working system.",
      ],
    },
  ],
  currency: "DKK",
  pricingBands: [
    {
      name: "Agent feasibility review",
      scope:
        "We measure the workflow, assess whether your data supports it, and tell you whether an agent is the right answer. Includes a scoped build proposal.",
      amount: "DKK 15,000-30,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow end to end, integrated with your Danish systems, human review gates, evaluation set, audit logging, runbook and handover.",
      amount: "DKK 90,000-225,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "Additional workflow",
      scope:
        "A second or third agent reusing the orchestration, retrieval and evaluation harness from the first.",
      amount: "DKK 60,000-150,000",
      timeline: "2 to 3 weeks each",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "DKK 6,500-19,000 per month",
      timeline: "Rolling",
    },
  ],
  faq: [
    {
      question: "How long does it take to build an AI agent?",
      answer:
        "Two to four weeks from kickoff to handover for a scoped single-workflow agent, with a one-to-two week feasibility review ahead of it if the use case is not settled. We travel to Copenhagen for kickoff and handover; the build itself runs remotely with a weekly review.",
    },
    {
      question: "How much does AI agent development cost in Denmark?",
      answer:
        "A scoped build is the usual entry point. The number moves with how many systems the agent touches, how usable your data already is, how expensive a wrong action would be, and who operates it afterwards. The pricing page publishes the bands and the drivers.",
    },
    {
      question: "Do you integrate with e-conomic, Billy or WorkZone?",
      answer:
        "Yes, and we scope those against the actual API rather than the marketing page. Danish business tooling is not exotic, but it is not what a generic AI vendor has built against, and the honest estimate depends on how each specific API handles pagination, rate limits and error states.",
    },
    {
      question: "Will the agent act on its own?",
      answer:
        "It starts read-only and draft-first, and anything expensive to undo stays behind human approval. For the document-heavy workflows common in Denmark, draft-and-approve is usually the permanent right answer, and it still captures most of the time saving because the bottleneck is the reading rather than the final decision.",
    },
    {
      question: "Does NIS2 affect the build?",
      answer:
        "If you are in scope in energy, transport or health, yes, and more than people expect. The incident reporting and supply-chain obligations land on the logging and access control around the agent. We treat that as build scope, so every tool call is logged with its inputs and access is role-scoped from the start.",
    },
    {
      question: "Can the agent work in Danish?",
      answer:
        "It can process and produce Danish-language content. What we will not claim is that we are the right people to tune Danish customer-facing copy for tone, since our working language is English. For internal document workflows, which is most of what we build in Denmark, this is not a constraint.",
    },
    {
      question: "How do you prove it actually works?",
      answer:
        "We measure the workflow before building, then run the finished agent against a set of your historical cases with known-correct outcomes. Copenhagen's document-heavy workflows are well suited to this because the right answer is verifiable, which is exactly why we steer towards them.",
    },
    {
      question: "What do we own afterwards?",
      answer:
        "Code and configuration in your own repository, running on infrastructure you control, plus the evaluation set, audit logging and a runbook. No platform dependency on us.",
    },
    {
      question: "Do you have an office in Copenhagen?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Danish clients remotely, travelling for kickoff and key milestones. There is no time difference, and Arlanda to Kastrup is a little over an hour in the air.",
    },
  ],
  relatedPostSlugs: [
    "ai-agent-development",
    "ai-regulation-europe",
    "choosing-an-ai-agency",
  ],
  dateModified: "2026-09-03",
};
