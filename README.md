# Kre8ify website

Marketing site for Kre8ify, the growth studio led by Krish Bhatia in New Delhi.
Plain HTML, CSS and JavaScript: no framework, no libraries, nothing to install except Python 3 and Node 18+.

## How it fits together

```
scripts/content.py       every word on the site, client list, testimonials, tools, Calendly link
scripts/build_pages.py   HTML templates; turns content.py into the pages in site/
scripts/build-site.mjs   copies site/ to dist/ for Vercel

site/
  index.html             home page (generated, do not edit by hand)
  *.html                 five service pages (generated)
  assets/css/site.css    all styles: colour tokens at the top, phone and tablet rules at the bottom
  assets/js/site.js      menu, scroll effects, testimonials, tap-to-open cards on phones, form
  assets/clients/        client logos
  assets/logos/          tool logos
  assets/people/         testimonial photos
  assets/img/            Krish's photos and the favicon
```

## Change something

1. Edit the words in `scripts/content.py`.
2. Rebuild the pages: `python3 scripts/build_pages.py`
3. Open `site/index.html` in a browser and check it.
4. Commit and push to `main`. Vercel builds and publishes it.

Common changes:

| What | Where |
|---|---|
| Phone, WhatsApp, LinkedIn, Calendly link | `SITE` in `content.py` |
| Client logos in the "Trusted by" section | add the file to `site/assets/clients/`, then add it to `CLIENTS` |
| Testimonials | `TESTIMONIALS` (photos go in `site/assets/people/`) |
| Tools and their logos | `TOOLS` and `TOOL_GROUPS` (logos go in `site/assets/logos/`) |
| Colours | tokens at the top of `site/assets/css/site.css` |
| Fonts | Clash Display and Satoshi from Fontshare, linked in `head()` in `build_pages.py` |

In headings, `<em>words</em>` get the highlight: a violet gradient on black sections, a marker sweep on white sections.

## Screen sizes

- **Desktop and tablet** show every section in full.
- **Phones (760px and narrower)** get a shorter page: sections fold behind a button (`data-fold`), cards show their title and open on tap (`data-tap`), and the steps become a vertical workflow. These rules are in the "Phones and tablets" part at the end of `site.css` and the "Phones: shorter page" block in `site.js`.

## Build and preview

```bash
python3 scripts/build_pages.py   # regenerate site/ from content.py
npm run build                    # copy site/ to dist/
npm run preview                  # serve dist/ at http://localhost:4173
```

Vercel settings (already in `vercel.json`): build command `npm run build`, output directory `dist`.
