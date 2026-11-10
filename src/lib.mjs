// Shared layout, icons and components. Every page is rendered to static HTML
// so crawlers and AI assistants see the full copy (no client-side rendering).

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

/* Photos of Krish. Drop the originals into public/assets/img/ with these names
   and rebuild; until then each slot falls back to a photo we already have. */
const IMG_DIR = fileURLToPath(new URL("../public/assets/img/", import.meta.url));
const pick = (...names) => "/assets/img/" + (names.find((n) => existsSync(IMG_DIR + n)) || names[names.length - 1]);
export const PHOTO = {
  hero: pick("krish-hero.webp"),
  meet: pick("krish-laptop.jpg", "krish-laptop.webp", "krish-rcm.webp"),
  note: pick("krish-studio.jpg", "krish-studio.webp", "krish-face.webp"),
  about: pick("krish-studio.jpg", "krish-studio.webp", "krish-rcm.webp"),
  aboutWide: pick("krish-laptop.jpg", "krish-laptop.webp", "krish-rcm.webp"),
};

export const SITE = {
  name: "Kre8ify",
  url: "https://kre8ify.com",
  tagline: "Get Known. Get Clients.",
  email: "hello@kre8ify.com", // [ADD] confirm the domain inbox is live
  phone: "+91 83779 16115",
  phoneHref: "+918377916115",
  whatsapp: "https://wa.me/918377916115",
  linkedin: "https://www.linkedin.com/in/meetkrishbhatia",
  instagram: "https://www.instagram.com/", // [ADD] Instagram handle
  legal: "Creatify Private Limited", // [ADD] exact registered name
};

/* ------------------------------------------------------------------ icons */
const P = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  minus: '<path d="M5 12h14"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  trend: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  bank: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  pen: '<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
};
export const icon = (name, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || ""}</svg>`;

/* ------------------------------------------------------------------ logo
   "Linked 8" from the brand file: two rings linked like a chain,
   content and GTM holding each other. */
export const eight = (top = "#ff2dab", bottom = "currentColor") => `
<svg viewBox="3 4 34 57" aria-hidden="true" focusable="false">
  <defs><clipPath id="k8-weave"><rect x="22" y="25" width="14" height="10"/></clipPath></defs>
  <circle cx="20" cy="42" r="13" fill="none" stroke="${bottom}" stroke-width="6"/>
  <circle cx="20" cy="20" r="12" fill="none" stroke="${top}" stroke-width="6"/>
  <circle cx="20" cy="42" r="13" fill="none" stroke="${bottom}" stroke-width="6" clip-path="url(#k8-weave)"/>
</svg>`;
export const logo = (dark = false) =>
  `<a class="logo" href="/" aria-label="Kre8ify home">kre${eight("#ff2dab", dark ? "#ffd6e7" : "#6e0f3f")}ify</a>`;

/* ------------------------------------------------------------------ nav */
export const SERVICES = [
  { href: "/launchpad/", name: "0 to 1 Launchpad", desc: "Documents, first clients, client management and invoices.", ic: "rocket", tone: "lime" },
  { href: "/linkedin-personal-branding/", name: "LinkedIn Personal Branding", desc: "Posts in your voice, built for clients, not likes.", ic: "linkedin", tone: "pink" },
  { href: "/instagram-content-video/", name: "Instagram & Video", desc: "We script, shoot and edit. You show up.", ic: "video", tone: "pink" },
  { href: "/gtm-engineering/", name: "GTM Engineering", desc: "Outbound that starts warm. Calls on your calendar.", ic: "target", tone: "lime" },
  { href: "/ai-automation/", name: "AI Automation", desc: "Replies, follow-ups and CRM updates on autopilot.", ic: "bot", tone: "ink" },
];

const btnArrow = icon("arrow");
export const cta = (label = "Book a call with Krish", href = "/book-a-call/", cls = "") =>
  `<a class="btn ${cls}" href="${href}">${label} ${btnArrow}</a>`;
export const link = (label, href) => `<a class="link" href="${href}">${label} ${icon("arrow")}</a>`;

function header(path, dark = false) {
  const cur = (h) => (path === h ? ' aria-current="page"' : "");
  const serviceActive = SERVICES.some((s) => s.href === path);
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="header${dark ? " header--dark" : ""}" id="top">
  <div class="container header__in">
    ${logo(dark)}
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">
        <li class="nav__item" data-dropdown>
          <button class="nav__btn" aria-expanded="false" aria-controls="mega"${serviceActive ? ' style="color:var(--pink-700)"' : ""}>Services ${icon("chevron")}</button>
          <div class="mega" id="mega">
            ${SERVICES.map((s) => `<a href="${s.href}"${cur(s.href)}><span class="ico ico--${s.tone}">${icon(s.ic)}</span><span><strong>${s.name}</strong><span>${s.desc}</span></span></a>`).join("")}
            <a href="/#engines"><span class="ico ico--ink">${icon("layers")}</span><span><strong>How it all fits</strong><span>Four engines, one team. You own all of it.</span></span></a>
          </div>
        </li>
        <li><a class="nav__link" href="/work/"${cur("/work/")}>Work</a></li>
        <li><a class="nav__link" href="/krish/"${cur("/krish/")}>About Krish</a></li>
        <li><a class="nav__link" href="/faq/"${cur("/faq/")}>FAQ</a></li>
      </ul>
    </nav>
    <a class="btn btn--sm header__cta" href="/book-a-call/">Book a call with Krish ${btnArrow}</a>
    <button class="burger" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">${icon("menu")}</button>
  </div>
</header>
<div class="drawer" id="drawer" aria-label="Menu">
  <p class="drawer__label">Services</p>
  <ul>${SERVICES.map((s) => `<li><a href="${s.href}"${cur(s.href)}>${s.name}</a></li>`).join("")}</ul>
  <p class="drawer__label">Company</p>
  <ul>
    <li><a href="/work/"${cur("/work/")}>Work</a></li>
    <li><a href="/krish/"${cur("/krish/")}>About Krish</a></li>
    <li><a href="/faq/"${cur("/faq/")}>FAQ</a></li>
  </ul>
  <a class="btn" href="/book-a-call/">Book a call with Krish ${btnArrow}</a>
</div>`;
}

