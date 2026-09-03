import type { Location } from "./types";

/**
 * Dubai: served remotely from Stockholm. No UAE office.
 *
 * Not one of the four priority SEO markets, but kept at the same content
 * standard so the market set does not contain an obviously thinner page.
 */
export const dubai: Location = {
  slug: "dubai",
  city: "Dubai",
  country: "United Arab Emirates",
  kind: "city",
  metaTitle: "AI Software Agency for Dubai Companies",
  metaDescription:
    "VLIRTZ is a European AI software agency working with Dubai and wider UAE companies. AI agent development, AI consulting and AI lead generation, scoped against the UAE PDPL and free-zone rules.",
  keywords: [
    "AI software agency Dubai",
    "AI agency Dubai",
    "AI consulting Dubai",
    "AI agent development Dubai",
    "AI lead generation Dubai",
  ],
  heroKicker: "Serving Dubai remotely",
  heroHeading: "AI software agency for Dubai companies",
  heroDescription:
    "We are a Stockholm-headquartered AI software agency working with UAE companies. A two-to-three hour time difference, EU delivery discipline, and free-zone data rules scoped before anything moves.",
  timezone: "GST (UTC+4), two to three hours ahead of Stockholm",
  dataLaw: "UAE PDPL, with DIFC and ADGM regimes scoped per project",
  currency: "AED",
  sectors: [
    "real estate and property management",
    "government and free-zone digitisation",
    "trading and logistics",
    "hospitality",
  ],
  marketNote:
    "Dubai's AI market has no shortage of vendors who can talk fluently about agents without having shipped one that survives contact with a real CRM or ERP. We are explicit about what a first pilot can and cannot do, and we scope the applicable data protection regime before data moves rather than after a contract is signed. The UAE's regulatory picture is genuinely more fragmented than the EU's, because which law applies depends on whether you sit onshore, in the DIFC, or in the ADGM.",
  localRegulators: [
    {
      name: "UAE PDPL",
      fullName: "Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data",
      note: "The onshore federal regime. It governs consent, cross-border transfer and data subject rights for entities outside the financial free zones.",
    },
    {
      name: "DIFC DP Law",
      fullName: "DIFC Data Protection Law No. 5 of 2020",
      note: "Applies instead of the federal law if you are established in the Dubai International Financial Centre. It is closer to GDPR in structure, which usually makes DIFC projects simpler for us to scope, not harder.",
    },
    {
      name: "ADGM",
      fullName: "Abu Dhabi Global Market Data Protection Regulations 2021",
      note: "The equivalent regime for entities in the Abu Dhabi free zone. Worth confirming early, since several groups operate across more than one zone and assume a single regime applies.",
    },
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "Reaches UAE companies that process the data of EU residents, which describes most Dubai businesses with European customers or a European entity.",
    },
  ],
  sections: [
    {
      heading: "Establishing which regime actually applies",
      body: [
        "This is the first question on a UAE engagement and it is more often unresolved than clients expect. A group with an onshore trading entity, a DIFC holding company and a European sales arm can be subject to the federal PDPL, the DIFC law and GDPR simultaneously, with different obligations attaching to different data flows.",
        "We resolve that at scoping, in writing, before any customer data moves. The output names each processing step, the entity that owns it, the regime that governs it, and where the data physically sits.",
        "Doing this first is not caution for its own sake. It determines which model providers and regions are available, which in turn determines what the agent can actually do. Discovering the constraint after the build is what forces a rebuild.",
      ],
    },
    {
      heading: "How remote delivery to the UAE works in practice",
      body: [
        "Dubai runs two to three hours ahead of Stockholm depending on European daylight saving, which still leaves a full working-day overlap. In practice we schedule reviews in the Gulf afternoon, which is the Nordic late morning, and nobody has to take a call at an unreasonable hour.",
        "The bigger adjustment is the working week. The UAE weekend falls on Friday and Saturday, so Thursday is an end-of-week day for you and a mid-week day for us. We plan sprint boundaries around that rather than pretending it does not exist.",
        "We travel for kickoff and handover where the project warrants it. Everything else runs remotely, which is how a build of this size would run in any case.",
      ],
    },
    {
      heading: "What UAE companies ask us to build",
      body: [
        "Real estate and property management is the most common request: lead qualification at volume, document handling on tenancy and sale paperwork, and maintenance-request triage. The volumes are high and the rules are largely written down, which makes these tractable.",
        "Free-zone and government-adjacent digitisation work is usually document extraction and case routing. Here the constraint is almost never the model. It is the source systems, and an honest estimate depends on what their interfaces will actually support.",
        "Trading and logistics brings the same document extraction problem we see in Rotterdam and Copenhagen, at a different scale and across more formats. Retrieval quality decides the outcome, not reasoning ability.",
      ],
    },
  ],
  pricingBands: [
    {
      name: "AI opportunity review",
      scope:
        "One to two weeks of workshops and measurement, ending in a ranked recommendation and a scoped first build.",
      amount: "AED 8,000-16,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow, running end to end in your tools, with human review gates and a handover runbook.",
      amount: "AED 48,000-120,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "AI consulting sequence",
      scope:
        "Target architecture, PDPL or DIFC scoping, data residency mapping, and a staged rollout plan.",
      amount: "AED 32,000-72,000",
      timeline: "4 weeks",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "AED 3,600-10,000 per month",
      timeline: "Rolling",
    },
  ],
  notForYouIf: [
    "You need a UAE-registered entity for procurement or a local partner for a government tender. We are a Swedish sole proprietorship.",
    "The workflow needs Arabic-language customer-facing output tuned by a native speaker. We can build the system; the language tuning needs someone else.",
    "You want a vendor on the ground in Dubai for daily presence. That is a legitimate requirement that points elsewhere.",
    "Data residency must be UAE-only for every processing step. Sometimes achievable, often not, and we will tell you which at scoping rather than after signature.",
  ],
  faq: [
    {
      question: "Do you have an office in Dubai?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Dubai and wider UAE clients remotely, travelling for kickoffs and key milestones when a project warrants it.",
    },
    {
      question: "What is the time zone overlap with Stockholm?",
      answer:
        "Dubai is two to three hours ahead depending on European daylight saving, which leaves a full working-day overlap. We schedule reviews in the Gulf afternoon, which is the Nordic late morning. We also plan sprint boundaries around the Friday and Saturday UAE weekend rather than ignoring it.",
    },
    {
      question: "Can you work with free-zone or government entities?",
      answer:
        "Yes, though procurement is usually the constraint rather than the technology, and a government tender may require a local partner. On the data side we confirm at scoping whether the federal PDPL, the DIFC law or the ADGM regulations govern each flow, since groups operating across zones are often subject to more than one.",
    },
    {
      question: "Which data protection law applies to us?",
      answer:
        "It depends on where each entity is established. Onshore entities fall under the federal PDPL, DIFC entities under DIFC Data Protection Law No. 5 of 2020, and ADGM entities under the ADGM regulations. If you also process EU residents' data, GDPR reaches you as well. We map this per processing step before anything moves.",
    },
    {
      question: "How much does an AI agent cost in the UAE?",
      answer:
        "A scoped single-workflow build is the usual entry point, with a shorter opportunity review ahead of it if the use case is not settled. The pricing page sets out the bands and what moves a quote inside them.",
    },
    {
      question: "Do you work in Arabic?",
      answer:
        "Our working language is English, and delivery documentation is in English. We can build systems that process Arabic content, but we are not the right partner to tune Arabic-language customer-facing copy.",
    },
    {
      question: "Which UAE sectors do you see most?",
      answer:
        "Real estate and property management, free-zone and government digitisation, trading and logistics, and hospitality. Lead qualification at volume and document handling are the two most common shapes.",
    },
    {
      question: "How do you handle the Friday-Saturday weekend difference?",
      answer:
        "We plan around it explicitly. Thursday is an end-of-week day for you and mid-week for us, so sprint boundaries and review sessions are scheduled to match your calendar rather than ours.",
    },
  ],
  relatedPostSlugs: ["ai-lead-generation", "ai-agent-development"],
  dateModified: "2026-09-03",
};
