/* Kreatify site interactions. GSAP + ScrollTrigger (vendored). Every module checks its own markup, so one file serves every page.
   Everything degrades to a readable static page without JS or with reduced motion. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const desk = () => innerWidth > 760;
  const hasG = typeof window.gsap !== 'undefined';
  const hasST = hasG && !!window.ScrollTrigger;
  if (hasST) gsap.registerPlugin(ScrollTrigger);
  const live = hasG && !reduce;

  /* ---------- split section headings into words, hero headings into letters ---------- */
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
  $$('[data-kx]').forEach(el => {
    const t = el.textContent; el.textContent = '';
    [...t].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c === ' ' ? ' ' : c; s.setAttribute('aria-hidden', 'true'); el.append(s); });
  });

  /* ---------- nav, progress, clock, menu ---------- */
  const nav = $('[data-nav]'), bar = $('.progress i');
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 20);
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const clock = $('[data-clock]');
  const tickClock = () => { clock.textContent = 'New Delhi · ' + new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date()) + ' IST'; };
  tickClock(); setInterval(tickClock, 30000);
  const menu = $('.nav__menu'), sheet = $('#sheet');
  const setMenu = (open) => { menu.setAttribute('aria-expanded', String(open)); sheet.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  $$('#sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); menu.focus(); } });
  const hashLinks = $$('.nav__links a').filter(l => l.getAttribute('href').startsWith('#'));
  if (hashLinks.length) {
    const secIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) hashLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    hashLinks.forEach(l => { const t = $(l.getAttribute('href')); if (t) secIO.observe(t); });
  }

  /* ---------- counters ---------- */
  const count = (el, dur = 1.6) => {
    const to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
    if (!live) { el.textContent = to.toFixed(dec) + suf; return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: dur, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; } });
  };
  const cIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); cIO.unobserve(e.target); } }), { threshold: .6 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* ---------- cursor dot grid (desktop pointer only) ---------- */
  const cv = $('.cursor-grid');
  if (fine && !reduce) {
    const ctx = cv.getContext('2d'); let W, H, dpr, mx = -999, my = -999, tx = -999, ty = -999, raf = 0;
    const size = () => { dpr = Math.min(devicePixelRatio, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; };
    size(); addEventListener('resize', size);
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; kick(); }, { passive: true });
    const gap = 28;
    function draw() {
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
    }
  } else cv.remove();

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduce) $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });

  /* ---------- hero: entrance, letters that thin out near the cursor, photo trail ---------- */
  const heroIn = () => {
    if (!live) return;
    $$('.kh__in').forEach(el => { el.style.transform = 'none'; });
    gsap.fromTo('.kh .ch', { yPercent: 118 }, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: .04 });
    gsap.to('.hero2 .reveal, .phero .reveal', { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08, delay: .35 });
  };

  if (fine && !reduce) {
    const chars = $$('.kh .ch').map(c => ({ el: c, serif: !!c.closest('.kx--serif'), w: c.closest('.kx--serif') ? 300 : 800, k: 0 }));
    const host = $('.hero2, .phero');
    if (chars.length && host) {
      let px = -9999, py = -9999, raf = 0, idle = 0;
      host.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; idle = 0; if (!raf) raf = requestAnimationFrame(loop); });
      host.addEventListener('pointerleave', () => { px = py = -9999; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        raf = 0; let moving = false;
        chars.forEach(c => {
          const r = c.el.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - px, r.top + r.height / 2 - py);
          const t = Math.max(0, 1 - d / 280);
          c.k += (t - c.k) * .16;
          if (Math.abs(t - c.k) > .002) moving = true;
          c.el.style.fontWeight = Math.round(c.serif ? 300 + c.k * 400 : 800 - c.k * 520);
        });
        if (moving || idle++ < 4) raf = requestAnimationFrame(loop);
      }
    }
  }

  (() => {
    const trail = $('[data-trail]'); if (!trail || !live) return;
    const hero = trail.parentElement;
    const pool = [
      { img: 'assets/img/trail-1.webp' },
      { ic: 'linkedin.svg', t: 'LinkedIn post', b: '12.4K views', s: 'written in your voice' },
      { img: 'assets/img/trail-2.webp' },
      { ic: 'gcal.svg', t: 'Meeting booked', b: 'Thu, 4:30 pm', s: 'from a LinkedIn comment', cls: 'tr--sky' },
      { img: 'assets/img/trail-3.webp' },
      { ic: 'docs.svg', t: 'Company registered', b: 'Private limited', s: 'GST ready in week two', cls: 'tr--cream' },
      { ic: 'hubspot.svg', t: 'New reply', b: '"Let\'s talk Thursday"', s: 'Saffron Labs, from outreach' },
    ];
    pool.forEach(p => { if (p.img) { const i = new Image(); i.src = p.img; } });
    let n = 0, lx = null, ly = null, acc = 0;
    const spawn = (x, y, dx = 0, dy = 0, small = false) => {
      const p = pool[n++ % pool.length];
      const el = document.createElement('div');
      el.className = 'tr' + (p.img ? '' : ' tr--card ' + (p.cls || ''));
      el.innerHTML = p.img ? `<img src="${p.img}" alt="">` : `<span class="mono"><img src="assets/logos/${p.ic}" alt="">${p.t}</span><b>${p.b}</b><small>${p.s}</small>`;
      trail.append(el);
      while (trail.children.length > 7) trail.firstElementChild.remove();
      const rot = (Math.random() - .5) * 14;
      gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
      gsap.fromTo(el, { scale: small ? .3 : .4, opacity: 0, rotate: rot * 1.6 }, { scale: small ? .72 : 1, opacity: 1, rotate: rot, x: x + dx * .4, y: y + dy * .4, duration: .6, ease: 'back.out(1.6)' });
      gsap.to(el, { opacity: 0, scale: small ? .6 : .82, y: '+=' + 50, duration: .7, delay: small ? 1.6 : .95, ease: 'power2.in', onComplete: () => el.remove() });
    };
    if (fine) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        if (y > r.height - 110) { lx = null; return; }
        if (lx === null) { lx = x; ly = y; return; }
        const dx = x - lx, dy = y - ly; acc += Math.hypot(dx, dy); lx = x; ly = y;
        if (acc > 120) { acc = 0; spawn(x, y, dx * 4, dy * 4); }
      });
      hero.addEventListener('pointerleave', () => { lx = null; });
    } else {
      let timer = null;
      const auto = () => { const r = hero.getBoundingClientRect(); spawn(r.width * (.15 + Math.random() * .7), r.height * (.12 + Math.random() * .6), 0, 0, true); timer = setTimeout(auto, 1500); };
      new IntersectionObserver(es => { if (es[0].isIntersecting) { if (!timer) timer = setTimeout(auto, 1800); } else { clearTimeout(timer); timer = null; } }).observe(hero);
    }
  })();

  /* ---------- intro: royal screen, a sky stroke sweeps through, the screen lifts ---------- */
  (() => {
    const intro = $('[data-intro]');
    if (!intro || getComputedStyle(intro).display === 'none' || !live) { if (intro) intro.remove(); heroIn(); return; }
    try { sessionStorage.setItem('k-intro', '1'); } catch (e) {}
    const path = $('[data-intro-path]', intro), L = path.getTotalLength();
    gsap.set(path, { strokeDasharray: L, strokeDashoffset: L });
    gsap.timeline({ onComplete: () => intro.remove() })
      .to('.intro__word', { opacity: 1, duration: .35, ease: 'power2.out' })
      .to(path, { strokeDashoffset: 0, duration: .85, ease: 'power3.inOut' }, '-=.05')
      .to('.intro__word', { opacity: 0, y: -24, duration: .3, ease: 'power2.in' }, '-=.45')
      .add(heroIn, '-=.05')
      .to(intro, { yPercent: -100, borderBottomLeftRadius: '50% 22%', borderBottomRightRadius: '50% 22%', duration: .95, ease: 'expo.inOut' }, '-=.25')
      .to(path, { strokeDashoffset: -L, duration: .8, ease: 'power2.in' }, '<');
  })();

  /* ---------- mock product screens: play when visible ---------- */
  const mocks = {
    post(m) {
      const nums = $$('[data-mk-count]', m), toast = $('[data-mk-toast]', m);
      toast.classList.remove('is-on');
      nums.forEach(b => {
        const to = +b.dataset.mkCount;
        if (!live) { b.textContent = to.toLocaleString('en-IN'); return; }
        const o = { v: 0 }; gsap.to(o, { v: to, duration: 2.2, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v).toLocaleString('en-IN'); } });
      });
      m._t.push(setTimeout(() => toast.classList.add('is-on'), live ? 2000 : 0));
    },
    leads(m) {
      const names = ['Found', 'Message sent', 'Replied', 'Meeting booked'], rows = $$('li', m), toast = $('[data-mk-toast]', m);
      toast.classList.remove('is-on');
      const set = (li, s) => { const st = $('.st', li); st.className = 'st s' + s; st.textContent = names[s]; st.classList.add('bump'); setTimeout(() => st.classList.remove('bump'), 300); };
      rows.forEach(li => { const st = $('.st', li); st.className = 'st'; st.textContent = names[0]; });
      if (!live) { rows.forEach(li => set(li, +li.dataset.to)); toast.classList.add('is-on'); return; }
      let last = 0;
      rows.forEach((li, i) => { for (let s = 1; s <= +li.dataset.to; s++) { const at = 500 + i * 380 + (s - 1) * 1000; last = Math.max(last, at); m._t.push(setTimeout(() => set(li, s), at)); } });
      m._t.push(setTimeout(() => toast.classList.add('is-on'), last + 500));
    },
    check(m) {
      const items = $$('li', m), pct = $('[data-mk-pct]', m), rail = $('[data-mk-rail]', m);
      const upd = (k) => { items.forEach((li, i) => { li.classList.toggle('ok', i < k); li.classList.toggle('now', i === k); }); const p = Math.round(k / items.length * 100); pct.textContent = p + '%'; rail.style.width = p + '%'; };
      if (!live) { upd(items.length); return; }
      upd(0);
      items.forEach((_, i) => m._t.push(setTimeout(() => upd(i + 1), 600 + i * 520)));
    },
  };
  const playMock = (m) => { (m._t || []).forEach(clearTimeout); m._t = []; mocks[m.dataset.mock](m); };
  const mIO = new IntersectionObserver(es => es.forEach(e => {
    const m = e.target;
    if (e.isIntersecting && !m._played && !m.closest('.hz__item:not(.is-open)')) { m._played = true; playMock(m); }
  }), { threshold: .45 });
  if (live) $$('[data-mock]').forEach(m => mIO.observe(m));
  else $$('[data-mock]').forEach(m => { m._played = true; playMock(m); });

  /* ---------- three horizons: one open at a time ---------- */
  (() => {
    const hz = $('[data-hz]'); if (!hz) return;
    const items = $$('.hz__item', hz);
    items.forEach(it => {
      const btn = $('.hz__head', it);
      btn.addEventListener('click', () => {
        const open = !it.classList.contains('is-open');
        items.forEach(o => { const on = o === it && open; o.classList.toggle('is-open', on); $('.hz__head', o).setAttribute('aria-expanded', on); });
        if (open) {
          const m = $('[data-mock]', it); m._played = true; setTimeout(() => playMock(m), live ? 350 : 0);
          if (live) setTimeout(() => { const r = it.getBoundingClientRect(); if (r.top < 70 || r.top > innerHeight * .6) scrollTo({ top: scrollY + r.top - 90, behavior: 'smooth' }); }, 420);
        }
        if (hasST) setTimeout(() => ScrollTrigger.refresh(), 900);
      });
    });
  })();

  /* ---------- GTM stack: three logo rows driven by scroll velocity, filters, tooltip ---------- */
  (() => {
    const root = $('[data-gs]'); if (!root) return;
    const list = $('[data-gs-list]', root), tip = $('[data-gs-tip]', root), pauseBtn = $('[data-gs-pause]');
    const tiles = $$('.tl', list);
    let rows = [], paused = false, filter = 'all', active = null, inView = false, boost = 0, sdir = 1, last = performance.now();

    if (!reduce) {
      root.classList.add('is-live');
      const wrap = document.createElement('div'); wrap.className = 'gs__rows';
      [0, 1, 2].forEach(r => {
        const ul = document.createElement('ul'); ul.className = 'gs__row'; ul.setAttribute('aria-label', 'Tools, row ' + (r + 1));
        tiles.filter((_, i) => i % 3 === r).forEach(t => ul.appendChild(t));
        wrap.appendChild(ul);
        rows.push({ el: ul, x: 0, w: 0, dir: r % 2 ? 1 : -1, base: [.55, .42, .5][r], ts: 1, tsT: 1 });
      });
      root.insertBefore(wrap, list);
      const fill = () => rows.forEach(R => {
        $$('[data-clone]', R.el).forEach(c => R.el.removeChild(c));
        const orig = [...R.el.children];
        R.w = R.el.scrollWidth + 14;
        const copies = Math.max(1, Math.ceil((innerWidth * 1.2) / R.w));
        for (let k = 0; k < copies; k++) orig.forEach(t => { const c = t.cloneNode(true); c.dataset.clone = ''; c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; R.el.appendChild(c); });
        R.x = R.dir > 0 ? -R.w : 0;
      });
      fill(); applyFilter();
      let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { fill(); applyFilter(); }, 200); });
      rows.forEach(R => {
        R.el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') R.tsT = .12; });
        R.el.addEventListener('pointerleave', () => { R.tsT = 1; });
      });
      if (hasST) ScrollTrigger.create({ trigger: '#stack', start: 'top bottom', end: 'bottom top', onUpdate: st => { const v = st.getVelocity(); boost = Math.min(9, Math.abs(v) / 260); sdir = v < 0 ? -1 : 1; } });
      new IntersectionObserver(es => { const was = inView; inView = es[0].isIntersecting; if (inView && !was) { last = performance.now(); requestAnimationFrame(tick); } }).observe(root);
    }

    function tick(now) {
      if (!inView) return;
      const dt = Math.min(48, now - last) / 16.67; last = now;
      boost *= .93;
      rows.forEach(R => {
        const tgt = paused ? 0 : R.tsT; R.ts += (tgt - R.ts) * .08; if (Math.abs(tgt - R.ts) < .004) R.ts = tgt;
        R.x += R.dir * sdir * R.base * (1 + boost) * R.ts * dt;
        if (R.x <= -R.w) R.x += R.w; else if (R.x > 0) R.x -= R.w;
        R.el.style.transform = `translate3d(${R.x.toFixed(2)}px,0,0) skewX(${(-R.dir * sdir * boost * .5).toFixed(2)}deg)`;
      });
      if (active) place(active);
      requestAnimationFrame(tick);
    }
    function place(t) {
      const a = t.getBoundingClientRect(), b = root.getBoundingClientRect();
      const half = tip.offsetWidth / 2, x = Math.max(half + 8, Math.min(b.width - half - 8, a.left - b.left + a.width / 2));
      tip.style.left = x + 'px'; tip.style.top = (a.top - b.top - tip.offsetHeight - 14) + 'px';
    }
    function show(t) {
      if (active && active !== t) active.classList.remove('is-act');
      active = t; t.classList.add('is-act');
      $('img', tip).src = $('img', t).src; $('b', tip).textContent = $('b', t).textContent;
      $('small', tip).textContent = $('small', t).textContent; $('p', tip).textContent = t.dataset.use;
      tip.hidden = false; place(t); requestAnimationFrame(() => tip.classList.add('is-on'));
    }
    function hide(t) {
      if (t && t !== active) return;
      if (active) active.classList.remove('is-act'); active = null; tip.classList.remove('is-on');
    }
    root.addEventListener('pointerover', e => { const t = e.target.closest('.tl'); if (t && e.pointerType === 'mouse') show(t); });
    root.addEventListener('pointerout', e => { const t = e.target.closest('.tl'); if (t && e.pointerType === 'mouse' && !t.contains(e.relatedTarget)) hide(t); });
    root.addEventListener('focusin', e => { const t = e.target.closest('.tl'); if (t) show(t); });
    root.addEventListener('focusout', e => { const t = e.target.closest('.tl'); if (t) hide(t); });
    root.addEventListener('click', e => {
      const t = e.target.closest('.tl'); if (!t) return;
      const row = rows.find(R => R.el.contains(t));
      if (active === t && e.pointerType !== 'mouse') { hide(t); if (row) row.tsT = 1; } else { show(t); rows.forEach(R => R.tsT = R === row ? 0 : 1); }
    });
    document.addEventListener('click', e => { if (active && !e.target.closest('[data-gs]')) { hide(); rows.forEach(R => R.tsT = 1); } });
    function applyFilter() {
      $$('.tl', root).forEach(t => { const hit = filter === 'all' || t.dataset.cat === filter; t.classList.toggle('is-dim', !hit); t.classList.toggle('is-hit', hit && filter !== 'all'); });
    }
    $$('.chip').forEach(c => c.addEventListener('click', () => {
      filter = c.dataset.f;
      $$('.chip').forEach(o => { const on = o === c; o.classList.toggle('is-on', on); o.setAttribute('aria-pressed', on); });
      applyFilter(); boost = 4;
    }));
    if (pauseBtn) {
      if (reduce) pauseBtn.hidden = true;
      pauseBtn.addEventListener('click', () => { paused = !paused; pauseBtn.setAttribute('aria-pressed', paused); $('span', pauseBtn).textContent = paused ? 'Play' : 'Pause'; });
    }
  })();

  /* ---------- one lead travelling through the stack ---------- */
  (() => {
    const fl = $('[data-flow]'); if (!fl) return;
    const steps = $$('.fl__track li', fl), dot = $('[data-flow-dot]', fl), clk = $('[data-flow-clock]', fl);
    const times = ['Mon 08:02', 'Mon 08:03', 'Mon 08:05', 'Tue 09:12', 'Tue 11:40', 'Thu 16:30'];
    let i = -1, timer, inView = false;
    const set = (k) => {
      steps.forEach((s, j) => { s.classList.toggle('is-on', j <= k); s.classList.toggle('is-now', j === k); });
      const p = Math.max(0, k) / (steps.length - 1);
      dot.style.width = p * 100 + '%';
      fl.style.setProperty('--fx', p * 100 + '%'); clk.textContent = k < 0 ? '' : times[k];
    };
    if (reduce) { set(steps.length - 1); return; }
    const next = () => {
      clearTimeout(timer); if (!inView) return;
      i = i >= steps.length - 1 ? 0 : i + 1; set(i);
      timer = setTimeout(next, i === steps.length - 1 ? 3200 : 1500);
    };
    new IntersectionObserver(es => { const was = inView; inView = es[0].isIntersecting; if (inView && !was) next(); else if (!inView) clearTimeout(timer); }, { threshold: .35 }).observe(fl);
    set(-1);
  })();

  /* ---------- 0 to 1 model: the step in the middle of the screen lights up its name ---------- */
  (() => {
    const stages = $$('[data-stage]'); if (!stages.length) return;
    const links = $$('[data-stage-link]');
    stages.forEach(s => $$('.docs li, .board i', s).forEach((li, k) => li.style.transitionDelay = (k * 90) + 'ms'));
    const setOn = (i) => { stages.forEach((s, k) => s.classList.toggle('is-on', k === i)); links.forEach((l, k) => l.classList.toggle('is-on', k === i)); };
    if (reduce) { stages.forEach(s => s.classList.add('seen')); setOn(0); }
    const midIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setOn(+e.target.dataset.stage); }), { rootMargin: '-45% 0px -45% 0px' });
    stages.forEach(s => midIO.observe(s));
    const seenIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('seen'); seenIO.unobserve(e.target); } }), { threshold: .3 });
    stages.forEach(s => seenIO.observe(s));
    setOn(0);
  })();

  /* ---------- 90-day slider ---------- */
  (() => {
    const box = $('[data-scrub]'); if (!box) return;
    const range = $('#weekRange'), head = $('[data-scrub-head]'), lanes = $('.scrub__lanes');
    const bars = $$('.lane i'), wkEl = $('[data-week]');
    const phases = [
      { r: [1, 4], t: 'Weeks 1 to 4', h: 'Getting set up', p: 'Your company is registered, your offer is written, your LinkedIn profile is rewritten and your first posts are live.' },
      { r: [5, 8], t: 'Weeks 5 to 8', h: 'First conversations', p: 'Outreach is live, buyers start replying, and the first calls land on your calendar.' },
      { r: [9, 12], t: 'Weeks 9 to 12', h: 'A steady rhythm', p: 'More people find you through your posts, meetings come in every week, and you can see which channel brings them.' }];
    const imp = [1.2, 1.8, 2.6, 3.4, 4.3, 5.2, 6.1, 7.0, 8.0, 9.4, 10.2, 11.2];
    const meet = [0, 0, 0, 0, 1, 3, 4, 6, 8, 10, 12, 14];
    const posts = [0, 0, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29];
    const set = (w) => {
      w = +w; range.value = w; wkEl.textContent = w;
      range.style.setProperty('--p', ((w - 1) / 11 * 100) + '%');
      const L = lanes.querySelector('.lane__n').getBoundingClientRect().width, Wd = lanes.getBoundingClientRect().width - L;
      head.style.transform = `translateX(${(w - .5) / 12 * Wd}px)`;
      bars.forEach(b => { const s = +b.style.getPropertyValue('--s'), e = +b.style.getPropertyValue('--e'); b.classList.toggle('is-on', w > s && w <= e); });
      const ph = phases.find(p => w >= p.r[0] && w <= p.r[1]);
      $('[data-phase]').textContent = ph.t; $('[data-phase-h]').textContent = ph.h; $('[data-phase-p]').textContent = ph.p;
      $('[data-k-imp]').textContent = imp[w - 1].toFixed(1) + 'K'; $('[data-k-meet]').textContent = meet[w - 1]; $('[data-k-posts]').textContent = posts[w - 1];
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
    const f = $('[data-form]'); if (!f) return;
    const s1 = $('[data-step="1"]', f), s2 = $('[data-step="2"]', f);
    const n = $('[data-step-n]', f), t = $('[data-step-t]', f);
    const go = (two) => { s1.hidden = two; s2.hidden = !two; n.textContent = two ? '2' : '1'; t.textContent = two ? 'Who should Krish expect?' : 'Where are you today?'; (two ? $('#f-name') : $('input[name=stage]:checked')).focus(); if (live) gsap.from(two ? s2 : s1, { opacity: 0, x: two ? 24 : -24, duration: .45, ease: 'expo.out' }); };
    $('[data-next]', f).addEventListener('click', () => go(true));
    $('[data-back]', f).addEventListener('click', () => go(false));
    const fields = [['#f-name', '#e-name'], ['#f-co', '#e-co']];
    f.addEventListener('submit', e => {
      e.preventDefault();
      let first = null;
      fields.forEach(([i, er]) => { const el = $(i), bad = !el.value.trim(); el.setAttribute('aria-invalid', bad); if (bad) el.setAttribute('aria-describedby', er.slice(1)); else el.removeAttribute('aria-describedby'); $(er).hidden = !bad; if (bad && !first) first = el; });
      if (first) { first.focus(); return; }
      const msg = `Hi Krish, I'd like to book a call.\nName: ${$('#f-name').value.trim()}\nBusiness: ${$('#f-co').value.trim()}\nStage: ${$('input[name=stage]:checked').value}`;
      window.open('https://wa.me/918377916115?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  })();

  /* ---------- static fallback ---------- */
  if (!live) {
    $$('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.kh__in').forEach(el => el.style.transform = 'none');
    $$('.bars i').forEach(i => i.style.setProperty('--g', 1));
    $$('.case').forEach(c => c.classList.add('in'));
    $$('.model2 .stage').forEach(s => s.classList.add('seen'));
    const ringFill = $('[data-ring]'); if (ringFill) { ringFill.style.strokeDashoffset = 0; $$('.ring .node, [data-loop-list] li').forEach(n => n.classList.add('is-on')); }
    $$('.st2').forEach(s => s.classList.add('is-on')); const sf = $('[data-steps-fill]'); if (sf) sf.style.setProperty('--p', 1);
    return;
  }

  /* ---------- scroll animations ---------- */
  $$('.reveal').forEach(el => { if (el.closest('.hero2, .phero')) return; gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }); });
  $$('.split').forEach(h => gsap.from($$('.w > span', h), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .035, scrollTrigger: { trigger: h, start: 'top 85%' } }));
  $$('.h2').forEach(h => {
    const ws = $$('.w > span', h).filter(w => !w.closest('.serif'));
    if (ws.length) gsap.fromTo(ws, { fontStretch: '70%' }, { fontStretch: '112%', duration: 1.4, ease: 'expo.out', stagger: .03, clearProps: 'fontStretch', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  const heroBox = $('.hero2__in, .phero__in');
  if (heroBox) gsap.to(heroBox, { y: -70, opacity: .25, ease: 'none', scrollTrigger: { trigger: heroBox.parentElement, start: 'top top', end: 'bottom top', scrub: true } });

  // parallax text and dot layers on textured sections
  $$('[data-par]').forEach(el => gsap.fromTo(el, { x: 0 }, { x: () => +el.dataset.par * innerWidth, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } }));
  $$('[data-par-y]').forEach(el => gsap.fromTo(el, { y: 0 }, { y: () => -(+el.dataset.parY) * innerHeight, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } }));

  // problem: scattered pieces become one system
  (() => {
    const box = $('[data-scatter]'); if (!box || !desk()) return;
    const cards = $$('.chip-card', box);
    const seeds = [[-60, 90, -9], [40, 140, 6], [80, 60, 11], [-30, -110, 7], [-60, -60, -12], [70, -140, -6]];
    cards.forEach((c, i) => gsap.set(c, { x: seeds[i][0], y: seeds[i][1], rotation: seeds[i][2], opacity: .55 }));
    gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 80%', end: 'center 45%', scrub: .8 } })
      .to(cards, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power2.out', stagger: .04 })
      .to($$('.scatter__lines path', box), { opacity: .7, duration: .3 }, '-=.2')
      .fromTo($$('.scatter__lines path', box), { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: .4 }, '<')
      .to('.scatter__core', { opacity: 1, scale: 1, duration: .2 }, '-=.2');
  })();

  // loop ring
  (() => {
    const sec = $('#loop'); if (!sec) return;
    const fill = $('[data-ring]'), nodes = $$('.ring .node'), items = $$('[data-loop-list] li'), lab = $('[data-ring-label]'), sub = $('[data-ring-sub]');
    let last = -1;
    ScrollTrigger.create({ trigger: sec, start: 'top 65%', end: 'bottom 70%', scrub: true, onUpdate: s => {
      const p = s.progress; fill.style.strokeDashoffset = 1257 - 1257 * p;
      const i = Math.min(5, Math.floor(p * 6.2));
      if (i === last) return; last = i;
      nodes.forEach((n, k) => n.classList.toggle('is-on', k <= i));
      items.forEach((n, k) => n.classList.toggle('is-on', k <= i));
      lab.textContent = items[i].querySelector('b').textContent; sub.textContent = items[i].querySelector('small').textContent;
    } });
  })();

  // steps timeline on service pages: the line fills as you read
  (() => {
    const box = $('[data-steps]'); if (!box) return;
    const fillEl = $('[data-steps-fill]', box), items = $$('.st2', box);
    ScrollTrigger.create({ trigger: box, start: 'top 62%', end: 'bottom 62%', scrub: true, onUpdate: s => {
      fillEl.style.setProperty('--p', s.progress.toFixed(3));
      const k = Math.floor(s.progress * items.length + .15);
      items.forEach((it, i) => it.classList.toggle('is-on', i < Math.max(1, k)));
    } });
    items[0].classList.add('is-on');
  })();

  // dashboard bars, founder photo drift, case cards
  if ($('[data-bars]')) ScrollTrigger.create({ trigger: '[data-bars]', start: 'top 85%', once: true, onEnter: () => $$('[data-bars] i').forEach((b, i) => setTimeout(() => b.style.setProperty('--g', 1), i * 60)) });
  const fImg = $('[data-parallax] img'); if (fImg) gsap.fromTo(fImg, { yPercent: -8 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '#founder', start: 'top bottom', end: 'bottom top', scrub: true } });
  $$('.case').forEach(c => ScrollTrigger.create({ trigger: c, start: 'top 85%', once: true, onEnter: () => c.classList.add('in') }));
  addEventListener('load', () => ScrollTrigger.refresh());
})();
