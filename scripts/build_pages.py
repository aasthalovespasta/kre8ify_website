"""
Builds every page in site/ from scripts/content.py.
Run:  python3 scripts/build_pages.py

You normally only edit content.py. This file holds the HTML templates:
  page frame      head(), nav(), footer(), section_head()
  illustrations   art(): the small product screens on service cards
  home page       hero, client logos, problem, services, process, tools, work,
                  testimonials, founder, FAQ, booking
  service pages   page hero, who it is for, steps, tools, what you get, numbers, next step

Styles live in site/assets/css/site.css and behaviour in site/assets/js/site.js.
Data attributes in the HTML (data-reveal, data-tap, data-fold ...) are what the script hooks into.
"""
import html, os, re, sys

sys.path.insert(0, os.path.dirname(__file__))
from content import *  # noqa: E402,F403

OUT = os.path.join(os.path.dirname(__file__), '..', 'site')
esc = html.escape
ARROW = '<span class="arr" aria-hidden="true">→</span>'
HOME = 'index.html'


def wa():
    """WhatsApp chat link for Krish."""
    return f"https://wa.me/{SITE['whatsapp']}"


# ---------------------------------------------------------------- small icons (Lucide style, 24px)
ICONS = {
    'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    'case': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    'send': '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    'quote': '<path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6"/>',
    'rocket': '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4-8 10-9 0 6-4 9-8 10z"/><circle cx="15" cy="8" r="1.5"/>',
    'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    'camera': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
    'users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2 .6 3.5 2.3 3.5 5.2"/>',
    'compass': '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    'pen': '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    'news': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    'chat': '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
    'userplus': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M19 8v6M16 11h6"/>',
    'calendar': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    'building': '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
    'palette': '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    'pitch': '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
    'people': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2 .6 3.5 2.3 3.5 5.2"/>',
    'check': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>',
    'reel': '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 8h18M8 3l3 5M14 3l3 5M10 12v5l4-2.5z"/>',
    'clapper': '<path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 9l-1-4 15-3 1 4"/><path d="m8 4 2 4M13 3l2 4"/>',
    'reply': '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v3"/>',
    'chart': '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>',
}


def icon(name):
    """Inline SVG icon by name from ICONS."""
    return f'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>'


def words(text):
    """Wrap each word of a heading so it can rise into view; keeps <em> tags intact."""
    out, n = [], 0
    for part in re.split(r'(<[^>]+>)', text):
        if part.startswith('<'):
            out.append(part)
            continue
        for w in re.split(r'(\s+)', part):
            if not w:
                continue
            if w.isspace():
                out.append(w)
            else:
                out.append(f'<span class="w"><span style="--w:{n}">{w}</span></span>')
                n += 1
    return ''.join(out)


# ---------------------------------------------------------------- page frame
def head(title, desc):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0a0a0b">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap">
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''


CAL = f'href="{SITE["calendly"]}" target="_blank" rel="noopener"'  # every meeting button opens Calendly in a new tab


def fold_btn(label):
    """Button that opens a folded block. Only shown on phones; on bigger screens the block is always open."""
    return f'<button class="fold__btn" type="button" aria-expanded="false" data-fold-btn><span>{label}</span><i aria-hidden="true"></i></button>'


SERVICE_ICONS = {'branding': 'user', 'launch': 'rocket', 'gtm': 'target', 'social': 'camera', 'creators': 'users'}


