import type { Location } from "./types";

/**
 * Amsterdam: served remotely from Stockholm. No Dutch office.
 *
 * The most price-transparent of the four markets: the competitors ranking
 * here publish full cost breakdowns, so this page leans harder on pricing
 * and on the WBSO angle than the others do.
 */
export const amsterdam: Location = {
  slug: "amsterdam",
  city: "Amsterdam",
  country: "Netherlands",
  kind: "city",
  metaTitle: "AI Software Agency for Amsterdam Companies",
  metaDescription:
    "VLIRTZ is a European AI software agency working with Amsterdam companies. AI agent development, AI consulting and AI lead generation for Dutch scale-ups and enterprises, with published price bands.",
  keywords: [
    "AI software agency Amsterdam",
    "AI agency Amsterdam",
    "AI consulting Amsterdam",
    "AI agent development Amsterdam",
    "AI lead generation Amsterdam",
  ],
  heroKicker: "Serving Amsterdam remotely",
  heroHeading: "AI software agency for Amsterdam companies",
  heroDescription:
    "We are a Stockholm-headquartered AI software agency working with Dutch companies. No Amsterdam office, no time difference, EU-native compliance, and a working prototype before a strategy deck.",
  timezone: "CET / CEST, no time difference from Stockholm",
  dataLaw: "GDPR, supervised by the Autoriteit Persoonsgegevens, with data kept in the EU by default",
  currency: "EUR",
  sectors: [
    "fintech and payments",
    "logistics and supply chain",
    "marketplaces and adtech",
    "scale-ups raising a Series A or B",
  ],
  marketNote:
    "Amsterdam's scale-up scene moves quickly and is openly allergic to slideware. The Dutch founders and operators we talk to want to see something working on their own data before they will discuss a roadmap, and they tend to ask what it costs in the first ten minutes rather than the third meeting. Both instincts are correct. So we build in that order: a thin working tool first, the agent loop second, and the roadmap last, once something real exists to plan around.",
  localRegulators: [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "Applies in full, supplemented by the Dutch UAVG implementation act. For AI work the operative questions are the legal basis, the processor chain, and whether any automated decision meaningfully affects a person.",
    },
    {
      name: "AP",
      fullName: "Autoriteit Persoonsgegevens, the Dutch Data Protection Authority",
      note: "The Netherlands' supervisory authority, and one of Europe's more assertive on algorithmic decision-making. Its work on automated risk scoring is directly relevant if your workflow ranks or filters people.",
    },
    {
      name: "EU AI Act",
      fullName: "Regulation (EU) 2024/1689 on artificial intelligence",
      note: "Phasing in on the standard EU timeline. Most internal workflow agents sit in the limited-risk band and need transparency rather than conformity assessment, but anything touching hiring, credit or access to services should be classified carefully.",
    },
    {
      name: "WBSO",
      fullName: "Wet Bevordering Speur- en Ontwikkelingswerk, the Dutch R&D tax credit",
      note: "Genuinely material to project economics. Development work with real technical uncertainty often qualifies, which lowers the net cost of a build. We can structure documentation so the engineering work is legible to a WBSO application, though your own advisor should file it.",
    },
    {
      name: "AFM and DNB",
      fullName: "The Dutch Authority for the Financial Markets and De Nederlandsche Bank",
      note: "Relevant for payments and lending clients. Outsourcing and operational resilience expectations constrain where models run and what has to stay auditable.",
    },
  ],
  sections: [
    {
      heading: "Build order: prototype first, roadmap last",
      body: [
        "Dutch buyers have been unusually direct with us about this, and it has shaped how we sequence work. The first deliverable is something that runs on your data, even if it is narrow and ugly. Not a demo on a curated sample: your records, including the messy ones.",
        "The reason is not showmanship. A prototype on real data is the fastest way to find out that thirty percent of the source records are missing a field the workflow depends on, or that the process everyone described has three undocumented exceptions. That discovery is worth more than a strategy document, and it arrives in week one instead of month three.",
        "Only after that do we discuss the agent loop, and only after that the roadmap. Roadmaps written before anyone has touched the data are fiction, and Amsterdam operators seem to recognise this faster than most.",
      ],
    },
    {
      heading: "Why we publish price bands",
      body: [
        "Most agencies treat pricing as something to be discovered over three calls. We think that wastes everyone's time, and the Dutch market clearly agrees, since the vendors buyers actually find here publish their numbers.",
        "So our bands are on the pricing page, along with what moves a quote inside them: how many systems the agent touches, how usable your data already is, how expensive a wrong action would be, and who operates the thing afterwards. A range without those drivers is a guess dressed as a quote.",
        "We also separate build cost from running cost, because the two get conflated and the second one is where people are surprised. Model and API usage is usually the smallest line. Maintenance is the real recurring cost, because models change, your source systems change, and an unmaintained agent degrades quietly rather than failing loudly.",
      ],
    },
    {
      heading: "What Dutch companies ask us to build",
      body: [
        "Fintech and payments clients come with operational load: reconciliation exceptions, merchant onboarding checks, dispute handling. The volume is there and the rules are mostly written down, which makes these strong candidates. The design constraint is that a wrong action costs money directly, so human approval gates go on anything that moves funds.",
        "Logistics and supply chain requests are usually document extraction and exception triage across formats that were never meant to be machine-readable. That work depends on retrieval quality more than reasoning, and we are explicit about that because it changes where the budget goes.",
        "Scale-ups tend to arrive with a support or sales-operations bottleneck and a small team that cannot grow fast enough. Those are good first projects: narrow, measurable, and painful enough that someone will actually adopt the result.",
      ],
    },
  ],
  pricingBands: [
    {
      name: "AI opportunity review",
      scope:
        "One to two weeks of workshops and measurement, ending in a ranked recommendation and a scoped first build.",
      amount: "EUR 2,000-4,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow, running end to end in your tools, with human review gates and a handover runbook.",
      amount: "EUR 12,000-30,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "AI consulting sequence",
      scope:
        "Target architecture, data residency mapping, and a staged rollout plan your own engineers implement.",
      amount: "EUR 8,000-18,000",
      timeline: "4 weeks",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "EUR 900-2,500 per month",
      timeline: "Rolling",
    },
  ],
  notForYouIf: [
    "You need Dutch-language customer-facing output tuned by a native speaker. We can build the system, but the language tuning needs someone we are not.",
    "Procurement requires a Dutch entity or a KvK registration. We are a Swedish sole proprietorship.",
    "You want a partner in the building for daily stand-ups. That is a fair requirement and it points to a local Amsterdam agency.",
    "The budget assumes an agent is a weekend of prompt engineering. It occasionally is, and in that case you do not need us at all.",
  ],
  faq: [
    {
      question: "Do you have an office in Amsterdam?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Amsterdam clients remotely, travelling for kickoffs and key milestones. There is no time difference, so the working day overlaps completely.",
    },
    {
      question: "How much does AI agent development cost in Amsterdam?",
      answer:
        "We publish bands rather than making you ask. A scoped single-workflow build is the usual entry point, with a shorter opportunity review ahead of it if the use case is not settled. What moves the number is how many systems the agent touches, how usable your data is, how expensive a wrong action would be, and who operates it afterwards. Full breakdown on the pricing page.",
    },
    {
      question: "Do you work with early-stage scale-ups or only enterprises?",
      answer:
        "Both, though the entry point differs. Scale-ups usually start with one agent or a lead-generation pilot, because the pain is specific and someone will adopt the result immediately. Larger companies more often start with a consulting sequence to decide which use case is worth doing first.",
    },
    {
      question: "Does our project qualify for the WBSO R&D tax credit?",
      answer:
        "Development work with genuine technical uncertainty often does, which meaningfully lowers the net cost. We can structure our documentation so the engineering work is legible to a WBSO application, but your own tax advisor should assess eligibility and file it. We are not tax advisors.",
    },
    {
      question: "How is data protected under GDPR?",
      answer:
        "Data stays in the EU by default. Before a project starts we document the legal basis, the processor chain, where each processor stores data, and the retention period. If the workflow makes an automated decision affecting a person, we identify it explicitly and design the human review gate around it.",
    },
    {
      question: "What does the AP's position on algorithmic decisions mean for us?",
      answer:
        "It matters if your workflow ranks, scores or filters people. The Dutch authority has been among Europe's more assertive on automated risk scoring, so anything touching hiring, credit or access to services needs deliberate classification and a documented human review step rather than an assumption that it is low risk.",
    },
    {
      question: "How quickly can we see something working?",
      answer:
        "The first deliverable runs on your own data, including the messy records, usually inside the first week or two of a build. That is deliberate: a prototype on real data is the fastest way to surface the missing fields and undocumented exceptions that would otherwise derail month three.",
    },
    {
      question: "Which Dutch sectors do you work with?",
      answer:
        "Fintech and payments, logistics and supply chain, marketplaces and adtech, and scale-ups around Series A or B. The recurring shape is a high-volume workflow with rules that are mostly written down and exceptions that genuinely need a person.",
    },
    {
      question: "Can you run AI lead generation for the Dutch market?",
      answer:
        "Yes. We identify and score prospects from public and first-party signals rather than buying a list, which matters more in a GDPR context than people assume. The output is a ranked, evidence-backed shortlist your sales team can act on, not a volume dump.",
    },
  ],
  relatedPostSlugs: [
    "ai-agent-development-cost",
    "choosing-an-ai-agency",
    "ai-lead-generation",
  ],
  dateModified: "2026-09-03",
};
