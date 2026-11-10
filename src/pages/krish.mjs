import { page, icon, cta, kicker, ctaBand, SITE, PHOTO } from "../lib.mjs";

const path = "/krish/";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krish Bhatia",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: "Kre8ify", url: SITE.url },
  alumniOf: "University of Delhi",
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  sameAs: [SITE.linkedin],
};

const body = `
<section class="phero phero--ink">
  <div class="container about-hero">
    <div>
      <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>About Krish</li></ol>
      <h1>I sell for a living. So I built the system I wished my clients had.</h1>
      <p class="lead">Krish Bhatia, founder of Kre8ify. LinkedIn creator, GTM strategist, and the person who reviews every build before it goes live.</p>
      <div class="btn-row">${cta()}<a class="btn btn--ghost" href="${SITE.linkedin}" target="_blank" rel="noopener">${icon("linkedin")} Follow me on LinkedIn</a></div>
    </div>
    <div class="photo-stack reveal">
      <div class="main"><img src="${PHOTO.about}" alt="Portrait of Krish Bhatia, founder of Kre8ify" width="900" height="1199" fetchpriority="high"></div>
      <div class="tagcard2"><strong>28K+</strong>LinkedIn followers, organic</div>
      <div class="tagcard">Takes every first call himself</div>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="story-h">
  <div class="container split split--wide">
    <div>
      ${kicker("The story")}
      <h2 id="story-h" class="reveal">From zero followers to 28K. From posting to closing.</h2>
      <ol class="journey mt-7 reveal" aria-label="Krish's journey">
        <li><span><b>Delhi University</b><span>Graduated, and started building on social media.</span></span></li>
        <li><span><b>Skilldify, social media</b><span>4+ years with edtechs, creators, coaches, consultants and real estate brands.</span></span></li>
        <li><span><b>0 → 28,000+ on LinkedIn</b><span>Grown organically, without a rupee on ads.</span></span></li>
        <li><span><b>Hive PGP in revenue, GTM and sales</b><span>A year learning the other half: how buyers go from "interesting" to "send the invoice".</span></span></li>
        <li><span><b>Kre8ify</b><span>Both halves in one team, for founders going from 0 to 1.</span></span></li>
      </ol>
    </div>
    <div class="story reveal">
      <p>I started where most founders I meet are standing today: zero followers, a good point of view, and no idea how to turn it into business.</p>
      <p>After Delhi University, I joined Skilldify and ran social media. Over the next 4+ years I worked with edtechs, creators, coaches, consultants and real estate brands on LinkedIn and Instagram. I also grew my own LinkedIn from zero to 28,000+ followers, without spending a rupee on ads.</p>
      <p class="pull">The content was working. But a lot of that attention went nowhere, because nobody owned what happened next.</p>
      <p>People were watching, liking and DMing. So I spent a year in Hive's PGP in revenue, GTM and sales, learning how buyers move from "interesting" to "let's talk" to "send the invoice". I kept closing deals myself while I learned.</p>
      <p>Kre8ify is both halves in one team. Content that makes you known. Systems that turn that into booked calls. And for founders starting from scratch, the set-up, the first clients and the invoices, done properly from day one.</p>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="bel-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("What I believe", "lime")}<h2 id="bel-h">Five rules I run every account by</h2></div>
    <ul class="beliefs">
      <li class="reveal"><b>Attention without follow-up is wasted.</b><span>Every post should have a path to a conversation.</span></li>
      <li class="reveal"><b>You should own your systems.</b><span>Tools on your accounts, data in your CRM. If we part ways, your engine keeps running.</span></li>
      <li class="reveal"><b>Bad weeks get reported, not hidden.</b><span>You hear it from me first.</span></li>
      <li class="reveal"><b>If I wouldn't post it under my name, it doesn't go under yours.</b><span>Same standard, every client.</span></li>
      <li class="reveal"><b>Specific beats polished.</b><span>A clear opinion every week beats a perfect post every month.</span></li>
    </ul>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="cred-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Credentials", "lime")}<h2 id="cred-h">The short version</h2></div>
    <div class="grid-4">
      <div class="card reveal"><span class="stat__num t-pink">28K+</span><p class="mt-4">LinkedIn followers, grown organically</p></div>
      <div class="card reveal"><span class="stat__num t-lime">50+</span><p class="mt-4">founder workshops on growth and go-to-market</p></div>
      <div class="card reveal"><span class="stat__num t-pink">2025</span><p class="mt-4">Speaker, Trainfluence</p></div>
      <div class="card reveal"><span class="stat__num t-lime">PGP</span><p class="mt-4">Revenue, GTM and sales, Hive. Delhi University graduate.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="team-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("The team")}<h2 id="team-h">Who works on your account</h2><p class="lead">A small team you can see beats an anonymous "pod". Krish leads every account.</p></div>
    <div class="team">
      <div class="member reveal"><div class="av"><img src="${PHOTO.note}" alt="" width="64" height="64"></div><small>Founder</small><b>Krish Bhatia</b><span>Strategy, positioning, every client call.</span></div>
      <div class="member reveal"><div class="av">${icon("target")}</div><small>GTM systems</small><b>Lists and sequences</b><span>Lists, enrichment, sequences and CRM.</span></div>
      <div class="member reveal"><div class="av">${icon("bot")}</div><small>GTM and AI automation</small><b>Workflows</b><span>Workflows and integrations.</span></div>
      <div class="member reveal"><div class="av">${icon("pen")}</div><small>Content</small><b>Writing and design</b><span>Writing, design and engagement, plus specialist freelancers for shoots and editing.</span></div>
    </div>
  </div>
</section>

${ctaBand({
  title: "If you've read this far, let's just talk.",
  secondary: `<a class="btn btn--ghost" href="${SITE.linkedin}" target="_blank" rel="noopener">Follow me on LinkedIn</a>`,
})}
`;

export default page({
  path,
  title: "Krish Bhatia, Founder of Kre8ify",
  description: "LinkedIn creator with 28K+ organic followers and GTM strategist. Why Krish built Kre8ify and how he runs every account.",
  body,
  schema: [person],
});
