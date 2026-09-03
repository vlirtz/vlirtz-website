---
title: "GDPR, the EU AI Act and revFADP: what actually changes in an AI build"
description: "The European rules that shape AI agent architecture rather than just the contract, and what each one concretely changes about how a system is designed."
date: "2026-08-27"
dateModified: "2026-09-03"
author: "Borja Javierre i Moyano"
image: "/images/books-workspace.jpg"
keywords:
  - EU AI Act
  - GDPR AI compliance
  - revFADP
  - NIS2 AI
  - AI data residency Europe
---

Most vendors treat European regulation as a paragraph added to a proposal before signature. That is the reason a large share of European AI pilots never reach production: the constraints that should have shaped the architecture arrive after it has been built.

This post is about which rules actually change engineering decisions, and what they change. It is not legal advice, and we are not lawyers. It is what we have learned scoping builds against these regimes.

## The distinction that matters

There are two kinds of compliance work on an AI project.

**Documentation obligations** can be satisfied at the end. Records of processing, privacy notices, retention schedules. Tedious, necessary, and not architectural.

**Architecture constraints** cannot. Where data may physically sit, which actions must remain reversible, what has to be auditable, and whether a decision may be made without a human. Retrofitting any of these means rebuilding.

Vendors who do not separate the two will tell you compliance is "handled". Ask which of these two they mean.

## GDPR: the parts that bite on an AI build

GDPR applies to every EU project and reaches well beyond the EU. For an agent build, three parts do real work.

**Legal basis for the processing.** Not the website cookie question. The question of why you are permitted to run this specific data through this specific system. It needs answering before data moves, and it constrains which data you may use at all.

**The processor chain.** Every model provider, hosting provider and vector store in the path is a processor or sub-processor. Each needs to be identified, contracted, and located. This is the constraint that most often eliminates a model provider from consideration.

**Automated decision-making.** Article 22 territory. If the workflow makes a decision that significantly affects a person, that is a different category of system with different obligations. This is the one that surprises people, because "we just automated the triage" can turn out to mean "we automated a decision about someone's access to a service".

The practical consequence for us: before any customer data moves we write down the legal basis, the processor chain, where each processor stores data, and the retention period. Where the workflow decides something about a person, we identify it explicitly and design the human review gate around it.

### National supplements, which are the real cross-border trap

GDPR is a regulation, so it is uniform. Each member state then supplements it, and the divergence lands exactly where multi-country rollouts hurt: employee data, national identification numbers, and retention periods.

A rollout plan that assumes GDPR is identical everywhere works in the first market and stalls in the second. If you operate in several member states, establishing your lead supervisory authority under the one-stop-shop mechanism early saves considerable confusion later.

## The EU AI Act: classify once, deliberately

The Act is a regulation rather than a directive, which makes it easier to plan against than GDPR's national supplements. Classification by risk tier happens once and then holds across every EU market.

Most internal workflow agents land in the limited-risk band and need transparency rather than conformity assessment. That is genuinely the common case, and vendors who imply every AI system is high-risk are selling compliance theatre.

But the classification is a decision to make deliberately at scoping, not an assumption. The workflows that classify higher than clients expect:

- Anything touching hiring, promotion, or task allocation
- Credit and insurance decisions
- Access to essential services
- Clinical or safety-relevant data in a medical context
- Biometric processing of any kind

Get this wrong in the optimistic direction and the remediation cost is substantial.

## revFADP: Switzerland is a separate problem

The revised Swiss Federal Act on Data Protection has been in force since 1 September 2023. It is close to GDPR in shape but not identical, and the differences that matter for AI work are the record-of-processing obligations, the treatment of profiling, and the fact that penalties can attach to individuals rather than only to companies.

The complexity in practice is not revFADP alone. It is that Switzerland sits outside the EU and the EEA while most Zurich companies still process the data of EU residents, so **dual scope is the normal case**. A vendor who has not noticed that is a risk.

The FDPIC's position on cross-border transfers is what determines whether a given model provider is usable for a given dataset, which makes it an architecture input rather than a legal footnote.

### FINMA, where it applies

For Swiss banking and insurance clients, FINMA's outsourcing expectations do more to shape the architecture than the data protection rules do. They determine what may be delegated, what has to remain auditable, and what must stay reversible.

Concretely, in our builds that means every tool call logged with its inputs and the decision behind it, role-scoped access rather than broad service credentials, a documented rollback for anything touching a system of record, and an explicit boundary between what the agent may do alone and what needs approval.

