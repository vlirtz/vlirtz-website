---
title: "How to choose an AI agency in Europe"
description: "The questions that separate an AI agency who has shipped a production system from one who has shipped a demo, and how the Stockholm, Copenhagen, Zurich and Amsterdam markets differ."
date: "2026-08-25"
dateModified: "2026-09-03"
author: "Borja Javierre i Moyano"
image: "/images/consulting-meeting.jpg"
keywords:
  - how to choose an AI agency
  - AI agency comparison
  - European AI agency
  - AI vendor selection
  - AI consultancy evaluation
---

We are an AI agency, so treat this with the scepticism it deserves. But we also lose deals to firms who oversold, and we get called in after projects that failed for reasons that were visible during procurement. Both are worth writing down.

Here is what we would actually ask if we were buying this rather than selling it.

## Eight questions that separate shippers from demoers

### 1. "What would you refuse to automate in our workflow?"

The single most useful question on this list. A vendor who cannot name anything they would keep behind a human gate has not thought about your risk, or is not going to tell you about it.

Good answers sound like: anything that moves money, anything that contacts a customer unsupervised, anything affecting someone's access to a service, anything you cannot reverse.

### 2. "How will we know afterwards whether it worked?"

The answer should involve a number measured before the build starts. If the plan is to assess success after delivery by asking the team how it feels, there is no plan.

Insist on the baseline: cases per week, handling time, where the process stalls. It costs a few days and it is the only thing that makes the result arguable rather than a matter of taste.

### 3. "What happens when the model changes in six months?"

Listen for the words "evaluation set". A system with a test suite built from your real historical cases, including the failures, can be safely updated. A system without one cannot be touched by anyone who was not in the original build, which means it either freezes or breaks.

This is the question that most reliably distinguishes engineering teams from prototyping teams.

### 4. "Where does the code live, and what do we own?"

You want: code and configuration in your repository, running on infrastructure you control. You do not want a platform licence that stops your own workflow when you stop paying.

There are legitimate managed-platform offers, but you should know which one you are buying, because the total cost over three years differs enormously.

### 5. "Who is actually doing the work?"

Ask whether the person on the call is the person building the system. Small founder-led firms and large agencies both work, but the failure mode differs: the small firm may lack capacity, the large one may staff you with whoever is free.

### 6. "Show me where this failed"

Everyone has a story about a project that went sideways. A vendor who claims otherwise has either not shipped much or is not being straight. What you are listening for is whether they diagnosed it structurally or blamed the client.

### 7. "What is the smallest thing worth buying from you?"

If the answer is a six-figure transformation programme, and your problem is one workflow, that is a mismatch regardless of how good they are. The best first engagement is small enough that being wrong is survivable.

### 8. "Which regulator applies to us, and what does it change about the build?"

This one filters hard in Europe. A vendor who treats GDPR, the EU AI Act, revFADP or NIS2 as a paragraph for the contract rather than as architecture constraints will build something you cannot deploy.

## Verifying claims, when everyone claims the same things

Every agency page says senior team, production-grade, business-first. Some verifiable signals:

- **Named clients or clearly anonymised outcomes** beat unnamed superlatives. "A Nordic logistics operator, thirty hours a month" is a claim someone could be held to.
- **Published pricing** is a mild but real honesty signal. It costs a vendor optionality to publish it.
- **A stated non-claim.** A firm that tells you what it does not do or does not hold is easier to trust on the rest.
- **Certifications, if you need them.** ISO 27001 and ISO 42001 are meaningful if your procurement requires them, and irrelevant otherwise. Do not pay for them if you do not need them.
- **Company registration.** An org number, a CVR, a KvK number. Trivial to check and occasionally revealing.

On our own behalf: we publish [what we commit to and what we do not claim](/how-we-work), including that we do not publish an implementation count because we were founded in late 2025 and will not invent one.

## Local office, or the right team?

The most common real decision. Our honest view, as a firm with one office:

**Hire locally when** you need people in the building several days a week, your procurement requires a local entity, the work needs native-language customer-facing output, or the domain knowledge is genuinely regional.

