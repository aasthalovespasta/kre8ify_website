import { page, icon, cta, kicker, ctaBand, pageHero, faqBlock, faqSchema, serviceSchema, krishNote } from "../lib.mjs";
import { roadmap } from "../content.mjs";

const path = "/launchpad/";

const docs = [
  { g: "Business basics", ic: "bank", tone: "pink", items: [
    ["structure", "Business structure chosen", "Sole proprietorship, LLP or Private Limited."],
    ["incorp", "Registration certificate", "Certificate of Incorporation, LLP or partnership deed."],
    ["pan", "Business PAN and TAN", "Needed for banking, invoicing and TDS."],
    ["bank", "Current bank account", "Business money kept separate from personal."],
  ]},
  { g: "Tax and compliance", ic: "shield", tone: "lime", items: [
    ["gst", "GST registration, if you need it", "Depends on turnover, clients and where you sell."],
    ["udyam", "Udyam (MSME) registration", "Free, and useful for credit and payments."],
    ["state", "State registrations", "Shops & Establishments and professional tax, where they apply."],
  ]},
  { g: "Contracts", ic: "file", tone: "pink", items: [
    ["founders", "Founders' agreement", "Equity, roles, vesting and exits, in writing."],
    ["msa", "Client service agreement", "Scope, payment terms, IP and termination."],
    ["nda", "NDA template", "For calls where clients share sensitive data."],
    ["privacy", "Privacy policy and terms", "For your website and any forms you run."],
  ]},
  { g: "Money", ic: "receipt", tone: "lime", items: [
    ["invoice", "Invoice template", "Numbered, dated and GST-ready."],
    ["payments", "Payment link and UPI", "So clients can pay in one click."],
    ["books", "Accounting tool and a CA", "Monthly books, not a March panic."],
  ]},
  { g: "Brand basics", ic: "sparkles", tone: "pink", items: [
    ["tm", "Trademark application", "Protect the name before you build on it."],
    ["email", "Domain email", "name@yourcompany.com, not Gmail."],
    ["company", "LinkedIn company page", "Linked to your founder profile."],
    ["profile", "Founder profile rewritten", "Clear on who you help and how."],
  ]},
];
const total = docs.reduce((n, g) => n + g.items.length, 0);

const faqs = [
  ["Do I need this if I've already registered my company?", "Probably not all of it. Most founders join with set-up half done. We check what you have, fill the gaps, and spend most of the time on offer, first clients and getting paid."],
  ["Are you a CA or law firm?", "No. We're a growth studio. We tell you what you need and in what order, and filings and legal reviews are done by a qualified CA or lawyer: yours, or one we introduce."],
  ["Which structure should I pick: sole proprietorship, LLP or Private Limited?", "It depends on how you'll sell, whether you'll raise money, and how many founders you are. We walk through it on the first call and confirm with a CA before anything is filed."],
  ["Will you find my first clients for me?", "We build the path with you and run much of it: target list, outreach, content and follow-ups. You take the calls. Founders close first clients best, and we coach you through them."],
  ["How long does the Launchpad take?", "About 12 weeks from set-up to a repeatable way of winning and billing clients. If your basics are already done, it's shorter."],
  ["What happens after the 12 weeks?", "You keep every template, tool and account. Many founders then add an engine, usually LinkedIn branding or GTM engineering, to grow from there."],
];

const visual = `
<div class="hv" aria-label="Sample launch progress">
  <div class="hv__label"><span>Your launch, week 6</span><span class="sample">Sample</span></div>
  <div class="hv__row"><span class="ico ico--lime">${icon("check")}</span><span><b>Company registered</b><small>Pvt Ltd, PAN, TAN, bank account</small></span><span class="st">Done</span></div>
  <div class="hv__row"><span class="ico ico--lime">${icon("check")}</span><span><b>Offer and pricing</b><small>One offer, three packages</small></span><span class="st">Done</span></div>
  <div class="hv__row"><span class="ico ico--pink">${icon("users")}</span><span><b>First clients</b><small>14 conversations, 4 proposals out</small></span><span class="st st--pink">In progress</span></div>
  <div class="hv__row"><span class="ico ico--ink">${icon("receipt")}</span><span><b>Invoices and reminders</b><small>Starts week 8</small></span><span class="st st--dim">Next</span></div>
</div>`;

