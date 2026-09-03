import type { Location } from "./types";

/**
 * Europe: the pan-regional page. Deliberately about the cross-border
 * problem rather than being a superset of the city pages, so it competes
 * for a different query and does not cannibalise them.
 */
export const europe: Location = {
  slug: "europe",
  city: "Europe",
  country: "Europe",
  kind: "region",
  metaTitle: "AI Software Agency Across Europe",
  metaDescription:
    "VLIRTZ is a Stockholm-headquartered AI software agency working with companies across Europe. AI agent development, AI consulting and AI lead generation, EU-native and GDPR-first.",
  keywords: [
    "AI software agency Europe",
    "European AI agency",
    "AI consulting Europe",
    "AI agent development Europe",
    "AI lead generation Europe",
  ],
  heroKicker: "EU-based, EU-wide",
  heroHeading: "AI software agency across Europe",
  heroDescription:
    "VLIRTZ is headquartered in Stockholm and works with companies across the EU and EEA. GDPR-native by default, delivered remotely, with travel when a project needs a room.",
  timezone: "Central and Western European time zones, with full working-day overlap",
  dataLaw: "GDPR, with data kept in the EU by default",
  currency: "EUR",
  sectors: [
    "cross-border SaaS",
    "multi-market e-commerce",
    "professional services groups",
    "manufacturing groups with distributed operations",
  ],
  marketNote:
    "Companies operating across two or more European markets usually have the same problem twice: a workflow that works in one office and not in the other, because it depends on one person's judgement and that person is only in one place. We build the version of that workflow an agent can run consistently in both, then hand back the parts that genuinely still need a human. The cross-border case is harder than the single-market one, and the difficulty is almost never the model.",
  localRegulators: [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "One regulation, but supplemented differently in each member state. Employee data, national identifiers and retention periods are where the national divergence actually bites on a multi-country rollout.",
    },
    {
      name: "EU AI Act",
      fullName: "Regulation (EU) 2024/1689 on artificial intelligence",
      note: "Harmonised across the union, which makes it easier to plan against than GDPR's national supplements. Classification by risk tier should happen once, at scoping, and then hold across every market.",
    },
    {
      name: "NIS2",
      fullName: "Directive (EU) 2022/2555 on network and information security",
      note: "A directive rather than a regulation, so national transpositions differ. If you are in scope in several member states, the incident reporting obligations are the part that most often surprises people.",
    },
    {
      name: "Lead supervisory authority",
      fullName: "The GDPR one-stop-shop mechanism",
      note: "For cross-border processing, one national authority usually leads. Establishing which one before a rollout saves a great deal of confusion later.",
    },
  ],
  sections: [
    {
      heading: "The cross-border workflow problem",
      body: [
        "The pattern repeats across almost every multi-market client. A process runs well in the home market because a long-tenured employee absorbs the exceptions, and badly in the second market because nobody there has that context. Management sees inconsistent output and concludes the second team needs training. Usually the real issue is that the process was never written down, only performed.",
        "An agent forces the question. To build one you have to make the implicit rules explicit, and that exercise on its own often delivers more value than the software does. Several times we have finished the discovery phase and told a client the useful deliverable is the documented process, not an agent.",
        "Where the agent does earn its place is in the consistency. The same inputs produce the same handling in Stockholm and in Lisbon, and the exceptions escalate to a person with the context already assembled rather than being resolved differently in each office.",
      ],
    },
    {
      heading: "Why EU-native delivery matters for this work",
      body: [
        "We are an EU company, our data stays in the EU by default, and the processor chain is documented before customer data moves. For European buyers this removes an entire category of procurement friction that comes with a non-EU vendor.",
        "It also removes a real architectural constraint. If a workflow can only run on infrastructure outside the EU, that is a decision to take deliberately with the trade-off visible, not a default to discover during a data protection review.",
        "On a multi-country rollout there is a second-order benefit: we scope against the national supplements rather than assuming GDPR is uniform. Employee data handling in Germany is not the same as in Sweden, and a rollout plan that ignores that will stall in the second market.",
      ],
    },
    {
      heading: "Which markets we cover, honestly",
      body: [
        "We work with companies across the EU and EEA. Dedicated pages exist for Stockholm, Copenhagen, Zurich and Amsterdam because those are the markets where we have the most context and the clearest sector picture. Switzerland sits outside the EU and EEA, and that page covers the revFADP position specifically.",
        "Other European markets are handled the same way: remotely by default, with travel for the sessions that need a room. What we will not do is publish a page per European city implying local presence in each. That is a doorway-page pattern, it is dishonest, and Google treats it as spam.",
        "If your market does not have a page, that says nothing about our willingness to work there. It says we have not yet done enough work in it to write something specific enough to be worth reading.",
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
      name: "Multi-market rollout",
      scope:
        "One workflow extended across markets, with national data-protection supplements scoped per country.",
      amount: "From EUR 45,000",
      timeline: "3 months and up",
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
    "You need a vendor with entities in several member states for procurement. We are a single Swedish sole proprietorship.",
    "The rollout requires native-language delivery teams in each market. Our working language is English.",
    "You want the same agent deployed identically in eight countries without scoping the national data-protection supplements. That plan fails in the second country.",
    "The goal is a group-wide AI platform before any single workflow has been proven. We would propose the opposite order.",
  ],
  faq: [
    {
      question: "Which European markets do you cover?",
      answer:
        "Companies across the EU and EEA, plus Switzerland and the UAE. Dedicated pages exist for Stockholm, Copenhagen, Zurich, Amsterdam and Dubai because those are the markets where we have enough context to write something specific. Others are handled the same way, remotely with travel when useful.",
    },
    {
      question: "Is our data required to stay in the EU?",
      answer:
        "By default, yes. We keep customer data in the EU and document the legal basis and processor chain for each project. Where a capability is only available outside the EU, that becomes an explicit scoping decision with the trade-off in front of you rather than a default.",
    },
    {
      question: "Do you work with multi-country teams?",
      answer:
        "Yes, and it is one of the better fits for this kind of work. Cross-border SaaS and multi-market operators usually have the same workflow problem in every market, because the process was performed rather than documented. Building the agent forces the rules to be written down, which is often the more valuable half of the project.",
    },
    {
      question: "Does GDPR work the same way in every member state?",
      answer:
        "Not in the places that matter for a rollout. The regulation is uniform but each member state supplements it, and the divergence shows up around employee data, national identifiers and retention periods. A multi-country plan that assumes uniformity will stall in the second market.",
    },
    {
      question: "How does the EU AI Act affect a multi-market project?",
      answer:
        "Helpfully, compared to GDPR. It is a regulation rather than a directive, so classification by risk tier happens once at scoping and then holds across every EU market. That makes it easier to plan against than the national data-protection supplements.",
    },
    {
      question: "Why do you not have a page for every European city?",
      answer:
        "Because we do not have local presence in every European city, and publishing a page per city implying otherwise is a doorway-page pattern that Google treats as spam and that buyers see through anyway. A market gets a page when we have enough specific context to write something worth reading.",
    },
    {
      question: "What does a first engagement look like?",
      answer:
        "Usually a scoped build on one workflow in one market, deliberately narrow, with a measurable outcome. Extending it across markets is a separate decision made after the first one works, not part of the initial commitment.",
    },
    {
      question: "Do you sign NDAs and work under our processor agreements?",
      answer:
        "Yes to both. NDAs are standard, and we would rather work inside your existing data processing agreements than insist on ours, which is usually faster through procurement anyway.",
    },
  ],
  relatedPostSlugs: [
    "ai-regulation-europe",
    "choosing-an-ai-agency",
    "ai-lead-generation",
  ],
  dateModified: "2026-09-03",
};
