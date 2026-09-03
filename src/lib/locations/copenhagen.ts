import type { Location } from "./types";

/**
 * Copenhagen: served remotely from Stockholm. No Danish office.
 *
 * The previous version of this copy claimed a "35-minute flight", which is
 * wrong: Arlanda to Kastrup is a little over an hour in the air. Keeping
 * checkable facts checkable matters more here than a snappier number.
 */
export const copenhagen: Location = {
  slug: "copenhagen",
  city: "Copenhagen",
  country: "Denmark",
  kind: "city",
  metaTitle: "AI Software Agency in Copenhagen",
  metaDescription:
    "VLIRTZ is a Nordic AI software agency working with Copenhagen companies. AI agent development, AI consulting and AI lead generation, delivered remotely from Stockholm with on-site visits when a project needs one.",
  keywords: [
    "AI software agency Copenhagen",
    "AI agency Copenhagen",
    "AI consulting Copenhagen",
    "AI agent development Copenhagen",
    "AI lead generation Copenhagen",
  ],
  heroKicker: "Serving Copenhagen remotely",
  heroHeading: "AI software agency for Copenhagen companies",
  heroDescription:
    "We are a Stockholm-headquartered AI software agency working with Danish companies. No Copenhagen office, no time difference, a little over an hour in the air when a project needs us in the room.",
  timezone: "CET / CEST, no time difference from Stockholm",
  dataLaw: "GDPR, supervised by Datatilsynet, with data kept in the EU by default",
  currency: "DKK",
  sectors: [
    "life sciences and pharma",
    "cleantech and energy",
    "maritime and shipping",
    "design and consumer brands",
  ],
  marketNote:
    "Copenhagen and Stockholm share enough business culture that most of our Danish conversations open the same way the Swedish ones do: measured scepticism about AI vendors, and a clear preference for a small pilot over a large commitment. Danish buyers also tend to ask the operational questions earlier than buyers elsewhere in Europe, which we consider a good sign. We keep the first engagement deliberately small, and we would rather tell you a workflow is not worth automating than sell you a build that quietly underperforms.",
  localRegulators: [
    {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      note: "Applies in full. Denmark supplements it with the Danish Data Protection Act, which matters most around employee data and the processing of national identification numbers.",
    },
    {
      name: "Datatilsynet",
      fullName: "The Danish Data Protection Agency",
      note: "Denmark's supervisory authority, and notably active on cloud processing in the public sector. If you are a Danish public body or a supplier to one, its cloud guidance shapes where a model is allowed to run.",
    },
    {
      name: "EU AI Act",
      fullName: "Regulation (EU) 2024/1689 on artificial intelligence",
      note: "Applies to Danish companies on the same phase-in as the rest of the EU. Life sciences clients in particular should classify deliberately, since a workflow touching clinical or safety data can land a tier higher than expected.",
    },
    {
      name: "NIS2",
      fullName: "Directive (EU) 2022/2555 on network and information security",
      note: "Relevant for energy, transport and health entities. It affects incident reporting and supply-chain security, which in practice means the logging and access controls around an agent are in scope, not just the model.",
    },
    {
      name: "CVR",
      fullName: "Det Centrale Virksomhedsregister, the Danish Central Business Register",
      note: "The authoritative public source for Danish company data, and a genuinely useful signal source for lead generation work, since it is open, structured and current.",
    },
  ],
  sections: [
    {
      heading: "What Danish companies bring us",
      body: [
        "Copenhagen's life sciences cluster generates a particular kind of request: documentation-heavy workflows where the bottleneck is reading and cross-checking rather than deciding. Regulatory submissions, supplier qualification, adverse-event triage. These are good candidates precisely because the source material is written down and the correct answer is verifiable, which is what makes an evaluation set possible.",
        "Cleantech and energy clients tend to arrive with operational monitoring problems: alarm floods where most alerts are noise and the important one is buried. The valuable agent is the one that assembles context around each alert and ranks it, not the one that tries to resolve it autonomously.",
        "Maritime and shipping brings us document extraction at volume, usually across formats that were never designed to be machine-readable. That work lives or dies on retrieval quality rather than reasoning, and we are direct about that up front because it changes where the budget goes.",
      ],
    },
    {
      heading: "How remote delivery to Denmark actually works",
      body: [
        "We do not have a Copenhagen office and we will not pretend otherwise. What we have is no time difference, overlapping business culture, and a direct flight when the work calls for a room rather than a call.",
        "In practice the split is straightforward. Kickoff and handover are worth doing in person, and we travel for them. The build itself runs remotely with a short weekly review, which is how it would run even if we were down the street. The observation sessions where we watch someone actually do the workflow can be done over a screen share, though they go faster in person.",
        "Meetings run in English. Danish and Swedish are close enough on paper that written Danish is largely readable to us, but we are not going to claim spoken fluency we do not have, and English is the working language in most Copenhagen tech teams anyway.",
      ],
    },
    {
      heading: "The Danish system integrations that come up",
      body: [
        "Danish businesses run on a specific set of tools, and an agent that cannot reach them is not useful. Accounting and invoicing typically means e-conomic, Billy or Dinero. Public sector and public-adjacent work often means case management in WorkZone. Identity and payment flows touch MitID and NemKonto.",
        "None of these are exotic, but they are not the integrations a generic AI vendor has built before, and the difference between a two-day and a two-week integration is usually whether someone has read the API's pagination and rate-limit behaviour before quoting.",
        "We scope integrations against the actual API rather than the marketing page, and we say clearly when a system's interface will not support what the workflow needs.",
      ],
    },
  ],
  pricingBands: [
    {
      name: "AI opportunity review",
      scope:
        "One to two weeks of workshops and measurement, ending in a ranked recommendation and a scoped first build.",
      amount: "DKK 15,000-30,000",
      timeline: "1 to 2 weeks",
    },
    {
      name: "Scoped agent build",
      scope:
        "One workflow, running end to end in your tools, with human review gates and a handover runbook.",
      amount: "DKK 90,000-225,000",
      timeline: "2 to 4 weeks",
    },
    {
      name: "AI consulting sequence",
      scope:
        "Target architecture, data residency mapping, and a staged rollout plan your own engineers implement.",
      amount: "DKK 60,000-135,000",
      timeline: "4 weeks",
    },
    {
      name: "Sustain retainer",
      scope:
        "Monitoring, drift checks, model and prompt updates, and a defined response time on failures.",
      amount: "DKK 6,500-19,000 per month",
      timeline: "Rolling",
    },
  ],
  notForYouIf: [
    "You need a supplier with a Danish entity and a Copenhagen address for procurement reasons. We are a Swedish sole proprietorship and cannot pretend otherwise.",
    "The workflow requires spoken Danish with end customers. We can build the system, but we are not the right partner to tune Danish-language customer-facing copy.",
    "You want on-site presence several days a week. That is a reasonable requirement and it points to a local agency, not to us.",
    "Your first ask is a company-wide AI assistant. We would decline the scope and propose one workflow instead, which may not be the engagement you were looking for.",
  ],
  faq: [
    {
      question: "Do you have an office in Copenhagen?",
      answer:
        "No. We are headquartered in Stockholms lan and work with Copenhagen clients remotely, travelling for kickoffs and key milestones. We would rather be clear about that than imply a Danish presence we do not have.",
    },
    {
      question: "How do you handle being in a different country?",
      answer:
        "There is no time difference, so working hours line up completely. Kickoff and handover are worth doing in person and we fly for them, a little over an hour from Stockholm. The build itself runs remotely with a weekly review, which is how it would run regardless of distance.",
    },
    {
      question: "Is there a language barrier?",
      answer:
        "No. Meetings and documentation run in English, which is the working language in most Copenhagen tech teams. Written Danish is largely readable to us given how close it is to Swedish, but we do not claim spoken Danish fluency.",
    },
    {
      question: "How much does an AI agent cost in Denmark?",
      answer:
        "A scoped single-workflow build is the usual entry point, with a shorter discovery review ahead of it if the use case is not yet settled. The number moves with how many systems the agent touches, how usable your data is, and how costly a wrong action would be. The pricing page sets out the bands and the drivers.",
    },
    {
      question: "Can you work with Danish public sector bodies?",
      answer:
        "We can, though procurement is the constraint rather than the technology. Datatilsynet's guidance on cloud processing in the public sector is directly relevant to where a model may run, and we scope that before any data moves rather than after signature.",
    },
    {
      question: "Do you integrate with Danish systems like e-conomic or WorkZone?",
      answer:
        "Yes, and we scope those integrations against the actual API rather than the marketing page. Danish business tooling is not exotic, but it is not what a generic AI vendor has usually built against, and the honest estimate depends on how the specific API handles pagination, rate limits and error states.",
    },
    {
      question: "What sectors do you work with in Denmark?",
      answer:
        "Life sciences and pharma, cleantech and energy, maritime and shipping, and design and consumer brands. Documentation-heavy workflows and alert triage are the two shapes that come up most often.",
    },
    {
      question: "Does NIS2 affect an AI agent project?",
      answer:
        "If you are an in-scope entity in energy, transport or health, yes, and more than people expect. It pushes incident reporting and supply-chain security obligations onto the logging and access control around the agent, not just onto the model. We treat that as build scope rather than paperwork added at the end.",
    },
    {
      question: "Can you help with lead generation in the Danish market?",
      answer:
        "Yes. CVR is unusually good source material for this, being open, structured and current, which makes Danish company data easier to work with than most European equivalents. We use public and first-party signals to identify and score prospects rather than buying a list.",
    },
  ],
  relatedPostSlugs: [
    "choosing-an-ai-agency",
    "ai-regulation-europe",
    "ai-agent-development",
  ],
  dateModified: "2026-09-03",
};
