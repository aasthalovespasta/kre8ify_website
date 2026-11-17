"""
Builds every page in site/ from scripts/content.py.
Run:  python3 scripts/build_pages.py

You normally only edit content.py. This file holds the HTML templates.
"""
import html, os, re, sys

sys.path.insert(0, os.path.dirname(__file__))
from content import *  # noqa: E402,F403

OUT = os.path.join(os.path.dirname(__file__), '..', 'site')
esc = html.escape
ARROW = '<span class="arr" aria-hidden="true">→</span>'
HOME = 'index.html'


def wa(text=''):
    return f"https://wa.me/{SITE['whatsapp']}" + (f"?text={text}" if text else '')


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
}


def icon(name):
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
<meta name="theme-color" content="#021526">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,300..400&display=swap">
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''


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
      <a class="btn btn--primary btn--sm" href="{pre}#book">Book a call {ARROW}</a>
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
        <a class="btn btn--primary btn--sm" href="{pre}#book">{SERVICES_CTA['button']} {ARROW}</a>
        <a class="mega__all" href="{pre}#services">See all services {ARROW}</a>
      </div>
    </div>
  </div>

  <!-- full-screen menu (phones) -->
  <div class="sheet" id="sheet" hidden>
    <p class="label label--light">Services</p>
    <ul class="sheet__services">{service_items('sheet__item')}</ul>
    <nav class="sheet__links" aria-label="Sections">{''.join(f'<a href="{h}">{t}</a>' for h, t, k in links)}</nav>
    <div class="sheet__ctas"><a class="btn btn--primary" href="{pre}#book">Book a call {ARROW}</a><a class="btn btn--ghost" href="{wa()}">WhatsApp Krish</a></div>
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
      <div class="foot__col"><p class="label">Contact</p><a href="{wa()}">WhatsApp {SITE['whatsapp_label']}</a><a href="{SITE['linkedin']}">LinkedIn {SITE['linkedin_label']}</a><a href="{HOME}#book">Book a call</a></div>
    </div>
    <p class="foot__word" aria-hidden="true" data-spot>{SITE['name']}</p>
    <p class="foot__legal">© {SITE['year']} {SITE['name']}</p>
  </div>
</footer>
<script src="assets/js/site.js" defer></script>
</body>
</html>
'''


def section_head(label, title, lead='', center=False):
    lead_html = f'<p class="lead">{lead}</p>' if lead else ''
    return f'''<div class="head{' head--center' if center else ''}" data-reveal>
      <p class="label">{label}</p>
      <h2 class="h2 words">{words(title)}</h2>
      {lead_html}
    </div>'''


# ---------------------------------------------------------------- service illustrations (HTML + CSS, animate when in view)
def art(kind):
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
def client_tiles(hidden=False):
    """One tile per client: the logo when we have it, otherwise the name."""
    attr = ' aria-hidden="true"' if hidden else ''
    tiles = []
    for name, logo in CLIENTS:
        inner = f'<img src="assets/clients/{logo}" alt="{"" if hidden else esc(name)}" loading="lazy">' if logo else f'<span>{esc(name)}</span>'
        tiles.append(f'<li class="client"{attr}>{inner}</li>')
    return ''.join(tiles)


def hero():
    li, cal = HERO['chips']
    feed = ''.join(f'<li><img src="assets/logos/{ic}" alt="" width="20" height="20"><span><b>{esc(t)}</b><small>{esc(s)}</small></span></li>' for ic, t, s in HERO['feed'])
    loop = client_tiles() + client_tiles(hidden=True) + client_tiles(hidden=True)
    return f'''<section class="hero" id="top" data-hero>
  <div class="hero__bg" aria-hidden="true"><i class="orb orb--1"></i><i class="orb orb--2"></i><i class="orb orb--3"></i><span class="hero__dots"></span></div>
  <div class="wrap hero__grid">
    <div class="hero__copy" data-scroll>
      <p class="eyebrow rise" style="--i:0"><span class="pulse"></span>{HERO['eyebrow']}</p>
      <h1 class="h1 words">{words(HERO['title'])}</h1>
      <p class="hero__lead rise" style="--i:4">{HERO['lead']}</p>
      <div class="hero__ctas rise" style="--i:5">
        <a class="btn btn--primary magnetic" href="#book">{HERO['cta']} {ARROW}</a>
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

  <div class="logos rise" style="--i:6">
    <p class="label label--light">{CLIENTS_TITLE}</p>
    <div class="logos__track"><ul class="logos__row">{loop}</ul></div>
  </div>
