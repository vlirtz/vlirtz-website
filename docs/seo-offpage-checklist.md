# Off-page SEO checklist

The repo work is roughly 40% of ranking for the eight target queries. This is
the other 60%, and it cannot be done in code. Work top to bottom: the order
reflects impact per hour, not difficulty.

Target queries and the competitive baseline are in
[`seo-baseline.md`](./seo-baseline.md).

---

## Week 1: measurement, before anything else

Nothing below matters if Google does not have the pages.

- [ ] **Confirm indexation, not submission.** Google Search Console, Pages
      report, filter "Not indexed". Every URL in `/sitemap.xml` (34 of them)
      should be indexed. Submitted is not indexed.
- [ ] **Resubmit the sitemap** so the new pages get discovered. Search
      Console, Sitemaps, re-enter `https://www.vlirtz.com/sitemap.xml`.
- [ ] **Request indexing individually** for the nine new URLs via URL
      Inspection. This is the fastest route into the index for a new page on
      a low-authority domain:
      - `/services/ai-agent-development`
      - `/services/ai-agent-development/stockholm`
      - `/services/ai-agent-development/copenhagen`
      - `/services/ai-agent-development/zurich`
      - `/services/ai-agent-development/amsterdam`
      - `/pricing`
      - `/how-we-work`
      - `/authors/borja-javierre`
      - plus the four rewritten `/locations/*` pages
- [ ] **Record the baseline** in the table in `seo-baseline.md`: average
      position and impressions for all eight target queries. Do this before
      the new pages are indexed or the comparison is worthless.
- [ ] **Verify the 13 redirects** resolve with a 308 and land on live pages.
      Ten of them are the retired blog slugs, so a mistake here loses the
      only accumulated equity those URLs had.
- [ ] **Validate structured data.** Run four page types through the Rich
      Results Test: a market page, an agent-development page, `/pricing`, and
      a blog post. Confirm `FAQPage`, `Service`, `BreadcrumbList` and
      `BlogPosting` all parse, and that the `Person` and `Organization` nodes
      resolve rather than dangling.
- [ ] **Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** in Vercel if it is not
      already set. The meta tag is wired but env-driven.

---

## Weeks 1-3: directories, the fastest route onto page 1

A Clutch profile is currently the **third organic result** for "ai software
agency stockholm". You can occupy a page-1 slot through someone else's domain
within weeks, while your own pages mature. Each listing is also a backlink.

Do these in order. The first three carry most of the value.

- [ ] **Clutch** — the highest-value listing by a wide margin. Free profile.
      Ranks for the exact queries. Requires a verified review to be useful,
      so line up your first client to leave one.
- [ ] **Sortlist** — strong in the Benelux and Nordics specifically, which
      maps directly onto Amsterdam and Copenhagen.
- [ ] **GoodFirms** — free, ranks reasonably, low effort.
- [ ] **DesignRush** — paid tiers exist; the free listing is worth having.
- [ ] **TechBehemoths** — free, decent European coverage.
- [ ] **The Manifest** — same operator as Clutch, so the profile is largely
      reusable.

For every listing, keep the details **byte-identical** to `src/lib/site.ts`:

```
VLIRTZ
Kokillbacken 7 Lgh 1004, 196 40 Kungsangen, Stockholms lan, Sweden
+46 76 451 40 94
info@vlirtz.com
https://www.vlirtz.com
```

Inconsistent name, address and phone data across citations is a known
suppressant of local ranking, and it is entirely self-inflicted.

- [ ] Once the Clutch profile is live, add its URL to the `sameAs` array in
      [`src/lib/seo/organization.ts`](../src/lib/seo/organization.ts). The
      code comment there already flags this.

---

## Weeks 2-4: Google Business Profile

Read the constraint before doing the work.

- [ ] **Create or claim the profile** for the Kungsangen address.
- [ ] **Set it as a service-area business** covering Stockholm county, rather
      than a storefront.
- [ ] **Primary category:** "Software company". Secondary: "Business
      management consultant", "Computer consultant".
- [ ] **Paste the NAP block above verbatim.**
- [ ] **Add the service list** matching `src/lib/site.ts`: AI agent
      development, AI consulting, AI lead generation.
- [ ] **Add photos.** There are usable ones in `public/images/`.
- [ ] **Ask every client for a Google review.** Review count and recency are
      among the strongest local pack factors.

### The honest constraint

The registered address is in Kungsangen, roughly 30 km from central
Stockholm. That is a real handicap for the Stockholm map pack, because
proximity to the searcher's location is a primary local ranking factor and
most searches for "ai software agency stockholm" originate in the city.

**Copenhagen, Zurich and Amsterdam map packs are unreachable** without a
physical presence in those cities. Do not create listings at coworking
addresses or virtual offices to fake it; it is against Google's guidelines,
it gets profiles suspended, and it contradicts the honesty that the market
pages are built on.

