import { page, cta } from "../lib.mjs";

export default page({
  path: "/404",
  title: "Page not found | Kre8ify",
  description: "This page doesn't exist.",
  body: `<section class="phero phero--pink" style="min-height:60vh;display:grid;place-items:center;text-align:center"><div class="container"><h1>This page didn't get known.</h1><p class="lead" style="margin-inline:auto">The link may be old or mistyped. Head back home, or book a call and we'll point you the right way.</p><div class="btn-row" style="justify-content:center">${cta("Go to the home page", "/", "btn--ink")}${cta()}</div></div></section>`,
});