**Hire outside your city when** the specialism matters more than proximity, your local market's senior rates are high relative to the work, the time zones overlap, and the vendor will travel for the sessions that need a room.

The sessions that genuinely benefit from being physically present are narrower than people assume: the initial observation of the workflow, and the handover training. Most of a build is the same over a screen share as across a desk.

## How the four Nordic and Western European markets differ

Having worked across these markets, the buying culture varies more than the technology does.

### Stockholm

A dense concentration of software talent, which raises the bar. Buyers have usually already seen a demo that worked on curated data and failed on theirs, so scepticism arrives early and specifically. Fintech and payments dominate the request mix. Expect to be asked about production reliability before capability.

### Copenhagen

Similar culture to Stockholm, with a stronger preference for a small pilot over a large commitment. Danish buyers ask operational questions earlier than most, which we consider a good sign. Life sciences and maritime generate an unusually high share of documentation-heavy workflows, which are the best agent candidates because the correct answer is verifiable. Local tooling matters: e-conomic, Billy, WorkZone.

### Zurich

The most compliance-led of the four. revFADP, FINMA and FDPIC shape the architecture, not just the contract, and Switzerland sitting outside the EU while most Swiss firms still process EU residents' data means dual scope is the normal case. Senior engineering rates are among Europe's highest, which is why Swiss buyers hire cross-border more often than you would expect. Draft-and-approve is usually the only deployable design.

### Amsterdam

The most price-transparent market of the four, and the most impatient with slideware. Dutch operators want to see something working on their own data before discussing a roadmap, and they ask what it costs in the first ten minutes. Both instincts are correct. The WBSO R&D tax credit is a genuine factor in project economics and is frequently overlooked.

## Red flags, ranked by how much they should worry you

From projects we have been called in to look at after they went wrong.

**Severe.** No baseline measurement was taken, so nobody can establish whether the system helped. This is the most common single cause of a project being judged a failure regardless of its actual quality.

**Severe.** No evaluation set. Six months later the model changes, the system degrades, and nobody dares touch it. It either freezes or gets thrown away.

**Severe.** The vendor accepted a company-wide assistant scope enthusiastically. Broad scope with no measurable outcome benefits the vendor and nobody else.

**Serious.** Compliance discussed as a contract paragraph rather than an architecture constraint. This is the reason a large share of European pilots never reach production.

**Serious.** The demo ran on sample data and you were never shown it on yours. Ask to see it fail.

**Worth probing.** Heavy emphasis on which model or framework they use. Retrieval quality and error handling determine the outcome far more, and a vendor leading on model choice may be optimising for the wrong thing.

**Worth probing.** No named engineer on the call. Find out who is actually building it before you sign, not after.

**Mild.** No published pricing. Common and not disqualifying, but the vendors who publish are making a small honesty bet, and it is a real signal.

## Two mistakes buyers make

Worth naming because both are avoidable and both are expensive.

**Buying scale you do not need.** A firm equipped for a multi-year governance-heavy programme will bring that apparatus to your one workflow, and you will pay for coordination you did not need. If your problem is one process, buy one process.

**Optimising for price on the wrong line.** The place to save money is scope: fewer systems touched, cleaner input data, a narrower first workflow. The place not to save money is the baseline measurement, the evaluation set, or the audit logging, because those three are what make the thing maintainable. Cutting them looks like a discount and behaves like a deferred cost.

## The shortest version

If you only ask three questions: what would you refuse to automate, how will we measure whether it worked, and what do we own at the end.

A vendor with good answers to those three will probably be fine on the rest. A vendor who deflects on any of them is telling you something.

---

**Related reading:** [how AI agent development works](/blog/ai-agent-development), [what it costs](/blog/ai-agent-development-cost), and [what European AI regulation changes about a build](/blog/ai-regulation-europe).

Market pages: [Stockholm](/locations/stockholm), [Copenhagen](/locations/copenhagen), [Zurich](/locations/zurich), [Amsterdam](/locations/amsterdam).
