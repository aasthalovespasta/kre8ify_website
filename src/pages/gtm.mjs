import { page, icon, cta, kicker, ctaBand, pageHero, faqBlock, faqSchema, serviceSchema, krishNote } from "../lib.mjs";

const path = "/gtm-engineering/";

const faqs = [
  ["Will cold email hurt my company domain?", "No. We send from separate domains set up and warmed for outreach, so your main domain is never at risk."],
  ["How many meetings will I get?", "It depends on your market and offer. After the first call we give you a target we're willing to be measured against. We don't quote numbers before we've seen your market."],
  ["Do I need Clay or HubSpot already?", "No. We tell you the minimum stack you need and set it up on your accounts."],
  ["Who writes the messages?", "We do. You approve every sequence before it goes live."],
  ["How is this priced?", "Monthly, with a one-time set-up. You get a fixed scope, timeline and price within 48 hours of our first call. Tools are billed to your own accounts, with no mark-up."],
];

const build = [
  ["Ideal buyer map", "Which companies, which roles, which problems. A 90-minute workshop with you."],
  ["Buyer lists", "Researched, enriched, verified contacts that match that map."],
  ["Buying signals", "We track moments that mean \"now\", like a new sales hire, fresh funding, or someone engaging with your content."],
  ["Sending setup", "Separate domains and inboxes, warmed up properly so you don't land in spam or burn your main domain."],
  ["Sequences", "Email and LinkedIn messages written for each signal, not one pitch for everyone."],
  ["CRM routing", "Every reply, meeting and lead lands in your CRM automatically."],
];

const visual = `
<div class="hv" aria-label="Sample buying-signal feed">
  <div class="hv__label"><span>Buying signals, today</span><span class="sample">Sample</span></div>
  <div class="hv__row"><span class="ico ico--pink">${icon("users")}</span><span><b>Hired a Head of Sales</b><small>B2B SaaS · 22 people · Bengaluru</small></span><span class="st">Sequence started</span></div>
  <div class="hv__row"><span class="ico ico--lime">${icon("trend")}</span><span><b>Raised a seed round</b><small>Fintech · 14 people · Mumbai</small></span><span class="st">Sequence started</span></div>
  <div class="hv__row"><span class="ico ico--pink">${icon("linkedin")}</span><span><b>Commented on your post</b><small>Founder · services firm · Delhi</small></span><span class="st st--pink">Warm DM</span></div>
  <div class="hv__row"><span class="ico ico--ink">${icon("calendar")}</span><span><b>Replied: "Let's talk Thursday"</b><small>Logged in CRM · brief ready</small></span><span class="st">Booked</span></div>
</div>`;

const W = 980;
const diagram = `
<svg viewBox="0 0 ${W} 300" role="img" aria-labelledby="gtm-d-t">
  <title id="gtm-d-t">Three signal sources (hiring, funding and content engagement) feed an enrichment step, then signal-specific sequences, then reply handling, CRM and finally your calendar.</title>
  <defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#d4ff3f"/></marker></defs>
  ${[["Hiring signals", 50], ["Funding news", 130], ["Content engagement", 210]].map(([t, y]) => `<g><rect x="10" y="${y - 24}" width="170" height="48" rx="24" fill="#1a1a1a" stroke="#ff2dab" stroke-width="2"/><text x="95" y="${y + 5}" text-anchor="middle" fill="#fff" font-size="15" font-weight="600">${t}</text><path d="M180 ${y} C 230 ${y}, 230 130, 262 130" stroke="#555" stroke-width="2" fill="none" marker-end="url(#ar)"/></g>`).join("")}
  ${[["Enrich + verify", 270], ["Signal sequences", 440], ["Reply handling", 610]].map(([t, x], i) => `<g><rect x="${x}" y="100" width="150" height="60" rx="16" fill="${i === 1 ? "#ff2dab" : "#262626"}" stroke="#3a3a3a"/><text x="${x + 75}" y="136" text-anchor="middle" fill="${i === 1 ? "#0e0e0e" : "#fff"}" font-size="15" font-weight="700">${t}</text>${i < 2 ? `<path d="M${x + 150} 130 H${x + 168}" stroke="#d4ff3f" stroke-width="2.5" marker-end="url(#ar)"/>` : ""}</g>`).join("")}
  <path d="M760 130 H790" stroke="#d4ff3f" stroke-width="2.5" marker-end="url(#ar)"/>
  <g><rect x="795" y="60" width="175" height="60" rx="16" fill="#262626" stroke="#3a3a3a"/><text x="882" y="96" text-anchor="middle" fill="#fff" font-size="15" font-weight="700">Your CRM</text></g>
  <g><rect x="795" y="140" width="175" height="60" rx="30" fill="#d4ff3f"/><text x="882" y="176" text-anchor="middle" fill="#0e0e0e" font-size="15" font-weight="800">Your calendar</text></g>
  <text x="610" y="200" fill="#b4b4b0" font-size="13">Positive → booked call + brief</text>
  <text x="610" y="220" fill="#b4b4b0" font-size="13">Not now → nurture in 60 days</text>
  <text x="440" y="200" fill="#b4b4b0" font-size="13">Email + LinkedIn, per signal</text>
  <text x="270" y="200" fill="#b4b4b0" font-size="13">ICP-checked contacts only</text>
