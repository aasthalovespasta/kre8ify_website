/* Kre8ify — progressive enhancement only. Every page reads fine without JS. */
(() => {
  window.__k8 = true;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header shadow on scroll */
  const header = $(".header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Services dropdown: click/keyboard, closes on Escape and outside click */
  $$("[data-dropdown]").forEach((item) => {
    const btn = $("button", item);
    let hoverTimer;
    const set = (open) => {
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    let openedByHover = 0;
    btn.addEventListener("click", () => {
      // A click right after hover-open keeps it open instead of toggling it shut.
      if (Date.now() - openedByHover < 600) return set(true);
      set(btn.getAttribute("aria-expanded") !== "true");
    });
    item.addEventListener("mouseenter", () => { if (btn.getAttribute("aria-expanded") !== "true") openedByHover = Date.now(); });
    item.addEventListener("mouseenter", () => { clearTimeout(hoverTimer); if (window.matchMedia("(hover: hover)").matches) set(true); });
    item.addEventListener("mouseleave", () => { hoverTimer = setTimeout(() => set(false), 160); });
    item.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
    item.addEventListener("focusout", (e) => { if (!item.contains(e.relatedTarget)) set(false); });
    document.addEventListener("click", (e) => { if (!item.contains(e.target)) set(false); });
  });

  /* Mobile drawer */
  const burger = $(".burger");
  const drawer = $("#drawer");
  if (burger && drawer) {
    const set = (open) => {
      drawer.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      burger.innerHTML = open
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>';
      document.body.classList.toggle("no-scroll", open);
    };
    burger.addEventListener("click", () => set(!drawer.classList.contains("is-open")));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) { set(false); burger.focus(); } });
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => set(false)));
    window.addEventListener("resize", () => { if (window.innerWidth >= 1024) set(false); });
  }

  /* One orchestrated reveal: sections ease in once, items stagger 60ms */
  const reveals = $$(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el) => {
      const sibs = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
      el.style.setProperty("--i", Math.max(0, sibs.indexOf(el)));
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* Bars animate when visible */
  const bars = $$(".bar__fill");
  if (bars.length && "IntersectionObserver" in window && !reduce) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.style.setProperty("--v", en.target.dataset.v); bio.unobserve(en.target); } });
    }, { threshold: 0.3 });
    bars.forEach((b) => bio.observe(b));
  } else {
    bars.forEach((b) => b.style.setProperty("--v", b.dataset.v));
  }

  /* Tabs (roadmap stages). Arrow keys move between tabs. */
  $$("[data-tabs]").forEach((wrap) => {
    const tabs = $$('[role="tab"]', wrap);
    const select = (tab, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) {
          panel.hidden = !on;
          if (on) { panel.classList.remove("is-in"); void panel.offsetWidth; panel.classList.add("is-in"); }
        }
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const k = e.key;
        let n = null;
        if (k === "ArrowRight" || k === "ArrowDown") n = tabs[(i + 1) % tabs.length];
        if (k === "ArrowLeft" || k === "ArrowUp") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === "Home") n = tabs[0];
        if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });

  /* Workflow steps: highlight and sync the wire diagram */
  $$("[data-flow]").forEach((flow) => {
    const steps = $$(".flow__step", flow);
    const wire = flow.parentElement && $(".flow-wire", flow.parentElement);
    const caption = flow.parentElement && $("[data-flow-caption]", flow.parentElement);
    const nodes = wire ? $$("[data-node]", wire) : [];
    let idx = 0, timer;
    const show = (i) => {
      idx = i;
      steps.forEach((s, j) => { s.classList.toggle("is-active", j === i); s.setAttribute("aria-pressed", String(j === i)); });
      nodes.forEach((n, j) => n.setAttribute("data-on", j <= i ? "1" : "0"));
      if (caption) caption.textContent = steps[i].dataset.detail || "";
    };
    steps.forEach((s, i) => s.addEventListener("click", () => { clearInterval(timer); show(i); }));
    show(0);
    if (!reduce && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => {
        en.forEach((e) => {
          clearInterval(timer);
          if (e.isIntersecting) timer = setInterval(() => show((idx + 1) % steps.length), 2600);
        });
      }, { threshold: 0.4 });
      io.observe(flow);
      flow.addEventListener("focusin", () => clearInterval(timer));
    }
  });

  /* Chart tooltips (hover + keyboard focus) */
  $$("[data-chart]").forEach((chart) => {
    const tip = $(".chart-tip", chart);
    const svg = $("svg", chart);
    const place = (g) => {
      const c = $("circle", g);
      const box = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      const sx = box.width / vb.width, sy = box.height / vb.height;
      tip.style.left = c.cx.baseVal.value * sx + "px";
      tip.style.top = c.cy.baseVal.value * sy + "px";
      tip.textContent = g.dataset.tip;
      tip.classList.add("show");
    };
    $$(".pt", chart).forEach((g) => {
      g.addEventListener("mouseenter", () => place(g));
      g.addEventListener("focus", () => place(g));
      g.addEventListener("mouseleave", () => tip.classList.remove("show"));
      g.addEventListener("blur", () => tip.classList.remove("show"));
    });
  });

  /* Launchpad document checklist — remembered per browser */
  const checklist = $("[data-checklist]");
  if (checklist) {
    const KEY = "kre8ify-launch-checklist";
    const boxes = $$('input[type="checkbox"]', checklist);
    const ring = $(".ring .fg");
    const val = $(".ring__val");
    const msg = $("[data-score-msg]");
    const C = 2 * Math.PI * 76;
    if (ring) { ring.style.strokeDasharray = C; ring.style.strokeDashoffset = C; }
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { saved = []; }
    boxes.forEach((b) => { if (saved.includes(b.value)) b.checked = true; });
    const update = () => {
      const done = boxes.filter((b) => b.checked);
      const pct = Math.round((done.length / boxes.length) * 100);
      if (ring) ring.style.strokeDashoffset = C - (C * pct) / 100;
      if (val) val.textContent = pct + "%";
      if (msg) {
        msg.textContent = pct === 100 ? "Your basics are covered. Time to get known and get clients."
          : pct >= 60 ? `${boxes.length - done.length} left. You're close. We can finish the rest with you.`
          : pct > 0 ? `${done.length} of ${boxes.length} done. Book a call and we'll map the rest in 30 minutes.`
          : "Tick what you already have. We'll show you what's missing.";
      }
      try { localStorage.setItem(KEY, JSON.stringify(done.map((b) => b.value))); } catch (e) { /* storage blocked */ }
    };
    boxes.forEach((b) => b.addEventListener("change", update));
    const reset = $("[data-reset]");
    if (reset) reset.addEventListener("click", () => { boxes.forEach((b) => (b.checked = false)); update(); });
    update();
  }

  /* Booking: next six weekdays as day options, and prefill from the URL */
  const daysEl = $("[data-days]");
  if (daysEl) {
    const d = new Date();
    const out = [];
    while (out.length < 6) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      out.push(new Date(d));
    }
    daysEl.innerHTML = out
      .map((dt, i) => {
        const label = dt.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
        const short = dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
        return `<label class="opt"><input type="radio" name="day" id="day-${i}" value="${dt.toISOString().slice(0, 10)}" data-label="${label}" required><span>${short}</span></label>`;
      })
      .join("");
  }
  const params = new URLSearchParams(location.search);
  const need = params.get("need") || (params.get("teardown") ? "unsure" : "");
  if (need) {
    const r = $(`input[name="need"][value="${CSS.escape(need)}"]`);
    if (r) r.checked = true;
  }
  const teardown = params.get("teardown");
  if (teardown) {
    const n = $("#notes");
    const kind = { "1": "growth", outreach: "outreach", profile: "LinkedIn profile" }[teardown] || "growth";
    if (n && !n.value) n.value = `I'd like the free ${kind} teardown.`;
  }

  /* Booking form: 3 steps, inline validation on blur, error summary on submit */
  const form = $("[data-book]");
  if (form) {
    const steps = $$(".form-step", form);
    const prog = $$(".form-progress span", form);
    const summary = $(".err-summary", form);
    let step = 0;
    const rules = {
      name: (v) => v.trim().length > 1 || "Enter your name.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a work email like name@company.com.",
      website: (v) => !v.trim() || /\./.test(v) || "Enter your website, like company.com, or leave it empty.",
      linkedin: (v) => !v.trim() || /linkedin\.com\//i.test(v) || "Paste your LinkedIn URL, like linkedin.com/in/yourname.",
    };
    const check = (input) => {
      const rule = rules[input.name];
      if (!rule) return true;
      const res = rule(input.value);
      const field = input.closest(".field");
      const err = $(".err", field);
      if (res === true) { field.classList.remove("invalid"); input.removeAttribute("aria-invalid"); return true; }
      field.classList.add("invalid"); input.setAttribute("aria-invalid", "true"); if (err) err.textContent = res; return false;
    };
    $$("input", form).forEach((i) => {
      i.addEventListener("blur", () => { if (i.value) check(i); });
      // Once a field shows an error, re-check while typing so the message clears
      // before the person reaches the button (avoids a layout jump under the cursor).
      i.addEventListener("input", () => { if (i.closest(".field") && i.closest(".field").classList.contains("invalid")) check(i); });
    });
    const radiosOk = (scope) => {
      const groups = [...new Set($$('input[type="radio"][required]', scope).map((r) => r.name))];
      return groups.filter((g) => !$(`input[name="${g}"]:checked`, scope));
    };
    const validate = (scope) => {
      const bad = [];
      $$("input[name]", scope).forEach((i) => { if (i.type !== "radio" && (i.required || i.value) && !check(i)) bad.push(i); });
      $$("input[required]", scope).forEach((i) => { if (i.type !== "radio" && !i.value.trim() && !bad.includes(i)) { check(i); bad.push(i); } });
      radiosOk(scope).forEach((g) => bad.push($(`input[name="${g}"]`, scope)));
      if (bad.length) {
        summary.innerHTML = `<p><strong>${bad.length === 1 ? "One thing needs fixing" : bad.length + " things need fixing"} before you continue:</strong></p><ul>${bad
          .map((i) => {
            const label = i.type === "radio" ? $("legend", i.closest("fieldset")).textContent.replace("*", "").trim() : $(`label[for="${i.id}"]`, form).textContent.replace("*", "").trim();
            return `<li><a href="#${i.id}">${label}</a></li>`;
          })
          .join("")}</ul>`;
        summary.classList.add("show");
        summary.focus();
        return false;
      }
      summary.classList.remove("show");
      return true;
    };
    const go = (n) => {
      step = n;
      steps.forEach((s, i) => (s.hidden = i !== n));
      prog.forEach((p, i) => p.classList.toggle("on", i <= n));
      const first = $("input, button", steps[n]);
      if (first) first.focus({ preventScroll: true });
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    $$("[data-next]", form).forEach((b) => b.addEventListener("click", () => { if (validate(steps[step])) go(step + 1); }));
    $$("[data-back]", form).forEach((b) => b.addEventListener("click", () => go(step - 1)));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate(steps[step])) return;
      const btn = $('button[type="submit"]', form);
      btn.disabled = true; btn.textContent = "Booking…";
      // TODO: connect to Cal.com / Calendly and your CRM. Until then this confirms locally.
      setTimeout(() => {
        const thanks = $("[data-thanks]");
        form.hidden = true;
        thanks.hidden = false;
        const day = $('input[name="day"]:checked', form), slot = $('input[name="slot"]:checked', form);
        const when = $("[data-when]", thanks);
        if (when && day && slot) when.textContent = `${day.dataset.label} at ${slot.value} IST`;
        $("h2", thanks).focus();
      }, 700);
    });
  }
})();
