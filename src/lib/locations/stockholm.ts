import type { Location } from "./types";

/**
 * Stockholm: the only market where VLIRTZ is physically based, so this is
 * the one page allowed to promise in-person work as the default.
 */
export const stockholm: Location = {
  slug: "stockholm",
  city: "Stockholm",
  country: "Sweden",
  kind: "city",
  /**
   * Targets "ai consulting stockholm" rather than "ai software agency
   * stockholm", which the homepage owns. Both pages cover the same market,
   * so keeping their primary terms distinct stops them competing with each
   * other. See the keyword map in `src/app/page.tsx`.
   */
  metaTitle: "AI Consulting in Stockholm",
  metaDescription:
    "VLIRTZ is an AI consultancy and software agency headquartered in Stockholms lan. AI agent development, AI consulting and AI lead generation for Swedish companies, with on-site work as the default.",
  keywords: [
    "AI consulting Stockholm",
    "AI consultant Stockholm",
    "AI agency Stockholm",
    "AI software agency Stockholm",
    "AI lead generation Stockholm",
  ],
  heroKicker: "Headquartered here",
  heroHeading: "AI consulting in Stockholm",
  heroDescription:
    "VLIRTZ is based in Stockholms lan. If you are a Stockholm company, the first meeting can happen at your office rather than on a call, and so can the workshops that follow.",
  timezone: "CET / CEST (UTC+1/+2)",
  dataLaw: "GDPR, supervised by IMY, with data kept in the EU by default",
  currency: "SEK",
  sectors: [
    "fintech and payments",
    "logistics and e-commerce",
    "gaming and consumer software",
    "professional services",
  ],
  marketNote:
    "Stockholm has one of the densest concentrations of software talent in the Nordics, which also means the bar for a credible AI vendor is high. Buyers here have usually already sat through a demo that worked beautifully on curated data and fell apart on their own. We do not sell a platform. We sit inside your stack, agree on one workflow, ship it, and show you the cases where it fails before you find them yourself. Being local means that conversation happens in a room.",
  localRegulators: [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "Applies in full. For an AI project the parts that actually bite are the legal basis for processing, the record of processing activities, and whether an automated decision affects someone's rights. We document all three before customer data moves.",
    },
    {
      name: "IMY",
      fullName: "Integritetsskyddsmyndigheten, the Swedish Authority for Privacy Protection",
      note: "Sweden's data protection supervisory authority. IMY has published guidance on automated decision-making that is worth reading before you scope anything customer-facing.",
    },
    {
      name: "EU AI Act",
      fullName: "Regulation (EU) 2024/1689 on artificial intelligence",
      note: "Obligations phase in by risk tier. Most internal workflow agents land in the limited-risk band and need transparency rather than conformity assessment, but the classification is a decision to make deliberately at scoping, not an assumption.",
    },
    {
      name: "Finansinspektionen",
      fullName: "The Swedish Financial Supervisory Authority",
      note: "Relevant if you are a licensed institution. Outsourcing and operational resilience expectations shape where a model can run and what has to stay reversible.",
    },
  ],
  sections: [
    {
      heading: "What Stockholm companies actually ask us to build",
      body: [
        "The requests cluster. Stockholm's fintech and payments companies come to us about operational load that scaled faster than headcount: reconciliation exceptions, merchant onboarding checks, and the long tail of support tickets that need someone to look something up in three systems before answering. None of that needs a frontier model. It needs a reliable agent with the right read access and a human on the expensive decisions.",
        "Logistics and e-commerce teams ask about a different shape of problem. They usually have one person who is very good at judging exceptions, and that person is a bottleneck and a single point of failure. The useful build is the one that captures the ninety percent of cases where the judgement is actually a rule, and escalates the rest to that person with the context already assembled.",
        "The pattern we push back on is the one where a company wants an assistant across the whole business. That is a platform commitment dressed as a pilot, and it is the reason so many Stockholm buyers are already sceptical when they call us. One workflow, measured, shipped, then the next.",
      ],
    },
    {
      heading: "Why being in Stockholms lan changes the work",
      body: [
        "Most AI projects fail on context rather than capability. The engineer building the agent does not know that the finance team ignores one field because it has been wrong since a migration in 2019, or that the exception queue is actually triaged by someone in a different department. That knowledge does not survive a written brief. It comes out when you sit next to someone while they do the job.",
        "Because we are based in Stockholms lan, that observation session is the default for Stockholm clients rather than a line item someone cuts for budget reasons. Kickoffs, mid-build reviews, and handover training happen in your office. The distance is a commute, not a flight.",
        "It also means workshops can run in Swedish. Delivery documentation stays in English by default, because that is what tends to survive team changes, but the conversation where the real requirements surface should happen in whichever language your team thinks in.",
      ],
    },
    {
      heading: "How we handle GDPR without turning it into theatre",
      body: [
        "Every Swedish buyer asks about data protection, and most have been given a reassuring answer with nothing behind it. Ours is procedural. Before any customer data moves, we write down the legal basis for the processing, which processors are in the chain, where each one stores data, and what the retention period is. If the workflow makes a decision that affects an individual, we identify that explicitly and design the human review gate around it.",
        "Data stays in the EU by default. Where a model provider cannot offer EU processing for a given capability, that becomes a scoping decision you make with the trade-off in front of you, rather than something discovered in an audit later.",
        "We sign NDAs as a matter of course, and we are happy to work inside your existing processor agreements rather than insisting on ours.",
      ],
    },
  ],
  pricingBands: [
    {
      name: "AI opportunity review",
      scope:
        "One to two weeks of workshops and measurement, ending in a ranked recommendation and a scoped first build.",
      amount: "SEK 22,000-45,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow, running end to end in your tools, with human review gates and a handover runbook.",
      amount: "SEK 135,000-340,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "AI consulting sequence",
      scope:
        "Target architecture, data residency mapping, and a staged rollout plan your own engineers implement.",
      amount: "SEK 90,000-200,000",
      timeline: "4 weeks",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "SEK 10,000-28,000 per month",
      timeline: "Rolling",
    },
  ],
  notForYouIf: [
    "You want a fixed quote before anyone has looked at your data. We can size a discovery engagement blind, but not a build.",
    "You need a team of ten on site from next week. We are deliberately small and founder-led, which is the right shape for one workflow and the wrong shape for staff augmentation.",
    "The goal is an AI announcement rather than a working system. That project can be done faster and cheaper by an agency that does not care whether it survives contact with production.",
    "Your source data is genuinely unusable and nobody wants to fix it. We will say so in discovery, and the honest recommendation will be a data project before an AI one.",
  ],
  faq: [
    {
      question: "Do you work on-site in Stockholm?",
      answer:
        "Yes. We are based in Stockholms lan, so on-site workshops, kickoffs and handover training are the default for Stockholm clients rather than an exception. The observation sessions where real requirements surface are much harder to run over video.",
    },
    {
      question: "What does a first engagement look like?",
      answer:
        "Usually one of two shapes: a scoped two-to-four week build targeting a single workflow with a measurable outcome, or a four-week consulting sequence if the harder question is which use case to pick. Both end with something written down that survives us leaving.",
    },
    {
      question: "Can you present and run workshops in Swedish?",
      answer:
        "Yes. Meetings and workshops run in Swedish or English, whichever your team prefers. Delivery documentation is in English by default because it tends to outlive team changes, but we will write it in Swedish if you would rather.",
    },
    {
      question: "How much does an AI agent cost in Stockholm?",
      answer:
        "A scoped single-workflow build is the common starting point, with a discovery review ahead of it if the use case is not settled. What moves the number is how many systems the agent touches, how usable your data already is, and how expensive a wrong action would be. Our pricing page breaks down the bands and the cost drivers.",
    },
    {
      question: "How do you handle GDPR and IMY expectations?",
      answer:
        "Before any customer data moves, we document the legal basis, the processor chain, where each processor stores data, and the retention period. Where the workflow makes a decision affecting an individual, we identify that explicitly and build the human review gate around it. Data stays in the EU by default.",
    },
    {
      question: "Do we need an AI strategy before we talk to you?",
      answer:
        "No, and most Stockholm clients do not have one. Starting from a specific problem that costs you time or revenue is a better opening than a strategy document, because it gives us something measurable to point the first build at.",
    },
    {
      question: "How is this different from hiring a Swedish freelancer?",
      answer:
        "A good freelancer will build what you specify. Our work is usually the step before that: deciding what is worth building, measuring the workflow as it actually runs, and designing where a human stays in the loop. If you already have a clear specification and just need hands, a freelancer is probably better value.",
    },
    {
      question: "What happens after the system is delivered?",
      answer:
        "You get a runbook, an evaluation set built from your real cases including the failures, and a handover session with the people who will operate it. After that you can run it yourself or put us on a sustain retainer for monitoring and model updates. We do not make the handover deliberately incomplete to keep you dependent.",
    },
    {
      question: "Which sectors do you see most in Stockholm?",
      answer:
        "Fintech and payments, logistics and e-commerce, gaming and consumer software, and professional services. The underlying problem is usually the same across all four: a workflow that depends on one person's judgement and does not scale.",
    },
  ],
  relatedPostSlugs: [
    "hiring-an-ai-agency-stockholm",
    "ai-agent-development",
    "ai-agent-development-cost",
  ],
  dateModified: "2026-09-03",
};
