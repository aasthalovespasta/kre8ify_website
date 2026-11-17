"""
ALL WEBSITE WORDS LIVE IN THIS FILE.

How to change the site:
  1. Edit the text below (keep the quotes and commas).
  2. Run:  python3 scripts/build_pages.py
  3. Open site/index.html in a browser to check.

Tips
  - <em>word</em> inside a heading shows that word in the serif italic style.
  - Lists are written as [ "one", "two" ]. Add or remove lines freely.
  - Avoid long dashes. Use commas or "to" instead (e.g. "weeks 3 to 8").
"""

SITE = {
    'name': 'Kreatify',
    'founder': 'Krish Bhatia',
    'city': 'New Delhi',
    'whatsapp': '918377916115',
    'whatsapp_label': '+91 83779 16115',
    'linkedin': 'https://www.linkedin.com/in/meetkrishbhatia',
    'linkedin_label': 'in/meetkrishbhatia',
    'year': 2026,
}

# ------------------------------------------------------------------ home page
HERO = {
    'eyebrow': 'Founder-led growth studio · New Delhi',
    'title': 'We make founders <em>impossible to ignore.</em>',
    'lead': "We help early-stage startups build the founder's brand, run their content and social media, and turn that attention into clients.",
    'cta': 'Book a call with Krish',
    'cta2': 'See our services',
    'photo_alt': 'Krish Bhatia, founder of Kreatify',
    'chips': [  # small cards that float around the photo
        {'icon': 'linkedin.svg', 'label': "Krish's LinkedIn", 'value': '0 to 28K+'},
        {'icon': 'gcal.svg', 'label': 'Meeting booked', 'value': 'Thu, 4:30 pm'},
    ],
    'sticker': 'founder-led · zero to one · ',
    'feed': [  # the live card under the photo cycles through these (logo file, title, detail)
        ('linkedin.svg', 'Post published', 'Written in your voice'),
        ('linkedin.svg', 'Profile viewed', 'Founder at Saffron Labs'),
        ('whatsapp.svg', 'Reply in 40 seconds', 'Lead answered, CRM updated'),
        ('gcal.svg', 'Meeting booked', 'Thursday, 4:30 pm'),
        ('docs.svg', 'Client signed', 'Proposal accepted'),
    ],
}

# Brands we have worked with. Logo files live in site/assets/clients/.
# Leave the logo as None to show the name instead (until you have the logo file).
CLIENTS_TITLE = 'Brands we have worked with'
CLIENTS = [
    ('Unacademy', 'unacademy.svg'),
    ('Experion Developers', 'experion.webp'),
    ('Ganga Realty', 'ganga-realty.svg'),
    ('Headfield', None),
    ('Roofs & Assets', None),
]

# Big outlined words that slide sideways as you scroll, between sections
BANDS = ['Personal branding · Social media · Influencers · GTM engineering · 0 to 1 · ']

PROBLEM = {
    'label': 'The real problem',
    'title': "You're not lazy. <em>You're just invisible.</em>",
    'lead': "You're posting here, messaging there and keeping leads in a notebook. Nothing is connected, so nothing grows. Scroll, and watch it become one system.",
    'hub': 'One system',
    'cards': [
        ('Brand', 'Nobody knows who you are', 'Great at the work, unknown outside your circle.'),
        ('Offer', 'Nobody gets what you sell', 'You explain it differently every time.'),
        ('Content', 'Last post: 3 months ago', 'No time, and it never sounds like you.'),
        ('Social', 'Your profile is a dead end', 'People check you out, see nothing, and leave.'),
        ('Outreach', '100 messages. 2 replies.', 'Same message, wrong person, wrong time.'),
        ('Follow-up', 'Good leads go cold', 'Someone shows interest. Nobody replies for four days.'),
    ],
}

SERVICES_INTRO = {
    'label': 'Services',
    'title': 'What we do <em>for founders.</em>',
    'lead': 'Five services that work on their own or together. Start with the one that matters most right now.',
}

