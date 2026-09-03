---
title: "What AI agent development actually costs in Europe"
description: "A straight breakdown of what an AI agent costs to build and to run, what moves a quote inside a range, and the five questions that decide your number."
date: "2026-09-03"
author: "Borja Javierre i Moyano"
image: "/images/code-closeup.jpg"
keywords:
  - AI agent development cost
  - AI agent price
  - how much does an AI agent cost
  - AI project budget
  - AI consulting cost Europe
---

Almost nobody publishes this, which is why you are reading a fourth article about it. So here is the direct answer, followed by the reasoning you need in order to judge any quote you receive.

For one scoped workflow, built properly and handed over so your team can run it, the European market lands broadly between **EUR 12,000 and EUR 30,000**, over two to four weeks. A shorter feasibility review ahead of it runs **EUR 2,000 to EUR 4,000**. Multi-workflow programmes start around **EUR 45,000** and go up from there.

Those are real ranges rather than a headline number, and the rest of this post is about why the range is wide and where inside it you personally land.

## Why nobody quotes a single number honestly

Because a fixed price given before anyone has looked at your data is one of two things: padded to cover the worst case, or about to be revised.

The variance is not vendor greed. Two projects described identically in an email can differ by a factor of three in effort, depending on things the email did not mention. So instead of a single number, what you should demand from a vendor is the drivers: the specific factors that move your quote inside their range. If they cannot name them, they are guessing.

## The five things that actually move the number

### 1. How many systems the agent has to touch

One system is straightforward. A workflow spanning a CRM, a mailbox and a database costs more in integration and error handling than it does in anything resembling AI work.

This is the most underestimated driver by a wide margin. The difference between a two-day integration and a two-week one is usually whether anyone read how the API handles pagination, rate limits and partial failures before quoting.

### 2. How usable your data already is

Retrieval over clean, well-structured records is cheap. Retrieval over scanned PDFs, inconsistent record structures, or three competing sources of truth is where budgets actually go.

If you want to lower your own cost before speaking to any vendor, this is the lever. Knowing which system is authoritative for each field is worth more than any amount of prompt engineering.

### 3. What a wrong action costs

An agent that drafts a reply for a human to approve needs far less guardrail engineering than one that issues a refund, contacts a customer, or files a regulatory return.

This is a real cost driver, and it is also a reason to want the cheaper design. Draft-and-approve is easier to make reliable and usually captures most of the time saving anyway, because the expensive part of these workflows is the lookup and assembly, not the final click.

### 4. Regulatory scope

Work under FINMA, Finansinspektionen, medical-device rules or a high-risk EU AI Act classification carries documentation and audit obligations that are genuine engineering effort, not paperwork added at the end.

Swiss regulated projects in particular carry noticeably more up-front compliance mapping than equivalent EU ones. That is not a vendor markup; it is the work of establishing where data may sit and what has to stay reversible before anything is built.

### 5. Who operates it afterwards

If your team takes over, more budget goes into runbooks and evaluation tooling up front. If the vendor sustains it, that shifts into a monthly retainer instead. Neither is wrong, but the two quotes are not comparable unless you know which one you are looking at.

## Build cost is not running cost

These get conflated constantly, and the second one causes the surprises.

| Line | Typical scale | Notes |
| --- | --- | --- |
| Model and API usage | Tens of euros a month for one workflow at moderate volume | Almost always the smallest line, despite being the one people worry about |
| Hosting and vector storage | Low and fixed | Often absorbed into infrastructure you already pay for |
| Maintenance | The real recurring cost | Models change, your source systems change |

The counter-intuitive part is that the model bill is rarely the issue. Maintenance is. An agent nobody maintains degrades quietly rather than failing loudly, which is the worse failure mode because you find out from a customer.

## What "cheap" usually means

If a quote comes in dramatically below the ranges above, it is worth asking which of these was excluded:

- **No baseline measurement.** Nobody measured the workflow first, so there will be no way to prove the result.
- **No evaluation set.** Nothing to test against, so nobody can safely change the system later.
- **No audit logging.** Fine until an incident, at which point it is not fine.
- **A demo, not a system.** Works on the sample data, has never seen your exceptions.
- **A platform you rent.** Low build cost, indefinite licence, and your workflow stops if you stop paying.

Some of those exclusions are legitimate choices for a genuinely exploratory project. They should be stated, not discovered.

## What "expensive" usually means

Equally worth asking. A quote well above the range is sometimes correct, particularly for regulated or multi-system work. But it can also mean:

- Scope that expanded to a platform when you asked for a workflow.
- A team large enough that coordination is a line item.
- Discovery being charged as delivery.
- Local senior engineering rates in an expensive market. Swiss rates for this work are among the highest in Europe, which is a legitimate reason some buyers hire outside their own city.

## What the same project costs in different markets

Rates for this work vary considerably across Europe, which is why cross-border hiring is more common in this field than people expect. Roughly, for the same scoped single-workflow build:

| Market | Relative senior rate | Notes |
| --- | --- | --- |
| Zurich | Highest in Western Europe | Plus genuine extra compliance mapping under revFADP and FINMA |
| Copenhagen | High | Strong local talent market, small supplier pool |
| Stockholm | High but not extreme | Dense talent market keeps it competitive |
| Amsterdam | Moderate to high | Most price-transparent market; WBSO lowers the net cost |

The practical implication: a Zurich buyer hiring a Nordic or Dutch team for the same scope, with identical regulatory literacy and a shared time zone, is often looking at a materially different number. That is a legitimate reason to hire outside your city, and it is why Swiss firms do it more than others.

What it does not justify is hiring a vendor who does not understand your regulator. A cheaper team that has not grasped why FINMA cares about reversibility will build you something you cannot deploy, which costs more than the difference.

## The questions to ask about any quote

If you take one thing from this, take these. Ask any vendor:

1. **"What did you assume about our data?"** The answer reveals whether the quote is grounded or generic.
2. **"How many systems does this touch, in your estimate?"** If they have not counted, the number is a placeholder.
3. **"Is the evaluation set included?"** If not, you are buying something nobody can safely modify later.
4. **"What is the monthly cost after handover?"** Separates build from run, which is where surprises live.
5. **"What would make this go over?"** A vendor who names their own risks has thought about them.
6. **"What is excluded?"** The most useful question on the list, and the one most rarely asked.

A quote that survives all six is probably real. A quote that survives none of them is a number someone picked.

## How to budget for this properly

A sensible approach that has served our clients well:

1. **Buy the feasibility review first.** One to two weeks, low four figures. It should end in a written recommendation including, where honest, a recommendation not to build.
2. **Budget one scoped workflow, not a programme.** You will know a great deal more after the first one, and the second is cheaper because the infrastructure exists.
3. **Set aside maintenance from day one.** A rough planning figure is a few percent of build cost per month. Skipping this is how a working system becomes a dead one.
4. **Check WBSO if you are Dutch.** Development with genuine technical uncertainty often qualifies for the R&D tax credit, which materially lowers the net cost. Your own tax advisor should assess it.

## The number that matters more than price

Payback. If a workflow consumes forty hours a month of someone's time and an agent removes thirty of them, the build pays for itself in months rather than years, and that calculation is only possible because someone measured the workflow first.

Which is the real argument for insisting on the baseline measurement. It is not process for its own sake. It is the only thing that turns "this cost EUR 20,000" into a sentence with a second half.

---

**Related reading:** [how AI agent development works](/blog/ai-agent-development) and [how to choose an AI agency](/blog/choosing-an-ai-agency).

Our own bands, including what each engagement excludes, are on the [pricing page](/pricing). Local currency figures are on each market page, for example [Amsterdam](/services/ai-agent-development/amsterdam) and [Stockholm](/services/ai-agent-development/stockholm).
