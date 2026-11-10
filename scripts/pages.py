"""Builds the static pages in site/ from shared pieces (nav, footer, tool stack).
Run: python3 scripts/pages.py   (then npm run build copies site/ to dist/)."""
import html, os

ROOT = os.path.join(os.path.dirname(__file__), '..', 'site')
e = html.escape
ARR = '<span class="arr" aria-hidden="true">→</span>'

# ---------------------------------------------------------------- shared data
CATS = [('sig', 'Signals and data'), ('out', 'Outreach'), ('auto', 'Automation'), ('ai', 'AI'), ('crm', 'CRM and ops'), ('meet', 'Meetings'), ('brand', 'Content and docs')]
CN = dict(CATS)
TOOLS = [
 ('LinkedIn Sales Navigator', 'linkedin.svg', 'sig', 'Finds companies that just hired, raised money or posted about the problem you solve.'),
 ('Apollo', 'apollo.svg', 'sig', 'Verified work emails and phone numbers for the people who decide.'),
 ('Clay', 'clay.webp', 'sig', 'Adds company details from dozens of sources before anyone writes a message.'),
 ('PhantomBuster', 'phantombuster.svg', 'sig', 'Collects people who engage with posts and people who change jobs.'),
 ('Apify', 'apify.svg', 'sig', 'Turns directories, maps and job boards into clean lists.'),
 ('Perplexity', 'perplexity.svg', 'sig', 'Quick research on each company, so the first line is about them.'),
 ('Smartlead', 'smartlead.webp', 'out', 'Sends email from warmed inboxes and keeps every reply in one place.'),
 ('Instantly', 'instantly.webp', 'out', 'Rotates inboxes and checks delivery so emails land in the main inbox.'),
 ('lemlist', 'lemlist.webp', 'out', 'Email, LinkedIn and call steps in one sequence.'),
 ('HeyReach', 'heyreach.webp', 'out', 'LinkedIn outreach from more than one profile, within safe limits.'),
 ('Gmail', 'gmail.svg', 'out', 'Replies land in your own inbox, under your own name.'),
 ('WhatsApp Business', 'whatsapp.svg', 'out', 'Follow-ups where Indian buyers actually reply.'),
 ('n8n', 'n8n.svg', 'auto', 'Our main automation tool. Self-hosted, so your data stays with you.'),
 ('Make', 'make.svg', 'auto', 'Visual automations your team can read and change.'),
 ('Zapier', 'zapier.svg', 'auto', 'Quick connections between apps you already use.'),
 ('OpenAI', 'openai.svg', 'ai', 'Sorts replies by intent and drafts the first answer.'),
 ('Claude', 'claude.svg', 'ai', 'Writes in your voice, using your own calls and posts.'),
 ('Gemini', 'gemini.svg', 'ai', 'Summarises calls and documents inside Google Workspace.'),
 ('HubSpot', 'hubspot.svg', 'crm', 'Your sales pipeline, with every message logged.'),
 ('Zoho CRM', 'zoho.svg', 'crm', 'For teams that already run on Zoho.'),
 ('Notion', 'notion.svg', 'crm', 'Playbooks, processes and your content calendar.'),
 ('Airtable', 'airtable.svg', 'crm', 'Lead tables and content plans your team can filter.'),
 ('Google Sheets', 'sheets.svg', 'crm', 'The weekly report, in a format you already know.'),
 ('Slack', 'slack.svg', 'crm', 'A ping the moment a good lead replies.'),
 ('Calendly', 'calendly.svg', 'meet', 'A booking link in every positive reply.'),
 ('Google Calendar', 'gcal.svg', 'meet', 'Meetings land on your calendar with notes attached.'),
 ('Google Meet', 'meet.svg', 'meet', 'Calls on the link your buyer already uses.'),
 ('Zoom', 'zoom.svg', 'meet', 'For buyers who prefer Zoom.'),
 ('Loom', 'loom.svg', 'meet', 'Short personal videos that get replies.'),
 ('Canva', 'canva.svg', 'brand', 'Carousels and post templates in your brand.'),
 ('Figma', 'figma.svg', 'brand', 'Brand kit and landing pages.'),
 ('Typeform', 'typeform.svg', 'brand', 'Forms that qualify leads before the call.'),
 ('Google Docs', 'docs.svg', 'brand', 'Proposals and onboarding documents, templated.'),
]
HZ = [
 ('personal-branding.html', 'Personal branding', 'Get known by the people who buy'),
 ('gtm-engineering.html', 'GTM engineering', 'Reach the right buyers at the right time'),
 ('business-development.html', '0 to 1 business', 'Turn an idea into a business that runs'),
]


def head(title, desc, page):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#021526">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js');try{{if(sessionStorage.getItem('k-intro'))document.documentElement.classList.add('no-intro')}}catch(e){{}}</script>
</head>
<body data-page="{page}">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><i></i></div>
<canvas class="cursor-grid" aria-hidden="true"></canvas>
'''


def nav(page):
    home = '' if page == 'home' else 'index.html'
    links = [(h, n) for h, n, _ in HZ] + [(home + '#founder', 'Founder'), (home + '#faq', 'FAQ')]
    a = ''.join(f'<a href="{h}"{" aria-current=page" if h.startswith(page) else ""}>{n}</a>' for h, n in links)
    return f'''<header class="nav" data-nav>
  <div class="wrap nav__bar">
    <a class="logo" href="index.html" aria-label="Kreatify home">Kreatify<i>.</i></a>
    <nav class="nav__links" aria-label="Main">{a}</nav>
    <div class="nav__status mono" aria-hidden="true"><span class="dot"></span><span data-clock>New Delhi</span></div>
    <a class="btn btn--cream btn--sm magnetic" href="{home}#book">Book a call {ARR}</a>
    <button class="nav__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Open menu"><span></span><span></span></button>
  </div>
  <div class="sheet" id="sheet" hidden>
    {a}<a href="{home}#book" class="btn btn--cream">Book a call {ARR}</a>
  </div>
</header>
'''


def footer(page):
    home = '' if page == 'home' else 'index.html'
    links = ''.join(f'<a href="{h}">{n}</a>' for h, n, _ in HZ)
    return f'''<footer class="foot">
  <div class="wrap">
    <p class="foot__word" aria-hidden="true" data-spot>Kreatify<i></i></p>
    <div class="foot__row mono">
      <span>Led by Krish Bhatia · New Delhi, India</span>
      <nav aria-label="Footer">{links}<a href="{home}#book">Book a call</a></nav>
      <span>© 2026 Kreatify</span>
    </div>
  </div>
</footer>