</section>
'''


def band(text):
    """A row of big outlined words that slides sideways as you scroll."""
    return f'<div class="band" aria-hidden="true" data-scroll><p data-band>{esc(text * 3)}</p></div>\n'


def problem():
    # where each card starts before scrolling pulls it into place: x px, y px, rotation deg
    seeds = [(-70, 90, -9), (40, 150, 6), (90, 60, 11), (-40, -120, 7), (-70, -60, -12), (80, -140, -6)]
    cards = ''.join(f'''<article class="pcard" style="--sx:{sx};--sy:{sy};--sr:{sr}"><p class="pcard__tag">{i + 1:02d} · {esc(tag)}</p><h3>{esc(t)}</h3><p>{esc(p)}</p></article>'''
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


def services():
    cards = []
    for i, s in enumerate(SERVICES):
        items = ''.join(f'<li><span>{j + 1:02d}</span>{esc(x)}</li>' for j, x in enumerate(s['items']))
        cards.append(f'''  <article class="svc" data-inview data-card>
    {art(s['art'])}
    <div class="svc__head"><h3 class="svc__title">{s['title']}</h3><span class="svc__num" aria-hidden="true">{i + 1:02d}</span></div>
    <p class="svc__desc">{s['desc']}</p>
    <ul class="svc__list">{items}</ul>
    <a class="svc__link" href="{s['page']}" aria-label="How {s['title']} works">How it works {ARROW}</a>
  </article>''')
    cta = f'''  <article class="svc svc--cta" data-inview>
    <h3 class="svc__title">{SERVICES_CTA['title']}</h3>
    <p class="svc__desc">{SERVICES_CTA['text']}</p>
    <a class="btn btn--primary" href="#book">{SERVICES_CTA['button']} {ARROW}</a>
  </article>'''
    return f'''<section class="section section--dark tex-dark" id="services">
  <div class="services__glow" aria-hidden="true"></div>
  <div class="wrap">
    {section_head(SERVICES_INTRO['label'], SERVICES_INTRO['title'], SERVICES_INTRO['lead'])}
    <div class="services">
{chr(10).join(cards)}
{cta}
    </div>
  </div>
</section>
'''


def process():
    steps = ''.join(f'<li style="--d:{i * 90}ms"><span class="process__n">{i + 1}</span><h3>{esc(t)}</h3><p>{esc(p)}</p></li>' for i, (t, p) in enumerate(PROCESS['steps']))
    return f'''<section class="section section--white" id="process">
  <div class="wrap">
    {section_head(PROCESS['label'], PROCESS['title'])}
    <ol class="process" data-inview data-scroll>{steps}</ol>
  </div>
</section>
'''


def work():
    cards = ''.join(f'''<article class="case" data-reveal data-card style="--d:{i * 80}ms">
      <p class="case__tag">{esc(tag)}</p>
      <b class="case__fig">{esc(fig)}</b><p class="case__figlabel">{esc(lab)}</p>
      <h3>{esc(client)}</h3><p class="case__text">{esc(text)}</p>
    </article>''' for i, (tag, client, fig, lab, text) in enumerate(WORK['cases']))
    return f'''<section class="section section--dark tex-dark" id="work">
  <div class="wrap">
    {section_head(WORK['label'], WORK['title'])}
    <div class="cases">{cards}</div>
    <ul class="logo-wall" data-reveal>{client_tiles()}</ul>
  </div>
</section>
'''


def testimonials():
    if not TESTIMONIALS['items']:
        return ''
    cards = ''.join(f'''<figure class="quote" data-reveal data-card style="--d:{i * 80}ms">
      {icon('quote')}
      <blockquote>{esc(t['quote'])}</blockquote>
      <figcaption><i>{esc(t['name'].strip('[')[:1])}</i><span><b>{esc(t['name'])}</b><small>{esc(t['role'])}</small></span></figcaption>
    </figure>''' for i, t in enumerate(TESTIMONIALS['items']))
    return f'''<section class="section section--paper tex" id="testimonials">
  <div class="wrap">
    {section_head(TESTIMONIALS['label'], TESTIMONIALS['title'])}
    <div class="quotes">{cards}</div>
  </div>
</section>
'''


def founder():
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
      <div class="letter" data-reveal>{letter}<p class="letter__sign">{FOUNDER['sign']}</p></div>
    </div>
  </div>
</section>
'''


