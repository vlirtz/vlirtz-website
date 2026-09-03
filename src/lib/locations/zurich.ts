import type { Location } from "./types";

/**
 * Zurich: served remotely from Stockholm. No Swiss office.
 *
 * The hardest of the four target markets. Swiss competitors lead on data
 * sovereignty and ETH-trained engineering, so this page competes on the
 * specificity of the compliance answer rather than on proximity.
 */
export const zurich: Location = {
  slug: "zurich",
  city: "Zurich",
  country: "Switzerland",
  kind: "city",
  metaTitle: "AI Software Agency for Zurich Companies",
  metaDescription:
    "VLIRTZ is a European AI software agency working with Zurich companies. AI agent development, AI consulting and AI lead generation, scoped against revFADP and FINMA expectations before data moves.",
  keywords: [
    "AI software agency Zurich",
    "AI agency Zurich",
    "AI consulting Zurich",
    "AI agent development Zurich",
    "AI lead generation Zurich",
  ],
  heroKicker: "Serving Zurich remotely",
  heroHeading: "AI software agency for Zurich companies",
  heroDescription:
    "We are a Stockholm-headquartered AI software agency working with Swiss companies. No Zurich office, no time difference, and a data residency answer written down before anything moves.",
  timezone: "CET / CEST, no time difference from Stockholm",
  dataLaw: "revFADP and GDPR, with Swiss or EU data residency scoped per project",
  currency: "CHF",
  sectors: [
    "private banking and wealth management",
    "insurance and reinsurance",
    "pharma and med-tech",
    "commodities trading",
  ],
  marketNote:
    "Zurich buyers have usually met several vendors who over-promised on AI and under-delivered on anything that had to run in production. Swiss financial and pharma clients in particular need a precise story about where data sits, who can act on it, and what happens when the model is wrong. We treat that as part of the build rather than an annex assembled before signature. The trade-off is that we are honest about what a first pilot cannot do, which makes for a less exciting first meeting and a better second one.",
  localRegulators: [
    {
      name: "revFADP",
      fullName: "The revised Swiss Federal Act on Data Protection, in force since 1 September 2023",
      note: "Switzerland's own regime, close to GDPR but not identical. The practical differences that affect AI work are the record-of-processing obligations, the treatment of profiling, and the fact that penalties attach to individuals rather than only to companies.",
    },
    {
      name: "FDPIC",
      fullName: "The Federal Data Protection and Information Commissioner, the EDOEB",
      note: "The Swiss supervisory authority. Its position on cross-border transfers is what determines whether a given model provider is usable for a given dataset.",
    },
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "Switzerland is outside the EU and the EEA, but GDPR still reaches Swiss companies processing the data of EU residents. Most Zurich clients are in scope for both regimes at once, which is the actual complexity.",
    },
    {
      name: "FINMA",
      fullName: "The Swiss Financial Market Supervisory Authority",
      note: "Decisive for banking and insurance clients. Its outsourcing circular shapes what can be delegated, what has to remain auditable, and what must stay reversible, all of which are architecture constraints rather than legal footnotes.",
    },
    {
      name: "EU AI Act",
      fullName: "Regulation (EU) 2024/1689 on artificial intelligence",
      note: "Does not bind Switzerland directly. It does bind Swiss companies placing AI systems on the EU market, which describes a large share of Zurich's pharma and financial sector.",
    },
  ],
  sections: [
    {
      heading: "The data sovereignty question, answered properly",
      body: [
        "Every Zurich engagement starts here, and a vague answer should disqualify a vendor. Ours is specific. We map each processing step to a named provider, a named region, and a legal basis under both revFADP and, where EU residents' data is involved, GDPR. That map exists before any customer data moves, and it is a document you keep.",
        "Where a capability is only available from a provider that cannot offer Swiss or EU processing, we say so and put the trade-off in front of you as a scoping decision. Sometimes the answer is a smaller model running in an acceptable region and a slightly worse result. Sometimes the answer is that the workflow is not a good candidate yet. Both are better than discovering the problem during an audit.",
        "For financial services clients, FINMA's outsourcing expectations do real work on the architecture. Auditability and reversibility are not compliance decoration; they determine whether an agent may take an action directly or must produce something a human approves. We design that boundary at the start because retrofitting it means rebuilding.",
      ],
    },
    {
      heading: "Why we are competing against local agencies from Stockholm",
      body: [
        "There are good AI agencies in Zurich, several with ETH-trained engineers and a local office, and for some projects that is the right choice. If you need people in the building several days a week, hire locally. We will tell you that on the first call rather than the third.",
        "What we offer instead is a specific delivery discipline and no local overhead. Zurich and Stockholm share a time zone, so the working day overlaps completely. We fly in for kickoff and handover. Swiss rates for senior AI engineering are among the highest in Europe, and a Nordic team with the same regulatory literacy is usually a materially different number for the same scope.",
        "The regulatory literacy is the part that matters. A cheaper vendor who does not understand why FINMA cares about reversibility will build something you cannot deploy.",
      ],
    },
    {
      heading: "What Swiss companies ask us to build",
      body: [
        "Private banking and wealth management requests are almost always about client-facing documentation and internal research synthesis, with a hard constraint that nothing goes to a client without a human signing it off. That constraint is a gift for engineering: a draft-and-approve agent is far easier to make reliable than an autonomous one, and it is the shape we would recommend anyway.",
        "Insurance and reinsurance work tends to be claims triage and submission review, where the volume justifies automation and the exceptions genuinely need judgement. The build that works is the one that assembles the file and ranks it, leaving the decision with an underwriter.",
        "Pharma and med-tech clients bring regulated documentation workflows. Here the classification question under the EU AI Act is not academic, because a workflow touching clinical or safety data can sit a tier higher than the client assumed. We resolve that at scoping.",
      ],
    },
  ],
  pricingBands: [
    {
      name: "AI opportunity review",
      scope:
        "One to two weeks of workshops and measurement, ending in a ranked recommendation and a scoped first build.",
      amount: "CHF 1,900-3,800",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow, running end to end in your tools, with human review gates, an audit trail, and a handover runbook.",
      amount: "CHF 11,500-28,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "AI consulting sequence",
      scope:
        "Target architecture, revFADP and FINMA scoping, data residency mapping, and a staged rollout plan.",
      amount: "CHF 7,500-17,000",
      timeline: "4 weeks",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "CHF 850-2,400 per month",
      timeline: "Rolling",
    },
  ],
  notForYouIf: [
    "Your procurement requires a Swiss entity or Swiss-only data residency for every processing step. We can often meet the residency requirement, but not the entity one.",
    "You need German-language delivery documentation and German-speaking on-site facilitation. Our working language is English.",
    "The engagement requires a vendor with an existing FINMA-audited track record. We are honest about being a young firm, and for some regulated programmes that is a legitimate blocker.",
    "You want the cheapest possible build. The compliance mapping we do up front is real effort, and it is not the part to cut in a Swiss regulated context.",
  ],
  faq: [
    {
      question: "Do you have an office in Zurich?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Zurich clients remotely, travelling for kickoffs and key milestones. If your project genuinely needs people on site several days a week, a local Zurich agency is the better answer and we will say so.",
    },
    {
      question: "Can you work under Swiss data protection requirements?",
      answer:
        "Yes. We map each processing step to a named provider, region and legal basis under revFADP, and under GDPR too where EU residents' data is involved, before any customer data moves. Data can stay in Switzerland or the EU depending on the capability and the project.",
    },
    {
      question: "What time zone overlap do we get?",
      answer:
        "Complete overlap. Zurich and Stockholm are both on CET and CEST, so there is no time difference at all and no scheduling friction.",
    },
    {
      question: "How does FINMA affect an AI agent build?",
      answer:
        "More than most vendors acknowledge. FINMA's outsourcing expectations determine what can be delegated, what has to stay auditable, and what must remain reversible. In practice that decides whether an agent may act directly or must produce output a human approves. We design that boundary at the start, because adding it later means rebuilding.",
    },
    {
      question: "Does the EU AI Act apply to a Swiss company?",
      answer:
        "Not directly, since Switzerland is outside the EU and the EEA. It does apply if you place an AI system on the EU market, which covers a large share of Zurich's pharma and financial sector. Most of our Swiss clients end up in scope for revFADP and the EU AI Act simultaneously.",
    },
    {
      question: "How much does an AI agent cost in Switzerland?",
      answer:
        "A scoped single-workflow build is the usual starting point. Swiss engagements carry more up-front compliance mapping than EU ones, which is real work and shows in the band. The pricing page sets out the ranges and what moves a quote inside them.",
    },
    {
      question: "Do you work in German?",
      answer:
        "Our working language is English, and documentation is delivered in English. Most Zurich technical and financial teams work comfortably in English, but if you need German-language facilitation and deliverables, we are not the right fit and a local agency will serve you better.",
    },
    {
      question: "Which Swiss sectors do you see most?",
      answer:
        "Private banking and wealth management, insurance and reinsurance, pharma and med-tech, and commodities trading. The common thread is that a wrong action is expensive, which pushes the design towards draft-and-approve rather than full autonomy.",
    },
    {
      question: "Why would we not just hire a Zurich agency?",
      answer:
        "For some projects you should, and we will say so early. Where we are a better fit is when you want the regulatory literacy without the local overhead. Same time zone, senior Nordic engineering rates rather than Swiss ones, and travel for the sessions that genuinely need a room.",
    },
  ],
  relatedPostSlugs: [
    "ai-regulation-europe",
    "choosing-an-ai-agency",
    "ai-agent-development",
  ],
  dateModified: "2026-09-03",
};