# 'art' picks the small animated illustration for each card: branding, launch, gtm, social, creators
SERVICES = [
    {
        'page': 'personal-branding.html', 'art': 'branding',
        'title': 'Personal branding',
        'desc': 'We turn the founder into the face buyers trust, on LinkedIn, in their own voice.',
        'items': ['Profile rewrite', 'Voice interview', '12 posts a month', 'Carousels and visuals', 'Daily engagement', 'Warm conversations'],
    },
    {
        'page': 'business-development.html', 'art': 'launch',
        'title': '0 to 1 brand building',
        'desc': 'From an idea to a registered brand with a clear offer and its first clients.',
        'items': ['Company set-up with CAs', 'Name and identity', 'Offer and pitch', 'First client pipeline', 'Contracts and onboarding', 'Weekly routine'],
    },
    {
        'page': 'gtm-engineering.html', 'art': 'gtm',
        'title': 'GTM engineering',
        'desc': 'The system that finds your buyers, starts conversations and books meetings on your calendar.',
        'items': ['Ideal buyer list', 'Buying signals', 'Email and LinkedIn outreach', 'Fast AI replies', 'CRM set-up', 'Weekly report'],
    },
    {
        'page': 'social-media.html', 'art': 'social',
        'title': 'Social media management',
        'desc': 'We start and run your Instagram and other channels, from the first post to a feed people follow.',
        'items': ['Profile set-up', 'Content calendar', 'Reels and carousels', 'Shoots and editing', 'Posting and replies', 'Monthly report'],
    },
    {
        'page': 'influencer-marketing.html', 'art': 'creators',
        'title': 'Influencer marketing',
        'desc': 'The right creators, briefed and managed, telling the right people about your brand.',
        'items': ['Creator shortlist', 'Outreach and deals', 'Briefs and scripts', 'UGC for your ads', 'On-ground events', 'Campaign report'],
    },
]
SERVICES_CTA = {
    'title': 'Not sure where to start?',
    'text': 'Tell Krish where your business is today. He will tell you honestly which service would help most, if any.',
    'button': 'Book a 30-minute call',
}

PROCESS = {
    'label': 'How we work',
    'title': 'Simple from <em>the first call.</em>',
    'steps': [
        ('A 30-minute call', 'You talk to Krish about where the business is and where it is stuck.'),
        ('A clear plan', 'Within 48 hours you get a written plan: what we will do, in what order, and why.'),
        ('Set up in your name', 'Every account, tool and asset we create belongs to you from day one.'),
        ('A report every Monday', 'A short video from Krish and a one-page report. You always know what is working.'),
    ],
}

WORK = {
    'label': 'Our work',
    'title': 'Results we can <em>point to.</em>',
    'cases': [
        # (service tag, client, result figure, result label, what we did)
        ('Personal branding', "Krish's own LinkedIn", '0 to 28K+', 'LinkedIn followers, no ads', 'The same playbook we run for clients, tested first on our founder.'),
        ('Influencer marketing', 'Headfield', '40+', 'creators in one campaign', 'Creators sourced, briefed and managed for an India launch, online and on the ground.'),
        ('Social media', 'Roofs & Assets', '3 to 4x', 'social growth', 'Founder-led content, shoots, scripts and editing for a real estate brand.'),
        ('Influencer marketing', 'Ganga Realty', 'Reels to visits', 'UGC built for site visits', 'Creator reels with hooks written for buyers, managed end to end.'),
    ],
}

# Replace these with real client words. Leave the list empty  [ ]  to hide the section.
TESTIMONIALS = {
    'label': 'Testimonials',
    'title': 'What clients <em>say.</em>',
    'items': [
        {'quote': "[Client's words go here. Two or three sentences about what changed for them work best.]", 'name': '[Client name]', 'role': '[Role, Company]'},
        {'quote': "[Client's words go here. A specific result, like more enquiries or a busier calendar, reads well.]", 'name': '[Client name]', 'role': '[Role, Company]'},
        {'quote': "[Client's words go here. What it was like to work with Krish and the team.]", 'name': '[Client name]', 'role': '[Role, Company]'},
    ],
}

FOUNDER = {
    'label': 'From the founder',
    'title': 'I built this for myself first. <em>Then for founders like you.</em>',
    'letter': [
        'I started at zero followers, where most founders I meet are today. I grew past 28,000 without spending a rupee on ads, ran more than 50 founder workshops, and kept closing deals myself.',
        'Again and again I saw where the first year goes wrong. It is rarely a lack of effort. The brand, the posts, the outreach and the follow-up all sit with different people, and nobody connects them.',
        'Kreatify is the team I wish I had at the start. I lead the strategy on every account, I check the work before it goes live, and you can reach me on WhatsApp.',
    ],
    'sign': 'Krish',
    'stats': [('LinkedIn followers', '28K+'), ('Founder workshops', '50+'), ('Trainfluence', '2025 speaker')],
}

