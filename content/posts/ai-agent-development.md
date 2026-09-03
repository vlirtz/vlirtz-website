---
title: "AI agent development: how to build one that survives production"
description: "What an AI agent actually is, when it beats a chatbot or a script, and the build order that gets one into production instead of into a demo folder."
date: "2026-08-20"
dateModified: "2026-09-03"
author: "Borja Javierre i Moyano"
image: "/images/vercel-desk.jpg"
keywords:
  - AI agent development
  - AI agents
  - how to build an AI agent
  - agentic AI
  - AI agent architecture
---

Most "AI agents" on marketing sites are chatbots with extra adjectives. **AI agent development** is only worth paying for when the system can read context, plan more than one step, and take actions in tools your company already uses.

If the job is "answer questions from a PDF," you need retrieval, not an agent. If the job is "watch a mailbox, research the sender, draft a reply, update the CRM, and stop when confidence is low," you need an agent.

This post is the long version of how we build them, including the parts that usually go wrong.

## What an agent actually is

In our work an agent has four parts:

1. **Perception.** It reads the systems that hold the truth about a case: a database, a mailbox, a document store, an API.
2. **Planning.** It decides what to do next based on what it found, rather than following a fixed script.
3. **Tools.** It can act, through functions you have explicitly given it.
4. **Bounds.** It knows what it may not do alone, and escalates instead of guessing.

The fourth one is what separates a system you can deploy from one you cannot. Everything else is available in a weekend of prototyping.

## Agent, workflow, or script?

A surprising share of the requests we get do not need an agent at all, and saying so early is cheaper for everyone.

| The job | What it needs | Why |
| --- | --- | --- |
| Answer questions from documents | Retrieval, not an agent | There is only one step. Planning adds cost and failure modes for nothing. |
| Always do A, then B, then C | A script or workflow tool | If the sequence never changes, a model choosing the sequence is a liability. |
| Classify things into fixed buckets | A classifier | Cheaper, faster, and far easier to evaluate. |
| Decide between paths based on messy context, then act | An agent | The branching is genuinely unpredictable and depends on interpretation. |
| Handle exceptions a person currently judges case by case | An agent | This is the sweet spot, and it is most of our work. |

The honest test: if you can write down the decision rules completely, you do not need a model to make the decisions. Use the rules.

## The build order that works

The order matters more than the tooling. This is the sequence we use on every build.

### 1. Watch the workflow being done, and measure it

Before anything is built, we sit with the people who run the process today and measure it. How many cases per week. How long each takes. Where it stalls. Which exceptions actually recur, as opposed to which ones people remember.

This step gets skipped constantly, and skipping it is the single most common reason agent projects fail. The brief describes the process as management believes it works. The measurement describes how it runs. Those are different documents, and the gap between them is where your budget goes.

It also gives you something to be held to later. Without a baseline, "did this help?" becomes a matter of opinion, and "it feels faster" is not a result.

### 2. Build the thin version on real data

Not a demo on a curated sample. Your records, including the ones with missing fields, inconsistent formatting, and values nobody has trusted since a migration.

This is where you find out that a third of the source rows lack something the workflow depends on, or that the process has three undocumented exceptions. Finding that in week one changes what you build. Finding it in month three means rebuilding.

It also gives you a cheap exit. If the thin version shows the data cannot support the workflow, you have spent days rather than a full build, and the honest recommendation is a data project first.

### 3. Close the loop

Now the agent plans across steps, calls tools, and handles the cases the thin version could not. Two things get built alongside it, not afterwards:

- **Human review gates** on every action that is expensive or awkward to undo.
- **An evaluation set** from your real historical cases, deliberately including the ones the agent gets wrong.

The evaluation set is the artefact people skip and then regret. Without it, nobody can safely change a prompt or swap a model in six months, which is how working systems quietly rot.

### 4. Hand it over properly

A runbook, a training session with the people who will operate it, and a documented path for what to do when it breaks. Code and configuration in your repository, on your infrastructure.

## Bounded autonomy, and why we start read-only

Every agent we build begins with read access only. It reads, it proposes, a human approves. Write access to any system of record gets added deliberately, per action, after the read-only version has shown it interprets cases correctly.

Autonomy is something a system earns by demonstrating accuracy on your own evaluation set over real volume. It is not a launch feature, even though full autonomy demos better.

This is not excessive caution. A draft-and-approve agent is dramatically easier to make genuinely reliable, and it still captures most of the value, because in almost every workflow we see the expensive part is the lookup and assembly rather than the final click. In regulated work it is also usually the only deployable shape.

## Where the engineering effort actually goes

People expect the hard part to be the model. It is not. On a typical build the effort distribution looks roughly like this:

- **Retrieval and context assembly.** Getting the right information in front of the model, reliably, from sources that were not designed to be queried this way. This is the biggest line by a wide margin.
- **Tool design and error handling.** What happens when the API times out, returns a partial result, or rate-limits you halfway through a batch.
- **Guardrails and gates.** Deciding what needs approval, building the approval path, and logging every tool call.
- **Evaluation.** Assembling the test set and the harness to run it.
- **Prompting and model choice.** Real, but far smaller than the internet suggests.

Most disappointing agents are not under-powered. They are under-informed. That is why we treat retrieval quality as the primary engineering concern and treat model selection as a constraint-driven choice rather than a competitive sport.

## What an agent will not do for you

Worth saying plainly, because each of these has ended a project somewhere.

**It will not fix a process nobody has agreed on.** If two departments genuinely disagree about how a case should be handled, building an agent forces that disagreement into the open. Useful, but it is a management outcome, not a technical one.

**It will not rescue unusable source data.** Retrieval over clean records is straightforward. Retrieval over scanned documents, three competing sources of truth, and a field that has been wrong for years is where budgets disappear.

**It will not be right every time.** The question is never whether it makes mistakes, it is whether they are caught before they cost anything. That is what the gates, the evaluation set and the audit log are for.

**It will not maintain itself.** Models change and your source systems change. An unmaintained agent degrades quietly rather than failing loudly, which is worse. Budget for maintenance or plan to retire it.

## How long it takes

For one scoped workflow: two to four weeks from kickoff to handover, with a one-to-two week feasibility review ahead of it when the use case is not settled.

Anything quoted at under a week is a demo rather than a system. Anything open-ended should worry you, because it usually means the scope was never pinned down and the conversation about what "done" means has been deferred rather than had.

## Start with one

The most common request we decline is the company-wide assistant. It sounds like a pilot and behaves like a platform commitment: broad scope, no measurable baseline, and no honest way to tell afterwards whether it worked.

One workflow gives you the opposite. You can measure it before, test the result against your own historical cases, and recover cheaply if the answer is no. Once one is in production the second and third cost less, because the orchestration, retrieval and evaluation harness already exist.

That is the order that gets companies to three working agents. Starting with three rarely gets them to one.

---

**Related reading:** [what AI agent development costs](/blog/ai-agent-development-cost) and [how to choose an AI agency](/blog/choosing-an-ai-agency).

If you want to talk through a specific workflow, see [how we build agents](/services/ai-agent-development), our [price bands](/pricing), or [get in touch](/contact).