def nav(current):
    """Top bar: logo, Services (opens a panel), page links, WhatsApp and Book a call.
    On phones the same links open in a full-screen menu."""
    pre = '' if current == HOME else HOME
    links = [(pre + '#work', 'Our work', 'work'), (pre + '#founder', 'About Krish', 'founder'), (pre + '#faq', 'FAQ', 'faq')]
    on_service = current != HOME
    bar_links = ''.join(f'<a class="nav__link" href="{h}" data-section="{k}">{t}</a>' for h, t, k in links)

    def service_items(cls):
        return ''.join(f'''<li><a class="{cls}" href="{s['page']}"{' aria-current="page"' if s['page'] == current else ''}><span class="{cls}-icon">{icon(SERVICE_ICONS[s['art']])}</span><span><b>{s['title']}</b><small>{esc(s['desc'])}</small></span></a></li>''' for s in SERVICES)

    chevron = '<svg class="nav__chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>'
    return f'''<header class="nav" data-nav>
  <div class="wrap nav__bar">
    <a class="logo" href="{HOME}" aria-label="{SITE['name']} home">{SITE['name']}<i>.</i></a>
    <nav class="nav__links" aria-label="Main">
      <button class="nav__link nav__drop{' is-active' if on_service else ''}" type="button" aria-expanded="false" aria-controls="mega" data-mega-toggle>Services {chevron}</button>
      {bar_links}
    </nav>
    <div class="nav__end">
      <a class="nav__wa" href="{wa()}" aria-label="Message Krish on WhatsApp"><img src="assets/logos/whatsapp.svg" alt="" width="20" height="20"></a>
      <a class="btn btn--primary btn--sm" {CAL}>Book a call {ARROW}</a>
    </div>
    <button class="nav__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Open menu" data-sheet-toggle><span></span><span></span></button>
  </div>

  <!-- services panel (desktop) -->
  <div class="mega" id="mega" hidden>
    <div class="wrap mega__in">
      <ul class="mega__list">{service_items('mega__item')}</ul>
      <div class="mega__side">
        <p class="label label--light">{SERVICES_CTA['title']}</p>
        <p>{SERVICES_CTA['text']}</p>
        <a class="btn btn--primary btn--sm" {CAL}>{SERVICES_CTA['button']} {ARROW}</a>
        <a class="mega__all" href="{pre}#services">See all services {ARROW}</a>
      </div>
    </div>
  </div>

  <!-- full-screen menu (phones) -->
  <div class="sheet" id="sheet" hidden>
    <p class="label label--light">Services</p>
    <ul class="sheet__services">{service_items('sheet__item')}</ul>
    <nav class="sheet__links" aria-label="Sections">{''.join(f'<a href="{h}">{t}</a>' for h, t, k in links)}</nav>
    <div class="sheet__ctas"><a class="btn btn--primary" {CAL}>Book a call {ARROW}</a><a class="btn btn--ghost" href="{wa()}">WhatsApp Krish</a></div>
  </div>
</header>
'''


def footer():
    services = ''.join(f'<a href="{s["page"]}">{s["title"]}</a>' for s in SERVICES)
    return f'''<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      <div>
        <a class="logo" href="{HOME}">{SITE['name']}<i>.</i></a>
        <p class="foot__note">Founder-led growth studio, led by {SITE['founder']}. {SITE['city']}, India.</p>
      </div>
      <nav class="foot__col" aria-label="Services"><p class="label">Services</p>{services}</nav>
      <div class="foot__col"><p class="label">Contact</p><a href="{wa()}">WhatsApp {SITE['whatsapp_label']}</a><a href="{SITE['linkedin']}">LinkedIn {SITE['linkedin_label']}</a><a {CAL}>Book a call</a></div>
    </div>
    <p class="foot__word" aria-hidden="true" data-spot>{SITE['name']}</p>
    <p class="foot__legal">© {SITE['year']} {SITE['name']}</p>
  </div>
</footer>
<script src="assets/js/site.js" defer></script>
</body>
</html>
'''


def section_head(label, title, lead=''):
    """Small label, big heading and an optional lead line at the top of a section."""
    lead_html = f'<p class="lead">{lead}</p>' if lead else ''
    return f'''<div class="head" data-reveal>
      <p class="label">{label}</p>
      <h2 class="h2 words">{words(title)}</h2>
      {lead_html}
    </div>'''


