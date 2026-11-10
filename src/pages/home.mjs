import { page, icon, cta, link, kicker, ctaBand, lineChart, SITE, PHOTO } from "../lib.mjs";
import { roadmap, flowBlock, caseCards } from "../content.mjs";

const signs = [
  ["Sales stops when you stop.", "Take a week off and the pipeline takes one too."],
  ["You know you should post.", "There's no time, and when you do, it doesn't sound like you."],
  ["Cold outreach gets ignored.", "Same pitch, wrong person, wrong time."],
  ["Warm leads go cold.", "Someone shows interest and nobody replies for four days."],
  ["Your agency sends reports, not meetings.", "Lots of activity. Very few conversations."],
  ["Hiring feels like a gamble.", "Three months of salary before you know if it works."],
];

const engines = [
  {
    tone: "lime", ic: "rocket", badge: "New founders start here", name: "Get Started", sub: "0 to 1 Launchpad",
    body: "From the documents you need to your first invoice. We set up the business, shape the offer and help you land and manage your first clients.",
    items: ["Registrations, contracts and the right structure", "Your first clients, from a path you can repeat", "Client management and GST-ready invoicing"],
    links: [["See the 0 to 1 Launchpad", "/launchpad/"]],
  },
  {
    tone: "pink", ic: "megaphone", badge: "Engine 01", name: "Get Known", sub: "LinkedIn and Instagram branding",
    body: "Posts, reels and founder videos in your voice, so the right people start following you before you ever pitch them.",
    items: ["LinkedIn content written in your voice, approved by you", "Instagram reels, shoots and editing", "Founder and brand videos"],
    links: [["LinkedIn Branding", "/linkedin-personal-branding/"], ["Instagram & Video", "/instagram-content-video/"]],
  },
  {
    tone: "white", ic: "target", badge: "Engine 02", name: "Get Clients", sub: "GTM engineering",
    body: "We find companies that are ready to buy, reach them with a relevant message at the right moment, and put calls on your calendar.",
    items: ["Buyer lists built around your ideal customer", "Email and LinkedIn outreach triggered by buying signals", "Follow-ups and CRM updates that never get forgotten"],
    links: [["See GTM Engineering", "/gtm-engineering/"]],
  },
  {
    tone: "ink", ic: "bot", badge: "Engine 03", name: "Run Lean", sub: "AI automation",
    body: "AI workflows that reply to leads, follow up, prep your meetings and update your CRM, so your small team works like a bigger one.",
    items: ["Instant replies to new leads", "Meeting briefs before every call", "One video turned into a week of posts"],
    links: [["See AI Automation", "/ai-automation/"]],
  },
];

const yes = (t = "Yes") => `<span class="yes">${icon("check")}${t}</span>`;
const no = (t = "No") => `<span class="no">${icon("minus")}${t}</span>`;
const meh = (t) => `<span class="meh">${icon("minus")}${t}</span>`;