def faq(items, title='Questions <em>founders ask.</em>', tone='paper'):
    rows = ''.join(f'<details{" open" if i == 0 else ""}><summary>{esc(q)}<span class="plus" aria-hidden="true"></span></summary><p>{esc(a)}</p></details>' for i, (q, a) in enumerate(items))
    return f'''<section class="section section--{tone}" id="faq">
  <div class="wrap faq">
    {section_head('FAQ', title)}
    <div class="faq__list" data-reveal>{rows}</div>
  </div>
</section>
'''


def book():
    choices = ''.join(f'<label><input type="radio" name="stage" value="{esc(a)}, {esc(b)}"{" checked" if i == 0 else ""}><span><b>{esc(a)}</b><small>{esc(b)}</small></span></label>' for i, (a, b) in enumerate(BOOK['stages']))
    options = ''.join(f'<option>{esc(s["title"])}</option>' for s in SERVICES)
    return f'''<section class="section section--royal" id="book">
  <div class="wrap book">
    <div>
      {section_head(BOOK['label'], BOOK['title'], BOOK['lead'])}
      <ul class="book__contact" data-reveal>
        <li><span>WhatsApp</span><a href="{wa()}">{SITE['whatsapp_label']}</a></li>
        <li><span>LinkedIn</span><a href="{SITE['linkedin']}">{SITE['linkedin_label']}</a></li>
      </ul>
    </div>
    <form class="form" data-form data-wa="{SITE['whatsapp']}" novalidate data-reveal>
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
</section>
'''


def home():
    body = hero() + problem() + band(BANDS[0]) + services() + process() + work() + testimonials() + founder() + faq(FAQ) + book()
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
      <div class="hero__ctas rise" style="--i:3"><a class="btn btn--primary" href="{HOME}#book">Book a call with Krish {ARROW}</a><a class="btn btn--ghost" href="#how">How it works</a></div>
    </div>
    <div class="phero__art rise" style="--i:2" data-inview data-card>{art(p['art'])}</div>
  </div>
</section>
'''


def who(p):
    cards = ''.join(f'<li data-reveal style="--d:{i * 80}ms"><span class="who__icon">{icon(ic)}</span><h3>{esc(t)}</h3><p>{esc(d)}</p></li>' for i, (ic, t, d) in enumerate(p['who']))
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


def tools():
    groups = [('all', 'All')] + TOOL_GROUPS
    chips = ''.join(f'<button type="button" class="filter{" is-on" if k == "all" else ""}" data-filter="{k}" aria-pressed="{str(k == "all").lower()}">{n}</button>' for k, n in groups)
    tiles = ''.join(f'<li class="tool" data-group="{g}"><img src="assets/logos/{f}" alt="" width="28" height="28" loading="lazy"><span>{esc(n)}</span></li>' for n, f, g in TOOLS)
    flow = ''.join(f'<li><span class="flow__icon"><img src="assets/logos/{f}" alt="" width="24" height="24" loading="lazy"></span><small>{esc(s)}</small><b>{esc(n)}</b><em>{esc(r)}</em></li>' for f, s, n, r in FLOW)
    return f'''<section class="section section--white" id="tools">
  <div class="wrap">
    {section_head('The tools', f'{len(TOOLS)} tools, <em>set up in your name.</em>', 'We only use what your buyers need, set up on your own accounts. If we ever stop working together, everything keeps running.')}
    <div class="filters" role="group" aria-label="Filter tools" data-reveal>{chips}</div>
    <ul class="tools" data-tools>{tiles}</ul>
    <div class="flow" data-flow data-reveal>
      <p class="label label--light">Follow one lead through the system</p>
      <ol class="flow__track">{flow}</ol>
    </div>
  </div>
</section>
'''


def gets(p):
    cards = ''.join(f'<li data-reveal style="--d:{i * 60}ms"><h3>{esc(t)}</h3><p>{esc(d)}</p></li>' for i, (t, d) in enumerate(p['gets']))
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
    <div class="hero__ctas" data-reveal><a class="btn btn--primary" href="{HOME}#book">Book a 30-minute call {ARROW}</a><a class="btn btn--ghost" href="{wa()}">WhatsApp Krish</a></div>
    <p class="label label--light xlinks__label">Other services</p>
    <div class="xlinks">{links}</div>
  </div>
</section>
'''


def service_page(name, p):
    body = page_hero(p) + who(p) + steps(p) + (tools() if p.get('tools') else '') + gets(p) + numbers(p) + faq(p['faq'], f"Questions about <em>{p['title'].lower()}.</em>") + next_services(name)
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
