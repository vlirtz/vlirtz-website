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

## Environment variables

Copy `.env.example` to `.env.local` (local) or into the Vercel project (production).

| Variable | Required | Purpose |
| --- | --- | --- |
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

Old Hostinger URLs redirect to `/about`, `/services`, and `/contact`.
