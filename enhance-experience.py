from pathlib import Path
p=Path('site/dist/index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('<script defer src="js/config.js">','<link rel="stylesheet" href="css/experience.css"><script defer src="js/experience.js"></script><script defer src="js/config.js">')
s=s.replace('<span class="header-note">A clearer place to start.</span>','<nav class="header-nav" aria-label="Main"><a href="#learn">Explore</a><a href="#videos">Watch</a><a href="#fit">Find your fit</a></nav>')
picker='''<div class="path-picker"><p class="eyebrow">MAKE IT RELEVANT TO YOU</p><h3>What are you working on?</h3><p>Choose your starting point for a useful question to bring to the bootcamp.</p><div class="path-options" role="group" aria-label="Your business type"><button type="button" class="path-option" data-path="agency" aria-pressed="true">Small agency</button><button type="button" class="path-option" data-path="freelancer" aria-pressed="false">Freelancer / startup</button><button type="button" class="path-option" data-path="local" aria-pressed="false">Local business</button></div><div class="path-result" aria-live="polite" aria-atomic="true"><strong>Start with one client journey</strong><p>Choose a lead-to-appointment workflow for one service. Bring questions about the pipeline, follow-up and what your clients would need.</p></div><a class="path-link" href="#learn">Explore the session topics <span aria-hidden="true">↗</span></a></div>'''
s=s.replace('<!-- Personal experience statement',picker+'<!-- Personal experience statement')
p.write_text(s,encoding='utf-8')
print('Interactive visual enhancement applied.')