const body = `
<section class="hero-d" aria-labelledby="hero-h">
  <div class="container hero-d__grid">
    <div class="hero-d__copy">
      <p class="badge-live"><i aria-hidden="true"></i>Founder-led growth studio in New Delhi</p>
      <h1 id="hero-h"><span class="l1">Get known.</span><span class="l2">Get clients.<svg class="scribble" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true"><path d="M6 26 C 120 8, 260 6, 420 14 S 560 30, 594 12"/></svg></span></h1>
      <p class="lead">Kre8ify helps new-age founders go from 0 to 1. We set up the business, <b>build your founder brand on LinkedIn and Instagram</b>, then turn that attention into booked calls with outbound and AI automation. Led by Krish Bhatia, a founder who still sells every week.</p>
      <div class="btn-row">${cta()}<a class="btn btn--ghost" href="/book-a-call/?teardown=1">Get a free growth teardown</a></div>
      <div class="trusted"><b>Brands we've built with</b><span class="names"><span>Headfield</span><span>Roofs &amp; Assets</span><span>Ganga Realty</span><span>Unacademy</span></span></div>
    </div>
    <figure class="founder-fig">
      <div class="founder-fig__arch"><img src="/assets/img/krish-hero.webp" alt="Krish Bhatia, founder of Kre8ify, in a grey blazer and pink shirt" width="510" height="710" fetchpriority="high"></div>
      <div class="founder-fig__stat"><strong>0 → 28K+</strong>LinkedIn followers, zero ads</div>
      <figcaption class="founder-fig__name"><b>Krish Bhatia</b><small>Founder. On every account.</small></figcaption>
      <a class="founder-fig__li" href="${SITE.linkedin}" target="_blank" rel="noopener">${icon("linkedin")} Follow Krish</a>
    </figure>
  </div>
  <div class="container dock">
    <div class="dock__in">
      <div class="stat"><div class="stat__num">28K+</div><p>LinkedIn followers Krish grew himself, zero ad spend</p></div>
      <div class="stat"><div class="stat__num">4+ yrs</div><p>building founder and brand content on LinkedIn and Instagram</p></div>
      <div class="stat"><div class="stat__num">40+</div><p>creators activated in a single campaign for Headfield</p></div>
      <div class="stat"><div class="stat__num">1 team</div><p>for set-up, content, outbound and AI. You own all of it.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--pink" aria-labelledby="meet-h">
  <div class="container meet">
    <div class="meet__photo reveal">
      <div class="main"><img src="${PHOTO.meet}" alt="Krish Bhatia, founder of Kre8ify" width="900" height="1199" loading="lazy"></div>
      <div class="sticker" aria-hidden="true">Krish takes every first call</div>
    </div>
    <div class="reveal">
      ${kicker("Meet your founder")}
      <h2 id="meet-h">I'm on your account. Not a junior with my name on the deck.</h2>
      <p class="quote">I started on LinkedIn with zero followers and grew to 28,000+ without spending a rupee on ads. Then I spent a year studying revenue, GTM and sales, and kept closing deals myself.</p>
      <p class="quote">The pattern was always the same: founders were either invisible, or visible with nothing behind it to turn attention into calls. Kre8ify is the team I wished those founders had.</p>
      <ul class="promise">
        <li><span class="ico">${icon("eye")}</span><span><b>I set the strategy</b><span>On every account, from the first call.</span></span></li>
        <li><span class="ico">${icon("shield")}</span><span><b>I review every build</b><span>Nothing goes live without my sign-off.</span></span></li>
        <li><span class="ico">${icon("calendar")}</span><span><b>You hear from me on Mondays</b><span>Good weeks and bad ones.</span></span></li>
        <li><span class="ico">${icon("chat")}</span><span><b>You can reach me directly</b><span>WhatsApp, not a ticket queue.</span></span></li>
      </ul>
      <div class="btn-row mt-6">${link("Read my story", "/krish/")}</div>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="prob-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("The problem")}
      <h2 id="prob-h">Most founders have one of two problems. Some have both.</h2>
    </div>
    <div class="grid-2">
      <div class="card card--pink problem-card reveal"><span class="tag">Problem 1</span><div><h3>Nobody knows you.</h3><p>You're great at what you do, but buyers can't find you, and when they check your LinkedIn, it's quiet.</p></div></div>
      <div class="card card--lime problem-card reveal"><span class="tag">Problem 2</span><div><h3>People know you, but nobody books.</h3><p>You get likes, DMs and "interesting!", and then nothing. No follow-up, no system, no pipeline.</p></div></div>
    </div>
    <p class="bridge reveal">Agencies fix one half. Kre8ify fixes the whole path, from the paperwork to the first post to the booked call.</p>
    <ul class="signs" aria-label="Six signs you need this">
      ${signs.map(([a, b]) => `<li class="reveal">${icon("alert")}<span><strong>${a}</strong><span>${b}</span></span></li>`).join("")}
    </ul>
  </div>
</section>

<section class="sec sec--lime" id="engines" aria-labelledby="eng-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("What we do", "lime")}
      <h2 id="eng-h">One starting line. Three engines. One team.</h2>
      <p class="lead">Start where you are. New founders begin with the Launchpad; established founders plug in the engine they need. Every tool and every account stays yours.</p>
    </div>
    <div class="engines">
      ${engines.map((e) => `
      <article class="engine engine--${e.tone} reveal">
        <div class="engine__top"><span class="engine__badge">${e.badge}</span><span class="engine__icon">${icon(e.ic)}</span></div>
        <div><h3>${e.name}</h3><p class="engine__sub">${e.sub}</p></div>
        <p>${e.body}</p>
        <ul>${e.items.map((i) => `<li>${icon("check")}<span>${i}</span></li>`).join("")}</ul>
        <div class="links">${e.links.map(([l, h]) => link(l, h)).join("")}</div>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="road-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("From idea to invoice", "lime")}
      <h2 id="road-h">Building from zero? Here's the whole road, in order.</h2>
      <p class="lead">Five stages we walk new founders through, from the documents you need to getting paid on time. Pick a stage to see what's inside.</p>
    </div>
    <div class="reveal">${roadmap({ idPrefix: "home" })}</div>
    <div class="btn-row mt-6 reveal">${cta("Start with the Launchpad", "/launchpad/", "btn--lime")}</div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="flow-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("How it connects")}
      <h2 id="flow-h">A post becomes a signal. A signal becomes a meeting.</h2>
      <p class="lead">Content and outbound run as one system, so the attention you earn doesn't leak away. Select a step to see what happens.</p>
    </div>
    ${flowBlock()}
  </div>
