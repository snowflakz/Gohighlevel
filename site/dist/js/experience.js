(() => {
  'use strict';
  const choices = {
    agency: ['Start with one client journey', 'Choose a lead-to-appointment workflow for one service. Bring questions about the pipeline, follow-up and what your clients would need.'],
    freelancer: ['Give your follow-up a starting point', 'Map what happens after someone asks about your services. Bring one enquiry, one booking step and the follow-up you want to understand.'],
    local: ['Explore a real customer enquiry', 'Choose a missed call or booking enquiry from your business. Ask about setup, messaging requirements and usage costs before turning anything on.']
  };
  const result = document.querySelector('.path-result');
  document.querySelectorAll('.path-option').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.path-option').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const [title, description] = choices[button.dataset.path];
    result.querySelector('strong').textContent = title;
    result.querySelector('p').textContent = description;
  }));
  const videoButton = document.querySelector('#load-workshop-video');
  videoButton?.addEventListener('click', () => {
    const video = document.createElement('video');
    video.controls = true; video.playsInline = true; video.preload = 'metadata';
    video.setAttribute('aria-label','HighLevel workshop introduction by Mike Cooch');
    video.src = 'https://assets.cdn.filesafe.space/knES3eSWYIsc5YSZ3YLl/media/6aa2b5b877a519d231d208e0.mp4';
    video.addEventListener('error',()=>{document.querySelector('#workshop-player').textContent='The provider video could not load. Use “Check the AI workshop & access” to watch on HighLevel.';});
    document.querySelector('#workshop-player').replaceChildren(video);
    video.focus();
  });
  const rail = document.querySelector('.mobile-cta');
  if(rail && 'IntersectionObserver' in window){
    let heroVisible=true, finalVisible=false, workshopVisible=false;
    const railObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.target.matches('.hero'))heroVisible=entry.isIntersecting;else if(entry.target.matches('.final'))finalVisible=entry.isIntersecting;else workshopVisible=entry.isIntersecting;});rail.hidden=heroVisible||finalVisible||workshopVisible;},{threshold:0});
    document.querySelectorAll('.hero,.final,#ai-workshop').forEach(el=>railObserver.observe(el));
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  // Content stays visible if scripts fail; animation enhances the visible page only.
  const animations = new Set();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    if (reduce.matches || !entry.target.animate) return;
    const animation = entry.target.animate([{opacity:.35,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,easing:'cubic-bezier(.2,.7,.2,1)'});
    animations.add(animation); animation.onfinish = () => animations.delete(animation);
  }), {threshold:.1});
  document.querySelectorAll('.hero-visual,.section h2,.topic-grid article,.video-grid article,.path-picker,.steps li,.included').forEach(el => observer.observe(el));
  const progress = document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  let pending = false;
  function update(){const height=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${height>0?Math.min(1,Math.max(0,window.scrollY/height)):0})`;pending=false;}
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
  reduce.addEventListener('change',event=>{if(event.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());progress.remove();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);}});
})();
