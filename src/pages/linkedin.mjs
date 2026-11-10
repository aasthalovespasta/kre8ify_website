import { page, icon, cta, kicker, ctaBand, pageHero, faqBlock, faqSchema, serviceSchema, krishNote, PHOTO } from "../lib.mjs";

const path = "/linkedin-personal-branding/";

const faqs = [
  ["Will the posts really sound like me?", "Yes. Everything starts from the voice interview, and nothing goes live without your approval."],
  ["How much of my time does it take?", "One 60-minute call a week in month one, then about 20 minutes a week to approve posts."],
  ["Do you post from my account?", "Only with your permission, and only content you've approved."],
  ["I have very few followers. Is it too late?", "No. Krish started at zero. A small, right audience beats a big, wrong one."],
  ["Is this ghostwriting?", "It's your thinking, written up. We interview you, draft in your voice, and you approve or edit every post. Many founders end up writing some posts themselves once the system is running."],
];

const visual = `
<div class="hv hv--white" aria-label="Sample LinkedIn post written in a founder's voice" style="padding:var(--s5)">
  <div style="display:flex;gap:12px;align-items:center">
    <img src="${PHOTO.note}" alt="" width="48" height="48" style="width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:50% 18%">
    <div><b style="display:block">Your name</b><small class="muted">Founder · helps B2B teams sell without a sales team</small></div>
    <span class="sample" style="margin-left:auto">Sample post</span>
  </div>
  <p style="margin-top:16px;font-size:1.02rem;line-height:1.55">We lost a ₹6L deal last year.<br><br>Not on price. Not on product.<br><br>We lost it because nobody replied to their email for four days.<br><br>Here's the 3-step follow-up system we built after that, and what it's booked since ↓</p>
  <div style="display:flex;gap:18px;margin-top:16px;padding-top:12px;border-top:1px solid var(--line);font-size:var(--fs-sm);color:var(--text-2)"><span>214 reactions</span><span>38 comments</span><span style="margin-left:auto;font-weight:700;color:var(--pink-700)">6 buyer DMs</span></div>
</div>`;

const body = `
${pageHero({
  crumbs: ["Services", "LinkedIn Personal Branding"],
  tone: "pink",
  title: "Your buyers check your LinkedIn before they reply. Give them a reason to.",
  sub: "We turn what's in your head into posts your buyers read, trust and act on. Written in your voice, approved by you, and connected to outreach so engagement turns into conversations.",
  buttons: `${cta()}<a class="btn btn--ghost" href="/book-a-call/?teardown=profile">Get a free profile teardown</a>`,
  extra: `<p class="proofline">${icon("trend")} The same playbook took Krish from 0 to 28,000+ followers with zero ad spend.</p>`,
  visual,
})}

<section class="sec sec--white" aria-labelledby="m1-h">
  <div class="container">
    <div class="split">
      <div class="reveal">
        ${kicker("Month one")}
        <h2 id="m1-h">What you get in month one</h2>
        <p class="lead mt-4">A one-time set-up that makes everything after it faster and more like you.</p>
      </div>
      <ul class="ticks ticks--pink reveal">
        <li>${icon("check")}<span><b>Profile audit and full rewrite:</b> headline, about, featured, banner</span></li>
        <li>${icon("check")}<span><b>A 90-minute voice capture interview,</b> so posts sound like you on a good day</span></li>
        <li>${icon("check")}<span><b>4 content pillars</b> tied to what your buyers care about</span></li>
        <li>${icon("check")}<span><b>30 opening hooks and 10 post templates,</b> built for your niche</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="mo-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Every month", "lime")}<h2 id="mo-h">What runs every month</h2></div>
    <div class="grid-3">
      <div class="card card--ink reveal"><span class="stat__num" style="color:var(--pink)">12</span><h3 class="mt-4">Posts a month</h3><p class="muted">In your voice, approved by you.</p></div>
      <div class="card card--ink reveal"><span class="stat__num" style="color:var(--lime)">5</span><h3 class="mt-4">Warm DM conversations a week</h3><p class="muted">With your ideal buyers, handed to you when they're ready.</p></div>
      <div class="card card--ink reveal"><span class="stat__num" style="color:var(--pink)">10</span><h3 class="mt-4">Target accounts, every day</h3><p class="muted">Thoughtful engagement on the people you want to sell to.</p></div>
    </div>
    <ul class="ticks mt-6 reveal" style="max-width:640px">
      <li>${icon("check")}<span>Monthly content refresh based on what worked</span></li>
      <li>${icon("check")}<span>Monday report: reach, followers, conversations, leads</span></li>
    </ul>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="tg-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Targets", "lime")}<h2 id="tg-h">Conversations first, reach second</h2><p class="lead">What we work towards by the end of 90 days. Your exact targets are set on the first call.</p></div>
    <div class="grid-3">
      <div class="card card--lime reveal"><span class="stat__num" style="color:var(--ink)">5 / wk</span><h3 class="mt-4">Warm buyer conversations</h3><p>The number that matters most.</p></div>
      <div class="card reveal"><span class="stat__num t-pink">~10K / wk</span><h3 class="mt-4">Impressions</h3><p class="muted">From the right people, not just more people.</p></div>
      <div class="card reveal"><span class="stat__num t-lime">200 / mo</span><h3 class="mt-4">New followers</h3><p class="muted">Buyers, peers and future hires.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="how-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("How it works")}<h2 id="how-h">About 20 minutes a week of your time</h2></div>
    <ol class="steps">
      <li class="reveal"><span><strong>Capture</strong><span>A 90-minute interview and a close read of what your buyers follow.</span></span></li>
      <li class="reveal"><span><strong>Plan</strong><span>Pillars, hooks and a monthly calendar.</span></span></li>
      <li class="reveal"><span><strong>Write</strong><span>We draft, you approve (about 20 minutes a week).</span></span></li>
      <li class="reveal"><span><strong>Engage</strong><span>We warm up your buyers in comments and DMs.</span></span></li>
      <li class="reveal"><span><strong>Convert</strong><span>Warm conversations are handed to you, or into outreach if you run <a href="/gtm-engineering/">GTM engineering</a> with us.</span></span></li>
    </ol>
  </div>
</section>

${krishNote({
  title: "I didn't grow to 28K by posting more. I grew by sounding like one person, not a brand.",
  body: "The founders who win on LinkedIn aren't the best writers. They're the most specific. They say what they actually think about their industry, and they say it every week. My job is to pull that out of you in 90 minutes and keep it coming without eating your week.",
  tone: "pink",
})}

<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Questions")}<h2 id="faq-h">LinkedIn branding FAQ</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaBand({ title: "Let's make your profile do the first meeting for you." })}
`;

export default page({
  path,
  title: "LinkedIn Personal Branding for Founders | Kre8ify",
  description: "LinkedIn content in your voice, built for clients, not likes. The playbook that took Krish Bhatia from 0 to 28K followers.",
  body,
  schema: [serviceSchema("LinkedIn Personal Branding", "LinkedIn content, profile rewrites and engagement for founders, written in their voice.", path), faqSchema(faqs)],
});