</section>

<section class="sec sec--pink" aria-labelledby="why-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Why Kre8ify")}
      <h2 id="why-h">Why founders pick us over another agency</h2>
    </div>
    <div class="table-wrap reveal">
      <table class="compare">
        <caption class="sr-only">Kre8ify compared with a content agency and an outbound agency</caption>
        <thead><tr><th scope="col"><span class="sr-only">Capability</span></th><th scope="col">Content agency</th><th scope="col">Outbound agency</th><th scope="col" class="us">Kre8ify</th></tr></thead>
        <tbody>
          <tr><th scope="row">Helps you set up the business</th><td>${no()}</td><td>${no()}</td><td class="us">${yes()}</td></tr>
          <tr><th scope="row">Makes you known</th><td>${yes()}</td><td>${no()}</td><td class="us">${yes()}</td></tr>
          <tr><th scope="row">Books meetings</th><td>${no()}</td><td>${yes()}</td><td class="us">${yes()}</td></tr>
          <tr><th scope="row">Shoots and edits video</th><td>${meh("Sometimes")}</td><td>${no()}</td><td class="us">${yes()}</td></tr>
          <tr><th scope="row">Who runs your account</th><td>An account manager</td><td>An SDR team</td><td class="us">Krish, the founder</td></tr>
          <tr><th scope="row">Who owns the tools and data</th><td>The agency</td><td>The agency</td><td class="us">You</td></tr>
        </tbody>
      </table>
    </div>
    <p class="after-table reveal">Most GTM shops stop at the inbox. Most content agencies stop at likes. We do both, and we bring the camera.</p>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="who-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Who it's for")}
      <h2 id="who-h">Built for founders who are still the best salesperson in the company</h2>
    </div>
    <div class="aud">
      <ul class="aud-list">
        <li class="reveal">${icon("rocket")}<strong>New-age founders</strong><span>Just starting, or just quit the job. You need the set-up and the first clients.</span></li>
        <li class="reveal">${icon("briefcase")}<strong>B2B SaaS and service companies</strong><span>5 to 30 people, selling to other businesses.</span></li>
        <li class="reveal">${icon("video")}<strong>Founder-led brands</strong><span>Real estate, edtech, D2C and consumer brands that grow on trust and video.</span></li>
        <li class="reveal">${icon("clock")}<strong>Founders who are maxed out</strong><span>You sell, deliver and market. Something has to give.</span></li>
      </ul>
      <div class="notfor reveal">
        <h3>Not for you if</h3>
        <ul>
          <li>${icon("x")}<span>You want paid ads only.</span></li>
          <li>${icon("x")}<span>You won't spend one hour a week with us in month one.</span></li>
          <li>${icon("x")}<span>You want results in 7 days.</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="proof-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Proof", "lime")}
      <h2 id="proof-h">Work we can put our name on</h2>
      <p class="lead">Every brand here is one our team worked with directly. No borrowed logos.</p>
    </div>
    <div class="grid-3">${caseCards()}</div>
    <div class="btn-row mt-6 reveal">${cta("See all work", "/work/", "btn--lime")}</div>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="days-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Your first 90 days", "lime")}
      <h2 id="days-h">What happens, week by week</h2>
    </div>
    <ol class="phases">
      <li class="phase reveal"><span class="wk">Weeks 1–4</span><h3>You get found.</h3><p>Profile rewritten, voice captured, content live, outreach infrastructure warming up. First Monday report.</p></li>
      <li class="phase reveal"><span class="wk">Weeks 5–8</span><h3>Conversations start.</h3><p>Outreach goes live. Warm DMs, replies and your first booked calls.</p></li>
      <li class="phase reveal"><span class="wk">Weeks 9–12</span><h3>It becomes a system.</h3><p>Content, outreach and follow-ups run every week. We double down on what booked meetings and cut what didn't.</p></li>
    </ol>
    <div class="chart-card reveal">
      <div class="chart-card__head"><h3>How the work compounds over 12 weeks</h3><span class="sample">${icon("eye")} Sample · illustrative numbers</span></div>
      <div class="legend"><span><i style="background:#ff2dab"></i>Warm conversations per week</span><span><i style="background:#3f5500"></i>Booked calls per week</span></div>
      ${lineChart({
        id: "c90",
        labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
        yMax: 16,
        yLabel: "per week",
        bands: [
          { from: 0, to: 3, fill: "#fff4fa", label: "Get found" },
          { from: 3, to: 7, fill: "#ffe4f3", label: "Conversations start" },
          { from: 7, to: 11, fill: "#ffc2e6", label: "System" },
        ],
        series: [
          { name: "warm conversations", color: "#ff2dab", area: true, data: [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 13, 15] },
          { name: "booked calls", color: "#3f5500", data: [0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 5, 5] },
        ],
        summary: "Illustrative chart: warm conversations grow from 0 to about 15 a week over 12 weeks, and booked calls from 0 to about 5 a week, starting in week 5.",
      })}
      <p class="chart-summary">We don't promise a meeting count before we've seen your market. On the first call we'll give you a target we're willing to be measured against.</p>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="rep-h">
  <div class="container report">
    <div class="reveal">
      ${kicker("Reporting")}
      <h2 id="rep-h">You see the work. Every Monday.</h2>
      <p class="lead">A 3-minute Loom and a one-page report, before 11 AM every Monday: what we shipped, what it produced, what's next.</p>
      <ul class="report-list">
        <li><span class="ico ico--pink">${icon("play")}</span><span><strong>Every Monday</strong><span>A Loom walkthrough and a one-page report.</span></span></li>
        <li><span class="ico ico--lime">${icon("trend")}</span><span><strong>Every month</strong><span>A scorecard against the targets we agreed.</span></span></li>
        <li><span class="ico ico--ink">${icon("flag")}</span><span><strong>Every quarter</strong><span>A business review: what to double, what to cut.</span></span></li>
      </ul>
      <p class="mt-5"><strong>Bad weeks happen.</strong> When they do, you hear it from us first, along with what we're changing.</p>
    </div>
    <div class="report-mock reveal" aria-label="Sample Monday report with illustrative numbers">
      <div class="report-mock__top"><b>Monday report · Week 7</b><span class="sample">Sample · illustrative numbers</span></div>
      <div class="kpis">
        <div class="kpi"><small>Impressions</small><b>41.2K</b><em>+18% wk</em></div>
        <div class="kpi"><small>Warm DMs</small><b>23</b><em>+6</em></div>
        <div class="kpi"><small>Positive replies</small><b>9</b><em>+3</em></div>
        <div class="kpi"><small>Calls booked</small><b>3</b><em>+1</em></div>
      </div>
      <div class="bars">
        <div class="bar"><span>Posts shipped</span><span class="bar__track"><span class="bar__fill" data-v="0.75"></span></span><span>3/4</span></div>
        <div class="bar"><span>Sequences live</span><span class="bar__track"><span class="bar__fill" data-v="1"></span></span><span>4/4</span></div>
        <div class="bar"><span>Reply rate</span><span class="bar__track"><span class="bar__fill" data-v="0.62"></span></span><span>6.2%</span></div>
        <div class="bar"><span>Follow-ups on time</span><span class="bar__track"><span class="bar__fill" data-v="0.96"></span></span><span>96%</span></div>
      </div>
      <div class="notes">
        <p><b>Shipped:</b> 3 posts, 2 new signal campaigns, CRM clean-up.</p>
        <p><b>Next:</b> double down on the hiring-signal sequence, cut the webinar angle.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: "Your next client is already scrolling. Let's make sure they find you.",
  body: "On the call we map your ideal buyer, find where your pipeline leaks today, and tell you which engine to start with. You leave with a scope, a timeline and a price, even if you don't hire us.",
})}
`;

export default page({
  path: "/",
  title: "Kre8ify: Founder-Led Growth Studio, New Delhi",
  description: "We help new-age founders go from 0 to 1: business set-up, founder brands on LinkedIn and Instagram, and booked calls with outbound and AI automation. Led by Krish Bhatia.",
  ticker: true,
  dark: true,
  body,
});
