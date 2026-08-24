---
title: "From idea to a working AI agent: a four-week path"
description: "A concrete four-week path from a messy AI idea to a working agent with tools, logs, and a human review step, written for operators, not researchers."
date: "2026-08-14"
author: "Borja Javierre i Moyano"
image: "/images/xcode-laptop.jpg"
keywords:
  - AI agent development
  - AI software agency Stockholm
  - build AI agents
---

Most AI ideas die between the whiteboard and the first production login. This is the path we use at VLIRTZ when a company in Stockholm or elsewhere in Europe says “we want an agent” and cannot yet point at a screen.

## Week 0 - write the job on one page

Name the user, the trigger, the systems, and the definition of done. Example: “When a qualified inbound email arrives, research the company, draft a reply, and create a CRM note. A person sends the reply.”

If you cannot write that page, do [consulting](/services#ai-consulting) first. Do not start a build.

## Week 1 - watch a human do it

Sit with the person who does the job today. Record the tabs, the exceptions, and the moments they use judgement. Those moments become policy. Everything else is a candidate for a tool call or a script.

Output: a step list and a list of APIs or exports you can actually get.

## Week 2 - tools before the model

Connect the mailbox, CRM, or database. Write the boring functions: search, fetch, create draft, log. Run them without a model. If the tools are unreliable, the agent will look stupid.

Output: a thin internal app or script a developer can run locally.

## Week 3 - close the loop

Give the model the goal, the tools, and the policy. Log every thought you are willing to store and every tool call. Put a human approval on send, pay, or delete.

Output: ten real historical cases replayed. Count failures in public.

## Week 4 - decide

If the agent completes the job more than half the time with cheap review, put it on a small live slice. If not, either shrink the job or stop.

Output: a go / no-go, the repo, and a runbook.

## What this is not

It is not a six-month platform. It is not “chat with your data” unless chatting is the job. It is not a replacement for hiring people who understand the domain.

## Why we publish this

Search results for AI software in Stockholm are full of adjectives. Operators need a calendar. If this four-week shape matches how you work, [talk to us about AI agent development](/contact).
