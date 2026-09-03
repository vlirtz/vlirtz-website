/**
 * Content shared by the agent-development hub and every market page.
 *
 * The delivery method and the architecture position are the same wherever
 * the client is, so they live here once. Anything that genuinely differs by
 * market (use cases, regulators, currency) lives in the market files.
 */

/** A stage in how a scoped agent build actually runs. */
export type DeliveryStage = {
  /** Ordinal label, e.g. "01". */
  step: string;
  name: string;
  duration: string;
  body: string;
  /** What the client physically has at the end of this stage. */
  deliverable: string;
};

export const deliveryStages: DeliveryStage[] = [
  {
    step: "01",
    name: "Watch the workflow being done",
    duration: "2 to 4 days",
    body: "We sit with the people who run the process today, and we measure it: how many cases, how long each takes, where they stall, and which exceptions actually recur. Most projects that fail do so because this step was skipped and the brief described the process as management believes it works rather than as it runs.",
    deliverable:
      "A measured baseline you can hold the finished system against, and a written list of the exceptions nobody had documented.",
  },
  {
    step: "02",
    name: "Build the thin version on your real data",
    duration: "3 to 5 days",
    body: "Not a demo on a curated sample. Your records, including the ones with missing fields and inconsistent formatting. This is where you discover that a third of the source rows lack something the workflow depends on, and it is much better to discover that in week one than in month three.",
    deliverable:
      "A narrow tool running on production-shaped data, and an honest assessment of whether the rest is worth building.",
  },
  {
    step: "03",
    name: "Close the agent loop",
    duration: "1 to 2 weeks",
    body: "Now the agent plans across steps, calls the tools it needs, and handles the cases the thin version could not. Human review gates go on every action that is expensive to undo. We build the evaluation set from your real cases at the same time, including the failures, because an agent with no evaluation set is an agent nobody can safely change later.",
    deliverable:
      "A working agent, an evaluation suite built from your own cases, and audit logging on every tool call.",
  },
  {
    step: "04",
    name: "Hand it over properly",
    duration: "2 to 4 days",
    body: "A runbook, a training session with the people who will operate it, and a documented path for what to do when it breaks. We do not make handover deliberately incomplete to keep you dependent on us. If you want us to keep operating it, that is a separate retainer you choose, not a trap you fall into.",
    deliverable:
      "Runbook, handover session, and the code and configuration in your own repository.",
  },
];

/**
 * Architectural positions we hold across every build. Published because
 * these are the questions that separate a vendor who has shipped an agent
 * from one who has shipped a demo.
 */
export const buildPrinciples = [
  {
    principle: "Bounded autonomy by default",
    detail:
      "An agent starts read-only and draft-first. Actions that are expensive or awkward to reverse stay behind a human approval gate, permanently if that is the right answer. Full autonomy is something a system earns by demonstrating accuracy on your evaluation set, not a launch feature.",
  },
  {
    principle: "An evaluation set from your real cases",
    detail:
      "Built from your actual records, including the ones the agent gets wrong. Without it, nobody can safely change a prompt or swap a model six months later, which is how working systems quietly rot.",
  },
  {
    principle: "Every tool call logged",
    detail:
      "Each action, its inputs, and the decision behind it are recorded. This is what makes an incident investigable, and under FINMA, NIS2 or medical-device rules it is a requirement rather than a nicety.",
  },
  {
    principle: "Retrieval quality over model size",
    detail:
      "Most disappointing agents are not under-powered, they are under-informed. Getting the right context in front of the model reliably matters more than which model it is, and it is where the engineering effort usually belongs.",
  },
  {
    principle: "Your repository, your infrastructure",
    detail:
      "Code and configuration live in your repository and run on infrastructure you control. There is no VLIRTZ platform you have to keep paying for to keep your own workflow running.",
  },
  {
    principle: "One workflow before three",
    detail:
      "We decline company-wide assistant scopes. A single workflow, measured and shipped, tells you more about whether this approach works for you than any roadmap, and it is recoverable if the answer is no.",
  },
];

/**
 * Honest limits on what an agent is good for. Published because the fastest
 * way to lose a client in month two is to have oversold in month one.
 */
export const agentLimits = [
  {
    limit: "It will not fix a process nobody has agreed on",
    detail:
      "If two departments genuinely disagree about how a case should be handled, an agent forces that disagreement into the open rather than resolving it. That is useful, but it is a management outcome, not a technical one.",
  },
  {
    limit: "It will not rescue unusable source data",
    detail:
      "Retrieval over clean, structured records is straightforward. Retrieval over scanned documents, three competing sources of truth, and a field that has been wrong since a migration is where budgets disappear. Sometimes the honest recommendation is a data project first.",
  },
  {
    limit: "It will not be right every time",
    detail:
      "The question is never whether it makes mistakes, it is whether the mistakes are caught before they cost anything. That is what the review gates and the evaluation set are for, and it is why we measure the baseline first.",
  },
  {
    limit: "It will not maintain itself",
    detail:
      "Models change and your source systems change. An unmaintained agent degrades quietly rather than failing loudly, which is worse. Budget for maintenance or plan to retire it.",
  },
];