<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/js/site.js" defer></script>
</body>
</html>
'''


def kick(t):
    return f'<p class="kicker mono"><i></i>{t}</p>'


def marquee():
    one = ''.join(f'<span><img src="assets/logos/{f}" alt="" width="22" height="22">{e(n.replace("LinkedIn Sales Navigator", "Sales Navigator"))}</span>' for n, f, c, u in TOOLS)
    two = one.replace('<span>', '<span aria-hidden="true">')
    return f'<div class="marquee" data-marquee><div class="marquee__track">{one}{two}</div></div>'


def stack(heading, lead):
    counts = {k: sum(1 for t in TOOLS if t[2] == k) for k, _ in CATS}
    chips = f'<button type="button" class="chip is-on" data-f="all" aria-pressed="true">All <span>{len(TOOLS)}</span></button>' + ''.join(
        f'<button type="button" class="chip" data-f="{k}" aria-pressed="false">{v} <span>{counts[k]}</span></button>' for k, v in CATS)
    tiles = '\n'.join(f'      <li class="tl" data-cat="{c}" data-use="{e(u)}" tabindex="0"><img src="assets/logos/{f}" alt="" width="40" height="40" loading="lazy"><b>{e(n)}</b><small class="mono">{CN[c]}</small></li>' for n, f, c, u in TOOLS)
    flow = [('linkedin.svg', 'Sales Navigator', 'Spot', 'Saffron Labs hired a VP Sales'), ('clay.webp', 'Clay', 'Research', 'Team size, tools, recent news'), ('claude.svg', 'Claude', 'Write', 'A first line about them, in your voice'),
            ('smartlead.webp', 'Smartlead', 'Send', 'Tuesday, 9:12 am'), ('hubspot.svg', 'HubSpot', 'Log', 'They reply: "Let\'s talk"'), ('calendly.svg', 'Calendly', 'Book', 'Thursday, 4:30 pm')]
    fl = '\n'.join(f'        <li><span class="fl__ic"><img src="assets/logos/{f}" alt="" width="28" height="28" loading="lazy"></span><small class="mono">{s}</small><b>{e(n)}</b><em>{e(r)}</em></li>' for f, n, s, r in flow)
    return f'''<section class="sec t-paper tex gstack" id="stack" aria-labelledby="stack-h">
  <div class="wrap">
    {kick('GTM engineering stack')}
    <div class="head2">
      <h2 id="stack-h" class="h2 split">{heading}</h2>
      <p class="lead reveal">{lead}</p>
    </div>
    <div class="gs__bar reveal">
      <div class="gs__chips" role="group" aria-label="Filter tools by what they do">{chips}</div>
      <button type="button" class="gs__pause mono" data-gs-pause aria-pressed="false"><i aria-hidden="true"></i><span>Pause</span></button>
    </div>
  </div>
  <div class="gs" data-gs>
    <ul class="gs__list" data-gs-list aria-label="Tools we set up">
{tiles}
    </ul>
    <div class="gs__tip" data-gs-tip role="status" aria-live="polite" hidden><img alt=""><div><b></b><small class="mono"></small><p></p></div></div>
  </div>
  <div class="wrap">
    <div class="fl reveal" data-flow>
      <div class="fl__head"><p class="mono">Follow one lead through the system</p><p class="fl__clock mono" data-flow-clock></p></div>
      <ol class="fl__track">
{fl}
      </ol>
      <div class="fl__rail" aria-hidden="true"><i data-flow-dot></i></div>
    </div>
  </div>
</section>
'''


# ---------------------------------------------------------------- mock UIs (plain, readable product screens)
def mock_post():
    return '''<div class="mk mk-post" data-mock="post" aria-hidden="true">
  <div class="mk-post__h"><img src="assets/img/krish-face.webp" alt="" width="44" height="44"><div><b>Krish Bhatia</b><small>Founder, Kreatify · 2d</small></div><img class="mk-post__li" src="assets/logos/linkedin.svg" alt="" width="22" height="22"></div>
  <p>I lost my first big client because I replied four days late.</p>
  <p>Since then I follow one rule: every new lead hears back within an hour. Here is the simple setup that makes it possible.</p>
  <div class="mk-post__card"><span>The 1-hour reply rule</span><ol><li>Every enquiry lands in one place</li><li>A first reply goes out in minutes</li><li>You call them the same day</li></ol></div>
  <div class="mk-post__stats"><span><b data-mk-count="12480">0</b> impressions</span><span><b data-mk-count="214">0</b> reactions</span><span><b data-mk-count="38">0</b> comments</span></div>
  <div class="mk-toast" data-mk-toast><img src="assets/logos/linkedin.svg" alt="" width="18" height="18">The founder of Saffron Labs viewed your profile</div>
</div>'''


def mock_leads():
    rows = [('SL', 'Saffron Labs', 'Hired a VP Sales', 3), ('NB', 'Northbay Logistics', 'Visited your pricing page', 2), ('KD', 'Kadam Design Co.', 'Commented on your post', 3), ('VR', 'Verve Retail', 'Raised a seed round', 1)]
    li = ''.join(f'<li data-to="{t}"><i>{a}</i><div><b>{n}</b><small>{s}</small></div><span class="st">Found</span></li>' for a, n, s, t in rows)
    return f'''<div class="mk mk-leads" data-mock="leads" aria-hidden="true">
  <div class="mk__bar"><span>Buyers worth talking to this week</span><em><span class="dot"></span>live</em></div>
  <ul>{li}</ul>
  <div class="mk-toast mk-toast--cream" data-mk-toast><img src="assets/logos/gcal.svg" alt="" width="18" height="18">Meeting booked with Saffron Labs · Thursday 4:30 pm</div>
</div>'''


def mock_check():
    items = [('Company registered', 'Private limited'), ('PAN, TAN and GST', 'Filed by our partner CA'), ('Bank account and UPI', 'Ready to receive'), ("Founders' agreement", 'Signed'), ('Your offer, in one sentence', 'Tested on 5 calls'), ('First client signed', 'Week 7')]
    li = ''.join(f'<li><span class="bx"></span><div><b>{e(a)}</b><small>{e(b)}</small></div></li>' for a, b in items)
    return f'''<div class="mk mk-check" data-mock="check" aria-hidden="true">
  <div class="mk__bar"><span>Your company, step by step</span><em data-mk-pct>0%</em></div>
  <ul>{li}</ul>
  <div class="mk-check__rail"><i data-mk-rail></i></div>
</div>'''


MOCK = {'post': mock_post, 'leads': mock_leads, 'check': mock_check}


# ---------------------------------------------------------------- page pieces
def kinetic(lines, label):
    """lines: list of lists of (text, serif?)"""
    out = []
    for ln in lines:
        parts = ' '.join(f'<span class="kx{" kx--serif" if s else ""}" data-kx>{e(t)}</span>' for t, s in ln)
        out.append(f'<span class="kh__l"><span class="kh__in">{parts}</span></span>')
    return f'<h1 class="kh" aria-label="{e(label)}">' + ''.join(out) + '</h1>'


def faq(items, title='What founders <em class="serif">ask first.</em>'):
    d = ''.join(f'<details{" open" if i == 0 else ""}><summary>{e(q)}<i></i></summary><p>{e(a)}</p></details>' for i, (q, a) in enumerate(items))
    return f'''<section class="sec t-white" id="faq" aria-labelledby="faq-h">
  <div class="wrap faq">
    <div>{kick('Questions')}<h2 id="faq-h" class="h2 split">{title}</h2></div>
    <div class="acc">{d}</div>
  </div>
