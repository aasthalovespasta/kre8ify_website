/* Kreatify site script. Plain JavaScript, no libraries.
   Each block checks that its markup exists, so the same file works on every page. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav: solid background after scrolling, mobile menu -------------------- */
  const nav = $('[data-nav]');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('.nav__menu');
  const sheet = $('#sheet');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    sheet.hidden = !open;
    nav.classList.toggle('is-scrolled', open || scrollY > 20);
  };
  menuBtn.addEventListener('click', () => setMenu(sheet.hidden));
  $$('a', sheet).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { setMenu(false); menuBtn.focus(); } });

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