For those three markets **we are competing for the organic results only**,
which is exactly where Crux Digits and KodKodKod win in Amsterdam. The
`/locations/*` and `/services/ai-agent-development/*` pages are built for
that fight, not for the map pack.

---

## Ongoing: local citations

Lower impact than directories, but cheap and they reinforce NAP consistency.

- [ ] **Sweden:** allabolag.se, hitta.se, eniro.se, företagsfakta
- [ ] **Denmark:** proff.dk, krak.dk
- [ ] **Netherlands:** telefoonboek.nl, openingstijden.nl
- [ ] **Switzerland:** local.ch, search.ch
- [ ] **Pan-European:** Bing Places, Apple Business Connect

For the non-Swedish ones, list as a company serving that market, not as a
local office. The market pages say plainly that there is no local office and
the citations should not contradict them.

---

## Ongoing: authority and links

This is the slow, compounding part, and it is what actually decides whether
the target queries reach page 1 on a domain this young.

### Founder-led publishing

- [ ] **LinkedIn, 2 to 3 posts per week** from the founder account, not the
      company page. Personal accounts get materially more reach.
- [ ] Post the substance already written for the site: the guardrails from
      [`/how-we-work`](../src/app/how-we-work/page.tsx), the cost drivers
      from `/pricing`, the regulator specifics from the market pages. It is
      already drafted; reuse it.
- [ ] **Link to a specific page**, not the homepage, so the link equity and
      the referral traffic land where the conversion is.
- [ ] Confirm the LinkedIn company page links back to `www.vlirtz.com` and
      that the founder profile lists VLIRTZ. Both feed the `sameAs` chain in
      the `Person` and `Organization` schema.

### Guest content and community

- [ ] Nordic and Benelux tech publications and newsletters. Pitch the
      compliance angle: it is genuinely differentiated and few AI agencies
      write about it competently.
- [ ] Podcasts. Small technical podcasts accept founder guests readily and
      the show notes are a durable link.
- [ ] Local communities: Stockholm and Copenhagen AI and data meetups,
      Amsterdam scale-up groups. Speaking slots produce links from event
      pages.
- [ ] Answer questions properly on Reddit, Hacker News and relevant Slack or
      Discord communities. No link dropping; the referral value comes from
      being visibly competent.

### One piece of original research

The single highest-leverage link-building action available, because it is the
only content type journalists and other sites cite spontaneously.

- [ ] Publish an original dataset or benchmark. There is already a plausible
      source: the lead-agent tooling in the `vlirtz3` repo produces real data
      on European company signals. Something like a Nordic AI-adoption or
      AI-hiring benchmark, published with methodology, is genuinely citable.
- [ ] Include a clear methodology section and a chart. Both materially raise
      the citation rate.
- [ ] Send it directly to the publications from the guest-content list.

### Reviews

- [ ] Ask each completed client for a Clutch review and a Google review.
      Clutch reviews are what make the profile rank; Google reviews are what
      make the local pack work.
- [ ] Ask at handover, when the client is most positive, not months later.

---

## Monthly review

Thirty minutes, first working day of the month.

1. Update the position table in `seo-baseline.md` for all eight queries.
2. Search Console, Queries report: note any query gaining impressions that
   has no dedicated page. That is the next page to write.
3. Check the four `/locations/*` and four
   `/services/ai-agent-development/*` pages are still indexed.
4. Refresh the `dateModified` field on any market file under
   `src/lib/locations/` or `src/lib/agent-development/` whose content you
   actually changed. Do not bump dates you did not earn; the sitemap's
   honesty is the point.
5. Re-run the four competitor searches in `seo-baseline.md` and note
   movement. Sometimes you rise because they fall.

---

## Realistic expectations

Stated plainly so progress can be judged against something.

- **Weeks 1-4:** nine new pages indexed, technical fixes live, first three
  directory listings submitted.
- **Months 2-3:** page 2 to 3 for the softer queries. Directory listings may
  already be visible on page 1 for the agency terms.
- **Months 4-6:** page 1 realistically achievable for "ai agent development
  copenhagen", "ai agent development stockholm" and "ai agent development
  amsterdam". These four agent-development queries are the soft target,
  because nothing on the site competed for them before and the incumbents
  are small.
- **Months 6-12:** top 3 to 5 on the lower-competition combinations, with
  sustained content and link work.

**Sequence Copenhagen first.** Its competitors (SAIBA, AILO, Accordance) have
weak SEO and syv.ai competes mainly in Danish, leaving the English query
comparatively open. **Zurich is hardest**; leave it last.

Anyone promising top 3 for "ai software agency stockholm" within a month on a
domain registered in 2025 is selling something. Alice Labs holds positions
one and two there with a hundred-plus published implementations and a Clutch
profile. That is a twelve-month target, not a one-month one.