</section>
'''


def steps(items, kicker, title, lead):
    li = ''.join(f'<li class="st2"><span class="st2__n mono">{i + 1:02d}</span><div><h3>{e(t)}</h3><p>{e(p)}</p>{f"<small class=mono>{e(w)}</small>" if w else ""}</div></li>' for i, (t, p, w) in enumerate(items))
    return f'''<section class="sec t-white tex par-wrap" id="how" aria-labelledby="how-h">
  <div class="par" aria-hidden="true"><span data-par="-0.25">how it works</span></div>
  <div class="wrap steps2-wrap">
    <div class="steps2__side">
      {kick(kicker)}
      <h2 id="how-h" class="h2 split">{title}</h2>
      <p class="lead reveal">{lead}</p>
    </div>
    <ol class="steps2" data-steps><i class="steps2__line" aria-hidden="true"><b data-steps-fill></b></i>{li}</ol>
  </div>
</section>
'''


def gets(items, title):
    li = ''.join(f'<li class="reveal"><b>{e(t)}</b><p>{e(p)}</p></li>' for t, p in items)
    return f'''<section class="sec t-royal" id="get" aria-labelledby="get-h">
  <div class="wrap">
    {kick('What you get')}
    <h2 id="get-h" class="h2 split">{title}</h2>
    <ul class="gets">{li}</ul>
  </div>
</section>
'''


SVG_IC = {
    '◎': '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    '◇': '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
    '◷': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
}


def who(items, title):
    li = ''.join(f'<li class="reveal"><span class="who__ic" aria-hidden="true">{SVG_IC.get(ic, ic)}</span><b>{e(t)}</b><p>{e(p)}</p></li>' for ic, t, p in items)
    return f'''<section class="sec t-white" id="who" aria-labelledby="who-h">
  <div class="wrap">
    {kick('Who it is for')}
    <h2 id="who-h" class="h2 split">{title}</h2>
    <ul class="who">{li}</ul>
  </div>
</section>
'''


def targets(items, note):
    li = ''.join(f'<li class="reveal"><b>{e(n)}</b><span>{e(t)}</span></li>' for n, t in items)
    return f'''<section class="sec t-dark" id="results" aria-labelledby="res-h">
  <div class="wrap">
    {kick('What to expect')}
    <h2 id="res-h" class="h2 split">The numbers <em class="serif">we work towards.</em></h2>
    <ul class="tgts">{li}</ul>
    <p class="tgts__note">{e(note)}</p>
  </div>
</section>
'''


def cta(page):
    others = ''.join(f'<a class="xl" href="{h}"><small class="mono">{e(s)}</small><b>{n}</b>{ARR}</a>' for h, n, s in HZ if h != page)
    return f'''<section class="book t-royal cta-band" aria-labelledby="cta-h">
  <div class="wrap">
    {kick('Next step')}
    <h2 id="cta-h" class="h2 split">Talk it through <em class="serif">with Krish.</em></h2>
    <p class="lead">A 30-minute call. We look at where your business is today and tell you honestly which of our three areas would help most, if any.</p>
    <div class="cta-band__row"><a class="btn btn--cream magnetic" href="index.html#book">Book a 30-minute call {ARR}</a><a class="btn btn--line" href="https://wa.me/918377916115">WhatsApp Krish</a></div>
    <div class="xls">{others}</div>
  </div>
</section>
'''


def phero(kicker, lines, label, lead, mock):
    return f'''<section class="phero" id="top" aria-labelledby="ph-h">
  <div class="hero2__bg" aria-hidden="true"><i></i><i></i></div>
  <div class="wrap phero__in">
    <div>
      <p class="crumb mono"><a href="index.html">Kreatify</a> / {e(kicker)}</p>
      <div id="ph-h">{kinetic(lines, label)}</div>
      <p class="phero__lead reveal">{lead}</p>
      <div class="hero2__ctas reveal"><a class="btn btn--cream magnetic" href="index.html#book">Book a call with Krish {ARR}</a><a class="btn btn--line" href="#how">How it works <span class="arr" aria-hidden="true">↓</span></a></div>
    </div>
    <div class="phero__mock reveal">{MOCK[mock]()}</div>
  </div>