# ---------------------------------------------------------------- service illustrations (HTML + CSS, animate when in view)
def art(kind):
    """Illustration for a service: 'branding', 'launch', 'gtm', 'social' or 'creators'."""
    if kind == 'branding':
        inner = '''<div class="mini mini--post a1">
        <div class="mini__who"><img src="assets/img/krish-face.webp" alt="" width="32" height="32"><span><b>Krish Bhatia</b><small>Founder · 2d</small></span></div>
        <p>I lost my first big client because I replied four days late. Here is what I changed.</p>
        <div class="mini__stats"><span><b>12,480</b> views</span><span><b>214</b> reactions</span></div>
      </div>
      <div class="chip chip--sky a2">+214 followers this week</div>
      <svg class="spark a3" viewBox="0 0 160 60" aria-hidden="true"><path d="M2 56 C40 54 60 44 84 32 S130 8 158 4"/></svg>'''
    elif kind == 'launch':
        inner = '''<div class="mini mini--check a1">
        <p class="mini__label">Your brand, step by step</p>
        <ul><li>Company registered</li><li>Name and logo</li><li>Offer in one line</li><li>First client signed</li></ul>
        <div class="bar"><i></i></div>
      </div>
      <div class="chip chip--cream a2">Week 7 · first client</div>'''
    elif kind == 'gtm':
        inner = '''<div class="mini mini--leads a1">
        <p class="mini__label">Buyers worth talking to</p>
        <div class="lead-row"><i>SL</i><span><b>Saffron Labs</b><small>Hired a VP Sales</small></span><em class="pill pill--done">Meeting booked</em></div>
        <div class="lead-row"><i>NB</i><span><b>Northbay</b><small>Visited your site</small></span><em class="pill pill--mid">Replied</em></div>
        <div class="lead-row"><i>VR</i><span><b>Verve Retail</b><small>Raised a seed round</small></span><em class="pill">Message sent</em></div>
      </div>
      <div class="chip chip--cream a2">Thu 4:30 pm · call booked</div>'''
    elif kind == 'social':
        inner = '''<div class="mini mini--profile a1">
        <div class="ig"><i class="ig__av">K</i><span><b>16</b><small>posts</small></span><span><b>2.4K</b><small>followers</small></span><span><b>48</b><small>DMs</small></span></div>
        <div class="ig__grid"><i></i><i class="is-reel"></i><i></i><i></i><i></i><i class="is-reel"></i></div>
      </div>
      <div class="chip chip--sky a2">Reel · 18K plays</div>'''
    else:  # creators
        inner = '''<div class="mini mini--creators a1">
        <p class="mini__label">Campaign · India launch</p>
        <div class="faces"><i>AR</i><i>MK</i><i>SN</i><i>PV</i><i>+36</i></div>
        <b class="mini__big">40+ creators</b>
        <div class="bar"><i></i></div>
      </div>
      <div class="chip chip--sky a2">Content approved · going live</div>'''
    return f'<div class="art art--{kind}" aria-hidden="true">\n      {inner}\n    </div>'


# ---------------------------------------------------------------- home page sections
def hero():
    """Home hero: headline and buttons on the left, Krish's photo with floating proof cards on the right."""
    li, cal = HERO['chips']
    feed = ''.join(f'<li><img src="assets/logos/{ic}" alt="" width="20" height="20"><span><b>{esc(t)}</b><small>{esc(s)}</small></span></li>' for ic, t, s in HERO['feed'])
    return f'''<section class="hero" id="top" data-hero>
  <div class="hero__bg" aria-hidden="true"><i class="orb orb--1"></i><i class="orb orb--2"></i><i class="orb orb--3"></i><span class="hero__dots"></span></div>
  <div class="wrap hero__grid">
    <div class="hero__copy" data-scroll>
      <p class="eyebrow rise" style="--i:0"><span class="pulse"></span>{HERO['eyebrow']}</p>
      <h1 class="h1 words">{words(HERO['title'])}</h1>
      <p class="hero__lead rise" style="--i:4">{HERO['lead']}</p>
      <div class="hero__ctas rise" style="--i:5">
        <a class="btn btn--primary magnetic" {CAL}>{HERO['cta']} {ARROW}</a>
        <a class="btn btn--ghost" href="#services">{HERO['cta2']}</a>
      </div>
    </div>

    <!-- founder stage: duotone photo that turns to colour under the cursor, floating proof cards -->
    <div class="stage" data-stage>
      <div class="stage__arch" data-tilt>
        <div class="stage__photo" data-lens>
          <img class="ph ph--duo" src="assets/img/krish-hero.webp" alt="" width="770" height="1013" fetchpriority="high">
          <img class="ph ph--color" src="assets/img/krish-hero.webp" alt="{HERO['photo_alt']}" width="770" height="1013">
          <span class="stage__hint" aria-hidden="true">Move here to see Krish in colour</span>
        </div>
        <p class="stage__name"><b>{SITE['founder']}</b><span>Founder, on every account</span></p>
      </div>
      <div class="float float--li" data-depth="1.6" aria-hidden="true">
        <p class="float__h"><img src="assets/logos/{li['icon']}" alt="" width="18" height="18">{li['label']}</p>
        <b>{li['value']}</b>
        <svg viewBox="0 0 160 40" preserveAspectRatio="none"><path d="M0 38 C40 37 70 32 95 22 S140 4 160 2"/></svg>
      </div>
      <div class="float float--cal" data-depth="2.4" aria-hidden="true">
        <p class="float__h"><img src="assets/logos/{cal['icon']}" alt="" width="18" height="18">{cal['label']}</p>
        <b>{cal['value']}</b>
      </div>
      <div class="sticker" data-depth="3" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="sticker-ring" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0"/></defs><text><textPath href="#sticker-ring">{HERO['sticker'] * 2}</textPath></text></svg>
        <b>0→1</b>
      </div>
      <ol class="feed" data-feed data-depth="1.1" aria-hidden="true">{feed}</ol>
    </div>
  </div>
</section>
'''


