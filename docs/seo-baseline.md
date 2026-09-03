# SEO baseline and rank tracking

Baseline captured before the city-page SEO work (September 2026). Update the
"Measured position" columns monthly so ranking movement is attributable to
specific changes rather than guesswork.

## Target queries

Eight commercial queries across two keyword families and four cities.

| Query | Target page | Baseline | Month 1 | Month 3 | Month 6 |
| --- | --- | --- | --- | --- | --- |
| ai software agency stockholm | `/locations/stockholm` | | | | |
| ai software agency copenhagen | `/locations/copenhagen` | | | | |
| ai software agency zurich | `/locations/zurich` | | | | |
| ai software agency amsterdam | `/locations/amsterdam` | | | | |
| ai agent development stockholm | `/services/ai-agent-development/stockholm` | n/a (no page) | | | |
| ai agent development copenhagen | `/services/ai-agent-development/copenhagen` | n/a (no page) | | | |
| ai agent development zurich | `/services/ai-agent-development/zurich` | n/a (no page) | | | |
| ai agent development amsterdam | `/services/ai-agent-development/amsterdam` | n/a (no page) | | | |

Secondary queries worth tracking, since the new pages target them too:

- `ai agent development` (head term) to `/services/ai-agent-development`
- `ai agent development cost` and `ai agent development price` to `/pricing`
- `ai software agency europe` to `/locations/europe`

## Keyword ownership map

One page per query. Two pages targeting the same term compete with each
other and neither wins, which is exactly what was happening across the old
blog: `ai-software-agency-stockholm` and `software-agency-stockholm` fought
each other, the homepage, and `/locations/stockholm` for the same phrase.

| Page | Primary query | Notes |
| --- | --- | --- |
| `/` | ai software agency stockholm | The money query, on the page with the most internal link equity. The old title contained no "AI" at all. |
| `/locations/stockholm` | ai consulting stockholm | Deliberately moved off the homepage's term. |
| `/locations/copenhagen` | ai software agency copenhagen | |
| `/locations/zurich` | ai software agency zurich | |
| `/locations/amsterdam` | ai software agency amsterdam | |
| `/services/ai-agent-development` | ai agent development | Head term. |
| `/services/ai-agent-development/stockholm` | ai agent development stockholm | |
| `/services/ai-agent-development/copenhagen` | ai agent development copenhagen | |
| `/services/ai-agent-development/zurich` | ai agent development zurich | |
| `/services/ai-agent-development/amsterdam` | ai agent development amsterdam | |
| `/pricing` | ai agent development cost | Highest-leverage single page; the top two Amsterdam results are pricing pages. |
| `/how-we-work` | how to choose an ai agency | Carries the proof strategy in place of case studies. |
| `/locations/europe` | ai software agency europe | |
| `/locations/dubai` | ai software agency dubai | |

**Blog posts target informational intent only.** That split is the point:
landing pages take the commercial queries, the blog supports them with
depth and internal links rather than competing for the same terms.

| Post | Primary query |
| --- | --- |
| `/blog/ai-agent-development` | how to build an ai agent |
| `/blog/ai-agent-development-cost` | ai agent development cost (informational) |
| `/blog/choosing-an-ai-agency` | how to choose an ai agency |
| `/blog/ai-regulation-europe` | eu ai act / gdpr for ai projects |
| `/blog/ai-lead-generation` | ai lead generation |
| `/blog/hiring-an-ai-agency-stockholm` | hiring an ai agency stockholm |

## How to capture the baseline

Do this once before the new pages are indexed, then repeat monthly.

1. Google Search Console, Performance report, last 28 days, Query filter set to
   each query above. Record **Average position** and **Impressions**. A query
   with zero impressions means Google has not judged you relevant at all yet,
   which is a different problem from ranking badly.
2. Search Console, Pages report, filter by "Not indexed". Confirm every URL in
   `/sitemap.xml` is actually indexed. Submitted is not indexed.
