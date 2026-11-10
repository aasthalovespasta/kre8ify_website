/* Kreatify site interactions. GSAP + ScrollTrigger (vendored). Everything degrades to a readable static page. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const desk = () => innerWidth > 760;
  const hasG = typeof window.gsap !== 'undefined';
  if (hasG && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- nav, progress, clock, menu ---------- */
  const nav = $('[data-nav]'), bar = $('.progress i');
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 20);
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const clock = $('[data-clock]');
  const tick = () => { clock.textContent = 'New Delhi · ' + new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date()) + ' IST'; };
  tick(); setInterval(tick, 30000);
  const menu = $('.nav__menu'), sheet = $('#sheet');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); sheet.hidden = open; document.body.style.overflow = open ? '' : 'hidden'; });
  $$('#sheet a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); sheet.hidden = true; document.body.style.overflow = ''; }));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { menu.click(); menu.focus(); } });
  // active section in nav
  const links = $$('.nav__links a');
  const secIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const t = $(l.getAttribute('href')); if (t) secIO.observe(t); });

  /* ---------- counters ---------- */
  const count = (el, dur = 1.6) => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
    if (reduce || !hasG) { el.textContent = to.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: dur, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; } });
  };
  const cIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); cIO.unobserve(e.target); } }), { threshold: .6 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* ---------- cursor grid (desktop pointer only) ---------- */
  const cv = $('.cursor-grid');
  if (fine && !reduce) {
    const ctx = cv.getContext('2d'); let W, H, dpr, mx = -999, my = -999, tx = -999, ty = -999;
    const size = () => { dpr = Math.min(devicePixelRatio, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; };
    size(); addEventListener('resize', size);
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const gap = 28;
    let raf = 0;
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    addEventListener('pointermove', kick, { passive: true });
    const draw = () => {
      raf = 0;
      mx += (tx - mx) * .14; my += (ty - my) * .14;
      ctx.clearRect(0, 0, W, H);
      const R = 170;
      const x0 = Math.max(0, Math.floor((mx - R) / gap)) * gap, x1 = Math.min(innerWidth, mx + R);
      const y0 = Math.max(0, Math.floor((my - R) / gap)) * gap, y1 = Math.min(innerHeight, my + R);
      for (let x = x0; x <= x1; x += gap) for (let y = y0; y <= y1; y += gap) {
        const d = Math.hypot(x - mx, y - my); if (d > R) continue;
        const k = 1 - d / R;
        ctx.fillStyle = `rgba(110,172,218,${k * .55})`;
        ctx.beginPath(); ctx.arc(x * dpr, y * dpr, (0.8 + k * 1.6) * dpr, 0, 6.283); ctx.fill();
      }
      if (Math.abs(tx - mx) + Math.abs(ty - my) > .5) kick();
    };
  } else cv.remove();

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });

  /* ---------- split headings into words ---------- */
  $$('.split').forEach(h => {
    const walk = (node) => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) frag.append(t); else { const w = document.createElement('span'); w.className = 'w'; const i = document.createElement('span'); i.textContent = t; w.append(i); frag.append(w); } });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(h);
  });

  if (!hasG || reduce) {
    $$('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.hero__h .line > span').forEach(el => el.style.transform = 'none');
    $$('.bars i').forEach(i => i.style.setProperty('--g', 1));
    $$('.ops li').forEach(li => li.classList.add('is-on')); $$('.case').forEach(c => c.classList.add('in')); const z = $('[data-zero]'); if (z) { z.textContent = '1.00'; z.parentElement.style.fontStretch = '125%'; z.parentElement.style.fontWeight = 900; } $$('[data-zw]').forEach(w => w.classList.add('is-on'));
    staticFallbacks();
  } else {
    /* hero intro */
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to('.hero__h .line > span', { y: 0, duration: 1.3, stagger: .12 })
      .to('.hero .reveal', { opacity: 1, y: 0, duration: 1, stagger: .08 }, '-=.9');
    /* generic reveals */
    $$('.reveal').forEach(el => { if (el.closest('.hero')) return; gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }); });
    $$('.split').forEach(h => gsap.from($$('.w > span', h), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .035, scrollTrigger: { trigger: h, start: 'top 85%' } }));
    $$('.hero .hw').forEach((w, i) => gsap.fromTo(w, { fontStretch: '62%' }, { fontStretch: '116%', duration: 1.6, delay: .3 + i * .06, ease: 'expo.out', clearProps: 'fontStretch' }));
    /* hero parallax out */
    gsap.to('.console', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__copy', { y: -30, opacity: .3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: true } });
    scatter(); zero(); model(); ring(); dashBars(); founderParallax(); widthMorph(); casesIn();
  }

  /* ---------- hero console: weeks 1..12 loop ---------- */
  (() => {
    const meter = $('[data-meter]'), mbar = $('[data-meter-bar]'), wk = $('[data-meter-week]'), ops = $$('[data-ops] li'), meet = $('[data-meet]'), ln = $('.console__chart .ln');
    const con = $('.console');
    const set = (w) => {
      const v = Math.min(1, w / 12);
      meter.textContent = (Math.round(v * 100) / 100).toFixed(2);
      mbar.style.width = (v * 100) + '%';
      wk.textContent = 'Week ' + w;
      let last = null;
      ops.forEach(li => { const on = +li.dataset.w <= w; li.classList.toggle('is-on', on); li.classList.remove('is-now'); if (on) last = li; });
      if (last) last.classList.add('is-now');
      meet.textContent = w < 5 ? 0 : Math.round((w - 4) * 1.4);
      ln.style.setProperty('--dash', 600 - 600 * v);
    };
    if (reduce) { set(12); return; }
    let w = 0, timer = null, visible = true;
    const step = () => { w = w >= 12 ? 1 : w + 1; set(w); timer = setTimeout(step, w === 12 ? 2600 : 850); };
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !timer) step(); if (!visible) { clearTimeout(timer); timer = null; } }).observe(con);
    if (fine) con.addEventListener('pointermove', e => { const r = con.getBoundingClientRect(); con.style.setProperty('--mx', (e.clientX - r.left) + 'px'); con.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  })();

  /* ---------- problem: scattered pieces become one system ---------- */
  function scatter() {
    const box = $('[data-scatter]'); if (!box || !desk()) return;
    const cards = $$('.chip-card', box);
    const seeds = [[-60, 90, -9], [40, 140, 6], [80, 60, 11], [-30, -110, 7], [-60, -60, -12], [70, -140, -6]];
    cards.forEach((c, i) => gsap.set(c, { x: seeds[i][0], y: seeds[i][1], rotation: seeds[i][2], opacity: .55 }));
    const t = gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 80%', end: 'center 45%', scrub: .8 } });
    t.to(cards, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power2.out', stagger: .04 })
     .to($$('.scatter__lines path', box), { opacity: .7, duration: .3 }, '-=.2')
     .fromTo($$('.scatter__lines path', box), { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: .4 }, '<')
     .to('.scatter__core', { opacity: 1, scale: 1, duration: .2 }, '-=.2');
  }

  /* ---------- 0→1 model: pinned horizontal track ---------- */
  function model() {
    const sec = $('#model'), track = $('[data-model-track]'), num = $('[data-model-num]'), arc = $('[data-model-arc]'), rail = $('[data-model-bar]');
    const upd = (p) => { num.textContent = p.toFixed(1); arc.style.strokeDashoffset = 327 - 327 * p; rail.style.transform = `scaleX(${p})`; };
    if (!desk()) { ScrollTrigger.create({ trigger: sec, start: 'top 60%', end: 'bottom 60%', onUpdate: s => upd(s.progress) }); return; }
    const dist = () => Math.max(0, track.scrollWidth - innerWidth + 48);
    gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, pin: '.model__pin', start: 'top top', end: () => '+=' + dist(), scrub: .6, invalidateOnRefresh: true, onUpdate: s => upd(s.progress) } });
  }

  /* ---------- loop ring ---------- */
  function ring() {
    const sec = $('#loop'), fill = $('[data-ring]'), nodes = $$('.ring .node'), items = $$('[data-loop-list] li'), lab = $('[data-ring-label]'), sub = $('[data-ring-sub]');
    let last = -1;
    ScrollTrigger.create({ trigger: sec, start: 'top 65%', end: 'bottom 70%', scrub: true, onUpdate: s => {
      const p = s.progress; fill.style.strokeDashoffset = 1257 - 1257 * p;
      const i = Math.min(5, Math.floor(p * 6.2));
      if (i === last) return; last = i;
      nodes.forEach((n, k) => n.classList.toggle('is-on', k <= i));
      items.forEach((n, k) => n.classList.toggle('is-on', k <= i));
      lab.textContent = items[i].querySelector('b').textContent; sub.textContent = items[i].querySelector('small').textContent;
    } });
  }

  /* ---------- dashboard bars ---------- */
  function dashBars() { ScrollTrigger.create({ trigger: '[data-bars]', start: 'top 85%', once: true, onEnter: () => $$('[data-bars] i').forEach((b, i) => setTimeout(() => b.style.setProperty('--g', 1), i * 60)) }); }

  /* ---------- founder parallax ---------- */
  function founderParallax() { const img = $('[data-parallax] img'); if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '#founder', start: 'top bottom', end: 'bottom top', scrub: true } }); }


  /* ---------- 0 to 1 moment: number scrubs, width and weight grow ---------- */
  function zero() {
    const sec = $('#zero'), num = $('[data-zero]'), words = $$('[data-zw]');
    const upd = (p) => {
      num.textContent = p.toFixed(2);
      num.parentElement.style.fontStretch = (62 + p * 63) + '%';
      num.parentElement.style.fontWeight = Math.round(300 + p * 600);
      const k = Math.min(words.length - 1, Math.floor(p * words.length));
      words.forEach((w, i) => w.classList.toggle('is-on', i <= k));
    };
    if (desk()) ScrollTrigger.create({ trigger: sec, pin: '.zero__pin', start: 'top top', end: '+=120%', scrub: .5, onUpdate: s => upd(s.progress) });
    else ScrollTrigger.create({ trigger: sec, start: 'top 70%', end: 'bottom 60%', scrub: true, onUpdate: s => upd(s.progress) });
  }

  /* ---------- section headings: words widen from narrow as they arrive ---------- */
  function widthMorph() {
    $$('.h2').forEach(h => {
      const ws = $$('.w > span', h).filter(w => !w.closest('.serif'));
      if (!ws.length) return;
      gsap.fromTo(ws, { fontStretch: '70%' }, { fontStretch: '112%', duration: 1.4, ease: 'expo.out', stagger: .03, clearProps: 'fontStretch', scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
  }

  function casesIn() { $$('.case').forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 85%', once: true, onEnter: () => c.classList.add('in') })); }

  function staticFallbacks() {
    $('[data-model-num]').textContent = '1.0'; $('[data-model-arc]').style.strokeDashoffset = 0; $('[data-model-bar]').style.transform = 'scaleX(1)';
    $('[data-ring]').style.strokeDashoffset = 0; $$('.ring .node, [data-loop-list] li').forEach(n => n.classList.add('is-on'));
  }

  /* ---------- engines tabs + terminal typing ---------- */
  (() => {
    const root = $('[data-tabs]'); const tabs = $$('[role="tab"]', root); const panels = tabs.map(t => $('#' + t.getAttribute('aria-controls')));
    let idx = 0, auto = true, timer = null, inView = false;
    const type = (panel) => {
      const pre = $('pre', panel); const lines = JSON.parse(pre.dataset.lines);
      clearInterval(pre._t); pre.innerHTML = '';
      const cls = l => l.startsWith('>') ? 'p' : l.startsWith('✓') ? 'ok' : l.startsWith('~') ? 'wait' : '';
      if (reduce) { pre.innerHTML = lines.map(l => `<span class="${cls(l)}">${l}</span>`).join('\n'); return; }
      let li = 0, ci = 0, out = '';
      pre._t = setInterval(() => {
        if (li >= lines.length) { clearInterval(pre._t); pre.innerHTML = out + '<span class="caret"></span>'; return; }
        ci++; const cur = lines[li].slice(0, ci);
        pre.innerHTML = out + `<span class="${cls(lines[li])}">${cur}</span><span class="caret"></span>`;
        if (ci >= lines[li].length) { out += `<span class="${cls(lines[li])}">${lines[li]}</span>\n`; li++; ci = 0; }
      }, 22);
    };
    const select = (i, focus) => {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => { const on = k === idx; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panels[k].hidden = !on; });
      if (focus) tabs[idx].focus();
      type(panels[idx]);
      if (hasG && !reduce) gsap.fromTo(panels[idx], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, ease: 'expo.out' });
      schedule();
    };
    const schedule = () => { clearTimeout(timer); if (auto && inView && !reduce) timer = setTimeout(() => select(idx + 1), 9000); };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => { auto = false; root.classList.add('is-paused'); select(k); });
      t.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); auto = false; select(idx + 1, true); } if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); auto = false; select(idx - 1, true); } if (e.key === 'Home') { e.preventDefault(); select(0, true); } if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, true); } });
    });
    root.addEventListener('pointerenter', () => { root.classList.add('is-paused'); clearTimeout(timer); });
    root.addEventListener('pointerleave', () => { if (auto) { root.classList.remove('is-paused'); schedule(); } });
    let typed = false;
    new IntersectionObserver(es => { inView = es[0].isIntersecting; if (inView && !typed) { typed = true; type(panels[0]); } schedule(); }, { threshold: .35 }).observe(root);
  })();

  /* ---------- 90-day scrubber ---------- */
  (() => {
    const box = $('[data-scrub]'), range = $('#weekRange'), head = $('[data-scrub-head]'), lanes = $('.scrub__lanes');
    const bars = $$('.lane i'), wkEl = $('[data-week]');
    const phases = [
      { r: [1, 4], t: 'Weeks 1 to 4', h: 'Authority is built', p: 'A company that can legally invoice, an offer with a price, a profile that sells for you and your first Monday report.' },
      { r: [5, 8], t: 'Weeks 5 to 8', h: 'Credibility shows up', p: 'Campaigns are live, buyers are replying, calls land on your calendar and no lead waits more than 48 hours.' },
      { r: [9, 12], t: 'Weeks 9 to 12', h: 'Growth becomes predictable', p: 'Inbound DMs, a steady flow of qualified meetings, invoices paid on time: the business now runs without luck.' }];
    const imp = [1.2, 1.8, 2.6, 3.4, 4.3, 5.2, 6.1, 7.0, 8.0, 9.4, 10.2, 11.2];
    const meet = [0, 0, 0, 0, 1, 3, 4, 6, 8, 10, 12, 14];
    const set = (w) => {
      w = +w; range.value = w; wkEl.textContent = w;
      range.style.setProperty('--p', ((w - 1) / 11 * 100) + '%');
      const L = lanes.querySelector('.lane__n').getBoundingClientRect().width, Wd = lanes.getBoundingClientRect().width - L;
      head.style.transform = `translateX(${(w - .5) / 12 * Wd}px)`;
      bars.forEach(b => { const s = +b.style.getPropertyValue('--s'), e = +b.style.getPropertyValue('--e'); b.classList.toggle('is-on', w > s && w <= e); });
      const ph = phases.find(p => w >= p.r[0] && w <= p.r[1]);
      $('[data-phase]').textContent = ph.t; $('[data-phase-h]').textContent = ph.h; $('[data-phase-p]').textContent = ph.p;
      $('[data-k-imp]').textContent = imp[w - 1].toFixed(1) + 'K'; $('[data-k-meet]').textContent = meet[w - 1]; $('[data-k-ready]').textContent = Math.min(1, w / 12).toFixed(2);
    };
    let userTouched = false;
    range.addEventListener('input', () => { userTouched = true; set(range.value); });
    addEventListener('resize', () => set(range.value));
    set(1);
    if (!reduce) {
      let played = false;
      new IntersectionObserver(es => {
        if (!es[0].isIntersecting || played) return; played = true;
        let w = 1; const run = () => { if (userTouched || w >= 12) return; w++; set(w); setTimeout(run, 420); }; setTimeout(run, 500);
      }, { threshold: .5 }).observe(box);
    }
  })();

  /* ---------- case card tilt + spotlight ---------- */
  if (fine && !reduce) $$('.tilt').forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%'); c.style.transform = `rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`; });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });

  /* ---------- footer word spotlight ---------- */
  const word = $('[data-spot]');
  if (word && fine) word.addEventListener('pointermove', e => { const r = word.getBoundingClientRect(); word.style.setProperty('--sx', (e.clientX - r.left) + 'px'); word.style.setProperty('--sy', (e.clientY - r.top) + 'px'); });

  /* ---------- booking form ---------- */
  (() => {
    const f = $('[data-form]'); const s1 = $('[data-step="1"]', f), s2 = $('[data-step="2"]', f);
    const n = $('[data-step-n]', f), t = $('[data-step-t]', f);
    const go = (two) => { s1.hidden = two; s2.hidden = !two; n.textContent = two ? '2' : '1'; t.textContent = two ? 'Who should Krish expect?' : 'Where are you today?'; (two ? $('#f-name') : $('input[name=stage]:checked')).focus(); if (hasG && !reduce) gsap.from(two ? s2 : s1, { opacity: 0, x: two ? 24 : -24, duration: .45, ease: 'expo.out' }); };
    $('[data-next]', f).addEventListener('click', () => go(true));
    $('[data-back]', f).addEventListener('click', () => go(false));
    const fields = [['#f-name', '#e-name'], ['#f-co', '#e-co']];
    f.addEventListener('submit', e => {
      e.preventDefault();
      let first = null;
      fields.forEach(([i, er]) => { const el = $(i), bad = !el.value.trim(); el.setAttribute('aria-invalid', bad); el.setAttribute('aria-describedby', bad ? er.slice(1) : ''); $(er).hidden = !bad; if (bad && !first) first = el; });
      if (first) { first.focus(); return; }
      const msg = `Hi Krish, I'd like to book a call.\nName: ${$('#f-name').value.trim()}\nBusiness: ${$('#f-co').value.trim()}\nStage: ${$('input[name=stage]:checked').value}`;
      window.open('https://wa.me/918377916115?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  })();
})();