</section>
'''


# ---------------------------------------------------------------- HOME
def home():
    hz = []
    data = [
        ('personal-branding.html', 'post', 'Personal', 'branding', 'Get known by the people who buy',
         'You know your work better than anyone. We help you talk about it on LinkedIn, in your own words, a few times a week. The right people start to recognise your name before you ever message them.',
         ['A profile that explains what you do in five seconds', '12 posts a month, written from a recorded chat with you', 'Daily comments on posts by the buyers you want', 'You approve every post before it goes live'],
         ('10K', 'impressions a week by month three, our usual target'), 'How personal branding works'),
        ('gtm-engineering.html', 'leads', 'GTM', 'engineering', 'Reach the right buyers at the right time',
         'GTM means go-to-market: how you find buyers and start conversations with them. We build that system for you. It spots companies that need what you sell, reaches out by email and LinkedIn, replies fast and puts meetings on your calendar.',
         ['A list of the companies most likely to buy, and why', 'Email and LinkedIn outreach that sounds like you', 'Every new lead gets a reply in under a minute', 'All of it tracked in one CRM you own'],
         ('5 to 15', 'qualified meetings a month by weeks 9 to 12'), 'How GTM engineering works'),
        ('business-development.html', 'check', '0 to 1', 'business', 'Turn an idea into a business that runs',
         'Going from zero to one means getting the basics right, in the right order. We help you register the company, shape an offer people understand in one sentence, and win your first clients.',
         ['Registration, GST and paperwork with partner CAs', 'One clear offer and a pitch you can say in a minute', 'Your first clients, starting with people who trust you', 'Contracts, onboarding and a weekly routine'],
         ('12 weeks', 'from an idea to a registered company with its first clients'), 'How 0 to 1 works'),
    ]
    for i, (href, mk, a, b, tag, p, ticks, tg, more) in enumerate(data):
        t = ''.join(f'<li>{e(x)}</li>' for x in ticks)
        op = i == 0
        hz.append(f'''      <article class="hz__item{" is-open" if op else ""}">
        <h3 class="hz__h"><button class="hz__head" type="button" aria-expanded="{str(op).lower()}" aria-controls="hz{i}" id="hzb{i}">
          <span class="hz__tag mono">{tag}</span>
          <span class="hz__t">{a} <em class="serif">{b}</em></span>
          <span class="hz__ic" aria-hidden="true"></span>
        </button></h3>
        <div class="hz__body" id="hz{i}" role="region" aria-labelledby="hzb{i}"><div class="hz__inner">
          <div class="hz__copy">
            <p>{p}</p>
            <ul class="ticks">{t}</ul>
            <div class="target"><span class="mono">target</span><b>{tg[0]}</b><span>{tg[1]}</span></div>
            <a class="hz__more" href="{href}">{more} {ARR}</a>
          </div>
          <div class="hz__mock">{MOCK[mk]()}</div>
        </div></div>
      </article>''')
    hz = '\n'.join(hz)

    stages = [
        ('Weeks 1 to 2', 'Set up the company', 'The right structure, registrations, GST and a founders\' agreement, done in the right order with our partner CAs.',
         '<div class="ui-head mono"><img src="assets/icons/google-drive.svg" alt="">company documents<span>4 of 6</span></div><ul class="docs"><li class="ok">Certificate of incorporation</li><li class="ok">PAN and TAN</li><li class="ok">Current account and UPI</li><li class="now">GST registration <em class="mono">filing today</em></li><li>Founders\' agreement</li><li>Udyam (MSME)</li></ul>'),
        ('Weeks 2 to 3', 'An offer people get in one sentence', 'Who it is for, the problem it solves and what is included, written so a buyer understands it on the first read.',
         '<div class="ui-head mono">your offer · version 3</div><div class="offer"><small class="mono">for</small><b>Seed-stage D2C founders</b><small class="mono">problem</small><b>No steady way to win clients</b><small class="mono">what they get</small><b>A sales system, built in 12 weeks</b><div class="offer__pitch"><span class="mono">60-second pitch</span><i style="--w:100%"></i></div></div>'),
        ('Weeks 3 to 8', 'Your first clients', 'A list of 100 target companies, warm outreach to people who already know you, and help on the sales calls themselves.',
         '<div class="ui-head mono"><img src="assets/icons/hubspot.svg" alt="">pipeline<span>2 won</span></div><div class="board"><div><small class="mono">contacted 24</small><i></i><i></i><i></i></div><div><small class="mono">calls 9</small><i></i><i></i></div><div><small class="mono">proposal 4</small><i></i></div><div><small class="mono">won 2</small><i class="won"></i><i class="won"></i></div></div>'),
        ('Weeks 6 to 10', 'Clients who stay and refer', 'Clear contracts, a smooth onboarding and a weekly update, so a small team feels reliable to work with.',
         '<div class="ui-head mono"><img src="assets/icons/notion.svg" alt="">client · saffron labs</div><ul class="docs"><li class="ok">Contract signed</li><li class="ok">Kick-off call</li><li class="ok">Shared workspace</li><li class="now">Week 2 update <em class="mono">due Monday</em></li></ul>'),
        ('Weeks 8 to 12', 'A business that keeps moving', 'A simple CRM, a Monday report and written processes, so work keeps moving even when you are on a call.',
         '<div class="ui-head mono"><img src="assets/icons/google-sheets.svg" alt="">operations</div><ul class="docs"><li class="ok">CRM set up</li><li class="ok">Monday report</li><li class="ok">Follow-up rules written</li><li class="now">Team handbook <em class="mono">this week</em></li></ul>'),
    ]
    nav_li = ''.join(f'<li><a href="#stage{i}" data-stage-link="{i}"><small class="mono">{w}</small><b>{e(t)}</b></a></li>' for i, (w, t, p, ui) in enumerate(stages))
    st = '\n'.join(f'''      <article class="stage{" stage--one" if i == 4 else ""}" id="stage{i}" data-stage="{i}">
        <div class="stage__meta mono"><span>Step {i + 1} of 5</span><span>{w}</span></div>
        <h3>{e(t)}</h3>
        <p>{e(p)}</p>
        <div class="stage__ui">{ui}</div>
      </article>''' for i, (w, t, p, ui) in enumerate(stages))

    body = f'''{head("Kreatify: personal branding, GTM engineering and 0 to 1 business building", "Kreatify helps first-time founders get known on LinkedIn, reach the right buyers with GTM engineering, and build a business from zero to one. Led by Krish Bhatia, New Delhi.", "home")}
<div class="intro" data-intro aria-hidden="true">
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><path data-intro-path d="M-120 760 C 220 760 360 420 640 420 C 900 420 980 700 760 720 C 560 740 600 360 900 250 C 1120 170 1320 260 1600 120"/></svg>
  <span class="intro__word">Kreatify<i>.</i></span>
</div>
{nav("home")}
<main id="main">

<section class="hero2" id="top" aria-labelledby="hero-h">
  <div class="hero2__bg" aria-hidden="true"><i></i><i></i></div>
  <div class="trail" data-trail aria-hidden="true"></div>
  <div class="wrap hero2__in">
    <p class="hero2__kicker reveal">Personal branding, GTM engineering<br>and 0 to 1 business building</p>
    <div id="hero-h">{kinetic([[("From", False), ("zero", False)], [("to", False), ("one.", True)]], "From zero to one.")}</div>
    <p class="hero2__lead reveal">We help first-time founders get known, reach the right buyers and build a business that runs. Krish Bhatia leads every account himself.</p>
    <div class="hero2__ctas reveal"><a class="btn btn--cream magnetic" href="#book">Book a call with Krish {ARR}</a><a class="btn btn--line" href="#what">See what we do <span class="arr" aria-hidden="true">↓</span></a></div>
  </div>
  <div class="hero2__logos reveal"><p class="mono">Built on the tools your buyers already use</p>{marquee()}</div>
</section>

<section class="sec t-paper tex" id="problem" aria-labelledby="prob-h">
  <div class="wrap">
    {kick('The real problem')}
    <h2 id="prob-h" class="h2 split">You're doing a lot. <em class="serif">It just isn't connected.</em></h2>
    <p class="lead reveal">Most first-time founders handle growth in pieces: a CA for the papers, a freelancer for posts, a tool for emails, a notebook for leads. None of it talks to each other. Scroll down and watch the pieces come together.</p>
    <div class="scatter" data-scatter>
      <svg class="scatter__lines" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M167 130 H500 H833"/><path d="M167 390 H500 H833"/><path d="M167 130 V390"/><path d="M500 130 V390"/><path d="M833 130 V390"/>
      </svg>
      <div class="scatter__core mono" aria-hidden="true"><span class="dot"></span>one system</div>
      <article class="chip-card"><span class="mono">set-up</span><b>The paperwork drags on</b><p>Weeks lost between forms, CAs and "what do I need first?"</p></article>
      <article class="chip-card"><span class="mono">offer</span><b>Nobody gets the offer</b><p>Five services and no simple way to explain them.</p></article>
      <article class="chip-card"><span class="mono">content</span><b>You know you should post</b><p>No time, and it never sounds like you.</p></article>
      <article class="chip-card"><span class="mono">outreach</span><b>Cold messages get ignored</b><p>Same pitch, wrong person, wrong time.</p></article>
      <article class="chip-card"><span class="mono">follow-up</span><b>Good leads go cold</b><p>Someone shows interest and hears back four days later.</p></article>
      <article class="chip-card"><span class="mono">reporting</span><b>You can't tell what works</b><p>Lots of activity, no clear picture of what brings clients.</p></article>
    </div>
  </div>