This is why draft-and-approve is usually the only deployable design in Swiss regulated work. And it is not a limitation worth mourning: it is easier to make reliable and it captures most of the value anyway.

## NIS2: the one people forget

A directive rather than a regulation, so national transpositions differ. If you are an in-scope entity in energy, transport, health or several other sectors, it reaches your agent more than expected.

The incident reporting and supply-chain security obligations land on the **logging and access control around the system**, not merely on the model. Which means those are build scope, not paperwork. The same logging is what makes an incident investigable, so this is not overhead sitting on top of a working system; it is part of what makes it one.

## Data residency, answered properly

The question every European buyer asks, and the one where a vague answer should disqualify a vendor.

A proper answer is a map: each processing step, the named provider handling it, the region the data sits in, and the legal basis. That document should exist before any customer data moves, and you should keep it.

Where a capability is only available from a provider that cannot offer EU or Swiss processing, that becomes an explicit scoping decision with the trade-off visible. Sometimes the answer is a smaller model in an acceptable region and a slightly worse result. Sometimes the answer is that the workflow is not a good candidate yet.

Both are better than discovering the problem during an audit, which is the alternative.

## Who supervises you, by market

Knowing the name of your own regulator sounds basic, and it is the thing most often missing from a project brief.

| Market | Data protection authority | Sector overlay worth checking |
| --- | --- | --- |
| Sweden | IMY, Integritetsskyddsmyndigheten | Finansinspektionen if licensed |
| Denmark | Datatilsynet | Finanstilsynet; NIS2 for energy, transport, health |
| Netherlands | Autoriteit Persoonsgegevens | AFM and DNB for payments and lending |
| Switzerland | FDPIC, the EDOEB | FINMA for banking and insurance; Swissmedic for pharma |

Two of these deserve specific mention. **Datatilsynet** has been notably active on cloud processing in the public sector, so Danish public bodies and their suppliers should read its guidance before choosing where a model runs. **The Autoriteit Persoonsgegevens** has been among Europe's more assertive authorities on automated risk scoring, which matters directly if your workflow ranks, scores or filters people.

## The mistake that causes rebuilds

Almost every European AI project we have been asked to look at after it stalled failed the same way: the compliance question was asked after the system worked rather than before it was designed.

The specific pattern is nearly always one of these three:

**The data cannot legally sit where the system needs it.** A model provider was chosen for capability, and it turns out it cannot offer EU or Swiss processing for that capability. The system works and cannot be deployed.

**An action was automated that needed to stay reversible.** Discovered during a review rather than at design time. Adding an approval gate after the fact means reworking the orchestration, the interface, and the audit trail together.

**Nothing was logged in enough detail to investigate an incident.** Fine until the first incident. Then it is a serious problem, and retrofitting logging into an agent that was not built with it is close to a rewrite.

All three are avoidable in the first week for a fraction of what they cost in month four. This is the entire argument for treating compliance as an architecture input.

## What good looks like

A vendor handling this well will, before quoting a build:

- Name your supervisory authority without being told
- Ask which entity in your group owns each processing step
- Propose a risk classification under the EU AI Act, with reasoning
- Ask what a wrong action would cost you, and design the gates from the answer
- Give you a written processing map you keep

None of that requires a legal team. It requires having done it before.

## The short checklist

Before a build starts, you should have written answers to:

1. What is the legal basis for this processing?
2. Who is every processor in the chain, and where does each store data?
3. Does this workflow make a decision that significantly affects a person?
4. What is our EU AI Act risk classification, and why?
5. Which actions must remain reversible, and which need human approval?
6. What is logged, and would it be enough to investigate an incident?
7. If we are in Switzerland: are we in scope for revFADP and GDPR simultaneously?
8. If we are NIS2 in scope: do our access controls and incident path meet it?

If your vendor cannot help you answer these before quoting, they are quoting on an incomplete picture, and the number will change.

---

**Related reading:** [how AI agent development works](/blog/ai-agent-development) and [how to choose an AI agency](/blog/choosing-an-ai-agency).

Market-specific detail: [Zurich](/locations/zurich) for revFADP and FINMA, [Copenhagen](/locations/copenhagen) for Datatilsynet and NIS2, [Amsterdam](/locations/amsterdam) for the AP and WBSO, [Stockholm](/locations/stockholm) for IMY.
