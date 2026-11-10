import { page, icon, cta, kicker, ctaBand, pageHero, faqBlock, faqSchema, serviceSchema, krishNote, PHOTO } from "../lib.mjs";

const path = "/instagram-content-video/";

const faqs = [
  ["I'm not comfortable on camera.", "Most of our founders weren't either. We script, rehearse and shoot in short takes, and fix the rest in the edit."],
  ["Do you run paid ads?", "No, we focus on organic content and creators. If you need paid, we'll refer you to a partner."],
  ["Can you also post on LinkedIn?", "Yes. The same shoot can feed both. See <a href=\"/linkedin-personal-branding/\">LinkedIn Personal Branding</a>."],
  ["How soon do videos go live?", "First reels in about 2 weeks from the strategy call."],
  ["Where do you shoot?", "Shoots are in Delhi NCR. For other cities, talk to us on the call."],
];

const visual = `
<div style="display:flex;gap:16px;justify-content:center;align-items:flex-end">
  <div style="width:min(260px,62vw);aspect-ratio:9/16;border-radius:34px;padding:10px;background:#0e0e0e;box-shadow:0 40px 80px -40px rgba(0,0,0,.6);position:relative">
    <div style="position:absolute;inset:10px;border-radius:26px;overflow:hidden;background:var(--grad-pink)">
      <img src="${PHOTO.hero}" alt="" width="510" height="710" style="width:100%;height:100%;object-fit:cover;object-position:50% 10%;opacity:.95">
      <div style="position:absolute;left:12px;right:12px;top:16px;display:flex;justify-content:space-between;color:#fff;font-size:12px;font-weight:700"><span>Reels</span><span class="sample" style="background:rgba(0,0,0,.5);color:#fff;border-color:rgba(255,255,255,.4)">Sample</span></div>
      <div style="position:absolute;left:12px;right:12px;bottom:18px;color:#fff">
        <p style="font-family:var(--font-display);font-weight:800;font-size:1.05rem;line-height:1.1;letter-spacing:-.03em;background:var(--pink);color:var(--ink);display:inline;padding:2px 6px;box-decoration-break:clone;-webkit-box-decoration-break:clone">3 things I'd tell myself before my first client</p>
        <p style="margin-top:10px;font-size:12px;opacity:.9">Script · shoot · edit by Kre8ify</p>
      </div>
      <span style="position:absolute;inset:0;margin:auto;width:56px;height:56px;border-radius:50%;background:rgba(14,14,14,.6);display:grid;place-items:center;color:#fff">${icon("play")}</span>
    </div>
  </div>
  <div style="display:grid;gap:12px;padding-bottom:24px">
    <div class="float-card" style="position:static"><strong>2 wks</strong>to first reels</div>
    <div class="float-card" style="position:static;background:var(--lime);border-color:var(--lime-500)"><strong>1 day</strong>shoot, a month of content</div>
  </div>
</div>`;

const what = [
  ["target", "Content strategy", "What to post, for whom, and why it leads to enquiries."],
  ["pen", "Scripting", "Hooks and scripts in English or Hinglish, written for your audience."],
  ["camera", "Shoot days", "We plan one shoot and batch a month of content in it."],
  ["layers", "Editing", "Reels, captions, thumbnails and covers."],
  ["video", "Founder and brand videos", "Story-led videos for your profile, website and pitches."],
  ["users", "Creator and UGC campaigns", "Sourcing, briefing and managing creators. 40+ activated for Headfield."],
  ["trend", "Posting and reporting", "We publish, track and report every Monday."],
];