</section>

<section class="sec t-white" id="what" aria-labelledby="what-h">
  <div class="wrap">
    {kick('What we do')}
    <div class="head2">
      <h2 id="what-h" class="h2 split">Three things we do. <em class="serif">One team behind them.</em></h2>
      <p class="lead reveal">You can start with the one that matters most right now. Open each one to see what it includes and what it looks like.</p>
    </div>
    <div class="hz" data-hz>
{hz}
    </div>
  </div>
</section>

{stack('33 tools, <em class="serif">set up in your name.</em>', 'This is what GTM engineering runs on. We choose the tools your buyers need, connect them and set them up on your own accounts. If we ever stop working together, everything keeps running.')}
<section class="model2 t-royal" id="model" aria-labelledby="model-h">
  <div class="wrap model2__in">
    <div class="model2__side">
      {kick('How 0 to 1 works')}
      <h2 id="model-h" class="h2 split">From idea to business, <em class="serif">in five steps.</em></h2>
      <p class="lead reveal">This is the path for founders starting from scratch. If you are further along, we start at the step you are on.</p>
      <ol class="model2__nav" data-stage-nav>{nav_li}</ol>
    </div>
    <div class="model2__steps">
{st}
    </div>
  </div>
</section>

<section class="sec t-dark" id="loop" aria-labelledby="loop-h">
  <div class="wrap loop">
    <div class="loop__copy">
      {kick('How it fits together')}
      <h2 id="loop-h" class="h2 split">Your posts warm people up. <em class="serif">Outreach starts the talk.</em></h2>
      <p class="lead">When someone likes or comments on your post, we know. A few days later they get a relevant message from you, so it never feels like a cold pitch.</p>
      <ol class="loop__list" data-loop-list>
        <li><span class="mono">01</span><b>You post</b><small>useful ideas in your own voice</small></li>
        <li><span class="mono">02</span><b>Buyers engage</b><small>likes, comments, profile views</small></li>
        <li><span class="mono">03</span><b>We notice</b><small>and note who showed interest</small></li>
        <li><span class="mono">04</span><b>You reach out</b><small>a relevant message, at the right time</small></li>
        <li><span class="mono">05</span><b>Fast follow-up</b><small>no reply waits more than an hour</small></li>
        <li><span class="mono">06</span><b>Meeting booked</b><small>you take the call</small></li>
      </ol>
    </div>
    <div class="ring" aria-hidden="true">
      <svg viewBox="0 0 520 520"><circle class="ring__track" cx="260" cy="260" r="200"/><circle class="ring__fill" cx="260" cy="260" r="200" data-ring/></svg>
      <div class="ring__center"><span class="mono">now</span><b class="serif" data-ring-label>You post</b><small data-ring-sub>useful ideas in your own voice</small></div>
      <span class="node" style="--a:-90deg">01</span><span class="node" style="--a:-30deg">02</span><span class="node" style="--a:30deg">03</span><span class="node" style="--a:90deg">04</span><span class="node" style="--a:150deg">05</span><span class="node node--cream" style="--a:210deg">06</span>
    </div>
  </div>
</section>

