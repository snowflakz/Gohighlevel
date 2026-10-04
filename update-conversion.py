from pathlib import Path
import re
root=Path('site/dist')
boot='https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17'
ai='https://www.gohighlevel.com/start-your-ai-business-workshop?fp_ref=tayo17'
for p in [root/'js/config.js',Path('outputs/strategy/bootcamp-ad-copy.md'),Path('outputs/strategy/refined-build-prompt.md')]:
    s=p.read_text(encoding='utf-8').replace('tywo-24','tayo17')
    if p.name=='config.js': s=s.replace(" BRAND:",f" AI_WORKSHOP_URL: '{ai}',\n BRAND:")
    p.write_text(s,encoding='utf-8')
def cta(label,pos,offer='bootcamp',extra=''):
    url=ai if offer=='workshop' else boot
    return f'<div class="cta-group {extra}"><a class="button affiliate" href="{url}" data-offer="{offer}" data-position="{pos}" target="_blank" rel="sponsored noopener">{label}<span aria-hidden="true">↗</span></a><small>Paid link — I earn a commission</small></div>'
p=root/'index.html';s=p.read_text(encoding='utf-8')
s=s.replace('<h1>Less figuring <br>it out. <br><em>More setting <br>it up.</em></h1>','<h1 class="animated-heading"><span class="headline-line">Less figuring<br> it out.</span> <em class="headline-line headline-accent">More setting<br> it up.</em></h1>')
s=s.replace('New to HighLevel? Explore a live bootcamp with its coaches, then use the 30-day trial to decide whether it fits your business.','Have enquiries to follow up, appointments to manage or a client workflow to build? Explore HighLevel’s live bootcamp, then use the 30-day trial to evaluate one real task.')
s=s.replace('<a href="#videos">Watch</a>','<a href="#videos">Watch</a><a href="#ai-workshop">AI services</a>')
s=s.replace('<a class="subtle-link" href="#fit">','<div class="intent-tags" aria-label="Common use cases"><span>Customer follow-up</span><span>Appointment enquiries</span><span>Agency workflows</span></div><a class="subtle-link" href="#fit">')
s=s.replace('</div></div></section><section class="steps-section">','</div></div></section><section class="steps-section">')
fit_end='</ul></article></div></section><section class="steps-section">'
s=s.replace(fit_end,'</ul></article></div><div class="fit-action"><p>Have a specific workflow and time to test it? Review the live onboarding option.</p>'+cta('Review the bootcamp + trial','fit')+'</div></section><section class="steps-section">')
workshop='''<section class="ai-workshop section" id="ai-workshop"><div class="wrap"><div class="workshop-heading"><div><p class="eyebrow">FOR AGENCIES EXPLORING AI SERVICES</p><h2>Have a service in mind?<br>Explore how to package it.</h2></div><p>If you already have a customer problem to solve and need to evaluate an AI service offer, this workshop is a more focused starting point.</p></div><div class="workshop-grid"><div><div class="workshop-player" id="workshop-player"><button type="button" class="play-video" id="load-workshop-video"><span aria-hidden="true">▶</span>Watch HighLevel’s workshop introduction<small>Provider video · Loads only when you choose</small></button></div><p class="fine">Presentation by Mike Cooch, hosted by HighLevel. Provider examples and individual results are not guarantees. This is not a BrigePoint testimonial. Playing connects to HighLevel’s media host.</p><details class="video-summary"><summary>Prefer to read? View the workshop overview<span aria-hidden="true">+</span></summary><p>The provider describes a two-day workshop on structuring AI service offers and pricing them. Topics include separating software from services, defining repeatable packages and reviewing delivery margins. A HighLevel account is required. This overview is not a transcript; captions may not be available in the source video.</p></details></div><div class="workshop-copy"><h3>Bring a use case, not just curiosity.</h3><ul><li>A customer group you understand.</li><li>A service you could realistically deliver.</li><li>Questions about setup, pricing and ongoing costs.</li></ul><div class="availability"><strong>Check current availability first</strong><p>The provider page currently lists September 21–22. Confirm new dates or access directly with HighLevel before starting a trial. We are not promising an upcoming session or replay.</p></div>'''+cta('Check the AI workshop & access','workshop','workshop')+'''<p class="terms-note">Provider page advertises a 14-day trial for new accounts. Card required; automatic billing unless cancelled. Confirm the selected plan and any AI or usage charges.</p><a class="subtle-link" href="#learn">Need the basics first? Explore Bootcamp ↓</a></div></div></div></section>'''
s=s.replace('<section class="section wrap" id="fit">',workshop+'<section class="section wrap" id="fit">')
rail='<aside class="mobile-cta" aria-label="Bootcamp quick action" hidden>'+cta('Review bootcamp + trial','mobile')+'</aside>'
s=s.replace('</main><footer', '</main>'+rail+'<footer')
p.write_text(s,encoding='utf-8')
# Native links work without JavaScript. Config remains the canonical source for script updates.
for p in root.glob('*.html'):
    s=p.read_text(encoding='utf-8')
    s=re.sub(r'<a class="button affiliate"(?! href)',f'<a class="button affiliate" href="{boot}"',s)
    s=s.replace('<noscript><p class="wrap">JavaScript is needed to enable referral links. Contact g2wsales@gmail.com for assistance.</p></noscript>','<noscript><p class="wrap">Referral links and checklist downloads work without JavaScript. Interactive recommendations and video loading require JavaScript.</p></noscript>')
    p.write_text(s,encoding='utf-8')
p=root/'js/app.js';s=p.read_text(encoding='utf-8').replace('a.href=c.AFFILIATE_URL','a.href=a.dataset.offer===\'workshop\'?c.AI_WORKSHOP_URL:c.AFFILIATE_URL').replace('cta_position:a.dataset.position','cta_position:a.dataset.position,offer:a.dataset.offer||\'bootcamp\'');p.write_text(s,encoding='utf-8')
p=Path('verify-site.mjs');s=p.read_text(encoding='utf-8').replace('fp_ref=tywo-24','fp_ref=tayo17').replace("if(html.includes('fp_ref='))failures.push(file+': duplicate affiliate URL outside config');","for(const m of html.matchAll(/fp_ref=([^\"&< ]+)/g)){if(m[1]!=='tayo17')failures.push(file+': wrong referral id');}").replace("if(html.includes('tayo17'))failures.push(file+': obsolete id');","if(html.includes('tywo-24'))failures.push(file+': obsolete id');");p.write_text(s,encoding='utf-8')
print('Referral destinations, H1, workshop video section and CTA placements updated.')