const body = `
${pageHero({
  crumbs: ["Services", "Instagram & Video"],
  tone: "pink",
  title: "We script it, shoot it and edit it. You just show up.",
  sub: "Reels, founder videos and brand content for founders, startups and brands. Strategy, scripts, shoot days and editing, done by one team that also knows how to turn views into enquiries.",
  buttons: `${cta()}<a class="btn btn--ghost" href="/work/">See our work</a>`,
  visual,
})}

<section class="sec sec--white" aria-labelledby="for-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Who it's for")}<h2 id="for-h">For people who sell on trust</h2></div>
    <div class="grid-3">
      <div class="card card--soft-pink reveal">${icon("sparkles", "")}<h3 class="mt-4">Founders and personal brands</h3><p class="muted">Who want to be seen as the face of their category.</p></div>
      <div class="card card--soft-lime reveal">${icon("rocket", "")}<h3 class="mt-4">Startups</h3><p class="muted">That need content explaining what they do in 30 seconds.</p></div>
      <div class="card reveal">${icon("briefcase", "")}<h3 class="mt-4">Brands that sell on trust</h3><p class="muted">Real estate, edtech, D2C and services.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="what-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("What we do", "lime")}<h2 id="what-h">Camera, scripts and strategy, under one roof</h2></div>
    <div class="grid-3">
      ${what.map(([ic, a, b], i) => `<div class="card ${i === 2 ? "card--pink" : i === 5 ? "card--lime" : "card--ink"} reveal"><span class="engine__icon" style="width:48px;height:48px;border-radius:14px;margin-bottom:16px;${i === 2 || i === 5 ? "" : "background:var(--ink-3);color:var(--lime)"}">${icon(ic)}</span><h3>${a}</h3><p class="${i === 2 || i === 5 ? "" : "muted"}">${b}</p></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="how-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("How it works", "lime")}<h2 id="how-h">From strategy call to first reels in two weeks</h2></div>
    <ol class="steps steps--lime">
      <li class="reveal"><span><strong>Strategy call</strong><span>Your audience, your angle, your content pillars.</span></span></li>
      <li class="reveal"><span><strong>Scripts</strong><span>A month of scripts, approved by you.</span></span></li>
      <li class="reveal"><span><strong>Shoot day</strong><span>One day, batched, done. Shoots are in Delhi NCR.</span></span></li>
      <li class="reveal"><span><strong>Edit and publish</strong><span>First reels live in 2 weeks.</span></span></li>
      <li class="reveal"><span><strong>Review</strong><span>What got views, saves and DMs, and what we change next month.</span></span></li>
    </ol>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="proof-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Proof")}<h2 id="proof-h">Recent work</h2></div>
    <div class="grid-3">
      <div class="card card--pink reveal"><span class="chip" style="background:rgba(255,255,255,.6);color:var(--ink)">Real estate</span><h3 class="mt-4">Roofs &amp; Assets</h3><p>Founder-led content and full-funnel social.</p><p class="stat__num mt-5" style="color:var(--ink)">3–4x</p><p>social growth</p></div>
      <div class="card reveal"><span class="chip chip--light">Real estate</span><h3 class="mt-4">Ganga Realty</h3><p class="muted">UGC reels built to drive site visits.</p></div>
      <div class="card card--lime reveal"><span class="chip" style="background:rgba(255,255,255,.6);color:var(--ink)">Global B2B, India launch</span><h3 class="mt-4">Headfield</h3><p>Creator-led coverage of their India event, online and on the ground.</p><p class="stat__num mt-5" style="color:var(--ink)">40+</p><p>creators activated</p></div>
    </div>
  </div>
</section>

${krishNote({
  title: "Nobody buys from a logo. They buy from a face they've seen 20 times.",
  body: "I've spent years making content for founders, coaches and brands on Instagram. The ones that grew weren't the most polished. They showed up every week with a clear point of view. We handle the camera, the scripts and the edits, so the only thing you bring is you.",
})}

<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Questions")}<h2 id="faq-h">Instagram and video FAQ</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaBand({ title: "Let's put your face where your buyers are scrolling." })}
`;

export default page({
  path,
  title: "Instagram Content & Founder Videos | Kre8ify",
  description: "Reels, founder videos and brand content. We script, shoot and edit; you show up. For founders, startups and brands.",
  body,
  schema: [serviceSchema("Instagram Content & Video Production", "Reels, founder videos, shoots, editing and creator campaigns.", path), faqSchema(faqs)],
});
