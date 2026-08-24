---
title: "AI agent development: when it is worth building"
description: "A clear definition of AI agents, when they beat a chatbot, and how VLIRTZ approaches AI agent development for real company workflows."
date: "2026-08-20"
author: "Borja Javierre i Moyano"
image: "/images/vercel-desk.jpg"
keywords:
  - AI agent development
  - AI agents
  - AI software agency Stockholm
---

Most “AI agents” on marketing sites are chatbots with extra adjectives. **AI agent development** is only worth paying for when the system can see context, plan more than one step, and take actions in tools your company already uses.

If the job is “answer questions from a PDF,” you need retrieval, not an agent. If the job is “watch a mailbox, research the sender, draft a reply, update the CRM, and stop when confidence is low,” you need an agent.

## What an agent actually is

In our work an agent has four parts:

1. **Goal.** A job description a person would recognise.
2. **Tools.** APIs, browsers, inboxes, spreadsheets, CRMs.
3. **Policy.** What it may do alone, what needs approval, what is forbidden.
4. **Memory.** Just enough state to continue a task without inventing history.

The model is the planner. The product is the tool belt and the policy.

## When not to build one

Skip agents when:

- the process is a single form submit
- the data is too messy for a person, let alone a model
- nobody can describe a successful outcome
- the company will not let software write to the system of record

In those cases, [AI consulting](/services#ai-consulting) is the cheaper first step: pick a use case or admit that the company is not ready.

## A build sequence that stays honest

We develop agents in this order:

**Observe.** Map the current human path. Record the clicks and the exceptions.

**Thin tool.** Automate the boring middle with scripts where possible. Models are expensive and vague; code is cheap and testable.

**Agent loop.** Give the model the remaining decisions and the tools. Log every tool call.

**Human gate.** Money, customers, and legal language go through a person until the error rate is known.

**Harden.** Evaluations on real historical cases, rate limits, and a kill switch.

This is slower to demo than a flashy chat UI. It is faster to production.

## Stockholm and EU constraints

Agents that read customer data need a story for storage, subprocessors, and logging. We treat that as part of the build, not a later compliance project. If a tool cannot stay inside an acceptable region, we do not put customer records in it.

## What you should own at the end

You should leave with:

- the prompts and policies in your repo
- the tool credentials in your accounts
- a runbook for the person who will operate it
- a metric (time saved, tasks completed, meetings booked)

If an agency keeps the agent as a black box you rent forever, you bought a vendor, not a capability.

VLIRTZ builds agents as part of [our AI agent development work](/services#ai-agent-development). If you already know the workflow, [send it](/contact).
