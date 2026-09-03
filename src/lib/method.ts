/**
 * Published commitments and policies for the /how-we-work page.
 *
 * WHY THIS EXISTS
 * ---------------
 * The page-1 competitors for our target queries all publish verifiable
 * proof: implementation counts, pilot-to-production rates, ISO
 * certifications, named client outcomes. See `docs/seo-baseline.md`.
 *
 * VLIRTZ was founded in late 2025 and has no publishable client numbers
 * yet, and inventing them is not an option. So this page competes on the
 * other available axis: publishing exactly how we work, what we commit to,
 * and what we explicitly do not claim. That is verifiable in a different
 * way, and it is how the leading Amsterdam result ranks without a single
 * case study.
 *
 * WHEN REAL CASE STUDIES EXIST, this file should shrink and a
 * /case-studies section should carry the load instead. Commitments are a
 * good substitute for evidence, not a replacement.
 */

/** A commitment we are willing to be held to, in writing. */
export type Commitment = {
  title: string;
  /** What we promise, stated so that failing it would be obvious. */
  body: string;
};

export const commitments: Commitment[] = [
  {
    title: "We measure before we build",
    body: "Every build starts by measuring the existing workflow: case volume, handling time, where it stalls, which exceptions recur. You get that baseline in writing. Without it, neither of us can tell afterwards whether the system helped, and 'it feels faster' is not a result.",
  },
  {
    title: "You get an evaluation set built from your own failures",
    body: "We assemble a test set from your real historical cases, deliberately including the ones the agent gets wrong, and we report accuracy against known-correct outcomes. This is the artefact that lets someone safely change a prompt or swap a model a year after we leave.",
  },
  {
    title: "The code lives in your repository",
    body: "Code and configuration go into a repository you own, running on infrastructure you control. There is no VLIRTZ platform, no licence, and nothing you must keep paying us for in order to keep your own workflow running.",
  },
  {
    title: "Handover is complete, not deliberately partial",
    body: "A runbook, a training session with the people who will operate it, and a documented path for what to do when it breaks. We do not withhold operational knowledge to manufacture a retainer. If you take a sustain contract afterwards it should be because you want one.",
  },
  {
    title: "We will tell you not to build it",
    body: "If discovery shows your source data cannot support the workflow, or that the genuinely useful deliverable is a documented process rather than software, that is the recommendation you get. It is worse for our invoice and better for your budget, and it has happened.",
  },
  {
    title: "Data stays in the EU by default",
    body: "Before customer data moves we document the legal basis, the processor chain, where each processor stores data, and the retention period. Where a capability is only available outside the EU, that becomes an explicit decision you make with the trade-off visible, not a default you discover in an audit.",
  },
];

/**
 * Things we deliberately do not claim.
 *
 * Published because the competitors ranking above us all make quantified
 * claims, and a reader comparing pages should be able to see precisely
 * where we are a younger firm rather than being left to assume.
 */
export const nonClaims = [
  {
    claim: "We do not publish an implementation count",
    detail:
      "VLIRTZ was founded in late 2025. Agencies ranking alongside us cite figures like a hundred or more implementations, and we are not going to invent a number to sit next to theirs. When we have client outcomes we are permitted to publish, they will appear here with names or clear anonymisation, and not before.",
  },
  {
    claim: "We do not hold ISO 27001 or ISO 42001",
    detail:
      "Some competitors do, and if certification is a procurement requirement for you then that is a genuine reason to choose one of them. What we can do is work inside your existing processor agreements and security requirements, and document our processing to the standard your auditor asks for.",
  },
  {
    claim: "We are not a team of fifty",
    detail:
      "We are founder-led and deliberately small. That is the right shape for one scoped workflow and the wrong shape for staff augmentation or a programme needing ten people on site. We will say which one you need on the first call.",
  },
  {
    claim: "We do not claim model-agnostic superiority",
    detail:
      "Every agency says it picks the best tool for the job. In practice most builds land on a small set of sensible defaults, and the choice is driven by your data residency, latency and cost constraints rather than by any special insight on our side.",
  },
];

/** Concrete guardrails applied to every agent that can take an action. */
export const guardrails = [
  {
    name: "Read-only first",
    detail:
      "An agent begins with read access only. Write access to any system of record is added deliberately, per action, after the read-only version has demonstrated it interprets the cases correctly.",
  },
  {
    name: "Approval gates on irreversible actions",
    detail:
      "Anything expensive or awkward to undo requires human approval. Moving money, contacting a customer, changing a filed figure, or affecting someone's access to a service all sit behind a gate by default, permanently where that is the right answer.",
  },
  {
    name: "Confidence-based escalation",
    detail:
      "Where the agent cannot resolve a case within its defined bounds, it escalates to a person with the context already assembled, rather than guessing. A useful escalation is a success, not a failure.",
  },
  {
    name: "Full tool-call audit log",
    detail:
      "Every action, its inputs, and the decision behind it are recorded. This is what makes an incident investigable, and under FINMA, NIS2 or medical-device rules it is a requirement rather than a nicety.",
  },
  {
    name: "Defined rollback",
    detail:
      "Any action touching a system of record has a documented way to reverse it. If an action genuinely cannot be reversed, it does not get automated without an approval gate in front of it.",
  },
  {
    name: "Role-scoped access",
    detail:
      "The agent's permissions are scoped to the workflow it runs, not to everything its service account could technically reach. Broad credentials are the most common security shortcut in agent projects and we do not take it.",
  },
];
