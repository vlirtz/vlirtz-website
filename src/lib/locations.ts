/**
 * Market pages data. Each location gets a genuinely distinct page (sectors,
 * data-protection law, FAQ) rather than a template with the city swapped in,
 * since thin near-duplicate "doorway" pages are a Google Search spam pattern.
 *
 * VLIRTZ is headquartered in Stockholms län only. Every other market is
 * served remotely, with travel when a project calls for it. Copy must
 * stay honest about that and never imply a local office that does not exist.
 */
export type Location = {
  slug: string;
  city: string;
  /** Country or region label used in headings and titles. */ 
  country: string;
  /** "city" for a single market, "region" for the pan-European page. */
  kind: "city" | "region";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroKicker: string;
  heroDescription: string;
  timezone: string;
  dataLaw: string;
  sectors: string[];
  marketNote: string;
  faq: { question: string; answer: string }[];
  /** Slugs of related blog posts, most relevant first. */
  relatedPostSlugs: string[];
};

export const locations: Location[] = [
  {
    slug: "stockholm",
    city: "Stockholm",
    country: "Sweden",
    kind: "city",
    metaTitle: "AI Software Agency & AI Consulting in Stockholm",
    metaDescription:
      "VLIRTZ is an AI software agency headquartered in Stockholm. AI agent development, AI consulting, and AI lead generation for Stockholm-based teams.",
    keywords: [
      "AI software agency Stockholm",
      "AI consulting Stockholm",
      "AI lead generation Stockholm",
    ],
    heroKicker: "Headquartered here",
    heroDescription:
      "VLIRTZ is based in Stockholms län. If you are a Stockholm company, you can meet in person, not just on a call.",
    timezone: "CET / CEST (UTC+1/+2)",
    dataLaw: "GDPR, with data kept in the EU by default",
    sectors: ["fintech and payments", "logistics and e-commerce", "professional services"],
    marketNote:
      "Stockholm has one of the densest concentrations of software talent in the Nordics, which also means the bar for a credible AI vendor is high. We do not sell a platform; we sit inside your stack, agree one workflow, and ship it. Being local means the first meeting can happen at your office.",
    faq: [
      {
        question: "Do you work on-site in Stockholm?",
        answer:
          "Yes. We are based in Stockholms län, so on-site workshops and reviews are the default for Stockholm clients, not an exception.",
      },
      {
        question: "What does a first engagement look like?",
        answer:
          "A scoped two-to-four week build or a four-week consulting sequence, targeting one workflow with a measurable outcome. See our services for detail.",
      },
      {
        question: "Can you present in Swedish?",
        answer:
          "Meetings and workshops can run in Swedish or English. Delivery documentation is in English by default.",
      },
    ],
    relatedPostSlugs: ["ai-software-agency-stockholm", "software-agency-stockholm"],
  },
  {
    slug: "zurich",
    city: "Zurich",
    country: "Switzerland",
    kind: "city",
    metaTitle: "AI Software Agency & AI Consulting for Zurich Companies",
    metaDescription:
      "VLIRTZ is a European AI software agency serving Zurich. AI agent development, AI consulting, and AI lead generation, delivered remotely with on-site visits when needed.",
    keywords: [
      "AI software agency Zurich",
      "AI consulting Zurich",
      "AI lead generation Zurich",
    ],
    heroKicker: "Serving Zurich remotely",
    heroDescription:
      "We are a Stockholm-headquartered AI software agency working with Zurich companies. No local office, a one-hour time difference, and on-site visits when a project needs one.",
    timezone: "CET / CEST, no time difference from Stockholm",
    dataLaw: "Swiss FADP and GDPR, with data residency options in the EU",
    sectors: ["private banking and wealth management", "insurance", "pharma and med-tech"],
    marketNote:
      "Zurich buyers are used to vendors who over-promise on AI and under-deliver on production systems. Swiss financial and pharma clients in particular need a clear story on where data sits and who can act on it. We treat that as part of the build, not an afterthought bolted on before signature.",
    faq: [
      {
        question: "Do you have an office in Zurich?",
        answer:
          "No. We are headquartered in Stockholm and work with Zurich clients remotely by default, with on-site visits for kickoffs or key milestones when useful.",
      },
      {
        question: "Can you work under Swiss data protection requirements?",
        answer:
          "Yes. We scope data residency and processor agreements against the Swiss FADP and GDPR before any customer data moves, and can keep data inside the EU or Switzerland depending on the project.",
      },
      {
        question: "What time zone overlap do we get?",
        answer:
          "None to worry about. Zurich and Stockholm share the same time zone, so working hours line up fully.",
      },
    ],
    relatedPostSlugs: ["ai-consulting-zurich-swiss-companies"],
  },
  {
    slug: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    kind: "city",
    metaTitle: "AI Software Agency & AI Consulting for Amsterdam Companies",
    metaDescription:
      "VLIRTZ is a European AI software agency serving Amsterdam. AI agent development, AI consulting, and AI lead generation for Dutch scale-ups and enterprises.",
    keywords: [
      "AI software agency Amsterdam",
      "AI consulting Amsterdam",
      "AI lead generation Amsterdam",
    ],
    heroKicker: "Serving Amsterdam remotely",
    heroDescription:
      "We are a Stockholm-headquartered AI software agency working with Amsterdam companies. Same time zone, EU-native compliance, and a founder-led team that ships.",
    timezone: "CET / CEST, no time difference from Stockholm",
    dataLaw: "GDPR, with data kept in the EU by default",
    sectors: ["fintech", "logistics and supply chain", "scale-ups raising a Series A or B"],
    marketNote:
      "Amsterdam's scale-up scene moves fast and is allergic to slideware. Dutch founders and operators we talk to want a working prototype before a strategy deck. That is the order we build in: thin tool first, agent loop second, roadmap last, once something real exists.",
    faq: [
      {
        question: "Do you have an office in Amsterdam?",
        answer:
          "No. We are headquartered in Stockholm and work with Amsterdam clients remotely, with on-site visits for kickoffs or key milestones when useful.",
      },
      {
        question: "Do you work with early-stage scale-ups or only enterprises?",
        answer:
          "Both. Scale-ups usually start with one AI agent or a lead-generation pilot; larger companies often start with a consulting sprint to pick the use case first.",
      },
      {
        question: "How is data protected under GDPR?",
        answer:
          "We keep customer data in the EU by default and document processors and legal basis before any project starts.",
      },
    ],
    relatedPostSlugs: ["ai-software-agency-amsterdam-copenhagen"],
  },
  {
    slug: "copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    kind: "city",
    metaTitle: "AI Software Agency & AI Consulting for Copenhagen Companies",
    metaDescription:
      "VLIRTZ is a European AI software agency serving Copenhagen. AI agent development, AI consulting, and AI lead generation for Danish companies.",
    keywords: [
      "AI software agency Copenhagen",
      "AI consulting Copenhagen",
      "AI lead generation Copenhagen",
    ],
    heroKicker: "Serving Copenhagen remotely",
    heroDescription:
      "We are a Stockholm-headquartered AI software agency working with Copenhagen companies. A 35-minute flight away, the same Nordic business culture, and no time difference.",
    timezone: "CET / CEST, no time difference from Stockholm",
    dataLaw: "GDPR, with data kept in the EU by default",
    sectors: ["cleantech and energy", "life sciences", "design and consumer brands"],
    marketNote:
      "Copenhagen and Stockholm share enough business culture that most of our Danish conversations start the same way Swedish ones do: skepticism about AI vendors, and a preference for a small pilot over a big commitment. We keep the first engagement small on purpose.",
    faq: [
      {
        question: "Do you have an office in Copenhagen?",
        answer:
          "No. We are headquartered in Stockholm and work with Copenhagen clients remotely, with on-site visits for kickoffs or key milestones when useful.",
      },
      {
        question: "Is there a language barrier?",
        answer:
          "No. Meetings run in English or Danish-adjacent Scandinavian understanding is generally mutual; documentation is in English.",
      },
      {
        question: "What sectors have you worked with?",
        answer:
          "Our Nordic work spans cleantech, life sciences, and consumer brands, alongside the AI agent and lead-generation work described in our services.",
      },
    ],
    relatedPostSlugs: ["ai-software-agency-amsterdam-copenhagen"],
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    kind: "city",
    metaTitle: "AI Software Agency & AI Consulting for Dubai Companies",
    metaDescription:
      "VLIRTZ is a European AI software agency serving Dubai and the wider UAE. AI agent development, AI consulting, and AI lead generation for Gulf-based teams.",
    keywords: [
      "AI software agency Dubai",
      "AI consulting Dubai",
      "AI lead generation Dubai",
    ],
    heroKicker: "Serving Dubai remotely",
    heroDescription:
      "We are a Stockholm-headquartered AI software agency working with Dubai companies. A two-hour time difference, EU-grade delivery discipline, and on-site visits when a project needs one.",
    timezone: "GST (UTC+4), roughly two to three hours ahead of Stockholm",
    dataLaw: "UAE PDPL, with DIFC and free-zone data rules scoped per project",
    sectors: ["real estate", "government and free-zone digitization", "trading and logistics"],
    marketNote:
      "Dubai's AI market is full of vendors who can talk about agents but have not shipped one that survives contact with a real CRM or ERP. We are explicit about what a first pilot can and cannot do, and we scope UAE PDPL and any DIFC-specific requirements before data moves, rather than after a contract is signed.",
    faq: [
      {
        question: "Do you have an office in Dubai?",
        answer:
          "No. We are headquartered in Stockholm and work with Dubai and wider UAE clients remotely, with on-site visits for kickoffs or key milestones when useful.",
      },
      {
        question: "Can you work with free-zone or government entities?",
        answer:
          "Yes, and we scope data residency and any DIFC-specific or free-zone rules against the UAE PDPL before a project starts.",
      },
      {
        question: "What is the time zone overlap with Stockholm?",
        answer:
          "Dubai is roughly two to three hours ahead of Stockholm depending on daylight saving, which still leaves a full working-day overlap.",
      },
    ],
    relatedPostSlugs: ["ai-lead-generation-dubai-europe"],
  },
  {
    slug: "europe",
    city: "Europe",
    country: "Europe",
    kind: "region",
    metaTitle: "AI Software Agency & AI Consulting Across Europe",
    metaDescription:
      "VLIRTZ is a Stockholm-headquartered AI software agency working with companies across Europe. AI agent development, AI consulting, and AI lead generation, EU-native and GDPR-first.",
    keywords: [
      "AI software agency Europe",
      "AI consulting Europe",
      "AI lead generation Europe",
    ],
    heroKicker: "EU-based, EU-wide",
    heroDescription:
      "VLIRTZ is headquartered in Stockholm and works with companies across the EU and EEA. GDPR-native by default, delivered remotely, with on-site visits when a project needs one.",
    timezone: "Central and Western European time zones, one to two hours of overlap at most",
    dataLaw: "GDPR, with data kept in the EU by default",
    sectors: ["cross-border SaaS", "multi-market e-commerce", "professional services groups"],
    marketNote:
      "Companies operating across two or more European markets usually have the same problem twice: a workflow that works in one office and not the other, because it depends on one person's judgement. We build the version of that workflow an AI agent can run consistently, then hand over the parts that still need a human.",
    faq: [
      {
        question: "Which European markets do you cover?",
        answer:
          "We work with companies across the EU and EEA. Dedicated pages exist for Stockholm, Zurich, Amsterdam, and Copenhagen; other markets are handled the same way, remotely with on-site visits when useful.",
      },
      {
        question: "Is our data required to stay in the EU?",
        answer:
          "By default, yes. We keep customer data in the EU and document the legal basis and processors for each project under GDPR.",
      },
      {
        question: "Do you work with multi-country teams?",
        answer:
          "Yes. Cross-border SaaS and multi-market operators are a common fit, since the underlying workflow problem is usually the same in every market.",
      },
    ],
    relatedPostSlugs: ["ai-lead-generation-dubai-europe"],
  },
];

/**
 * Looks up a single location by its URL slug.
 */
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}