const body = `
${pageHero({
  crumbs: ["Services", "0 to 1 Launchpad"],
  tone: "lime",
  title: "From idea to first invoice. Built with you.",
  sub: "The 0 to 1 Launchpad is hands-on consulting for new-age founders. We sort the documents, shape the offer, help you win and manage your first clients, and set up invoicing so you get paid on time.",
  buttons: `${cta()}<a class="btn btn--ghost" href="#checklist">Check what you have</a>`,
  visual,
})}

<section class="sec sec--white">
  <div class="container define">
    <h2 class="define__q reveal">What is 0 to 1 consulting?</h2>
    <div class="define__a reveal">
      <p>0 to 1 consulting is getting a new business from an idea to its first paying clients, with the basics done properly: the right registrations and contracts, a clear offer, a repeatable way to win clients, and invoicing that gets you paid.</p>
      <p>Most founders learn this the expensive way, one mistake at a time. We give you the order, the templates and a founder who has done it, beside you for the first 12 weeks.</p>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="road-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("The road", "lime")}
      <h2 id="road-h">Five stages, in the order that actually works</h2>
      <p class="lead">Pick a stage to see what we do together and what you leave with.</p>
    </div>
    <div class="reveal">${roadmap({ idPrefix: "lp" })}</div>
  </div>
</section>

<section class="sec sec--pink" id="checklist" aria-labelledby="chk-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Founder document checklist")}
      <h2 id="chk-h">What do you already have?</h2>
      <p class="lead">Tick everything that's done. Your answers stay in this browser. Bring the score to your call and we'll start from where you are.</p>
    </div>
    <div class="doc-check" data-checklist>
      <div class="doc-groups">
        ${docs.map((g) => `
        <fieldset class="doc-group reveal" style="border:1px solid var(--line);margin:0">
          <legend class="sr-only">${g.g}</legend>
          <h3 aria-hidden="true"><span class="ico ico--${g.tone}">${icon(g.ic)}</span>${g.g}</h3>
          ${g.items.map(([v, a, b]) => `<label class="doc-item"><input type="checkbox" value="${v}"><span><b>${a}</b><small>${b}</small></span></label>`).join("")}
        </fieldset>`).join("")}
        <p class="disclaimer">${icon("alert", "")} This checklist is a starting point, not legal or tax advice. What you need depends on your structure, state, turnover and clients. Filings are done with a qualified CA or lawyer.</p>
      </div>
      <aside class="doc-score" aria-live="polite">
        <div class="ring"><svg viewBox="0 0 180 180" aria-hidden="true"><circle class="bg" cx="90" cy="90" r="76"/><circle class="fg" cx="90" cy="90" r="76"/></svg><span class="ring__val">0%</span></div>
        <p><strong style="color:#fff">${total} basics</strong> every new business needs.</p>
        <p data-score-msg class="mt-4">Tick what you already have. We'll show you what's missing.</p>
        <a class="btn btn--lime" href="/book-a-call/?need=launchpad">Fill the gaps with Krish ${icon("arrow")}</a>
        <button type="button" class="reset" data-reset>Clear my answers</button>
      </aside>
    </div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="mgmt-h">
  <div class="container">
    <div class="split" style="align-items:end;margin-bottom:var(--s7)">
      <div class="reveal">
        ${kicker("Client management", "lime")}
        <h2 id="mgmt-h">Every client, one board. Nothing lives in your head.</h2>
      </div>
      <div class="reveal">
        <p class="lead">We set up a simple CRM pipeline you own, with stages that match how you actually sell. You always know who to follow up, who's deciding, and who's ready to sign.</p>
        <ul class="ticks mt-5">
          <li>${icon("check")}<span>Pipeline stages built around your sales process</span></li>
          <li>${icon("check")}<span>Automatic reminders when a lead goes quiet</span></li>
          <li>${icon("check")}<span>Onboarding checklist the moment a deal is won</span></li>
          <li>${icon("check")}<span>Weekly client update template that makes renewals easy</span></li>
        </ul>
      </div>
    </div>
      <div class="reveal">
        <div class="board" role="img" aria-label="Sample client pipeline with four stages: new leads, discovery call, proposal sent and won">
          <div class="col"><h4>New leads <span>4</span></h4>
            <div class="tile"><b>Ananya, D2C skincare</b><small>Came from a LinkedIn post</small></div>
            <div class="tile"><b>Rohit, HR SaaS</b><small>Referral</small></div>
          </div>
          <div class="col"><h4>Discovery call <span>2</span></h4>
            <div class="tile"><b>Meera, edtech</b><small>Thursday, 4 PM</small><br><span class="chip chip--light">Brief ready</span></div>
          </div>
          <div class="col"><h4>Proposal sent <span>3</span></h4>
            <div class="tile"><b>Kabir, real estate</b><small>Follow up in 2 days</small><br><span class="chip chip--pink">Reminder set</span></div>
          </div>
          <div class="col col--won"><h4>Won <span>2</span></h4>
            <div class="tile"><b>Sana, consulting</b><small>Onboarding started</small><br><span class="chip chip--lime">Invoice sent</span></div>
          </div>
        </div>
        <p class="diagram-caption">Sample board. Names are illustrative.</p>
      </div>
  </div>
</section>

<section class="sec sec--lime" aria-labelledby="inv-h">
  <div class="container">
    <div class="split" style="align-items:center">
      <div class="reveal">
        ${kicker("Invoices that get paid", "lime")}
        <h2 id="inv-h">An invoice your client's finance team won't send back.</h2>
        <p class="lead mt-4">Missing fields are the most common reason a payment gets stuck. We set you up with a template, numbering, payment terms and automatic reminders.</p>
        <ol class="anatomy mt-6">
          <li><span class="mark">1</span><span><strong>Your details and GSTIN</strong><span>Legal name, address and GST number, if registered.</span></span></li>
          <li><span class="mark">2</span><span><strong>A unique invoice number and date</strong><span>Numbered in sequence, every financial year.</span></span></li>
          <li><span class="mark">3</span><span><strong>Client details and place of supply</strong><span>Decides whether it's CGST + SGST or IGST.</span></span></li>
          <li><span class="mark">4</span><span><strong>SAC code, amount and tax</strong><span>What you did, the taxable value and the GST on it.</span></span></li>
          <li><span class="mark">5</span><span><strong>Payment terms and a pay link</strong><span>Due date, bank details and UPI, so paying is one click.</span></span></li>
        </ol>
      </div>
      <div class="invoice reveal" aria-label="Sample GST invoice with illustrative values">
        <div class="invoice__head">
          <div><b>Tax invoice</b><br><small class="muted"><span class="mark">2</span>INV/25-26/0042 · 03 Nov 2026</small></div>
          <span class="sample">Sample</span>
        </div>
        <div class="invoice__meta meta">
          <div><small><span class="mark">1</span>From</small><b>Your Company Pvt Ltd</b><br><small>GSTIN 07XXXXXXXXXX1Z5 · New Delhi</small></div>
          <div><small><span class="mark">3</span>Bill to</small><b>Sample Client Pvt Ltd</b><br><small>Place of supply: Delhi (07)</small></div>
        </div>
        <table>
          <thead><tr><th scope="col"><span class="mark">4</span>Description</th><th scope="col">SAC</th><th scope="col" class="r">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td>Brand strategy retainer, November</td><td>9983</td><td class="r">50,000.00</td></tr>
            <tr><td class="muted">CGST @ 9%</td><td></td><td class="r">4,500.00</td></tr>
            <tr><td class="muted">SGST @ 9%</td><td></td><td class="r">4,500.00</td></tr>
            <tr class="tot"><td>Total</td><td></td><td class="r">59,000.00</td></tr>
          </tbody>
        </table>
        <p class="mt-4"><span class="mark">5</span><strong>Due in 7 days.</strong> <small class="muted">Pay by UPI or bank transfer. Reminder goes out automatically on day 5.</small></p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="plan-h">
  <div class="container">
    <div class="sec-head reveal">
      ${kicker("Your 12 weeks")}
      <h2 id="plan-h">What the Launchpad looks like on a calendar</h2>
    </div>
    <div class="gantt reveal" role="img" aria-label="Twelve-week plan: set-up in weeks 1 to 2, offer in weeks 2 to 3, first clients in weeks 3 to 8, client management in weeks 6 to 10, invoicing in weeks 8 to 12, and a weekly call with Krish throughout.">
      <div class="gantt__in">
        <div class="gantt__weeks"><span></span>${Array.from({ length: 12 }, (_, i) => `<span>W${i + 1}</span>`).join("")}</div>
        <div class="gantt__row"><span>Set up</span><span class="gantt__bar" style="grid-column:2 / span 2">Docs</span></div>
        <div class="gantt__row"><span>Shape the offer</span><span class="gantt__bar gantt__bar--lime" style="grid-column:3 / span 2">Offer</span></div>
        <div class="gantt__row"><span>First clients</span><span class="gantt__bar" style="grid-column:4 / span 6">Outreach, content and calls</span></div>
        <div class="gantt__row"><span>Manage clients</span><span class="gantt__bar gantt__bar--lime" style="grid-column:7 / span 5">CRM, onboarding and SOPs</span></div>
        <div class="gantt__row"><span>Get paid</span><span class="gantt__bar" style="grid-column:9 / span 5">Invoices, reminders and books</span></div>
        <div class="gantt__row"><span>Weekly call with Krish</span><span class="gantt__bar gantt__bar--ink" style="grid-column:2 / span 12">Every week, 60 minutes</span></div>
      </div>
    </div>
    <div class="grid-3 mt-7">
      <div class="card card--soft-pink reveal"><h3>Who it's for</h3><p class="muted">First-time founders, people who just left a job to build something, and freelancers turning into a company.</p></div>
      <div class="card card--soft-lime reveal"><h3>What you bring</h3><p class="muted">An idea or early offer, one hour a week with us, and the willingness to take sales calls yourself.</p></div>
      <div class="card reveal"><h3>What you keep</h3><p class="muted">Every template, contract, tool and account. If we part ways, your business keeps running.</p></div>
    </div>
  </div>
</section>

${krishNote({
  title: "I wish someone had handed me this list on day one.",
  body: "When I started, nobody told me which registration came first, what a client contract needs, or why my first invoices kept getting sent back. I learned it the slow way. The Launchpad is the version where you skip the slow way and spend your time where it matters: talking to clients.",
})}

<section class="sec sec--white" aria-labelledby="faq-h">
  <div class="container">
    <div class="sec-head reveal">${kicker("Questions")}<h2 id="faq-h">Launchpad FAQ</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>

${ctaBand({
  title: "Let's get your business from 0 to 1.",
  body: "Bring your idea, or your checklist score. In 30 minutes we'll map what's done, what's missing and the order to do it in.",
  tone: "lime",
})}
`;

export default page({
  path,
  title: "0 to 1 Business Consulting for New Founders | Kre8ify",
  description: "Hands-on consulting for new-age founders: registrations and documents, your offer, first clients, client management and GST-ready invoicing. 12 weeks, led by Krish Bhatia.",
  body,
  schema: [serviceSchema("0 to 1 Launchpad", "Business set-up, first clients, client management and invoicing for new founders.", path), faqSchema(faqs)],
});