def stars():
    """The client logos, large, straight after the hero: the main proof on the page."""
    tiles = ''.join(
        f'<li class="star" data-card><div class="star__logo">'
        + (f'<img src="assets/clients/{logo}" alt="{esc(name)}" loading="lazy">' if logo else f'<span class="star__word">{esc(name)}</span>')
        + f'</div><p class="star__meta"><b>{esc(name)}</b><span>{esc(industry)}</span></p></li>'
        for name, logo, industry in CLIENTS)
    return f'''<section class="stars" id="clients">
  <div class="stars__glow" aria-hidden="true"></div>
  <div class="wrap">
    <div class="stars__head" data-reveal>
      <p class="label">{STARS['label']}</p>
      <h2 class="h2 stars__title words">{words(STARS['title'])}</h2>
    </div>
    <ul class="stars__grid">{tiles}</ul>
  </div>
</section>
'''


def band(text):
    """A row of big outlined words that slides sideways as you scroll."""
    return f'<div class="band" aria-hidden="true" data-scroll><p data-band>{esc(text * 3)}</p></div>\n'


def problem():
    """Six problem cards that fly into place as you scroll (on phones: tap a card to read it)."""
    # where each card starts before scrolling pulls it into place: x px, y px, rotation deg
    seeds = [(-70, 90, -9), (40, 150, 6), (90, 60, 11), (-40, -120, 7), (-70, -60, -12), (80, -140, -6)]
    cards = ''.join(f'''<article class="pcard" data-tap style="--sx:{sx};--sy:{sy};--sr:{sr}"><p class="pcard__tag">{i + 1:02d} · {esc(tag)}</p><h3>{esc(t)}</h3><p>{esc(p)}</p></article>'''
                    for i, ((tag, t, p), (sx, sy, sr)) in enumerate(zip(PROBLEM['cards'], seeds)))
    return f'''<section class="section section--paper tex" id="problem">
  <div class="wrap">
    {section_head(PROBLEM['label'], PROBLEM['title'], PROBLEM['lead'])}
    <div class="problem" data-inview data-scroll data-assemble>
      {cards}
      <div class="problem__hub" aria-hidden="true"><span>{PROBLEM['hub']}</span></div>
    </div>
  </div>
</section>
'''


def pillar_body(p):
    """What we do tiles, the monthly plan and who it is for. Used on the home page and on service pages."""
    tiles = ''.join(f'<li class="tile" data-tap data-reveal style="--d:{i * 60}ms"><span class="tile__icon">{icon(ic)}</span><h3>{esc(t)}</h3><p>{esc(d)}</p></li>' for i, (ic, t, d) in enumerate(p['tiles']))
    plan = ''.join(f'<li class="plan__item{" plan__item--hi" if i == len(p["plan"]) - 1 else ""}" data-reveal style="--d:{i * 60}ms"><b>{esc(n)}</b><small>{esc(f)}</small><span>{esc(w)}</span></li>' for i, (n, f, w) in enumerate(p['plan']))
    chips = ''.join(f'<li>{esc(c)}</li>' for c in p['built'])
    return f'''<div class="fold" data-fold>
    {fold_btn(f"What is included: {len(p['tiles'])} services and a monthly plan")}
    <div class="fold__body">
    <p class="label pillar__sub">What we do</p>
    <ul class="tiles">{tiles}</ul>
    <p class="label pillar__sub">What you get, every month</p>
    <ul class="plan">{plan}</ul>
    <div class="built" data-reveal><p class="label">Built for</p><ul class="built__list">{chips}</ul></div>
    </div>
    </div>'''


def pillar(p, i, tone):
    """One full section for a main service. tone is 'white', 'dark' or 'paper'."""
    return f'''<section class="section section--{tone} pillar{' tex' if tone != 'dark' else ' tex-dark'}" id="{p['id']}">
  <div class="wrap">
    <div class="pillar__head">
      <div data-reveal>
        <p class="label">{i + 1:02d} · {p['label']}</p>
        <h2 class="h2 words">{words(p['title'])}</h2>
        <p class="lead">{p['lead']}</p>
        <div class="hero__ctas"><a class="btn btn--primary" href="{p['page']}">See the full service {ARROW}</a><a class="btn btn--ghost" {CAL}>Book a call</a></div>
      </div>
      <div class="pillar__art" data-inview data-card>{art(p['art'])}</div>
    </div>
    {pillar_body(p)}
  </div>
</section>
'''


