import { icon } from "./lib.mjs";

/* The 0 → 1 journey. Used on Home (summary) and Launchpad (full). */
export const STAGES = [
  {
    id: "setup", n: "01", name: "Set up", short: "Documents and structure", when: "Weeks 1–2",
    title: "Get the paperwork right, once.",
    body: "Most first-time founders lose weeks to forms, CAs and back-and-forth. We give you the exact list for your business, the order to do it in, and partner CAs for the filings.",
    items: [
      ["Pick the right structure", "Sole proprietorship, LLP or Private Limited, based on how you'll sell and raise."],
      ["Register the business", "Incorporation, PAN and TAN, done in the right order."],
      ["GST, when you need it", "Whether you need it now, and registration when you do."],
      ["Udyam (MSME) registration", "Free, quick, and useful for credit and tenders."],
      ["Bank account and payments", "Current account, UPI and a payment gateway that clients can use."],
      ["Founders' agreement", "Equity split, roles and vesting written down before it's awkward."],
    ],
    outcome: "A business that can legally sign clients, raise invoices and get paid.",
  },
  {
    id: "offer", n: "02", name: "Shape the offer", short: "Who, what and how much", when: "Weeks 2–3",
    title: "One offer a buyer understands in one sentence.",
    body: "Before you chase clients, we make sure there's something clear to buy. Who it's for, the problem it fixes, what it costs, and how it's delivered.",
    items: [
      ["Ideal customer map", "Which companies, which roles, which problems."],
      ["One clear offer", "What's included, what isn't, and the result it leads to."],
      ["Pricing and packages", "A price you can say out loud on a call without flinching."],
      ["Proposal template", "A two-page proposal that closes, not a 30-slide deck."],
      ["Founder profile", "Your LinkedIn rewritten so buyers get it in five seconds."],
      ["Pitch in 60 seconds", "The way you explain the business, tested on real people."],
    ],
    outcome: "An offer with a price, a page and a pitch, ready for real conversations.",
  },
  {
    id: "clients", n: "03", name: "First clients", short: "From zero to paying", when: "Weeks 3–8",
    title: "Your first clients, from a path you can repeat.",
    body: "Your first ten clients usually come from people who already know you. We turn your network, your content and focused outreach into booked calls, and coach you on the calls themselves.",
    items: [
      ["A list of 100 target accounts", "Researched and ranked, not scraped and sprayed."],
      ["Warm network outreach", "Scripts for the people who already trust you."],
      ["Founder content", "Posts that make strangers recognise you before you pitch."],
      ["Discovery call script", "Questions that find the real problem and the budget."],
      ["Follow-up system", "No lead sits for more than 48 hours without a next step."],
      ["Close and onboard", "From verbal yes to signed contract and first invoice."],
    ],
    outcome: "Paying clients, and a pipeline that doesn't depend on luck.",
  },
  {
    id: "serve", n: "04", name: "Manage clients", short: "Deliver and keep them", when: "Weeks 6–10",
    title: "Clients who stay, pay and refer.",
    body: "Winning a client is half the job. We set up the simple systems that make you look bigger than you are: contracts, onboarding, a CRM and a weekly update rhythm.",
    items: [
      ["Contract and NDA templates", "Scope, payment terms and IP, reviewed by a lawyer partner."],
      ["Onboarding checklist", "A kickoff that sets expectations in the first 48 hours."],
      ["CRM pipeline", "Every lead, client and renewal in one place you own."],
      ["Weekly client updates", "A short, honest report that makes renewals easy."],
      ["Delivery SOPs", "Written steps so work doesn't live only in your head."],
      ["Testimonials and referrals", "Asked for at the right moment, captured properly."],
    ],
    outcome: "A client experience that runs the same way every time, even when you're busy.",
  },
  {
    id: "paid", n: "05", name: "Get paid", short: "Invoices and cash", when: "Weeks 8–12",
    title: "Know who owes you what. Get it on time.",
    body: "Late payments kill young businesses. We set up invoicing, payment terms and reminders, so cash comes in without awkward chasing.",
    items: [
      ["GST-ready invoice template", "Every field your client's finance team will ask for."],
      ["Payment terms that work", "Advances, milestones and due dates written into every deal."],
      ["Payment links and UPI", "One click for clients to pay, in India and abroad."],
      ["Automatic reminders", "Polite nudges before and after the due date, sent for you."],
      ["Simple books", "Expenses and income tracked monthly, ready for your CA."],
      ["Cash dashboard", "What's billed, what's paid, what's overdue, on one screen."],
    ],
    outcome: "Predictable cash, clean books, and no more chasing on WhatsApp.",
  },
];

