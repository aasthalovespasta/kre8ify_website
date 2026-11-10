import { page, icon, cta, kicker, ctaBand, pageHero, faqBlock, faqSchema, serviceSchema, krishNote } from "../lib.mjs";

const path = "/ai-automation/";

const faqs = [
  ["Will AI talk to my clients in a weird way?", "Only in ways you approve. We write the rules and templates with you, and anything sensitive goes to a human."],
  ["Is my data safe?", "Workflows run on your own accounts. We don't store your client data on ours."],
  ["Do I need a tech team?", "No. We build it, document it and train whoever will own it."],
  ["Can you automate X?", "Bring it to the call. If it's repetitive and rule-based, usually yes. If it isn't, we'll tell you."],
  ["How is it priced?", "Scoped after the audit. You get a fixed price per workflow before we build anything."],
];

const flows = [
  ["inbox", "Lead capture to CRM", "Every form, DM and call lands in one place, tagged and scored."],
  ["zap", "Instant lead replies", "A new lead gets a relevant reply on WhatsApp or email in minutes, not tomorrow."],
  ["clock", "Follow-up chasers", "No lead sits without a next step for more than 48 hours."],
  ["file", "Meeting prep briefs", "Before every call, a one-page brief on the person and company."],
  ["video", "Content repurposing", "One founder video becomes LinkedIn posts, captions and an email."],
  ["trend", "Weekly reports", "Pipeline, content and campaign numbers, compiled automatically."],
  ["pen", "Proposal drafts", "Call notes turned into a first-draft proposal."],
];

const visual = `
<div class="hv" aria-label="Sample automation log">
  <div class="hv__label"><span>Automation log, 10:42 AM</span><span class="sample">Sample</span></div>
  <div class="hv__row"><span class="ico ico--pink">${icon("inbox")}</span><span><b>New lead from website form</b><small>Tagged "real estate", score 82</small></span><span class="st">Added to CRM</span></div>
  <div class="hv__row"><span class="ico ico--lime">${icon("chat")}</span><span><b>WhatsApp reply sent</b><small>2 minutes after the enquiry</small></span><span class="st">Sent</span></div>
  <div class="hv__row"><span class="ico ico--pink">${icon("file")}</span><span><b>Meeting brief ready</b><small>For your 4 PM call with Meera</small></span><span class="st st--pink">Ready</span></div>
  <div class="hv__row"><span class="ico ico--ink">${icon("clock")}</span><span><b>Follow-up due</b><small>Kabir hasn't replied in 2 days</small></span><span class="st st--dim">Queued</span></div>
</div>`;

const diagram = `
<svg viewBox="0 0 980 260" role="img" aria-labelledby="ai-d-t">
  <title id="ai-d-t">A new lead from a form, WhatsApp or email is read by AI, which replies within minutes, updates the CRM, books a call and prepares a brief, with sensitive cases sent to a human.</title>
  <defs><marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#d4ff3f"/></marker></defs>
  ${[["Website form", 40], ["WhatsApp", 110], ["Email", 180]].map(([t, y]) => `<rect x="10" y="${y - 22}" width="150" height="44" rx="22" fill="#1a1a1a" stroke="#ff2dab" stroke-width="2"/><text x="85" y="${y + 5}" text-anchor="middle" fill="#fff" font-size="15" font-weight="600">${t}</text><path d="M160 ${y} C 200 ${y}, 200 110, 240 110" stroke="#555" stroke-width="2" fill="none" marker-end="url(#ar2)"/>`).join("")}
  <rect x="245" y="70" width="190" height="80" rx="18" fill="#ff2dab"/><text x="340" y="105" text-anchor="middle" fill="#0e0e0e" font-size="17" font-weight="800">AI reads it</text><text x="340" y="128" text-anchor="middle" fill="#0e0e0e" font-size="13">rules you approved</text>
  ${[["Reply in minutes", 30], ["Update CRM", 95], ["Book the call", 160], ["Human, if sensitive", 225]].map(([t, y], i) => `<path d="M435 110 C 480 110, 480 ${y}, 520 ${y}" stroke="${i === 3 ? "#ff8fd1" : "#d4ff3f"}" stroke-width="2.2" fill="none" marker-end="url(#ar2)"/><rect x="525" y="${y - 22}" width="200" height="44" rx="14" fill="#262626" stroke="#3a3a3a"/><text x="625" y="${y + 5}" text-anchor="middle" fill="#fff" font-size="15" font-weight="600">${t}</text>`).join("")}
  <path d="M725 160 H775" stroke="#d4ff3f" stroke-width="2.5" marker-end="url(#ar2)"/>
  <rect x="780" y="128" width="190" height="64" rx="32" fill="#d4ff3f"/><text x="875" y="157" text-anchor="middle" fill="#0e0e0e" font-size="15" font-weight="800">Brief in your inbox</text><text x="875" y="177" text-anchor="middle" fill="#0e0e0e" font-size="12">before the meeting</text>
</svg>`;

const hours = [
  ["Copying leads into the CRM", 5, 0.5],
  ["Chasing follow-ups", 6, 1],
  ["Prepping for calls", 4, 0.5],
  ["Writing weekly reports", 3, 0.25],
];

const body = `
${pageHero({
  crumbs: ["Services", "AI Automation"],
  tone: "ink",
  title: "Stop paying people to copy-paste. Let AI do it.",
  sub: "We map the busywork eating your team's week, then build AI workflows that handle it. Leads get answered in minutes, follow-ups go out on time, and your CRM stays clean without anyone touching it.",
  buttons: `${cta()}<a class="btn btn--ghost" href="/book-a-call/?need=automation">Get a free automation audit</a>`,
  visual,
})}