def services():
    """Intro with three jump cards, a full section per main service, then the add-ons."""
    jumps = ''.join(f'''<a class="jump" href="#{p['id']}" data-reveal data-card style="--d:{i * 80}ms">
        <span class="jump__icon">{icon(SERVICE_ICONS[p['art']])}</span>
        <small>{i + 1:02d}</small><b>{p['label']}</b><span class="jump__desc">{esc(SERVICES[i]['desc'])}</span>
        <span class="jump__more">What is included <span aria-hidden="true">↓</span></span>
      </a>''' for i, p in enumerate(PILLARS))
    intro = f'''<section class="section section--dark tex-dark" id="services">
  <div class="services__glow" aria-hidden="true"></div>
  <div class="wrap">
    {section_head(SERVICES_INTRO['label'], SERVICES_INTRO['title'], SERVICES_INTRO['lead'])}
    <div class="jumps">{jumps}</div>
  </div>
</section>
'''
    tones = ['white', 'dark', 'paper']
    pillars = ''.join(pillar(p, i, tones[i % 3]) for i, p in enumerate(PILLARS))
    return intro + pillars + addons()


def addons():
    """The add-on services (GTM engineering, influencer marketing) plus a 'not sure' card."""
    cards = []
    for i, s in enumerate(SERVICES[len(PILLARS):]):
        items = ''.join(f'<li><span>{j + 1:02d}</span>{esc(x)}</li>' for j, x in enumerate(s['items']))
        cards.append(f'''  <article class="svc" data-tap data-inview data-card>
    {art(s['art'])}
    <div class="svc__head"><h3 class="svc__title">{s['title']}</h3><span class="svc__num" aria-hidden="true">+</span></div>
    <p class="svc__desc">{s['desc']}</p>
    <ul class="svc__list">{items}</ul>
    <a class="svc__link" href="{s['page']}" aria-label="How {s['title']} works">How it works {ARROW}</a>
  </article>''')
    cta = f'''  <article class="svc svc--cta" data-inview>
    <h3 class="svc__title">{SERVICES_CTA['title']}</h3>
    <p class="svc__desc">{SERVICES_CTA['text']}</p>
    <a class="btn btn--primary" {CAL}>{SERVICES_CTA['button']} {ARROW}</a>
  </article>'''
    return f'''<section class="section section--dark tex-dark" id="addons">
  <div class="wrap">
    {section_head('Add-ons', 'When you are ready <em>to scale up.</em>', 'Two services we add once your brand is visible: a system that books meetings, and creators who spread the word.')}
    <div class="services services--3">
{chr(10).join(cards)}
{cta}
    </div>
  </div>
</section>
'''


def process():
    """How we work, in four steps (a vertical workflow on phones)."""
    steps = ''.join(f'<li style="--d:{i * 90}ms"><span class="process__n">{i + 1}</span><h3>{esc(t)}</h3><p>{esc(p)}</p></li>' for i, (t, p) in enumerate(PROCESS['steps']))
    return f'''<section class="section section--white" id="process">
  <div class="wrap">
    {section_head(PROCESS['label'], PROCESS['title'])}
    <ol class="process" data-inview data-scroll>{steps}</ol>
  </div>
</section>
'''


def work():
    """Results: one card per client with the headline number."""
    cards = ''.join(f'''<article class="case" data-tap data-reveal data-card style="--d:{i * 80}ms">
      <p class="case__tag">{esc(tag)}</p>
      <b class="case__fig">{esc(fig)}</b><p class="case__figlabel">{esc(lab)}</p>
      <h3>{esc(client)}</h3><p class="case__text">{esc(text)}</p>
    </article>''' for i, (tag, client, fig, lab, text) in enumerate(WORK['cases']))
    return f'''<section class="section section--dark tex-dark" id="work">
  <div class="wrap">
    {section_head(WORK['label'], WORK['title'])}
    <div class="cases">{cards}</div>
  </div>
</section>
'''


