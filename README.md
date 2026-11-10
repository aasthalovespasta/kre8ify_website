# Kre8ify website

Static, multi-page marketing site for Kre8ify, a founder-led growth studio in New Delhi. *Get known. Get clients.*

Every page is pre-rendered to plain HTML, so Google and AI assistants can read the full copy. No framework and no npm dependencies; you only need Node 18 or newer.

## Run it

```bash
npm run build      # renders every page to dist/
npm run preview    # serves dist/ at http://localhost:4173
```

## Deploy

Any static host works. On Vercel, Netlify or Cloudflare Pages:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Point `kre8ify.com` at it, and redirect `www` to the bare domain (or the other way round) so there's one canonical version. Then submit `https://kre8ify.com/sitemap.xml` in Google Search Console.

## Pages

| URL | Source |
|---|---|
| `/` | `src/pages/home.mjs` |
| `/launchpad/` | `src/pages/launchpad.mjs` (0 to 1 consulting: documents, first clients, client management, invoices) |
| `/linkedin-personal-branding/` | `src/pages/linkedin.mjs` |
| `/instagram-content-video/` | `src/pages/instagram.mjs` |
| `/gtm-engineering/` | `src/pages/gtm.mjs` |
| `/ai-automation/` | `src/pages/ai.mjs` |
| `/work/` | `src/pages/work.mjs` |
| `/krish/` | `src/pages/krish.mjs` |
| `/book-a-call/` | `src/pages/book.mjs` |
| `/faq/` | `src/pages/faq.mjs` |

Shared pieces:

- `src/lib.mjs`: layout, header, footer, logo, icons, contact details, SEO tags and schema.
- `src/content.mjs`: the 0 to 1 roadmap stages, the workflow steps and the case studies.

## Editing

- **Contact details and legal name:** `SITE` in `src/lib.mjs`.
- **Photos:** add `krish-laptop.jpg` and `krish-studio.jpg` to `public/assets/img/` and rebuild. They're picked up automatically.
- **Colours and type:** tokens at the top of `public/assets/css/styles.css`. Pink and green each have their own gradients and are never mixed in one gradient.
- **Before launch:** see `REVIEW.md` for every claim to verify and every decision made on your behalf.

## Still to connect

- **Booking form:** it validates and shows a confirmation, but doesn't send anything yet. Connect it to Cal.com or Calendly (and your CRM) in the `form.addEventListener("submit"...)` block in `public/assets/js/main.js`, or replace step 3 with the calendar embed.
- **Share image:** add `public/assets/img/og.png` (1200×630).
- **Analytics:** none installed.