FAQ = [
    ("Which service should I start with?", "It depends on where you are. Most founders start with personal branding or social media, then add GTM engineering once there is attention to convert. On the call we will tell you what makes sense."),
    ("I haven't registered my company yet. Is it too early?", "No. Our 0 to 1 brand building service starts there: company set-up with partner CAs, your name and identity, and a clear offer."),
    ("What is GTM engineering, in plain words?", "It is the system that finds the people most likely to buy from you and starts conversations with them: lists, outreach, quick replies and a CRM, running every week."),
    ("Will the content really sound like me?", "Yes. We start with a recorded conversation, write in your voice, and nothing goes live without your approval."),
    ("Do you shoot content and work with creators?", "Yes. Our social media and influencer marketing services cover shoots, reels, creator briefs and on-ground events."),
    ("How is pricing decided?", "It depends on what you need, so Krish walks you through it on the call once he understands your business."),
]

BOOK = {
    'label': 'Next step',
    'title': 'Talk it through <em>with Krish.</em>',
    'lead': 'A 30-minute call. We look at where your business is, where it is stuck, and the fastest way forward. You leave with a clear plan, whether or not we work together.',
    'stages': [('Idea', 'not registered yet'), ('Registered', 'no clients yet'), ('First clients', 'need more'), ('Growing', 'need a system')],
}

# ------------------------------------------------------------------ tools (GTM engineering page)
TOOL_GROUPS = [('sig', 'Signals and data'), ('out', 'Outreach'), ('auto', 'Automation'), ('ai', 'AI'), ('crm', 'CRM and ops'), ('meet', 'Meetings'), ('brand', 'Content')]
TOOLS = [
    ('LinkedIn Sales Navigator', 'linkedin.svg', 'sig'), ('Apollo', 'apollo.svg', 'sig'), ('Clay', 'clay.webp', 'sig'), ('PhantomBuster', 'phantombuster.svg', 'sig'),
    ('Apify', 'apify.svg', 'sig'), ('Perplexity', 'perplexity.svg', 'sig'), ('Smartlead', 'smartlead.webp', 'out'), ('Instantly', 'instantly.webp', 'out'),
    ('lemlist', 'lemlist.webp', 'out'), ('HeyReach', 'heyreach.webp', 'out'), ('Gmail', 'gmail.svg', 'out'), ('WhatsApp Business', 'whatsapp.svg', 'out'),
    ('n8n', 'n8n.svg', 'auto'), ('Make', 'make.svg', 'auto'), ('Zapier', 'zapier.svg', 'auto'), ('OpenAI', 'openai.svg', 'ai'), ('Claude', 'claude.svg', 'ai'),
    ('Gemini', 'gemini.svg', 'ai'), ('HubSpot', 'hubspot.svg', 'crm'), ('Zoho CRM', 'zoho.svg', 'crm'), ('Notion', 'notion.svg', 'crm'), ('Airtable', 'airtable.svg', 'crm'),
    ('Google Sheets', 'sheets.svg', 'crm'), ('Slack', 'slack.svg', 'crm'), ('Calendly', 'calendly.svg', 'meet'), ('Google Calendar', 'gcal.svg', 'meet'),
    ('Google Meet', 'meet.svg', 'meet'), ('Zoom', 'zoom.svg', 'meet'), ('Loom', 'loom.svg', 'meet'), ('Canva', 'canva.svg', 'brand'), ('Figma', 'figma.svg', 'brand'),
    ('Typeform', 'typeform.svg', 'brand'), ('Google Docs', 'docs.svg', 'brand'),
]
FLOW = [  # one lead travelling through the GTM system
    ('linkedin.svg', 'Spot', 'Sales Navigator', 'Saffron Labs hired a VP Sales'),
    ('clay.webp', 'Research', 'Clay', 'Team size, tools, recent news'),
    ('claude.svg', 'Write', 'Claude', 'A first line about them, in your voice'),
    ('smartlead.webp', 'Send', 'Smartlead', 'Tuesday, 9:12 am'),
    ('hubspot.svg', 'Log', 'HubSpot', 'They reply: "Let\'s talk"'),
    ('calendly.svg', 'Book', 'Calendly', 'Thursday, 4:30 pm'),
]