<section class="sec t-skyfield tex par-wrap" id="ninety" aria-labelledby="ninety-h">
  <div class="par" aria-hidden="true"><span data-par="-0.35">first 90 days</span></div>
  <div class="par-dots" aria-hidden="true" data-par-y="0.18"></div>
  <div class="wrap">
    {kick('Your first 90 days')}
    <div class="head2">
      <h2 id="ninety-h" class="h2 split">What happens in <em class="serif">your first 90 days.</em></h2>
      <p class="lead reveal">Drag the slider to move through the weeks and see what is live at each point.</p>
    </div>
    <div class="scrub" data-scrub>
      <div class="scrub__weeks mono" aria-hidden="true"><span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span><span>W9</span><span>W10</span><span>W11</span><span>W12</span></div>
      <div class="scrub__lanes" aria-hidden="true">
        <div class="lane"><span class="lane__n mono">business</span><i style="--s:0;--e:3">papers · offer</i><i style="--s:7;--e:12" class="soft">contracts · CRM</i></div>
        <div class="lane"><span class="lane__n mono">branding</span><i style="--s:0;--e:3">profile · voice</i><i style="--s:3;--e:9">3 posts a week</i><i style="--s:9;--e:12" class="cream">inbound DMs</i></div>
        <div class="lane"><span class="lane__n mono">gtm</span><i style="--s:0;--e:4">buyer list · inboxes</i><i style="--s:4;--e:8">outreach live</i><i style="--s:8;--e:12" class="cream">steady meetings</i></div>
        <div class="lane"><span class="lane__n mono">ai</span><i style="--s:2;--e:5">auto replies · CRM</i><i style="--s:5;--e:12">call notes · reminders</i></div>
        <span class="scrub__head" data-scrub-head></span>
      </div>
      <label class="scrub__label mono" for="weekRange">Week <b data-week>1</b> of 12</label>
      <input class="scrub__range" id="weekRange" type="range" min="1" max="12" value="1" step="1" aria-describedby="weekOut">
      <div class="scrub__out" id="weekOut" aria-live="polite">
        <div><span class="mono" data-phase>Weeks 1 to 4</span><h3 data-phase-h>Getting set up</h3><p data-phase-p></p></div>
        <div class="scrub__kpis">
          <div><span class="mono">impressions a week</span><b data-k-imp>1.2K</b></div>
          <div><span class="mono">meetings a month</span><b data-k-meet>0</b></div>
          <div><span class="mono">posts published</span><b data-k-posts>0</b></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec t-dark" id="report" aria-labelledby="rep-h">
  <div class="wrap">
    {kick('Your Monday report')}
    <div class="head2">
      <h2 id="rep-h" class="h2 split">You see the work. <em class="serif">Every Monday.</em></h2>
      <p class="lead reveal">Every Monday before 11 am you get a 3-minute video from Krish and a one-page report. If a week goes badly, you hear it from him first, along with what changes next.</p>
    </div>
    <div class="dash reveal" data-dash role="img" aria-label="An example Monday report: 9 meetings booked, 11.2K impressions, 31 positive replies, 214 new followers, with a 12-week impressions chart and this week's signals.">
      <div class="dash__bar mono"><span class="lights"><i></i><i></i><i></i></span>monday report · week 10<span class="dash__tag">example numbers</span></div>
      <div class="dash__kpis">
        <div><span class="mono">meetings booked</span><b data-count="9">0</b><small>3 more than last week</small></div>
        <div><span class="mono">linkedin impressions</span><b data-count="11.2" data-dec="1" data-suffix="K">0</b><small>up 18% on last week</small></div>
        <div><span class="mono">positive replies</span><b data-count="31">0</b><small>6.4% reply rate</small></div>
        <div><span class="mono">new followers</span><b data-count="214">0</b><small>on target</small></div>
      </div>
      <div class="dash__body">
        <div class="dash__chart">
          <div class="mono dash__chart-h"><span>weekly impressions, weeks 1 to 12</span><span class="tgt">10K target</span></div>
          <div class="bars" data-bars><i style="--h:8%"></i><i style="--h:12%"></i><i style="--h:15%"></i><i style="--h:22%"></i><i style="--h:30%"></i><i style="--h:38%"></i><i style="--h:47%"></i><i style="--h:58%"></i><i style="--h:69%"></i><i style="--h:84%" class="now"></i><i style="--h:91%" class="ghost"></i><i style="--h:100%" class="ghost"></i><span class="bars__tgt"></span></div>
        </div>
        <div class="dash__side">
          <span class="mono">who showed interest this week</span>
          <ul class="sigs"><li>SaaS company · new VP Sales<em class="mono">message sent</em></li><li>Agency founder · commented twice<em class="mono">chat started</em></li><li>Logistics firm · visited your site<em class="mono hot">meeting booked</em></li><li>Fintech · new funding round<em class="mono">outreach live</em></li></ul>
          <div class="note"><img src="assets/icons/loom.svg" alt=""><span><b>3-minute video from Krish</b><small>what we did, what it produced, what is next</small></span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec t-white t-skywash" id="founder" aria-labelledby="founder-h">
  <div class="wrap founder">
    <figure class="founder__photo">
      <div class="founder__frame" data-parallax><img src="assets/img/krish.webp" alt="Krish Bhatia, founder of Kreatify" width="929" height="1280" loading="lazy"></div>
      <figcaption class="founder__card">
        <b>Krish Bhatia</b><span class="mono">founder · new delhi</span>
        <dl><div><dt class="mono">linkedin followers</dt><dd>0 → 28K+</dd></div><div><dt class="mono">founder workshops</dt><dd>50+</dd></div><div><dt class="mono">trainfluence</dt><dd>2025 speaker</dd></div></dl>
      </figcaption>
    </figure>
    <div class="founder__copy">
      {kick('From the founder')}
      <h2 id="founder-h" class="h2 split">I built this for myself first. <em class="serif">Then for founders like you.</em></h2>
      <div class="letter reveal">
        <p>I started at zero followers, where most founders I meet are today. I grew past 28,000 without spending a rupee on ads, ran more than 50 founder workshops, and kept closing deals myself.</p>
        <p>Again and again I saw where the first year goes wrong. It is rarely a lack of effort. It is that the papers, the posts, the outreach and the follow-up all sit with different people, and nobody connects them.</p>
        <p>Kreatify is the setup I wish I had at the start. I lead the strategy on every account, I check every piece of work before it goes live, and you can reach me on WhatsApp.</p>
        <p class="sig serif">Krish</p>
      </div>
      <div class="pods">
        <div class="pod"><span class="mono">strategy</span><b>Krish</b><p>Positioning, ideal buyer, offer and the direction each week.</p></div>
        <div class="pod"><span class="mono">gtm and ai</span><b>Engineers</b><p>Research, lists, sending setup, outreach, CRM and automations.</p></div>
        <div class="pod"><span class="mono">content</span><b>Writers and design</b><p>Interviews, writing, carousels, banners and daily engagement.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="sec t-dark" id="proof" aria-labelledby="proof-h">
  <div class="wrap">
    {kick('Results')}
    <h2 id="proof-h" class="h2 split">Founders and brands <em class="serif">we've worked with.</em></h2>
    <div class="cases">
      <article class="case case--sky tilt"><span class="mono">personal brand · linkedin</span><b class="case__fig">0 → 28K</b><h3>Krish's own LinkedIn</h3><p>The same playbook we run for clients, tested first on our founder. No ads, all organic.</p><svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 78 C80 76 130 68 170 52 S250 14 300 4"/></svg></article>
      <article class="case case--cream tilt"><span class="mono">creator campaign</span><b class="case__fig">40+</b><h3>Headfield</h3><p>Creators brought into one campaign to build visibility in India, online and on the ground.</p><div class="dots" aria-hidden="true"></div></article>
      <article class="case case--royal tilt"><span class="mono">founder content · instagram</span><b class="case__fig">3 to 4x</b><h3>Roofs &amp; Assets</h3><p>Social growth for a real estate founder with a strong story and a quiet feed.</p><div class="steps" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></article>
      <article class="case case--white tilt"><span class="mono">reels · real estate</span><b class="case__fig">Reels to visits</b><div class="reel" aria-hidden="true"><i></i><i></i><i></i></div><h3>Ganga Realty</h3><p>Short videos that turned into weekend site visits for a Delhi NCR developer.</p></article>
    </div>
    <p class="brands mono">Also worked with · <span>Unacademy</span></p>
  </div>
</section>

<section class="sec t-paper tex" id="together" aria-labelledby="tog-h">
  <div class="wrap">
    {kick('Working together')}
    <h2 id="tog-h" class="h2 split">Clear roles. <em class="serif">Everything we build is yours.</em></h2>
    <div class="split2">
      <div class="col reveal"><span class="mono">you bring</span><ul><li>Your approval on every post and message</li><li>Access to your LinkedIn profile</li><li>Tool accounts in your own name</li><li>A weekly 60-minute call in month one, then every two weeks</li></ul></div>
      <div class="col col--cream reveal"><span class="mono">we bring</span><ul><li>Strategy, setup and the day-to-day work</li><li>All writing, research, design and scheduling</li><li>Partner CAs and templates for the paperwork</li><li>A weekly report and a reply within 24 hours</li></ul></div>
    </div>
    <div class="promises">
      <div><b>You own it</b><p>Your data, accounts and automations belong to you.</p></div>
      <div><b>It keeps running</b><p>If we ever stop working together, your system stays in place.</p></div>
      <div><b>Direct line</b><p>You talk to Krish on WhatsApp, not a ticket queue.</p></div>
    </div>
  </div>
</section>