<section class="sec sec--white">
  <div class="container define">
    <h2 class="define__q reveal">What is AI automation for a small team?</h2>
    <div class="define__a reveal">
      <p>It's connecting the tools you already use (forms, WhatsApp, email, CRM, calendar) with AI that reads, writes and decides small things, so repetitive work happens on its own.</p>
      <p>You stay in control: we set the rules, you approve what the AI can say.</p>
    </div>
  </div>
</section>

<section class="sec sec--pink" aria-labelledby="what-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("What we automate")}<h2 id="what-h">Seven jobs nobody on your team should be doing by hand</h2></div>
    <div class="grid-3">
      ${flows.map(([ic, a, b], i) => `<div class="card ${i === 0 ? "card--pink" : i === 3 ? "card--lime" : ""} reveal"><span class="engine__icon" style="width:48px;height:48px;border-radius:14px;margin-bottom:16px;${i === 0 || i === 3 ? "" : "background:var(--pink-100);color:var(--pink-700)"}">${icon(ic)}</span><h3>${a}</h3><p class="${i === 0 || i === 3 ? "" : "muted"}">${b}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="flow-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Inside one workflow", "lime")}<h2 id="flow-h">What happens when a new lead comes in</h2></div>
    <div class="diagram reveal" style="background:#141414;border:1px solid var(--line-dark)">${diagram}</div>
    <p class="diagram-caption">Scroll sideways on small screens.</p>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="hrs-h">
  <div class="container split split--wide" style="align-items:center">
    <div class="reveal">
      ${kicker("Hours back", "lime")}
      <h2 id="hrs-h">Where a five-person team's week goes</h2>
      <p class="lead mt-4">The audit maps a real week of your team's work. This is the kind of picture it produces, and where we start.</p>
    </div>
    <div class="chart-card reveal" style="margin-top:0">
      <div class="chart-card__head"><h3>Hours per week, before and after</h3><span class="sample">${icon("eye")} Sample · illustrative numbers</span></div>
      <div class="legend"><span><i style="background:#ff2dab"></i>Before</span><span><i style="background:#bdf000"></i>After automation</span></div>
      <div class="bars" style="margin-top:0;gap:16px">
        ${hours.map(([l, b, a]) => `<div><div style="font-size:var(--fs-sm);font-weight:600;margin-bottom:6px">${l}</div>
          <div class="bar" style="grid-template-columns:1fr 64px"><span class="bar__track" style="background:#f0f0ee;height:14px"><span class="bar__fill" data-v="${b / 6}" style="background:var(--grad-pink)"></span></span><span>${b} h</span></div>
          <div class="bar" style="grid-template-columns:1fr 64px;margin-top:4px"><span class="bar__track" style="background:#f0f0ee;height:14px"><span class="bar__fill" data-v="${a / 6}" style="background:var(--grad-lime)"></span></span><span>${a} h</span></div></div>`).join("")}
      </div>
      <p class="chart-summary">Illustrative: 18 hours a week of manual work reduced to about 2.25 hours.</p>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="how-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("How it works")}<h2 id="how-h">Audit, build, hand over</h2></div>
    <ol class="steps grid-2">
      <li class="reveal"><span><strong>Audit (week 1)</strong><span>We map one week of your team's repetitive work and pick the 3 workflows that save the most hours.</span></span></li>
      <li class="reveal"><span><strong>Build (weeks 2–4)</strong><span>We build, test with real data, and fix what breaks.</span></span></li>
      <li class="reveal"><span><strong>Hand over</strong><span>Every workflow documented with a short Loom, on your accounts.</span></span></li>
      <li class="reveal"><span><strong>Support</strong><span>Monthly check-ins and fixes, so workflows keep up as your business changes.</span></span></li>
    </ol>
    <div class="split mt-7" style="align-items:center">
      <div class="reveal"><h3>Tools we build on</h3><p class="muted mt-4">Your accounts, your data. We don't store client data on ours.</p></div>
      <ul class="tools reveal">${["n8n", "Make", "Zapier", "ChatGPT", "Claude", "WhatsApp Business", "HubSpot", "Google Workspace"].map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
  </div>
</section>

${krishNote({
  title: "The cheapest hire you'll make is the one you don't need.",
  body: "Every small team I've worked with had the same problem: smart people doing robot work. Copying leads from forms. Chasing follow-ups from memory. Writing the same email for the tenth time. AI doesn't replace your team. It gives them their afternoons back.",
})}

<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Questions")}<h2 id="faq-h">AI automation FAQ</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaBand({ title: "Show us your week. We'll show you what to automate first.", tone: "lime" })}
`;

export default page({
  path,
  title: "AI Automation for Sales Teams | Kre8ify",
  description: "AI workflows that reply to leads, follow up and update your CRM, so a small team works like a bigger one. Free automation audit.",
  body,
  schema: [serviceSchema("AI Automation", "AI workflows for lead replies, follow-ups, meeting briefs, CRM updates and reporting.", path), faqSchema(faqs)],
});
