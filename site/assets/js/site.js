/* Kreatify site script. Plain JavaScript, no libraries.
   Each block checks that its markup exists, so the same file works on every page. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav --------------------------------------------------------------------
     - the bar gets a solid background once you scroll
     - "Services" opens a panel (click, or hover with a mouse)
     - on phones the menu button opens a full-screen menu
     - the link for the section you are reading is highlighted            */
  const nav = $('[data-nav]');
  const megaBtn = $('[data-mega-toggle]'), mega = $('#mega');
  const menuBtn = $('[data-sheet-toggle]'), sheet = $('#sheet');
  const finePointerNav = matchMedia('(pointer: fine)').matches;

  const refreshBar = () => nav.classList.toggle('is-open', !mega.hidden || !sheet.hidden);
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let megaOpenedAt = 0;
  const setMega = (open) => {
    if (open && mega.hidden) megaOpenedAt = Date.now();
    mega.hidden = !open;
    megaBtn.setAttribute('aria-expanded', String(open));
    refreshBar();
  };
  const setSheet = (open) => {
    sheet.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    refreshBar();
  };

  // a click right after the hover opened the panel should keep it open, not close it
  megaBtn.addEventListener('click', () => setMega(mega.hidden || Date.now() - megaOpenedAt < 500));
  menuBtn.addEventListener('click', () => setSheet(sheet.hidden));
  $$('a', mega).forEach((a) => a.addEventListener('click', () => setMega(false)));
  $$('a', sheet).forEach((a) => a.addEventListener('click', () => setSheet(false)));
  if (finePointerNav) {
    let closeTimer;
    const openSoon = () => { clearTimeout(closeTimer); setMega(true); };
    const closeSoon = () => { clearTimeout(closeTimer); closeTimer = setTimeout(() => setMega(false), 220); };
    megaBtn.addEventListener('pointerenter', openSoon);
    mega.addEventListener('pointerenter', openSoon);
    megaBtn.addEventListener('pointerleave', closeSoon);
    mega.addEventListener('pointerleave', closeSoon);
  }
  document.addEventListener('click', (e) => { if (!mega.hidden && !e.target.closest('#mega, [data-mega-toggle]')) setMega(false); });
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!mega.hidden) { setMega(false); megaBtn.focus(); }
    if (!sheet.hidden) { setSheet(false); menuBtn.focus(); }
  });
  addEventListener('resize', () => { if (innerWidth > 1080 && !sheet.hidden) setSheet(false); });

  const sectionLinks = $$('.nav__link[data-section]').filter((a) => a.getAttribute('href').startsWith('#'));
  if (sectionLinks.length) {
    const watch = ['services', ...sectionLinks.map((a) => a.dataset.section)].map((id) => document.getElementById(id)).filter(Boolean);
    const sectionIO = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      sectionLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.section === e.target.id));
      megaBtn.classList.toggle('is-active', e.target.id === 'services');
    }), { rootMargin: '-45% 0px -50% 0px' });
    watch.forEach((sec) => sectionIO.observe(sec));
  }

  /* Reveal on scroll: adds .is-in once an element is on screen ------------- */
  const targets = $$('[data-reveal], [data-inview]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }), { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el) => io.observe(el));
  }

  /* Service page steps: highlight the step in the middle of the screen ----- */
  const steps = $$('[data-step]');
  if (steps.length) {
    const stepIO = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-on');
    }), { rootMargin: '0px 0px -45% 0px' });
    steps.forEach((s) => stepIO.observe(s));
  }

  /* Tools filter (GTM engineering page) ------------------------------------ */
  const filters = $$('[data-filter]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    const group = btn.dataset.filter;
    filters.forEach((b) => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    $$('[data-tools] .tool').forEach((t) => t.classList.toggle('is-dim', group !== 'all' && t.dataset.group !== group));
    $$('[data-tools]').forEach((list) => list.classList.toggle('is-filtered', group !== 'all'));
  }));

  /* One lead through the system: steps light up in turn while visible ------- */
  const flow = $('[data-flow]');
  if (flow) {
    const items = $$('.flow__track li', flow);
    let index = -1, timer = null;
    const show = (k) => items.forEach((li, j) => { li.classList.toggle('is-on', j <= k); li.classList.toggle('is-now', j === k); });
    const next = () => { index = (index + 1) % items.length; show(index); timer = setTimeout(next, index === items.length - 1 ? 2800 : 1300); };
    if (reduceMotion) show(items.length - 1);
    else new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) next();
      if (!entry.isIntersecting) { clearTimeout(timer); timer = null; }
    }, { threshold: 0.4 }).observe(flow);
  }

  const finePointer = matchMedia('(pointer: fine)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* Scroll effects: each [data-scroll] element gets two CSS variables -------
     --p   0 to 1 while the element travels through the screen
     --out 0 to 1 as the element leaves through the top (used by the heroes)
     Problem cards also get --q, which pulls them into place.               */
  const scrollEls = $$('[data-scroll]');
  if (scrollEls.length && !reduceMotion) {
    const visible = new Set();
    const vio = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))));
    scrollEls.forEach((el) => vio.observe(el));
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight;
      visible.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh + r.height));
        el.style.setProperty('--p', p.toFixed(3));
        el.style.setProperty('--out', clamp(-r.top / r.height).toFixed(3));
        if (el.hasAttribute('data-assemble')) {
          const q = clamp((p - 0.12) / 0.4);
          el.style.setProperty('--q', q.toFixed(3));
          el.classList.toggle('is-done', q > 0.98);
        }
      });
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    request();
  } else {
    $$('[data-assemble]').forEach((el) => el.classList.add('is-done'));
  }

  /* Hero stage: colour lens and tilt follow the cursor, cards float at depth -- */
  const stage = $('[data-stage]');
  if (stage) {
    const hero = stage.closest('[data-hero]');
    const lens = $('[data-lens]', stage), arch = $('[data-tilt]', stage), layers = $$('[data-depth]', stage);
    const now = { lr: 0, lx: 50, ly: 30, rx: 0, ry: 0, dx: 0, dy: 0 };
    const goal = { ...now };
    let raf = 0, autoOrbit = !finePointer;
    const frame = (t) => {
      raf = 0;
      if (autoOrbit) { const k = t / 1000; goal.lx = 50 + Math.cos(k * 0.7) * 22; goal.ly = 34 + Math.sin(k * 0.9) * 16; goal.lr = 140; }
      let moving = autoOrbit;
      for (const key in now) { now[key] += (goal[key] - now[key]) * 0.12; if (Math.abs(goal[key] - now[key]) > 0.05) moving = true; }
      lens.style.setProperty('--lr', now.lr + 'px');
      lens.style.setProperty('--lx', now.lx + '%');
      lens.style.setProperty('--ly', now.ly + '%');
      arch.style.setProperty('--rx', now.rx + 'deg');
      arch.style.setProperty('--ry', now.ry + 'deg');
      layers.forEach((el) => { const d = +el.dataset.depth; el.style.setProperty('--dx', now.dx * d + 'px'); el.style.setProperty('--dy', now.dy * d + 'px'); });
      if (moving) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    if (reduceMotion) {
      lens.style.setProperty('--lr', '2000px');
    } else {
      hero.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        autoOrbit = false;
        stage.classList.add('is-touched');
        const r = lens.getBoundingClientRect(), h = hero.getBoundingClientRect();
        goal.lx = ((e.clientX - r.left) / r.width) * 100;
        goal.ly = ((e.clientY - r.top) / r.height) * 100;
        const near = e.clientX > r.left - 60 && e.clientX < r.right + 60 && e.clientY > r.top - 60 && e.clientY < r.bottom + 60;
        goal.lr = near ? 170 : 0;
        const nx = (e.clientX - h.left) / h.width - 0.5, ny = (e.clientY - h.top) / h.height - 0.5;
        goal.ry = nx * 12; goal.rx = -ny * 9; goal.dx = nx * -16; goal.dy = ny * -12;
        kick();
      });
      hero.addEventListener('pointerleave', () => { goal.lr = 0; goal.rx = goal.ry = goal.dx = goal.dy = 0; kick(); });
      lens.addEventListener('click', () => { goal.lr = goal.lr > 400 ? 170 : 900; kick(); });
      if (autoOrbit) { stage.classList.add('is-touched'); kick(); }
    }

    /* the live card stack: a new moment every two seconds while visible */
    const feed = $$('[data-feed] li', stage);
    if (feed.length) {
      let top = 0, timer = null;
      const place = () => feed.forEach((li, i) => {
        const pos = (top - i + feed.length) % feed.length;
        li.dataset.pos = pos <= 2 ? pos : pos === feed.length - 1 ? 9 : -1;
      });
      place();
      if (!reduceMotion) {
        const tick = () => { top = (top + 1) % feed.length; place(); timer = setTimeout(tick, 2000); };
        new IntersectionObserver(([e]) => {
          if (e.isIntersecting && !timer) timer = setTimeout(tick, 1800);
          if (!e.isIntersecting) { clearTimeout(timer); timer = null; }
        }).observe(stage);
      }
    }
  }

  /* Cards: light follows the cursor, slight tilt, illustration parallax ---- */
  if (finePointer && !reduceMotion) {
    $$('[data-card]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', x * 100 + '%');
        card.style.setProperty('--my', y * 100 + '%');
        card.style.setProperty('--rx', (0.5 - y) * 4 + 'deg');
        card.style.setProperty('--ry', (x - 0.5) * 5 + 'deg');
        card.style.setProperty('--px', (x - 0.5) * 2);
        card.style.setProperty('--py', (y - 0.5) * 2);
      });
      card.addEventListener('pointerleave', () => ['--rx', '--ry', '--px', '--py'].forEach((v) => card.style.removeProperty(v)));
    });

    /* buttons lean towards the cursor */
    $$('.magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`; });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });

    /* footer word lights up under the cursor */
    const word = $('[data-spot]');
    if (word) word.addEventListener('pointermove', (e) => { const r = word.getBoundingClientRect(); word.style.setProperty('--sx', e.clientX - r.left + 'px'); word.style.setProperty('--sy', e.clientY - r.top + 'px'); });
  }

  /* Testimonials: client tabs switch the quote; it moves on by itself -------
     The progress bar on the active tab is a CSS animation. When it ends we
     show the next quote. Hovering or focusing pauses it; clicking stops it. */
  const tm = $('[data-tm]');
  if (tm) {
    const tabs = $$('[role="tab"]', tm), slides = $$('.tm__slide', tm), counter = $('[data-tm-n]', tm);
    let current = 0, auto = !reduceMotion;
    const show = (i, focus = false) => {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => { const on = k === current; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      slides.forEach((s, k) => { s.hidden = k !== current; s.classList.toggle('is-entering', k === current && !reduceMotion); });
      counter.textContent = String(current + 1).padStart(2, '0');
      if (focus) tabs[current].focus();
    };
    const stopAuto = () => { auto = false; tm.classList.remove('is-auto'); };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => { stopAuto(); show(k); });
      t.addEventListener('keydown', (e) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); stopAuto(); show(current + step, true); }
      });
      $('.tm__bar', t).addEventListener('animationend', () => { if (auto) show(current + 1); });
    });
    $('[data-tm-prev]', tm).addEventListener('click', () => { stopAuto(); show(current - 1); });
    $('[data-tm-next]', tm).addEventListener('click', () => { stopAuto(); show(current + 1); });
    ['pointerenter', 'focusin'].forEach((ev) => tm.addEventListener(ev, () => tm.classList.add('is-paused')));
    ['pointerleave', 'focusout'].forEach((ev) => tm.addEventListener(ev, () => tm.classList.remove('is-paused')));
    // only start the timer once the section is on screen
    if (auto) new IntersectionObserver(([e], obs) => { if (e.isIntersecting) { tm.classList.add('is-auto'); obs.disconnect(); } }, { threshold: 0.4 }).observe(tm);
  }

  /* Phones: shorter page ----------------------------------------------------
     - [data-fold] blocks stay closed until their button is tapped
     - [data-tap] cards show only their title until tapped
     On tablets and desktops the CSS shows everything and these do nothing. */
  const phone = matchMedia('(max-width: 760px)');
  $$('[data-fold]').forEach((fold) => {
    const btn = $('[data-fold-btn]', fold);
    btn.addEventListener('click', () => {
      const open = fold.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      // the body was hidden, so its reveal animations never ran
      if (open) $$('[data-reveal], [data-inview]', fold).forEach((el) => el.classList.add('is-in'));
    });
  });
  const tapCards = $$('[data-tap]');
  const setupTap = () => tapCards.forEach((card) => {
    if (phone.matches) { card.setAttribute('aria-expanded', String(card.classList.contains('is-open'))); card.tabIndex = 0; }
    else { card.removeAttribute('aria-expanded'); card.removeAttribute('tabindex'); }
  });
  tapCards.forEach((card) => {
    const toggle = () => { const open = card.classList.toggle('is-open'); card.setAttribute('aria-expanded', String(open)); };
    card.addEventListener('click', (e) => { if (phone.matches && !e.target.closest('a, button')) toggle(); });
    card.addEventListener('keydown', (e) => { if (phone.matches && e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } });
  });
  setupTap();
  phone.addEventListener('change', setupTap);

  /* Booking form: checks the fields, then opens WhatsApp with the answers --- */
  const form = $('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      [['#f-name', '#e-name'], ['#f-co', '#e-co']].forEach(([input, error]) => {
        const field = $(input, form), bad = !field.value.trim();
        field.setAttribute('aria-invalid', String(bad));
        $(error, form).hidden = !bad;
        if (bad && !firstBad) firstBad = field;
      });
      if (firstBad) { firstBad.focus(); return; }
      const data = new FormData(form);
      const message = [
        "Hi Krish, I'd like to book a call.",
        `Name: ${data.get('name').trim()}`,
        `Business: ${data.get('company').trim()}`,
        `Stage: ${data.get('stage')}`,
        `Looking for: ${data.get('service')}`,
      ].join('\n');
      window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }
})();
