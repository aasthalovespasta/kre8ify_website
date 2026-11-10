import { page, icon, kicker, SITE, PHOTO } from "../lib.mjs";

const path = "/book-a-call/";

const radios = (name, opts, required = true) =>
  `<div class="opts">${opts.map(([v, l], i) => `<label class="opt"><input type="radio" name="${name}" value="${v}" id="${name}-${i}"${required ? " required" : ""}><span>${l}</span></label>`).join("")}</div>`;

const field = (id, label, type, { required = false, help = "", auto = "", placeholder = "" } = {}) => `
<div class="field">
  <label for="${id}">${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>
  <input id="${id}" name="${id}" type="${type}"${required ? " required" : ""}${auto ? ` autocomplete="${auto}"` : ""}${placeholder ? ` placeholder="${placeholder}"` : ""} aria-describedby="${id}-err${help ? ` ${id}-help` : ""}">
  ${help ? `<span class="help" id="${id}-help">${help}</span>` : ""}
  <span class="err" id="${id}-err" role="alert"></span>
</div>`;

const body = `
<section class="phero phero--pink" style="padding-bottom:var(--s9)">
  <div class="container book">
    <div>
      <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>Book a call</li></ol>
      <h1>Talk to the founder, not a sales rep.</h1>
      <p class="lead">A 30-minute call with Krish. No pitch deck, no junior on the line.</p>

      <div class="card mt-6" style="display:grid;grid-template-columns:72px 1fr;gap:16px;align-items:center">
        <img src="${PHOTO.note}" alt="Krish Bhatia" width="72" height="72" style="width:72px;height:72px;border-radius:50%;object-fit:cover;object-position:50% 18%">
        <p><b>"I take every first call myself.</b> If we're not the right fit, I'll tell you on the call and point you to someone who is."<br><small class="muted">Krish Bhatia, Founder</small></p>
      </div>

      <h2 class="mt-7" style="font-size:1.5rem">What happens on the call</h2>
      <ol class="steps mt-5">
        <li><span><strong>We map your ideal buyer</strong><span>And how they find you today.</span></span></li>
        <li><span><strong>We find the leaks</strong><span>Where attention, leads or set-up are holding you back.</span></span></li>
        <li><span><strong>We tell you where to start</strong><span>Which engine first, or that you don't need us yet.</span></span></li>
      </ol>
      <p class="mt-5"><strong>You leave with a scope, a timeline and a price within 48 hours,</strong> even if you don't hire us.</p>

      <h2 class="mt-7" style="font-size:1.5rem">This call is for you if</h2>
      <ul class="ticks ticks--pink mt-4">
        <li>${icon("check")}<span>You're a founder or business owner and you're the one who'll decide</span></li>
        <li>${icon("check")}<span>You have a product or service, or a clear idea you're ready to launch</span></li>
        <li>${icon("check")}<span>You can give us one hour a week in the first month</span></li>
      </ul>

      <h2 class="mt-7" style="font-size:1.5rem">Prefer to message?</h2>
      <ul class="contact-list">
        <li><a href="${SITE.whatsapp}" target="_blank" rel="noopener"><span class="ico ico--lime">${icon("chat")}</span><span>WhatsApp<small>${SITE.phone}</small></span></a></li>
        <li><a href="mailto:${SITE.email}"><span class="ico ico--pink">${icon("mail")}</span><span>Email<small>${SITE.email}</small></span></a></li>
        <li><a href="${SITE.linkedin}" target="_blank" rel="noopener"><span class="ico ico--ink">${icon("linkedin")}</span><span>LinkedIn<small>in/meetkrishbhatia</small></span></a></li>
      </ul>
    </div>

    <div class="form-card" id="book">
      <form data-book novalidate aria-labelledby="form-h">
        <h2 id="form-h" style="font-size:1.6rem;margin-bottom:var(--s4)">Book your 30 minutes</h2>
        <div class="form-progress" aria-hidden="true"><span class="on"></span><span></span><span></span></div>
        <div class="err-summary" tabindex="-1" role="alert"></div>

        <div class="form-step" data-step="1">
          <p class="note-tiny" style="margin-bottom:var(--s4)">Step 1 of 3 · About you</p>
          <div class="field-row">
            ${field("name", "Name", "text", { required: true, auto: "name" })}
            ${field("email", "Work email", "email", { required: true, auto: "email", placeholder: "name@company.com" })}
          </div>
          ${field("website", "Company website", "url", { auto: "url", placeholder: "company.com", help: "Optional. Leave empty if you're just starting." })}
          ${field("linkedin", "Your LinkedIn URL", "url", { placeholder: "linkedin.com/in/yourname", help: "Optional, but it helps Krish prepare." })}
          <div class="form-nav"><span></span><button type="button" class="btn btn--ink" data-next>Continue ${icon("arrow")}</button></div>
        </div>

        <div class="form-step" data-step="2" hidden>
          <p class="note-tiny" style="margin-bottom:var(--s4)">Step 2 of 3 · What you need</p>
          <fieldset class="field"><legend>Team size <span class="req" aria-hidden="true">*</span></legend>${radios("team", [["solo", "Just me"], ["1-4", "1–4"], ["5-15", "5–15"], ["16-30", "16–30"], ["30+", "30+"]])}</fieldset>
          <fieldset class="field"><legend>What do you need first? <span class="req" aria-hidden="true">*</span></legend>${radios("need", [["launchpad", "Set up my business (0 to 1)"], ["known", "Get known"], ["clients", "Get clients"], ["automation", "Automate busywork"], ["unsure", "Not sure yet"]])}</fieldset>
          <fieldset class="field"><legend>Monthly budget <span class="req" aria-hidden="true">*</span></legend>${radios("budget", [["<25k", "Under ₹25K"], ["25-50k", "₹25K–50K"], ["50k-1l", "₹50K–1L"], ["1l+", "₹1L+"]])}</fieldset>
          <div class="field"><label for="notes">Anything we should know before the call?</label><textarea id="notes" name="notes" placeholder="Optional"></textarea></div>
          <div class="form-nav"><button type="button" class="btn btn--ghost" data-back>Back</button><button type="button" class="btn btn--ink" data-next>Pick a time ${icon("arrow")}</button></div>
        </div>

        <div class="form-step" data-step="3" hidden>
          <p class="note-tiny" style="margin-bottom:var(--s4)">Step 3 of 3 · Pick a time (IST)</p>
          <fieldset class="field"><legend>Day <span class="req" aria-hidden="true">*</span></legend><div class="opts cal-days" data-days></div></fieldset>
          <fieldset class="field"><legend>Time <span class="req" aria-hidden="true">*</span></legend>${radios("slot", [["11:00 AM", "11:00 AM"], ["12:30 PM", "12:30 PM"], ["3:00 PM", "3:00 PM"], ["4:30 PM", "4:30 PM"], ["6:00 PM", "6:00 PM"]])}</fieldset>
          <div class="form-nav"><button type="button" class="btn btn--ghost" data-back>Back</button><button type="submit" class="btn">Book the call ${icon("arrow")}</button></div>
        </div>
      </form>

      <div class="thanks" data-thanks hidden>
        <div class="big">${icon("check")}</div>
        <h2 tabindex="-1">You're booked. Talk soon.</h2>
        <p><strong data-when></strong></p>
        <p>Krish will review your LinkedIn and website before the call, so we skip the small talk. If something changes, reply to the confirmation email or WhatsApp ${SITE.phone}.</p>
      </div>
    </div>
  </div>
</section>
`;

export default page({
  path,
  title: "Book a Call with Krish | Kre8ify",
  description: "30 minutes with the founder. Leave with a scope, timeline and price, even if you don't hire us.",
  body,
});
