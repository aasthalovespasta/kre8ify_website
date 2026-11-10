import { page, icon, cta, kicker, ctaBand, krishNote } from "../lib.mjs";
import { CASES } from "../content.mjs";

const path = "/work/";

const full = (c, i) => `
<article class="case-full reveal" id="${c.client.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "")}">
  <div>
    <div class="case__meta"><span class="chip chip--pink">${c.engine}</span><span class="chip chip--light">${c.industry}</span></div>
    <h3>${c.client}</h3>
    <div class="result"><strong>${c.result}</strong><span>${c.resultLabel}</span></div>
  </div>
  <dl>
    <div><dt>The problem</dt><dd>${c.problem}</dd></div>
    <div><dt>What we did</dt><dd><ul>${c.did.map((d) => `<li>${d}</li>`).join("")}</ul></dd></div>
    <div><dt>The result</dt><dd>${c.result} ${c.resultLabel}.</dd></div>
  </dl>
</article>`;

const body = `
<section class="phero phero--pink">
  <div class="container">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li>Work</li></ol>
    <h1 style="max-width:16ch">Work we can put our name on.</h1>
    <p class="lead">Every brand on this page is one our team worked with directly. No borrowed logos, no "trusted by" strips we can't back up.</p>
    <div class="trusted" style="color:var(--text-2)"><b style="color:var(--ink)">Brands we've built with</b><span class="names">${["Headfield", "Roofs & Assets", "Ganga Realty", "Unacademy"].map((n) => `<span style="border-color:var(--pink-200);color:var(--ink);background:#fff">${n.replace("&", "&amp;")}</span>`).join("")}</span></div>
  </div>
</section>

<section class="sec sec--white" aria-labelledby="cases-h">
  <div class="container">
    <h2 id="cases-h" class="sr-only">Case studies</h2>
    <div class="case-stack">${CASES.map(full).join("")}</div>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="next-h">
  <div class="container split" style="align-items:center">
    <div class="reveal">
      ${kicker("Coming next", "lime")}
      <h2 id="next-h">Our first GTM and Launchpad case studies</h2>
    </div>
    <div class="reveal">
      <p class="lead">Our GTM engineering practice and the 0 to 1 Launchpad launched in 2026. The first case studies go up here as clients hit their 90-day mark. Honest beats empty.</p>
      <div class="btn-row mt-6">${cta("Be one of them", "/book-a-call/", "btn--lime")}</div>
    </div>
  </div>
</section>

${krishNote({
  title: "If a number on this page isn't real, I don't want it here.",
  body: "Ask me about any of these on our call and I'll walk you through exactly what we did.",
  tone: "pink",
})}

${ctaBand({ title: "Want your name on this page next?" })}
`;

export default page({
  path,
  title: "Case Studies | Kre8ify",
  description: "Real work with real numbers: Headfield, Roofs & Assets, Ganga Realty and more. No borrowed logos.",
  body,
});
