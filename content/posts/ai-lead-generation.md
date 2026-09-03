---
title: "AI lead generation that does not annoy people"
description: "How to use AI to find and score prospects from public and first-party signals without buying a list, spamming a market, or breaking GDPR."
date: "2026-08-16"
dateModified: "2026-09-03"
author: "Borja Javierre i Moyano"
image: "/images/developer-focus.jpg"
keywords:
  - AI lead generation
  - AI prospecting
  - B2B lead generation Europe
  - GDPR lead generation
  - lead scoring
---

Most "AI lead generation" is a list purchase with a language model bolted on to write the emails. It produces volume, a damaged domain reputation, and a sales team that stops trusting the pipeline.

The version worth building does something different: it finds a smaller number of prospects who have a visible reason to care right now, and gives your salesperson the evidence for why.

## The actual problem

Sales teams do not usually lack contacts. They lack a defensible reason to prioritise one contact over another today.

So the useful question is not "how do we get more leads". It is "which twenty of these four thousand companies have a reason to talk to us this month, and what is the reason". That is a research problem, and research at volume is exactly what these systems are good at.

## Signals that mean something

A signal is only useful if it plausibly changes whether someone needs you now. Some that carry real information:

- **Hiring.** A company posting three roles for a function you serve has a stated, budgeted problem.
- **Funding and expansion.** New capital or a new market usually precedes operational strain.
- **Technology changes.** A visible platform migration, or a job ad naming the stack you work with.
- **Leadership changes.** A new head of a function reliably reviews vendors in their first two quarters.
- **Regulatory deadlines.** In Europe this is unusually rich. An entity newly in scope for NIS2, or facing an EU AI Act classification, has a dated obligation.
- **Public filings.** In the Nordics especially, company registers are open, structured and current.

Signals that mostly do not: company size alone, industry alone, having a website, being on a conference attendee list, using a technology thousands of companies use.

The test for any signal is whether you could put it in the first sentence of an email and have the recipient agree it is relevant. "You are hiring three support leads" passes. "You are a company in the Netherlands" does not.

## Where the AI actually helps

Four places, roughly in order of value:

**Reading at volume.** Job ads, filings, news, documentation. A person can read forty companies properly in a day. A pipeline can read four thousand and surface the forty worth reading properly.

**Cross-referencing.** A single signal is weak. Hiring plus a funding round plus a leadership change in the same function is a much stronger case, and assembling that across sources is tedious for a human and trivial to automate.

**Scoring against what your good clients look like.** Not firmographic lookalikes. Your actual closed-won accounts, and what was true about them at the moment they became interested.

**Drafting the specific first line.** Not the whole email. The one sentence that demonstrates someone actually looked. That sentence is the difference between a reply and a delete.

## Where it does not help

**Writing the whole sequence.** Fully generated outbound reads as fully generated outbound, and recipients have become very good at spotting it.

**Deciding who to talk to, unsupervised.** The scoring proposes; a human decides. Partly because the model will be confidently wrong sometimes, and partly because a salesperson who did not choose the account will not work it properly.

**Fixing a positioning problem.** If prospects do not understand what you sell, more precisely targeted outreach reaches more people who are confused. That is a messaging project.

## GDPR, without the hand-waving

This is where most AI lead generation quietly breaks the rules, and where European buyers should be most careful.

**Legitimate interest is available for B2B outbound, but it is a test, not a magic phrase.** You need a genuine interest, necessity, and a balance in favour of your interest over the person's rights. Documenting that assessment is the work.

**Public does not mean fair game.** Data being on a website does not automatically make any processing of it lawful. Scraping personal data at scale and building profiles is a different activity from looking up a company.

**Prefer company-level signals over personal profiling.** Almost everything genuinely useful above is about the company, not the individual. Building behavioural profiles of named individuals is both legally riskier and, in our experience, less useful.

**Transparency and opt-out have to actually work.** A recipient must be able to find out how you got their details and stop it, easily.

Our practical position: signals are company-level wherever possible, the legitimate interest assessment is documented before the first send, data stays in the EU, and there is a real suppression list rather than a checkbox. This is not just risk management, it also correlates with the outreach that performs better, because it forces relevance.

## The Nordic and European advantage nobody uses

If you sell into Europe, the public data available to you is unusually good, and most teams ignore it in favour of buying a database that everyone else also bought.

**Company registers are open and structured.** Denmark's CVR is the best example: current, machine-readable, and free. Sweden's Bolagsverket data, the Dutch KvK register and the Swiss commercial registers all carry filings, officer changes and registered activity. A leadership change or a new subsidiary is a genuine signal, and it is published.

**Financial filings are mandatory and public** for many entity types. Growth, headcount changes and auditor changes are all visible, and all plausibly indicate operational strain.

**Job postings are rich in the Nordics** because the market is transparent and roles are described in detail, often naming the exact stack. A posting that names the technology you specialise in is close to an inbound enquiry.

**Regulatory deadlines are dated and public.** This is the most underused signal category in Europe. An entity newly in scope for NIS2, or facing an EU AI Act classification on a known timeline, has an obligation with a date attached. Nobody has to be persuaded that the deadline exists.

The reason this matters strategically: signals derived from public registers are both more useful and lower risk than personal profiling, so the compliant path and the effective path point the same way. That is a rare alignment.

## What it costs to build

For the sake of not being coy about it: a working lead generation pipeline is a build like any other, and it lands in the same range as a scoped agent build, because that is effectively what it is.

The variance comes from how many sources you want read, how clean your own closed-won data is, and whether the output goes into a CRM or a spreadsheet. The single biggest cost saver is having your own historical won and lost data in usable shape before starting, because that is what the scoring is calibrated against. Teams that skip that step end up scoring against a persona document, which is scoring against a guess.

Running cost is mostly the reading. Refreshing signals across a few thousand companies weekly is a modest monthly bill, well under what most teams pay for the contact database they were going to buy anyway.

## What a working setup looks like

A structure that has held up for us:

1. **Define the good client precisely.** From closed-won accounts, and specifically what was true about them when they became interested. Not a persona document.
2. **Pick three or four signals** that plausibly indicate that state. Resist adding more; each one adds noise.
3. **Build the read-and-cross-reference pipeline.** Public sources plus your own first-party data. This is the engineering.
4. **Score, and show the evidence.** A score with no visible reasoning gets ignored by salespeople, correctly.
5. **Human picks from the shortlist.** Ranked, with the reason attached. The salesperson chooses.
6. **Draft the first line, not the email.** The specific observation. The human writes the rest.
7. **Measure replies and meetings, not sends.** Volume metrics will make a bad system look successful.

## The number that matters

Reply rate on a small, well-evidenced list beats total sends every time, and it is the only metric that survives contact with a sales team's opinion.

If a lead generation system increases sends by ten times and meetings by nothing, it has cost you your domain reputation for free. That outcome is common enough that it is worth stating as the primary risk of doing this badly.

---

**Related reading:** [how to choose an AI agency](/blog/choosing-an-ai-agency) and [what European AI regulation changes](/blog/ai-regulation-europe).

Market pages: [Amsterdam](/locations/amsterdam), [Zurich](/locations/zurich), [Copenhagen](/locations/copenhagen), [Dubai](/locations/dubai). Or see [our services](/services) and [pricing](/pricing).