def testimonials():
    """One big quote with client tabs underneath; it moves on by itself."""
    if not TESTIMONIALS['items']:
        return ''
    def person(t):
        initials = ''.join(w[0] for w in t['name'].split()[:2]).upper()
        name = esc(t['name'])
        if t.get('linkedin'):
            name = f'<a href="{t["linkedin"]}" target="_blank" rel="noopener">{name}<img src="assets/logos/linkedin.svg" alt="LinkedIn profile" width="16" height="16"></a>'
        pic = (f'<img class="quote__face" src="assets/people/{t["photo"]}" alt="{esc(t["name"])}" width="56" height="56" loading="lazy">'
               if t.get('photo') else f'<i>{initials}</i>')
        return f'<figcaption>{pic}<span><b>{name}</b><small>{esc(t["role"])}</small></span></figcaption>'

    def face(t, size):
        initials = ''.join(w[0] for w in t['name'].split()[:2]).upper()
        if t.get('photo'):
            return f'<img class="tm__face" src="assets/people/{t["photo"]}" alt="" width="{size}" height="{size}" loading="lazy">'
        return f'<i class="tm__face tm__face--initials">{initials}</i>'

    items = TESTIMONIALS['items']
    total = len(items)
    # one large quote at a time; every quote stays in the page for search engines and screen readers
    slides = ''.join(f'''<figure class="tm__slide" role="tabpanel" id="tm-{i}" aria-labelledby="tmb-{i}"{'' if i == 0 else ' hidden'}>
        <div class="quote__top">{icon('quote')}{f'<span class="quote__tag">{esc(t["tag"])}</span>' if t.get('tag') else ''}</div>
        <blockquote>{esc(t['quote'])}</blockquote>
        {person(t)}
      </figure>''' for i, t in enumerate(items))
    tabs = ''.join(f'''<button class="tm__tab" type="button" role="tab" id="tmb-{i}" aria-controls="tm-{i}" aria-selected="{str(i == 0).lower()}"{'' if i == 0 else ' tabindex="-1"'}>
        {face(t, 56)}<span><b>{esc(t['name'])}</b><small>{esc(t['role'])}</small></span><i class="tm__bar" aria-hidden="true"></i>
      </button>''' for i, t in enumerate(items))
    return f'''<section class="section section--paper tex" id="testimonials">
  <div class="wrap">
    {section_head(TESTIMONIALS['label'], TESTIMONIALS['title'])}
    <div class="tm" data-tm data-reveal>
      <div class="tm__stage" data-card>
        <span class="tm__mark" aria-hidden="true">“</span>
        {slides}
        <div class="tm__controls">
          <button class="tm__arrow" type="button" data-tm-prev aria-label="Previous testimonial"><span aria-hidden="true">←</span></button>
          <p class="tm__count" aria-hidden="true"><b data-tm-n>01</b> / {total:02d}</p>
          <button class="tm__arrow" type="button" data-tm-next aria-label="Next testimonial"><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div class="tm__people" role="tablist" aria-label="Choose a client">{tabs}</div>
    </div>
  </div>
</section>
'''


def founder():
    """Krish's photo, numbers and a short note."""
    letter = ''.join(f'<p>{esc(p)}</p>' for p in FOUNDER['letter'])
    stats = ''.join(f'<div><dt>{esc(a)}</dt><dd>{esc(b)}</dd></div>' for a, b in FOUNDER['stats'])
    return f'''<section class="section section--white" id="founder">
  <div class="wrap founder">
    <figure class="founder__photo" data-reveal data-scroll>
      <img src="assets/img/krish.webp" alt="{SITE['founder']}, founder of {SITE['name']}" width="929" height="1280" loading="lazy">
      <figcaption><b>{SITE['founder']}</b><span>Founder · {SITE['city']}</span><dl>{stats}</dl></figcaption>
    </figure>
    <div>
      {section_head(FOUNDER['label'], FOUNDER['title'])}
      <div class="letter fold" data-fold data-reveal>{letter}<p class="letter__sign">{FOUNDER['sign']}</p>{fold_btn("Read Krish's full note")}</div>
    </div>
  </div>
</section>
'''


def faq(items, title='Questions <em>founders ask.</em>', tone='paper'):
    """Questions that open and close. items is a list of (question, answer)."""
    rows = ''.join(f'<details{" open" if i == 0 else ""}><summary>{esc(q)}<span class="plus" aria-hidden="true"></span></summary><p>{esc(a)}</p></details>' for i, (q, a) in enumerate(items))
    return f'''<section class="section section--{tone}" id="faq">
  <div class="wrap faq">
    {section_head('FAQ', title)}
    <div class="faq__list" data-reveal>{rows}</div>
  </div>
</section>
'''