{faq([
    ("I haven't registered my company yet. Is it too early?", "No. That is where we start: structure, registration and GST in the first two weeks, with partner CAs handling the filings."),
    ("What is GTM engineering, in plain words?", "It is the system that finds the people most likely to buy from you and starts conversations with them. We set up the lists, the outreach, the replies and the CRM, so it runs every week without you chasing it."),
    ("When will I see results?", "Your profile and first posts are live within three weeks. Outreach starts around week five, and first meetings usually land between weeks five and eight."),
    ("Will the posts really sound like me?", "Yes. We start with a 90-minute recorded conversation, and nothing goes live without your approval."),
    ("Can I start with just one of the three?", "Yes. Each one works on its own. On the call we will tell you which one will help most right now."),
    ("How is pricing decided?", "It depends on what you need, so Krish walks you through it on the call once he understands your business."),
    ("What don't you do?", "Paid ads, SEO and website builds. If you need those, we will point you to someone good."),
])}
<section class="book t-royal" id="book" aria-labelledby="book-h">
  <div class="wrap book__in">
    <div class="book__copy">
      {kick('Next step')}
      <h2 id="book-h" class="h2 split">Hiring a salesperson takes months. <em class="serif">We start in week one.</em></h2>
      <p class="lead">A 30-minute call with Krish. We look at where your business is, where it is stuck, and the fastest way forward. You leave with a clear plan, whether or not we work together.</p>
      <ul class="contact mono">
        <li><span>whatsapp</span><a href="https://wa.me/918377916115">+91 83779 16115</a></li>
        <li><span>linkedin</span><a href="https://www.linkedin.com/in/meetkrishbhatia">in/meetkrishbhatia</a></li>
      </ul>
    </div>
    <form class="form" data-form novalidate action="https://wa.me/918377916115" method="get">
      <div class="form__step mono">Step <span data-step-n>1</span> of 2 · <span data-step-t>Where are you today?</span></div>
      <fieldset data-step="1">
        <legend class="sr-only">Where is your business today?</legend>
        <div class="choices">
          <label><input type="radio" name="stage" value="Idea, not registered yet" checked><span><b>Idea</b><small>not registered yet</small></span></label>
          <label><input type="radio" name="stage" value="Registered, no clients yet"><span><b>Registered</b><small>no clients yet</small></span></label>
          <label><input type="radio" name="stage" value="First clients, no system"><span><b>First clients</b><small>no system yet</small></span></label>
          <label><input type="radio" name="stage" value="Growing, need more meetings"><span><b>Growing</b><small>need more meetings</small></span></label>
        </div>
        <button class="btn btn--cream form__next" type="button" data-next>Continue {ARR}</button>
      </fieldset>
      <fieldset data-step="2" hidden>
        <legend class="sr-only">Your details</legend>
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required><p class="field__err" id="e-name" hidden>Add your name so Krish knows who he is talking to.</p></div>
        <div class="field"><label for="f-co">Your company or idea, in one line</label><input id="f-co" name="company" required><p class="field__err" id="e-co" hidden>One line about the business is enough.</p></div>
        <div class="form__row"><button class="btn btn--line" type="button" data-back><span aria-hidden="true">←</span> Back</button><button class="btn btn--cream" type="submit">Send to Krish on WhatsApp {ARR}</button></div>
        <p class="form__note">This opens WhatsApp with your answers filled in. Krish replies within a working day.</p>
      </fieldset>
    </form>
  </div>
</section>
</main>

{footer("home")}'''
    return body


# ---------------------------------------------------------------- SERVICE PAGES
def service(page, title, desc, kicker, lines, label, lead, mock, sections):
    return head(title, desc, page) + nav(page) + '<main id="main">\n' + phero(kicker, lines, label, lead, mock) + '\n'.join(sections) + cta(page) + '</main>\n\n' + footer(page)


def pages():
    out = {}
    out['personal-branding.html'] = service(
        'personal-branding.html', 'Personal branding for founders | Kreatify',
        'We help first-time founders get known on LinkedIn with posts in their own voice, a profile that sells, and daily engagement with the buyers they want.',
        'Personal branding', [[('Be the', False), ('name', False)], [('they', False), ('remember.', True)]], 'Be the name they remember.',
        'Buyers trust people before they trust companies. We help you show up on LinkedIn every week with posts that sound like you and bring the right people to your profile.', 'post', [
            who([('◎', 'Founders with real expertise and no audience', 'You are good at what you do, but outside your network nobody knows it yet.'),
                 ('◇', 'Founders who sell services', 'Your buyers want to trust you before the first call. Content does that work in advance.'),
                 ('◷', 'Founders with no time to write', 'You know you should post. We turn one conversation a month into a month of posts.')],
                'Built for founders <em class="serif">who sell on trust.</em>'),
            steps([('A 90-minute conversation', 'We record a relaxed call about your work, your clients and your opinions. That becomes the raw material for months of posts.', 'week 1'),
                   ('Your profile, rewritten', 'Headline, about section, banner and featured posts, so a visitor understands what you do in five seconds.', 'week 1 to 2'),
                   ('Your content plan', 'Four themes you want to be known for and a month of post ideas, which you approve before anything is written.', 'week 2'),
                   ('Posting and daily engagement', 'Three posts a week, written and scheduled. Every day we comment on posts from the buyers you want to reach.', 'from week 3'),
                   ('Warm conversations', 'When the right people engage, we start a conversation in your name and hand it to you once they are interested.', 'from week 4')],
                  'How it works', 'From one conversation <em class="serif">to a steady presence.</em>', 'You spend about 90 minutes a month with us plus a few minutes approving posts. We handle the rest.'),
            gets([('Profile rewrite', 'Headline, about, banner and featured section.'), ('12 posts a month', 'Written in your voice from your own stories.'), ('Carousels and visuals', 'Designed in your brand, ready to post.'),
                  ('Daily engagement', 'Thoughtful comments on posts from 10 target buyers.'), ('5 warm chats a week', 'Started in your name with people who engaged.'), ('Monday report', 'Impressions, followers and who showed interest.')],
                 'Everything you need <em class="serif">to be seen.</em>'),
            targets([('10K', 'impressions a week by month three'), ('200', 'new relevant followers a month'), ('3', 'posts a week, every week')],
                    'These are targets we plan around, not promises. Your Monday report shows exactly where you are against them.'),
            faq([('Do I have to write anything?', 'No. You talk, we write. You read and approve each post, and you can change anything before it goes live.'),
                 ('How much of my time does it take?', 'About 90 minutes a month for the recorded conversation, plus a few minutes a week to approve posts.'),
                 ('What if I do not like a post?', 'Tell us what feels off and we rewrite it. Nothing is published without your approval.'),
                 ('Is it only LinkedIn?', 'LinkedIn is where most B2B buyers are, so we start there. Posts can be adapted for Instagram or X if it helps.')], 'Questions <em class="serif">about branding.</em>'),
        ])
    out['gtm-engineering.html'] = service(
        'gtm-engineering.html', 'GTM engineering for founders | Kreatify',
        'GTM engineering is the system behind your sales conversations. We find the companies most likely to buy, reach them at the right moment and put meetings on your calendar.',
        'GTM engineering', [[('More', False), ('meetings,', False)], [('less', False), ('chasing.', True)]], 'More meetings, less chasing.',
        'GTM engineering is the system behind your sales conversations. We find the companies most likely to buy, reach them at the right moment and get meetings on your calendar. Every tool runs on your own accounts.', 'leads', [
            '''<section class="sec t-white" id="plain" aria-labelledby="plain-h">
  <div class="wrap">
    ''' + kick('In plain words') + '''
    <h2 id="plain-h" class="h2 split">GTM means go-to-market. <em class="serif">Here is what that means for you.</em></h2>
    <ul class="who who--3">
      <li class="reveal"><span class="who__ic" aria-hidden="true">1</span><b>Find</b><p>We watch for signs a company needs you: a new hire, a funding round, a comment on your post, a visit to your site.</p></li>
      <li class="reveal"><span class="who__ic" aria-hidden="true">2</span><b>Reach</b><p>The right person gets a short, relevant message by email or LinkedIn, written in your voice and sent at the right time.</p></li>
      <li class="reveal"><span class="who__ic" aria-hidden="true">3</span><b>Follow up</b><p>Replies are answered within minutes, meetings are booked straight into your calendar and everything is logged in your CRM.</p></li>
    </ul>
  </div>
