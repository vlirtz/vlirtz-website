# VLIRTZ website

Next.js site for [vlirtz.com](https://vlirtz.com): AI agent development, AI consulting, and AI lead generation from Stockholm.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Blog posts

Posts live in `content/posts/` as Markdown with frontmatter. Add a file, commit, and it appears at `/blog/<slug>`.

## AI sales agent

A floating chat widget on every page answers technical questions about
VLIRTZ, qualifies the visitor, captures the lead, and pushes toward a Cal.com
discovery call. See [`docs/sales-agent.md`](docs/sales-agent.md) for the
architecture and setup.

Nothing is required to try it. With an empty `.env.local` the agent runs in
demo mode: scripted replies, keyword retrieval over this repo's own content,
and leads kept in memory.

```bash
npm run smoke:agent   # exercise the whole loop offline, no keys needed
npm run ingest        # embed repo content into Pinecone (needs keys)
```

## Environment variables

Copy `.env.example` to `.env.local` (local) or into the Vercel project (production).

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | For real replies | Chat model and embeddings. Without it the agent uses the demo model |
| `DATABASE_URL` | For lead storage | PostgreSQL. Without it leads stay in memory |
| `PINECONE_API_KEY` | For vector search | Without it retrieval falls back to local keyword search |
| `PINECONE_ENVIRONMENT` | With Pinecone | Serverless cloud/region, e.g. `aws:us-east-1` |
| `PINECONE_INDEX_NAME` | With Pinecone | Defaults to `vlirtz-knowledge-base` |
| `NEXT_PUBLIC_CAL_LINK` | No | Cal.com booking link used by the widget CTA |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 id, for example `G-XXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Search Console HTML-tag verification |
| `RESEND_API_KEY` | For live forms | Sends contact and newsletter mail to `info@vlirtz.com` |
| `CONTACT_FROM_EMAIL` | With Resend | Must be a domain you verified in Resend |
| `CONTACT_TO_EMAIL` | No | Defaults to `info@vlirtz.com` |

In local development, forms log to the terminal if Resend is not set.

## Deploy on Vercel

1. Push this repo to `vlirtz/vlirtz-website`.
2. Import the repo in Vercel (Next.js is detected automatically).
3. Add the env vars you have. GA and Resend can wait.
4. Deploy, then in Vercel → Domains add `vlirtz.com` and `www.vlirtz.com`.
5. At Hostinger, point the domain DNS to Vercel (`A` 10.0.1.2 for the apex, or the records Vercel shows).
6. In Google Search Console, add the property, paste the verification code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then submit `https://vlirtz.com/sitemap.xml`.
7. Confirm the Google Business Profile uses the same name, address, and phone as the site.
8. For the sales agent, add `OPENAI_API_KEY`, `DATABASE_URL`, and the Pinecone
   variables, then run `npm run ingest -- --site` once against production.

Old Hostinger URLs redirect to `/about`, `/services`, and `/contact`.