3. URL Inspection on `/locations/stockholm`, `/locations/copenhagen`,
   `/locations/zurich` and `/locations/amsterdam` individually. Record the
   coverage state for each.

If the city pages are not indexed, fixing that outranks every other item in
the plan. Nothing else matters until Google has the pages.

## Competitive baseline (live SERP analysis, September 2026)

Recorded so we can tell whether we moved up or the competition moved down.

### ai software agency stockholm

1. Alice Labs, `alicelabs.ai/en/ai-agency` - dedicated agency landing page
2. Alice Labs homepage
3. **Clutch profile** for Alice Labs AB
4. Pacing, `pacing.se`
5. Linfield Labs, `linfieldlabs.com`

Alice Labs publishes "100+ production AI implementations since 2023",
senior-only consultants, EU AI Act and GDPR positioning, and a
"Last updated" date on the page.

### ai agent development amsterdam

1. Crux Digits, `cruxdigits.nl/ai-agent-laten-bouwen/` - **a pricing page**
2. Crux Digits, `cruxdigits.nl/custom-ai-development-cost-netherlands/`
3. KodKodKod, `kodkodkod.studio/lp/ai-agent-amsterdam/` - service-by-city landing page
4. Virtual Outcomes case study, "60% Admin Reduction for a Dutch business"
5. ITDS, generic agent-development guide

Crux Digits ranks first with published prices: EUR 2,500 audit, EUR 20,000
proof of concept, production from EUR 50,000. KodKodKod publishes "from
EUR 5,000 for a POC, EUR 15,000-80,000 full projects" and "15+ years, 300+
clients".

### ai agent development zurich

1. Super AI Labs, `super-ai-labs.ch` - ETH and EPFL engineer positioning
2. Agenticsis, `agenticsis.ch/about/`
3. Lab51, `lab51.io` - "Custom AI Agents for Swiss Business, Built in 8 Weeks"
4. Agentix, `agentixlabs.ch`
5. The Automators, `theautomators.ai/ai-agency-bern/` - city landing page

Swiss competitors lead with revFADP, FINMA and FDPIC compliance and Swiss data
residency. The Automators names specific local institutions (Bundeshaus,
Swisscom at Worblaufen, Inselspital medtech campus) - high entity density.

### ai software agency copenhagen

1. Nordhavn AI, `ai-development-services.com`
2. AILO, `ailodata.com`
3. syv.ai - **Danish-language** consultancy
4. SAIBA, `saiba.dk/en/`
5. Accordance AI Engineering, `accordance.dk`

Nordhavn AI publishes the strongest proof set on any competitor page: "81% of
pilots promoted to production", "168 systems in production", "52 engineers",
ISO/IEC 27001:2022 and ISO/IEC 42001:2023 certified by BSI, and pricing from
USD 12,000 discovery to USD 520,000 platform build.

**Copenhagen is the softest market.** AILO, SAIBA and Accordance have weak
SEO, and syv.ai competes mainly in Danish, leaving the English-language query
comparatively open. Sequence Copenhagen first, Zurich last.

## Patterns that separate page-1 from page-3

Every competitor above shares at least three of these. Before the September
2026 work, vlirtz.com had none of them.

1. A landing page whose URL and H1 exactly match the query
2. Published, verifiable numbers
3. Published pricing
4. Named local regulators, sectors and institutions
5. 1,500 words or more of city-specific content
6. A directory listing (Clutch, Sortlist) occupying a separate page-1 slot

## Structural constraints to keep in mind

- `vlirtz.com` is a new domain with near-zero backlink authority. On-page work
  makes ranking possible; links and citations are what actually deliver it.
- The registered address is in Kungsangen, roughly 30 km from central
  Stockholm. That handicaps the Stockholm map pack.
- Copenhagen, Zurich and Amsterdam map packs are unreachable without a
  physical presence in those cities. For those three markets we are competing
  for organic results only, which is exactly where Crux Digits and KodKodKod
  win. Do not claim offices that do not exist.