function footer() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        ${logo(true)}
        <p class="footer__tag">Get known.<span>Get clients.</span></p>
        <p class="footer__about">A founder-led growth studio in New Delhi. We take new-age founders from 0 to 1: business set-up, LinkedIn and Instagram branding, GTM engineering and AI automation.</p>
        <div class="socials">
          <a href="${SITE.linkedin}" aria-label="Krish on LinkedIn" rel="noopener" target="_blank">${icon("linkedin")}</a>
          <a href="${SITE.instagram}" aria-label="Kre8ify on Instagram" rel="noopener" target="_blank">${icon("instagram")}</a>
          <a href="${SITE.whatsapp}" aria-label="WhatsApp Kre8ify" rel="noopener" target="_blank">${icon("chat")}</a>
          <a href="mailto:${SITE.email}" aria-label="Email Kre8ify">${icon("mail")}</a>
        </div>
      </div>
      <div class="footer__cols">
        <div><h2>Services</h2><ul>${SERVICES.map((s) => `<li><a href="${s.href}">${s.name}</a></li>`).join("")}</ul></div>
        <div><h2>Company</h2><ul>
          <li><a href="/work/">Work</a></li><li><a href="/krish/">About Krish</a></li><li><a href="/faq/">FAQ</a></li><li><a href="/book-a-call/">Book a call</a></li>
        </ul></div>
        <div><h2>Contact</h2><ul>
          <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
          <li><a href="${SITE.whatsapp}" rel="noopener" target="_blank">WhatsApp us</a></li>
          <li><a href="${SITE.linkedin}" rel="noopener" target="_blank">in/meetkrishbhatia</a></li>
        </ul></div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 Kre8ify. Kre8ify is a brand of ${SITE.legal}, New Delhi, India.</p>
      <p><a href="#top">Back to top</a></p>
    </div>
    <p class="footer__mega" aria-hidden="true">kre8ify</p>
  </div>
</footer>`;
}

function tickerBar() {
  const items = [
    'Get known. Get clients.',
    '0 → 28K+ LinkedIn followers, zero ad spend',
    'Founder-led growth studio, New Delhi',
    '<a href="/launchpad/">New: the 0 to 1 Launchpad for first-time founders</a>',
    'Krish takes every first call himself',
  ];
  const row = items.map((t) => `<span>${t}</span>`).join("");
  return `<div class="ticker" role="region" aria-label="Announcements"><div class="ticker__track">${row}<span aria-hidden="true">${items[0]}</span>${items.slice(1).map((t) => `<span aria-hidden="true">${t.replace(/<[^>]+>/g, "")}</span>`).join("")}</div></div>`;
}

/* ------------------------------------------------------------------ schema */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kre8ify",
  alternateName: ["Kreatify", "Kre8tify"],
  legalName: SITE.legal,
  url: SITE.url,
  logo: `${SITE.url}/assets/img/og.png`,
  slogan: "Get Known. Get Clients.",
  founder: { "@type": "Person", name: "Krish Bhatia" },
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  email: SITE.email,
  telephone: SITE.phoneHref,
  sameAs: [SITE.linkedin],
};

/* ------------------------------------------------------------------ page */
export function page({ path, title, description, body, schema = [], ticker = false, dark = false }) {
  const canonical = SITE.url + path;
  const ld = [orgSchema, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n");
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#ff2dab">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kre8ify">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${SITE.url}/assets/img/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Unbounded:wght@600;700;800&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__k8)document.documentElement.classList.remove('js')},2500)</script>
${ld}
</head>
<body>
${ticker ? tickerBar() : ""}
${header(path, dark)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ components */
export const kicker = (t, tone = "") => `<p class="kicker${tone ? " kicker--" + tone : ""}">${t}</p>`;

export function faqBlock(items, { id = "" } = {}) {
  return `<div class="faq"${id ? ` id="${id}"` : ""}>${items
    .map(([q, a]) => `<details><summary>${q}<span class="pm">${icon("plus")}</span></summary><div class="ans">${a.split("\n").map((p) => `<p>${p}</p>`).join("")}</div></details>`)
    .join("")}</div>`;
}
export const faqSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
});
export const serviceSchema = (name, description, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: SITE.url + path,
  provider: { "@type": "Organization", name: "Kre8ify", url: SITE.url },
  areaServed: "IN",
});

export function krishNote({ title, body, tone = "lime" }) {
  return `