</section>
''',
            steps([('Define your ideal buyer', 'Which companies, which roles, and what tells us they might need you right now.', 'week 1'),
                   ('Build the list', 'Around 100 target companies to start, researched and checked, with the right contact at each.', 'week 1 to 2'),
                   ('Set up sending properly', 'A separate sending domain and inboxes, warmed up slowly so your messages land in the main inbox.', 'week 1 to 4'),
                   ('Launch outreach', 'Email and LinkedIn messages that start when a signal appears, written in your voice and approved by you.', 'from week 4'),
                   ('Replies and booking', 'Every reply gets an answer within minutes. Interested buyers get a booking link and a reminder.', 'from week 5'),
                   ('Improve every week', 'We look at what got replies and what did not, and adjust the list and the messages.', 'every Monday')],
                  'How it works', 'From a buyer list <em class="serif">to booked calls.</em>', 'Six steps, set up once and improved every week. You stay in control of every message that goes out.'),
            stack('The tools <em class="serif">we set up for you.</em>', 'Every tool is set up on your own accounts, in your name. We only add what your buyers need, and you keep all of it.'),
            gets([('Ideal buyer profile', 'Who to target, and why, written down.'), ('100-company list', 'Researched, with the right person at each.'), ('Sending setup', 'Domain, inboxes and warm-up done properly.'),
                  ('Outreach sequences', 'Email and LinkedIn, triggered by real signals.'), ('Fast replies', 'AI drafts answers in seconds, a person checks them.'), ('CRM you own', 'Every conversation logged in one place.')],
                 'A sales system <em class="serif">that runs every week.</em>'),
            targets([('5 to 15', 'qualified meetings a month by weeks 9 to 12'), ('under 1 min', 'from a new enquiry to a first reply'), ('100', 'target companies in the first list')],
                    'These are targets we plan around, not promises. Your Monday report shows exactly where you are against them.'),
            faq([('Will this spam people?', 'No. We send small volumes to carefully chosen people, with messages written for them. Spam hurts your name, and your name is the point.'),
                 ('Do I need to buy the tools?', 'Some, yes, on your own accounts. We tell you exactly which ones you need and which you can skip.'),
                 ('I already have a CRM. Can we use it?', 'Yes. We work with HubSpot, Zoho, Pipedrive and others, or a simple sheet if you are just starting.'),
                 ('How soon do meetings start?', 'Usually between weeks five and eight, once your sending setup is warmed up and the first outreach is live.')], 'Questions <em class="serif">about GTM.</em>'),
        ])
    out['business-development.html'] = service(
        'business-development.html', '0 to 1 business building for founders | Kreatify',
        'We help first-time founders turn an idea into a business: registration and paperwork, a clear offer, first clients and simple systems, in about 12 weeks.',
        '0 to 1 business', [[('From', False), ('idea', False)], [('to', False), ('business.', True)]], 'From idea to business.',
        'Starting a company comes with a long list of things nobody explains. We take you through it in the right order, from registration to your first clients, with Krish beside you.', 'check', [
            who([('◎', 'You have an idea and no company yet', 'You want to start properly, without guessing which form comes first.'),
                 ('◇', 'You registered, but have no clients', 'The company exists on paper. Now it needs an offer and buyers.'),
                 ('◷', 'You have a few clients and no system', 'Work comes from luck and referrals. You want something you can repeat.')],
                'For founders <em class="serif">at the very start.</em>'),
            steps([('Set up the company', "Structure, registration, PAN, GST and a founders' agreement, handled with our partner CAs.", 'weeks 1 to 2'),
                   ('Shape your offer', 'Who it is for, the problem it solves and what is included, written so a buyer gets it in one read.', 'weeks 2 to 3'),
                   ('Win your first clients', 'A list of target companies, warm outreach to people who know you and help on the sales calls.', 'weeks 3 to 8'),
                   ('Make clients stay', 'Contracts, onboarding and a weekly update, so working with you feels easy and reliable.', 'weeks 6 to 10'),
                   ('Keep it running', 'A simple CRM, a Monday report and written processes, so the business keeps moving when you are busy.', 'weeks 8 to 12')],
                  'How it works', 'Five steps, <em class="serif">in the right order.</em>', 'If you are already past a step, we skip it and start where you are.'),
            gets([('Company registration', 'With partner CAs for every filing.'), ("Founders' agreement", 'Clear roles and ownership from day one.'), ('Your offer, written', 'Plus a 60-second pitch you can say on calls.'),
                  ('First client pipeline', '100 target companies and the outreach to reach them.'), ('Contracts and onboarding', 'Templates you can reuse with every client.'), ('Simple operations', 'CRM, Monday report and written processes.')],
                 'The basics, <em class="serif">done properly.</em>'),
            targets([('12 weeks', 'from an idea to a company with its first clients'), ('2 weeks', 'to get registered and GST ready'), ('1', 'clear offer anyone can understand')],
                    'Timelines depend on how quickly paperwork moves and how fast decisions are made. We tell you on the call what is realistic for you.'),
            faq([('Do you do the legal filings yourselves?', 'Our partner CAs handle the filings. We make sure everything happens in the right order and nothing is missed.'),
                 ('I already registered my company. Is this still useful?', 'Yes. We skip what is done and start with your offer and first clients.'),
                 ('Can you help me decide what to sell?', 'Yes. Shaping a clear offer is step two, and we test it on real calls before you commit.'),
                 ('How involved is Krish?', 'Krish leads the strategy and joins the key calls. You can reach him on WhatsApp throughout.')], 'Questions <em class="serif">about starting out.</em>'),
        ])
    return out


if __name__ == '__main__':
    files = {'index.html': home(), **pages()}
    for name, text in files.items():
        assert '—' not in text and '–' not in text, name + ' has a dash'
        open(os.path.join(ROOT, name), 'w').write(text)
        print('wrote', name, len(text))