</svg>`;

const funnel = [
  ["Contacts reached", 1000, 1],
  ["Replies", 64, 0.62],
  ["Positive replies", 21, 0.36],
  ["Calls booked", 8, 0.18],
];

const body = `
${pageHero({
  crumbs: ["Services", "GTM Engineering"],
  tone: "ink",
  title: "Your SDR team, without hiring an SDR team.",
  sub: "We find the companies ready to buy, reach them with the right message at the right moment, and put booked calls on your calendar. Every tool, list and sequence sits on your accounts.",
  buttons: `${cta()}<a class="btn btn--ghost" href="/book-a-call/?teardown=outreach">Get a free outreach teardown</a>`,
  visual,
})}

<section class="sec sec--white">
  <div class="container define">
    <h2 class="define__q reveal">What is GTM engineering?</h2>
    <div class="define__a reveal">
      <p>GTM engineering is building the machine behind your sales: who to target, how to find them, when to reach out, and what happens after they reply.</p>
      <p>Instead of an intern with a spreadsheet, it runs as connected workflows that don't forget, don't get tired and don't go on leave.</p>
    </div>
  </div>
</section>

<section class="sec sec--pink" aria-labelledby="for-h">
  <div class="container split">
    <div class="reveal">${kicker("Who it's for")}<h2 id="for-h">For founders who are still the only salesperson</h2></div>
    <ul class="ticks ticks--pink reveal">
      <li>${icon("check")}<span>B2B founders with 5 to 30 people and no proper sales team yet</span></li>
      <li>${icon("check")}<span>Teams where outreach is done by interns, or by the founder at midnight</span></li>
      <li>${icon("check")}<span>Companies that get leads, but lose them because nobody follows up in time</span></li>
    </ul>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="build-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Month one")}<h2 id="build-h">What we build in the first month</h2><p class="lead">A one-time set-up. Everything below is yours to keep.</p></div>
    <ol class="steps grid-2">${build.map(([a, b]) => `<li class="reveal"><span><strong>${a}</strong><span>${b}</span></span></li>`).join("")}</ol>
    <div class="diagram mt-7 reveal">${diagram}</div>
    <p class="diagram-caption">How a buying signal becomes a booked call. Scroll sideways on small screens.</p>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="run-h">
  <div class="container split split--wide" style="align-items:center">
    <div class="reveal">
      ${kicker("Every month", "lime")}
      <h2 id="run-h">What runs every month</h2>
      <ul class="ticks mt-6">
        <li>${icon("check")}<span>Fresh lists and new signal-based campaigns</span></li>
        <li>${icon("check")}<span>Reply handling for each campaign's first 7 days</span></li>
        <li>${icon("check")}<span>A/B tests on messages, with the losers cut every two weeks</span></li>
        <li>${icon("check")}<span>Weekly Monday report: sent, replied, positive, booked</span></li>
      </ul>
    </div>
    <div class="chart-card reveal" style="margin-top:0">
      <div class="chart-card__head"><h3>One month of outreach</h3><span class="sample">${icon("eye")} Sample · illustrative numbers</span></div>
      <div class="bars" style="margin-top:0">
        ${funnel.map(([l, v, w], i) => `<div class="bar" style="grid-template-columns:140px 1fr 56px"><span>${l}</span><span class="bar__track" style="background:#f0f0ee;height:28px;border-radius:8px"><span class="bar__fill" data-v="${w}" style="border-radius:8px;background:var(--grad-pink)"></span></span><span>${v.toLocaleString("en-IN")}</span></div>`).join("")}
      </div>
      <p class="chart-summary">Illustrative: 1,000 contacts reached, 64 replies, 21 positive, 8 calls booked. Your target is set after the first call.</p>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="tl-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Timeline")}<h2 id="tl-h">From kickoff to first booked calls</h2></div>
    <div class="gantt reveal" role="img" aria-label="Weeks 1 to 2: buyer map, lists and domains warming. Weeks 3 to 4: sequences written and approved. Week 5: campaigns go live. Weeks 5 to 8: first replies and booked calls.">
      <div class="gantt__in">
        <div class="gantt__weeks" style="grid-template-columns:180px repeat(8,1fr)"><span></span>${Array.from({ length: 8 }, (_, i) => `<span>W${i + 1}</span>`).join("")}</div>
        <div class="gantt__row" style="grid-template-columns:180px repeat(8,1fr)"><span>Buyer map and lists</span><span class="gantt__bar" style="grid-column:2 / span 2">Map, lists, domains</span></div>
        <div class="gantt__row" style="grid-template-columns:180px repeat(8,1fr)"><span>Domains warming</span><span class="gantt__bar gantt__bar--lime" style="grid-column:2 / span 4">Warm-up</span></div>
        <div class="gantt__row" style="grid-template-columns:180px repeat(8,1fr)"><span>Sequences</span><span class="gantt__bar" style="grid-column:4 / span 2">Written, approved by you</span></div>
        <div class="gantt__row" style="grid-template-columns:180px repeat(8,1fr)"><span>Campaigns live</span><span class="gantt__bar gantt__bar--ink" style="grid-column:6 / span 4">Live from week 5</span></div>
        <div class="gantt__row" style="grid-template-columns:180px repeat(8,1fr)"><span>Booked calls</span><span class="gantt__bar gantt__bar--lime" style="grid-column:6 / span 4">First replies and calls</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="tools-h">
  <div class="container split" style="align-items:center">
    <div class="reveal">${kicker("Tools", "lime")}<h2 id="tools-h">Set up on your accounts. You keep everything.</h2><p class="lead mt-4">If we ever part ways, your engine keeps running. No tool costs hidden inside our fee.</p></div>
    <ul class="tools reveal">${["Apollo", "Clay", "HubSpot", "Smartlead", "Instantly", "LinkedIn Sales Navigator"].map((t) => `<li>${t}</li>`).join("")}</ul>
  </div>
</section>

${krishNote({
  title: "Most pipelines don't die on the pitch. They die in the four days nobody replied.",
  body: "I've been the one closing the deal. And I've watched good leads go cold because the follow-up lived in someone's head. GTM engineering is how we take that out of people's heads and put it into a system that runs on Monday whether anyone remembered or not.",
  tone: "pink",
})}

<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Questions")}<h2 id="faq-h">GTM engineering FAQ</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaBand({ title: "Let's find where your pipeline leaks." })}
`;

export default page({
  path,
  title: "GTM Engineering Agency in India | Kre8ify",
  description: "Outbound that starts warm. Buyer lists, signal-based email and LinkedIn outreach, and CRM routing, built on your accounts. Led by Krish Bhatia.",
  body,
  schema: [serviceSchema("GTM Engineering", "Signal-based outbound, buyer lists, sequences and CRM routing for founder-led B2B companies.", path), faqSchema(faqs)],
});