export function roadmap({ idPrefix = "rm" } = {}) {
  return `
<div class="roadmap" data-tabs>
  <div role="tablist" aria-label="The 0 to 1 journey" class="stage-tabs">
    ${STAGES.map((s, i) => `<button role="tab" class="stage-tab" id="${idPrefix}-tab-${s.id}" aria-controls="${idPrefix}-panel-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="n">${s.n}</span><span><b>${s.name}</b><small>${s.short}</small></span></button>`).join("")}
  </div>
  <div>
    ${STAGES.map((s, i) => `
    <div class="stage-panel" role="tabpanel" id="${idPrefix}-panel-${s.id}" aria-labelledby="${idPrefix}-tab-${s.id}"${i ? " hidden" : ""} tabindex="0">
      <div class="stage-panel__head"><h3>${s.title}</h3><span class="when">${s.when}</span></div>
      <p class="muted max-60">${s.body}</p>
      <ul class="check-grid">${s.items.map(([a, b]) => `<li>${icon("check")}<span><strong>${a}</strong><span>${b}</span></span></li>`).join("")}</ul>
      <p class="outcome">You leave with: ${s.outcome}</p>
    </div>`).join("")}
  </div>
</div>`;
}

/* How a post becomes a meeting */
export const FLOW = [
  ["You post", "Useful content, in your voice.", "A post goes out on LinkedIn or Instagram, written from your voice interview and approved by you."],
  ["Buyers engage", "They like, comment, follow.", "The right people react. Some are buyers you'd never have found with a cold list."],
  ["We catch it", "Every engaged buyer is logged.", "Each person who engages is logged and checked against your ideal customer profile."],
  ["Warm outreach", "The first message is never cold.", "A relevant, personal message goes out, referencing what they engaged with."],
  ["AI follows up", "Nothing slips through.", "AI handles reminders, follow-ups and CRM updates, so no warm lead goes cold."],
  ["You take the call", "The only part we can't do for you.", "A booked call lands on your calendar with a one-page brief on who you're meeting."],
];

export function flowBlock() {
  const W = 1000, y = 70, xs = FLOW.map((_, i) => 70 + i * 172);
  return `
<div class="flow" data-flow>
  ${FLOW.map(([t, s, d], i) => `<button type="button" class="flow__step reveal" data-detail="${d}" aria-pressed="${i === 0}"><span class="n">${String(i + 1).padStart(2, "0")}</span><b>${t}</b><span>${s}</span></button>`).join("")}
</div>
<div class="flow-wire reveal" aria-hidden="true">
  <svg viewBox="0 0 ${W} 140">
    <path d="M${xs[0]} ${y} H${xs[xs.length - 1]}" stroke="#2f2f2f" stroke-width="4" fill="none"/>
    <path class="pulse" d="M${xs[0]} ${y} H${xs[xs.length - 1]}" stroke="#d4ff3f" stroke-width="4" fill="none"/>
    ${xs.map((x, i) => `<g data-node data-on="${i === 0 ? 1 : 0}"><circle cx="${x}" cy="${y}" r="${i === xs.length - 1 ? 26 : 20}"/><text x="${x}" y="${y + 5}" text-anchor="middle">${i + 1}</text><text class="lbl" x="${x}" y="${y + 52}" text-anchor="middle">${FLOW[i][0]}</text></g>`).join("")}
  </svg>
</div>
<p class="flow-note" data-flow-caption aria-live="polite">${FLOW[0][2]}</p>`;
}

/* Case studies. [VERIFY] and [ADD] items are listed in REVIEW.md. */
export const CASES = [
  {
    client: "Krish's own LinkedIn", industry: "B2B services", engine: "Get Known",
    problem: "Started at zero followers, with no audience and no budget.",
    did: ["One clear voice, four content pillars", "Daily engagement with the right people", "No ads, ever"],
    result: "0 → 28,000+", resultLabel: "LinkedIn followers, zero ad spend",
  },
  {
    client: "Headfield", industry: "Global B2B business, India launch", engine: "Get Known",
    problem: "Needed visibility in India, online and on the ground.",
    did: ["Creator sourcing, briefing and management", "Event content, captured on the ground", "Social coverage across creator channels"],
    result: "40+", resultLabel: "creators activated in a single campaign",
  },
  {
    client: "Roofs & Assets", industry: "Real estate", engine: "Get Known",
    problem: "A strong founder with a brand that didn't show it.",
    did: ["Founder-led personal branding", "Full-funnel social content", "Shoots, scripts and editing"],
    result: "3–4x", resultLabel: "social growth",
  },
  {
    client: "Ganga Realty", industry: "Real estate", engine: "Get Known",
    problem: "Scrolls weren't turning into site visits.",
    did: ["UGC-style reels built around the property", "Hooks written for buyers, not browsers", "Creators briefed and managed end to end"],
    result: "Reels → visits", resultLabel: "UGC built to drive site visits",
  },
];

export function caseCards(list = CASES.slice(1)) {
  return list
    .map(
      (c) => `
<article class="case reveal">
  <div class="case__meta"><span class="chip chip--pink">${c.engine}</span><span class="chip">${c.industry}</span></div>
  <h3>${c.client}</h3>
  <p class="muted">${c.problem}</p>
  <div class="case__result"><strong>${c.result}</strong><span>${c.resultLabel}</span></div>
</article>`
    )
    .join("");
}