<section class="sec sec--white">
  <div class="container">
    <div class="note-krish${tone === "pink" ? " note-krish--pink" : ""} reveal">
      <img src="${PHOTO.note}" alt="Krish Bhatia, founder of Kre8ify" width="120" height="120" loading="lazy">
      <div>
        <h2>${title}</h2>
        <p>${body}</p>
        <p class="from">— Krish Bhatia, Founder</p>
      </div>
    </div>
  </div>
</section>`;
}

export function ctaBand({ title, body, tone = "pink", secondary = "" }) {
  return `
<section class="sec sec--white">
  <div class="container">
    <div class="cta-band${tone === "lime" ? " cta-band--lime" : ""} reveal">
      <span class="cta-band__ring cta-band__ring--a" aria-hidden="true"></span>
      <span class="cta-band__ring cta-band__ring--b" aria-hidden="true"></span>
      <h2>${title}</h2>
      ${body ? `<p>${body}</p>` : ""}
      <div class="btn-row">${cta("Book a call with Krish", "/book-a-call/", "btn--ink")}${secondary}</div>
    </div>
  </div>
</section>`;
}

export function pageHero({ crumbs, title, sub, tone = "pink", visual = "", buttons = "", extra = "" }) {
  return `
<section class="phero phero--${tone}">
  <div class="container phero__grid">
    <div>
      <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li>${crumbs.map((c) => `<li>${c}</li>`).join("")}</ol>
      <h1>${title}</h1>
      <p class="lead">${sub}</p>
      <div class="btn-row">${buttons}</div>
      ${extra}
    </div>
    <div class="reveal">${visual}</div>
  </div>
</section>`;
}

/* Line chart (inline SVG, no library). series: [{name, color, dashed, data:[...] }] */
export function lineChart({ id, labels, series, yMax, yLabel, bands = [], summary }) {
  const W = 760, H = 300, L = 48, R = 16, T = 16, B = 40;
  const iw = W - L - R, ih = H - T - B;
  const x = (i) => L + (iw * i) / (labels.length - 1);
  const y = (v) => T + ih - (ih * v) / yMax;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(yMax * f));
  const bandSvg = bands
    .map((b) => `<rect x="${x(b.from)}" y="${T}" width="${x(b.to) - x(b.from)}" height="${ih}" fill="${b.fill}"/><text x="${(x(b.from) + x(b.to)) / 2}" y="${T + 16}" text-anchor="middle" font-size="12" font-weight="700" fill="#4a4a48">${b.label}</text>`)
    .join("");
  const lines = series
    .map((s, si) => {
      const d = s.data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      const area = s.area ? `<path d="${d} L${x(s.data.length - 1)},${T + ih} L${x(0)},${T + ih} Z" fill="url(#g-${id}-${si})" opacity="0.5"/>` : "";
      const grad = s.area ? `<defs><linearGradient id="g-${id}-${si}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${s.color}" stop-opacity="0.55"/><stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient></defs>` : "";
      const pts = s.dashed
        ? ""
        : s.data.map((v, i) => `<g class="pt" tabindex="0" role="img" aria-label="${labels[i]}: ${v} ${s.name}" data-tip="${labels[i]} · ${v} ${s.name}"><circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#fff" stroke="${s.color}" stroke-width="3"/></g>`).join("");
      return `${grad}${area}<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.dashed ? 2 : 3.5}" ${s.dashed ? 'stroke-dasharray="6 6"' : ""} stroke-linecap="round" stroke-linejoin="round"/>${pts}`;
    })
    .join("");
  return `
<div class="chart" data-chart>
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-t">
    <title id="${id}-t">${summary}</title>
    <g class="grid">${ticks.map((t) => `<line x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/>`).join("")}</g>
    ${bandSvg}
    <g class="axis">${ticks.map((t) => `<text x="${L - 10}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join("")}
    ${labels.map((l, i) => (labels.length > 8 && i % 2 ? "" : `<text x="${x(i)}" y="${H - 12}" text-anchor="middle">${l}</text>`)).join("")}
    <text x="${L}" y="${T - 2}" font-size="12" fill="#6b6b68">${yLabel}</text></g>
    ${lines}
  </svg>
  <div class="chart-tip" role="status" aria-live="polite"></div>
</div>`;
}
