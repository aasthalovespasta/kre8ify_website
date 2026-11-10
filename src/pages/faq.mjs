import { page, kicker, ctaBand, faqBlock, faqSchema } from "../lib.mjs";

const groups = [
  ["About Kre8ify", [
    ["What is Kre8ify?", "Kre8ify is a founder-led growth studio in New Delhi, India, led by Krish Bhatia. We help new-age founders go from 0 to 1: we set up the business, build founder brands on LinkedIn and Instagram, and turn that attention into booked calls with GTM engineering and AI automation."],
    ["Is Kre8ify the same as Creatify?", "No. Kre8ify (spelled with an 8) is a growth studio for founders in India. It is not related to Creatify, the AI video ad software company in the US."],
    ["Who is Kre8ify for?", "First-time founders starting from scratch, and founder-led companies with 5 to 30 people where the founder still drives sales: B2B SaaS, B2B services, real estate, edtech and consumer brands."],
    ["Where are you based? Do you work outside India?", "We're based in New Delhi. We work with founders across India, and with US and UK founders on LinkedIn, GTM and AI work. Shoots are in Delhi NCR."],
  ]],
  ["Services and results", [
    ["What is the 0 to 1 Launchpad?", "The 0 to 1 Launchpad is 12 weeks of hands-on consulting for new founders: the documents and registrations you need, a clear offer, your first clients, client management and GST-ready invoicing. <a href=\"/launchpad/\">See the Launchpad</a>."],
    ["What is GTM engineering?", "GTM engineering is building the system behind your sales: who to target, how to find them, when to reach out and what happens after they reply, set up as connected workflows instead of manual work."],
    ["Can I start with just one service?", "Yes. Each engine works on its own. Most founders start with one and add the next once it's running. On the call we tell you which one pays back fastest."],
    ["When will I see results?", "Your profile and first content go live within 2 to 3 weeks. Outreach goes live around week 5, and first booked calls usually come in weeks 5 to 8."],
    ["Do you guarantee leads or meetings?", "No. Anyone who guarantees meetings before seeing your market is guessing. We set a target together after the first call and report against it every Monday."],
    ["What don't you do?", "Paid ads, SEO and website builds. If you need them, we'll refer you to people we trust."],
  ]],
  ["Working together", [
    ["How much does it cost?", "It depends on what you need and where you're starting. After a 30-minute call, you get a fixed scope, timeline and price within 48 hours, even if you don't hire us."],
    ["Who owns the tools and data?", "You do. Every tool sits on your accounts, and your prospect data lives in your CRM. If we part ways, your engine keeps running."],
    ["Do you add a mark-up on tools?", "No. You pay tool subscriptions directly. Our fee is our fee."],
    ["How much of my time do you need?", "One 60-minute call a week in month one, then every two weeks, plus a few minutes to approve posts and sequences."],
    ["How do I know what you're doing?", "A 3-minute Loom and a one-page report every Monday before 11 AM, a monthly scorecard and a quarterly review."],
  ]],
];
const all = groups.flatMap(([, q]) => q);

const body = `
<section class="phero phero--lime">
  <div class="container">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>FAQ</li></ol>
    <h1 style="max-width:14ch">What founders ask us first.</h1>
    <p class="lead">Straight answers, before you book.</p>
  </div>
</section>
<section class="sec sec--white">
  <div class="container">
    ${groups.map(([g, q], i) => `<div class="faq-group reveal">${kicker(g, i % 2 ? "lime" : "")}<h2 class="sr-only">${g}</h2>${faqBlock(q)}</div>`).join("")}
  </div>
</section>
${ctaBand({ title: "Didn't find your question? Ask Krish directly." })}
`;

export default page({
  path: "/faq/",
  title: "FAQ | Kre8ify",
  description: "Timelines, ownership, results and what we don't do. Straight answers before you book a call with Krish.",
  body,
  schema: [faqSchema(all)],
});
