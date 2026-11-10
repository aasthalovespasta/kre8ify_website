# Before launch: things only you can confirm

Everything below is live on the site as written. Confirm each one, or tell me to change or cut it.

## Claims to verify ([VERIFY] in the copy doc)

| Claim | Where it appears |
|---|---|
| 40+ creators activated in a single campaign for Headfield | Home (hero stats, proof), Instagram, Work |
| Roofs & Assets: 3–4x social growth (which metric? over what timeframe?) | Home proof, Instagram, Work |
| Headfield wording: "needed visibility in India, online and on the ground" | Home proof, Work |
| 4+ years building founder and brand content | Home stats, About |
| Client types: edtechs, creators, coaches, consultants, real estate | About |
| 50+ founder workshops on growth and GTM (whose, where?) | About, credentials |
| Speaker, Trainfluence 2025 | About, credentials |
| Buying signals listed: new sales hire, fresh funding, content engagement | GTM page |
| LinkedIn targets: 5 warm conversations/week, ~10K impressions/week, 200 followers/month by day 90 | LinkedIn page |
| AI workflows listed (keep only ones you've built) | AI page |
| AI tools: n8n, Make, Zapier, ChatGPT, Claude, WhatsApp Business, HubSpot, Google Workspace | AI page |
| "Unacademy" in the "Brands we've built with" strip | Home hero, Work |

## Facts to add ([ADD])

- **Domain inbox:** `hello@kre8ify.com` is used everywhere. Make sure it exists. Edit `SITE.email` in `src/lib.mjs`.
- **Instagram handle:** the footer icon links to instagram.com. Set `SITE.instagram` in `src/lib.mjs`.
- **Registered company name:** the footer says "Creatify Private Limited". Set `SITE.legal` in `src/lib.mjs`.
- **Ganga Realty result:** enquiries, site visits or cost per lead. The card currently says "Reels → visits".
- **Roofs & Assets problem statement:** I wrote "A strong founder with a brand that didn't show it." Replace it with the real one.
- **Krish's LinkedIn growth timeframe:** 0 → 28K over how many months?
- **Team names and photos:** the About page shows roles only. Add names and photos when you're ready.
- **Client quotes:** none yet. One line per case study, with name and role, would make the Work page much stronger.
- **Unacademy case study:** we have no details, so it appears only in the brands strip.
- **OG share image:** pages point to `/assets/img/og.png`, which doesn't exist yet (1200×630).

## New content I wrote for the 0 to 1 Launchpad (please read closely)

You asked for the business set-up consulting offer, so I wrote this page from scratch. Check:

- The five stages and their week ranges (Set up 1–2, Offer 2–3, First clients 3–8, Manage clients 6–10, Get paid 8–12).
- **CA and lawyer partners:** the copy says filings and legal reviews are done "with a qualified CA or lawyer: yours, or one we introduce", and that contracts are "reviewed by a lawyer partner". Only keep that if you have these partners.
- The 18-item document checklist (Pvt Ltd/LLP, PAN/TAN, GST, Udyam, state registrations, contracts, invoicing, trademark and more). It carries a "not legal or tax advice" disclaimer.
- The sample GST invoice (SAC 9983, CGST + SGST at 9% each). It's labelled Sample.
- The weekly 60-minute call with Krish for all 12 weeks.

## Decisions I made for you ([DECIDE] in the copy doc)

| Decision | What the site says now |
|---|---|
| Prices | Hidden everywhere, per your answer. FAQ: "fixed scope, timeline and price within 48 hours of the call." |
| Free teardown | Offered on Home, GTM and LinkedIn. Only keep it if you can turn one around in 48 hours. |
| Budget question on the booking form | Kept: Under ₹25K / ₹25K–50K / ₹50K–1L / ₹1L+. |
| Paid ads | "No, we refer you to a partner." |
| What we don't do | Paid ads, SEO and website builds. |
| Shoots | Delhi NCR; other cities discussed on the call. |
| Outside India | India, plus US and UK founders for LinkedIn, GTM and AI work. |
| Top bar | Replaced "Taking on 3 new founders this month" with a ticker of true statements. |
| Lock-in / minimum term | Not mentioned anywhere yet. |
| Logo | "Linked 8" (option 01) as a placeholder. It's one function, `eight()` in `src/lib.mjs`, so it's easy to swap. |

## Sample and illustrative visuals

These are all labelled "Sample" or "illustrative numbers" on the page, as your copy doc asked:

- Home: 12-week chart and the Monday report.
- GTM: buying-signal feed and outreach funnel.
- AI: automation log and hours-saved chart.
- LinkedIn: sample post.
- Instagram: reel mock.
- Launchpad: launch progress, client board and invoice.

## Photos

The site currently uses the one photo saved as a file (Krish outside the college building). The other photos you shared in chat weren't saved as files, so add them to `public/assets/img/` with these names and rebuild:

- `krish-laptop.jpg`: outdoor shot at the wooden cabin with the laptop. Used in "Meet your founder" on Home and on the About page.
- `krish-studio.jpg`: dark-shirt portrait with the Dell laptop. Used for the "From Krish" notes, the About hero and the booking page.

The Skilldify graduation photos show Skilldify branding and other people. Your copy doc says no Skilldify logos except one optional mention on the About page, so I've left them out. If you want one, use it on About only, with consent from the people in it.