def book():
    """Next step: Calendly button, contact links and a form that opens WhatsApp."""
    choices = ''.join(f'<label><input type="radio" name="stage" value="{esc(a)}, {esc(b)}"{" checked" if i == 0 else ""}><span><b>{esc(a)}</b><small>{esc(b)}</small></span></label>' for i, (a, b) in enumerate(BOOK['stages']))
    options = ''.join(f'<option>{esc(s["title"])}</option>' for s in SERVICES)
    return f'''<section class="section section--royal" id="book">
  <div class="wrap book">
    <div>
      {section_head(BOOK['label'], BOOK['title'], BOOK['lead'])}
      <div class="hero__ctas book__cal" data-reveal><a class="btn btn--primary" {CAL}>Book a 30-minute call {ARROW}</a></div>
      <ul class="book__contact" data-reveal>
        <li><span>WhatsApp</span><a href="{wa()}">{SITE['whatsapp_label']}</a></li>
        <li><span>LinkedIn</span><a href="{SITE['linkedin']}">{SITE['linkedin_label']}</a></li>
      </ul>
    </div>
    <div class="fold book__form" data-fold>
    {fold_btn('Prefer WhatsApp? Send your details')}
    <form class="form fold__body" data-form data-wa="{SITE['whatsapp']}" novalidate data-reveal>
      <fieldset>
        <legend>Where is your business today?</legend>
        <div class="form__choices">{choices}</div>
      </fieldset>
      <div class="field"><label for="f-service">What do you need help with?</label><select id="f-service" name="service"><option>Not sure yet</option>{options}</select></div>
      <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required aria-describedby="e-name"><p class="field__err" id="e-name" hidden>Add your name so Krish knows who he is talking to.</p></div>
      <div class="field"><label for="f-co">Your company or idea, in one line</label><input id="f-co" name="company" required aria-describedby="e-co"><p class="field__err" id="e-co" hidden>One line about the business is enough.</p></div>
      <button class="btn btn--primary btn--block" type="submit">Send to Krish on WhatsApp {ARROW}</button>
      <p class="form__note">Opens WhatsApp with your answers filled in. Krish replies within a working day.</p>
    </form>
    </div>
  </div>
</section>
'''


def home():
    """The home page, section by section, top to bottom."""
    body = hero() + stars() + problem() + band(BANDS[0]) + services() + process() + tools(home=True) + work() + testimonials() + founder() + faq(FAQ) + book()
    return (head(f"{SITE['name']}: we make founders impossible to ignore", HERO['lead'])
            + nav(HOME) + f'<main id="main">\n{body}</main>\n' + footer())


# ---------------------------------------------------------------- service page sections
def page_hero(p):
    return f'''<section class="phero" data-hero>
  <div class="hero__bg" aria-hidden="true"><i class="orb orb--1"></i><i class="orb orb--2"></i><i class="orb orb--3"></i><span class="hero__dots"></span></div>
  <div class="wrap phero__grid">
    <div data-scroll>
      <p class="crumb rise" style="--i:0"><a href="{HOME}#services">Services</a> / {esc(p['title'])}</p>
      <h1 class="h1 words">{words(p['h1'])}</h1>
      <p class="hero__lead rise" style="--i:2">{p['lead']}</p>
      <div class="hero__ctas rise" style="--i:3"><a class="btn btn--primary" {CAL}>Book a call with Krish {ARROW}</a><a class="btn btn--ghost" href="#how">How it works</a></div>
    </div>
    <div class="phero__art rise" style="--i:2" data-inview data-card>{art(p['art'])}</div>
  </div>
</section>
'''


def who(p):
    cards = ''.join(f'<li data-tap data-reveal style="--d:{i * 80}ms"><span class="who__icon">{icon(ic)}</span><h3>{esc(t)}</h3><p>{esc(d)}</p></li>' for i, (ic, t, d) in enumerate(p['who']))
    return f'''<section class="section section--white">
  <div class="wrap">
    {section_head('Who it is for', p['who_title'])}
    <ul class="who">{cards}</ul>
  </div>
</section>
'''


def steps(p):
    items = ''.join(f'<li class="step" data-step><span class="step__n">{i + 1:02d}</span><div><h3>{esc(t)}</h3><p>{esc(d)}</p><small>{esc(w)}</small></div></li>' for i, (t, d, w) in enumerate(p['steps']))
    return f'''<section class="section section--paper" id="how">
  <div class="wrap steps-wrap">
    <div class="steps-side">{section_head('How it works', p['steps_title'], p['steps_lead'])}</div>
    <ol class="steps">{items}</ol>
  </div>
</section>
'''