# ------------------------------------------------------------------ service pages
# Each page: hero, who it is for, steps, what you get, numbers, questions.
PAGES = {
    'personal-branding.html': {
        'title': 'Personal branding for founders', 'art': 'branding',
        'desc': 'We help founders get known on LinkedIn with posts in their own voice, a profile that sells, and daily engagement with the buyers they want.',
        'h1': 'Be the name <em>they remember.</em>',
        'lead': 'Buyers trust people before they trust companies. We help you show up on LinkedIn every week with posts that sound like you and bring the right people to your profile.',
        'who_title': 'Built for founders <em>who sell on trust.</em>',
        'who': [('user', 'Experts with no audience', 'You are good at what you do, but outside your network nobody knows it yet.'),
                ('case', 'Founders who sell services', 'Your buyers want to trust you before the first call. Content does that work in advance.'),
                ('clock', 'Founders with no time to write', 'One conversation a month turns into a month of posts.')],
        'steps_title': 'From one conversation <em>to a steady presence.</em>',
        'steps_lead': 'About 90 minutes a month with us, plus a few minutes approving posts. We handle the rest.',
        'steps': [('A 90-minute conversation', 'We record a relaxed call about your work, your clients and your opinions.', 'Week 1'),
                  ('Your profile, rewritten', 'Headline, about section, banner and featured posts, clear in five seconds.', 'Weeks 1 to 2'),
                  ('Your content plan', 'Four themes you want to be known for and a month of ideas you approve.', 'Week 2'),
                  ('Posting and engagement', 'Three posts a week, plus daily comments on posts from the buyers you want.', 'From week 3'),
                  ('Warm conversations', 'When the right people engage, we start a chat in your name and hand it over.', 'From week 4')],
        'gets_title': 'Everything you need <em>to be seen.</em>',
        'gets': [('Profile rewrite', 'Headline, about, banner and featured section.'), ('12 posts a month', 'Written in your voice from your own stories.'),
                 ('Carousels and visuals', 'Designed in your brand, ready to post.'), ('Daily engagement', 'Thoughtful comments on posts from 10 target buyers.'),
                 ('Warm chats', 'Started in your name with people who engaged.'), ('Monday report', 'Impressions, followers and who showed interest.')],
        'numbers': [('10K', 'impressions a week by month three'), ('200', 'relevant new followers a month'), ('3', 'posts a week, every week')],
        'faq': [('Do I have to write anything?', 'No. You talk, we write. You approve each post and can change anything before it goes live.'),
                ('How much of my time does it take?', 'About 90 minutes a month for the conversation, plus a few minutes a week to approve posts.'),
                ('Is it only LinkedIn?', 'LinkedIn is where most B2B buyers are, so we start there. Posts can be adapted for Instagram or X.')],
    },
    'business-development.html': {
        'title': '0 to 1 brand building', 'art': 'launch',
        'desc': 'We help first-time founders take a brand from idea to business: company set-up, name and identity, a clear offer and first clients.',
        'h1': 'From idea <em>to brand.</em>',
        'lead': 'Starting a brand comes with a long list of things nobody explains. We take you through it in the right order, from registration to your first clients, with Krish beside you.',
        'who_title': 'For founders <em>at the very start.</em>',
        'who': [('user', 'You have an idea and no company yet', 'You want to start properly, without guessing which form comes first.'),
                ('case', 'You registered, but have no clients', 'The company exists on paper. Now it needs a brand, an offer and buyers.'),
                ('clock', 'You have a few clients and no system', 'Work comes from luck and referrals. You want something you can repeat.')],
        'steps_title': 'Five steps, <em>in the right order.</em>',
        'steps_lead': 'If you are already past a step, we skip it and start where you are.',
        'steps': [('Set up the company', "Structure, registration, PAN, GST and a founders' agreement with our partner CAs.", 'Weeks 1 to 2'),
                  ('Name and identity', 'A name, logo and simple brand kit that look good everywhere you show up.', 'Weeks 1 to 3'),
                  ('Shape your offer', 'Who it is for, the problem it solves and what is included, clear on first read.', 'Weeks 2 to 3'),
                  ('Win your first clients', 'A target list, warm outreach to people who know you and help on sales calls.', 'Weeks 3 to 8'),
                  ('Keep it running', 'Contracts, onboarding, a simple CRM and a Monday report.', 'Weeks 6 to 12')],
        'gets_title': 'The basics, <em>done properly.</em>',
        'gets': [('Company registration', 'With partner CAs for every filing.'), ('Brand kit', 'Name, logo, colours and templates.'), ('Your offer, written', 'Plus a 60-second pitch for calls.'),
                 ('First client pipeline', 'Target companies and the outreach to reach them.'), ('Contracts and onboarding', 'Templates you reuse with every client.'), ('Simple operations', 'CRM, Monday report and written processes.')],
        'numbers': [('12 weeks', 'from an idea to a brand with its first clients'), ('2 weeks', 'to get registered and GST ready'), ('1', 'clear offer anyone can understand')],
        'faq': [('Do you do the legal filings yourselves?', 'Our partner CAs handle the filings. We make sure everything happens in the right order.'),
                ('I already registered my company. Is this still useful?', 'Yes. We skip what is done and start with your brand, offer and first clients.'),
                ('How involved is Krish?', 'Krish leads the strategy and joins the key calls. You can reach him on WhatsApp throughout.')],
    },
    'gtm-engineering.html': {
        'title': 'GTM engineering for founders', 'art': 'gtm', 'tools': True,
        'desc': 'GTM engineering is the system behind your sales conversations. We find the companies most likely to buy, reach them at the right moment and put meetings on your calendar.',
        'h1': 'More meetings, <em>less chasing.</em>',
        'lead': 'GTM means go-to-market: how you find buyers and start conversations. We build that system for you and run it every week. Every tool sits on your own accounts.',
        'who_title': 'GTM in plain words: <em>find, reach, follow up.</em>',
        'who': [('search', 'Find', 'We watch for signs a company needs you: a new hire, a funding round, a comment on your post.'),
                ('send', 'Reach', 'The right person gets a short, relevant message by email or LinkedIn, written in your voice.'),
                ('clock', 'Follow up', 'Replies are answered within minutes and meetings land on your calendar, logged in your CRM.')],
        'steps_title': 'From a buyer list <em>to booked calls.</em>',
        'steps_lead': 'Set up once, improved every week. You approve every message before it goes out.',
        'steps': [('Define your ideal buyer', 'Which companies, which roles, and what tells us they might need you now.', 'Week 1'),
                  ('Build the list', 'Around 100 target companies, researched, with the right person at each.', 'Weeks 1 to 2'),
                  ('Set up sending properly', 'A separate domain and inboxes, warmed up so messages land in the main inbox.', 'Weeks 1 to 4'),
                  ('Launch outreach', 'Email and LinkedIn messages that start when a signal appears.', 'From week 4'),
                  ('Replies and booking', 'Every reply is answered within minutes. Interested buyers get a booking link.', 'From week 5'),
                  ('Improve every week', 'We look at what got replies and adjust the list and the messages.', 'Every Monday')],
        'gets_title': 'A sales system <em>that runs every week.</em>',
        'gets': [('Ideal buyer profile', 'Who to target, and why, written down.'), ('100-company list', 'Researched, with the right person at each.'), ('Sending set-up', 'Domain, inboxes and warm-up done properly.'),
                 ('Outreach sequences', 'Email and LinkedIn, triggered by real signals.'), ('Fast replies', 'AI drafts answers in seconds, a person checks them.'), ('CRM you own', 'Every conversation logged in one place.')],
        'numbers': [('5 to 15', 'qualified meetings a month by weeks 9 to 12'), ('Under 1 min', 'from a new enquiry to a first reply'), ('100', 'target companies in the first list')],
        'faq': [('Will this spam people?', 'No. We send small volumes to carefully chosen people, with messages written for them.'),
                ('Do I need to buy the tools?', 'Some, on your own accounts. We tell you exactly which ones you need and which to skip.'),
                ('How soon do meetings start?', 'Usually between weeks five and eight, once sending is warmed up and outreach is live.')],
    },
    'social-media.html': {
        'title': 'Social media management', 'art': 'social',
        'desc': 'We start and run your Instagram and other social channels: profile, content plan, shoots, reels, posting and replies.',
        'h1': 'A feed people <em>actually follow.</em>',
        'lead': 'We set up and run your Instagram and other channels: profile, content plan, shoots, reels, posting and replies. Your social presence keeps working while you run the business.',
        'who_title': 'For brands that <em>need to be seen.</em>',
        'who': [('user', 'Starting from zero', 'No Instagram yet, or a handle with a few posts. We set it up properly from day one.'),
                ('clock', 'A feed that went quiet', 'You posted for a while, then work took over. We bring it back to life.'),
                ('case', 'Reels that should bring business', 'Views are nice. We plan content that brings enquiries, visits and sales.')],
        'steps_title': 'From an empty profile <em>to a steady feed.</em>',
        'steps_lead': 'You approve the plan each month. We shoot, edit, post and reply.',
        'steps': [('Audit and set-up', 'Handle, bio, highlights, link and a look that fits your brand.', 'Week 1'),
                  ('Content plan', 'Content themes and a monthly calendar you approve upfront.', 'Week 1 to 2'),
                  ('Shoots and editing', 'Reels, carousels and stories, shot with you or around your product.', 'Every month'),
                  ('Posting and replies', 'Scheduled posts, plus replies to comments and DMs.', 'Every day'),
                  ('Monthly review', 'What worked, what did not, and next month\'s plan.', 'Every month')],
        'gets_title': 'Your social media, <em>handled.</em>',
        'gets': [('Profile set-up', 'Bio, highlights, link and visual style.'), ('Content calendar', 'Planned a month ahead, approved by you.'), ('Reels and carousels', 'Scripted, shot and edited.'),
                 ('Stories', 'Behind the scenes, offers and updates.'), ('Community management', 'Replies to comments and DMs.'), ('Monthly report', 'Reach, followers and enquiries.')],
        'numbers': [('3 to 4x', 'social growth we delivered for Roofs & Assets'), ('16', 'posts and reels a month'), ('24 hrs', 'to reply to comments and DMs')],
        'faq': [('Do you shoot the content?', 'Yes. We plan shoots with you, or shoot around your product, space or team.'),
                ('Do I need to be on camera?', 'It helps, because people follow people. If you would rather not, we build content around the product and team.'),
                ('Which platforms do you manage?', 'Instagram first, then LinkedIn, YouTube Shorts or X if your buyers are there.')],
    },
    'influencer-marketing.html': {
        'title': 'Influencer marketing', 'art': 'creators',
        'desc': 'We find the right creators for your brand, brief them, manage the campaign end to end, and report what it brought in.',
        'h1': 'Creators who make <em>people care.</em>',
        'lead': 'We find the right creators for your brand, brief them, manage the campaign end to end, and show you what it brought in. Online, and on the ground.',
        'who_title': 'When you need <em>reach, fast.</em>',
        'who': [('send', 'Launching somewhere new', 'A new city, a new market or a new product that people need to hear about now.'),
                ('clock', 'Around a launch or event', 'Creators on the ground and online, telling the story as it happens.'),
                ('case', 'You need content for ads', 'UGC style videos you can reuse across your own channels and ads.')],
        'steps_title': 'From shortlist <em>to report.</em>',
        'steps_lead': 'You approve every creator and every piece of content before it goes live.',
        'steps': [('Campaign goal', 'What we want people to do: visit, sign up, buy or attend.', 'Week 1'),
                  ('Creator shortlist', 'Creators whose audience matches your buyers, checked for real engagement.', 'Week 1 to 2'),
                  ('Briefs and scripts', 'Clear briefs and hooks, so the content sounds like them and sells for you.', 'Week 2'),
                  ('Content goes live', 'Posts, reels and on-ground coverage, managed and approved.', 'Weeks 3 to 4'),
                  ('Report', 'Reach, views, clicks and what the campaign brought in.', 'After the campaign')],
        'gets_title': 'A campaign, <em>run end to end.</em>',
        'gets': [('Creator shortlist', 'With audience and engagement checks.'), ('Outreach and deals', 'We handle the back and forth.'), ('Briefs and scripts', 'Hooks written for buyers.'),
                 ('Content approval', 'Nothing goes live without you.'), ('On-ground coverage', 'Events captured and posted.'), ('Campaign report', 'Reach, views and results.')],
        'numbers': [('40+', 'creators in one campaign for Headfield'), ('100%', 'content approved by you before it goes live'), ('1', 'clear report at the end')],
        'faq': [('Do you work with small creators?', 'Yes. Smaller creators with the right audience often bring better results than big names.'),
                ('Who owns the content?', 'We agree usage rights with each creator upfront, so you can reuse content in your own posts and ads.'),
                ('Can you cover events?', 'Yes. We have run on-ground creator coverage, like the Headfield launch.')],
    },
}