def tools(home=False):
    """Tool logos with filters. The GTM page also follows one lead through the system."""
    groups = [('all', 'All')] + TOOL_GROUPS
    chips = ''.join(f'<button type="button" class="filter{" is-on" if k == "all" else ""}" data-filter="{k}" aria-pressed="{str(k == "all").lower()}">{n}</button>' for k, n in groups)
    tiles = ''.join(f'<li class="tool" data-group="{g}"><img src="assets/logos/{f}" alt="" width="28" height="28" loading="lazy"><span>{esc(n)}</span></li>' for n, f, g in TOOLS)
    flow = ''.join(f'<li><span class="flow__icon"><img src="assets/logos/{f}" alt="" width="24" height="24" loading="lazy"></span><small>{esc(s)}</small><b>{esc(n)}</b><em>{esc(r)}</em></li>' for f, s, n, r in FLOW)
    if home:
        top = section_head(TOOLS_HOME['label'], TOOLS_HOME['title'], TOOLS_HOME['lead'])
        flow_block = ''
    else:
        top = section_head('The tools', f'{len(TOOLS)} tools, <em>set up in your name.</em>', 'We only use what your buyers need, set up on your own accounts. If we ever stop working together, everything keeps running.')
        flow_block = f'''<div class="flow" data-flow data-reveal>
      <p class="label label--light">Follow one lead through the system</p>
      <ol class="flow__track">{flow}</ol>
    </div>'''
    return f'''<section class="section section--{'paper tex' if home else 'white'}" id="tools">
  <div class="wrap">
    {top}
    <div class="filters" role="group" aria-label="Filter tools" data-reveal>{chips}</div>
    <div class="fold tools-fold" data-fold>
      <ul class="tools" data-tools>{tiles}</ul>
      {fold_btn(f'Show all {len(TOOLS)} tools')}
    </div>
    {flow_block}
  </div>
</section>
'''


def gets(p):
    cards = ''.join(f'<li data-tap data-reveal style="--d:{i * 60}ms"><h3>{esc(t)}</h3><p>{esc(d)}</p></li>' for i, (t, d) in enumerate(p['gets']))
    return f'''<section class="section section--dark">
  <div class="wrap">
    {section_head('What you get', p['gets_title'])}
    <ul class="gets">{cards}</ul>
  </div>
</section>
'''


def numbers(p):
    cards = ''.join(f'<li data-reveal style="--d:{i * 80}ms"><b>{esc(n)}</b><span>{esc(t)}</span></li>' for i, (n, t) in enumerate(p['numbers']))
    return f'''<section class="section section--white">
  <div class="wrap">
    {section_head('What to expect', 'The numbers <em>we work towards.</em>', 'These are targets we plan around, not promises. Your Monday report shows where you are against them.')}
    <ul class="numbers">{cards}</ul>
  </div>
</section>
'''


def next_services(current):
    links = ''.join(f'<a class="xlink" href="{s["page"]}"><b>{s["title"]}</b><span>{esc(s["desc"])}</span>{ARROW}</a>' for s in SERVICES if s['page'] != current)
    return f'''<section class="section section--royal">
  <div class="wrap">
    {section_head('Next step', 'Talk it through <em>with Krish.</em>', 'A 30-minute call. We look at where your business is today and tell you honestly what would help most.')}
    <div class="hero__ctas" data-reveal><a class="btn btn--primary" {CAL}>Book a 30-minute call {ARROW}</a><a class="btn btn--ghost" href="{wa()}">WhatsApp Krish</a></div>
    <p class="label label--light xlinks__label">Other services</p>
    <div class="xlinks">{links}</div>
  </div>
</section>
'''


def included(pl):
    return f'''<section class="section section--dark tex-dark pillar" id="included">
  <div class="wrap">
    {section_head("What is included", pl['title'], pl['lead'])}
    {pillar_body(pl)}
  </div>
</section>
'''


def service_page(name, p):
    """A service page. Main services repeat their full listing from the home page."""
    pl = next((x for x in PILLARS if x['id'] == p.get('pillar')), None)
    questions = faq(p['faq'], f"Questions about <em>{p['title'].lower()}.</em>")
    if pl:  # main services: the full listing comes first, like the home page
        body = page_hero(p) + included(pl) + who(p) + steps(p) + numbers(p) + questions + next_services(name)
    else:
        body = page_hero(p) + who(p) + steps(p) + (tools() if p.get('tools') else '') + gets(p) + numbers(p) + questions + next_services(name)
    return head(f"{p['title']} | {SITE['name']}", p['desc']) + nav(name) + f'<main id="main">\n{body}</main>\n' + footer()


# ---------------------------------------------------------------- write files
if __name__ == '__main__':
    files = {HOME: home(), **{n: service_page(n, p) for n, p in PAGES.items()}}
    for name, text in files.items():
        if '—' in text or '–' in text:
            raise SystemExit(f'{name}: remove long dashes from content.py')
        with open(os.path.join(OUT, name), 'w') as f:
            f.write(text)
        print('built', name)
