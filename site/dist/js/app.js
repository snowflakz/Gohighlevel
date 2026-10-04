(() => {
  'use strict';
  const c = window.BRIGEPOINT;
  const $ = s => document.querySelector(s);
  const key = 'brige-point-consent-v1';
  let choice = {analytics:false, ads:false}, loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function tags(){
    const ga = /^G-[A-Z0-9]+$/.test(c.GA4_ID), ads = /^AW-\d+$/.test(c.GOOGLE_ADS_ID);
    if(!((choice.analytics && ga)||(choice.ads && ads)))return;
    if(!loaded){const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(choice.analytics&&ga?c.GA4_ID:c.GOOGLE_ADS_ID);document.head.append(script);gtag('js',new Date());loaded=true;}
    if(choice.analytics&&ga)gtag('config',c.GA4_ID,{send_page_view:true});
    if(choice.ads&&ads)gtag('config',c.GOOGLE_ADS_ID);
  }
  function apply(){gtag('consent','update',{analytics_storage:choice.analytics?'granted':'denied',ad_storage:choice.ads?'granted':'denied',ad_user_data:choice.ads?'granted':'denied',ad_personalization:choice.ads?'granted':'denied'});tags();}
  function save(a,d){choice={analytics:a,ads:d};try{localStorage.setItem(key,JSON.stringify({...choice,at:Date.now()}));}catch{}apply();$('#consent').hidden=true;}
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved && Date.now()-saved.at<180*86400000){choice={analytics:!!saved.analytics,ads:!!saved.ads};apply();}else if(c.GA4_ID||c.GOOGLE_ADS_ID)$('#consent').hidden=false;}catch{}
  document.querySelectorAll('[data-consent]').forEach(b=>b.addEventListener('click',()=>save(b.dataset.consent==='accept',b.dataset.consent==='accept')));
  $('#manage-consent')?.addEventListener('click',()=>{$('#consent-options').hidden=false;$('#analytics-consent').focus();});
  $('#save-consent')?.addEventListener('click',()=>save($('#analytics-consent').checked,$('#ads-consent').checked));
  $('#cookie-settings')?.addEventListener('click',()=>{$('#consent').hidden=false;$('#analytics-consent').checked=choice.analytics;$('#ads-consent').checked=choice.ads;$('#manage-consent').focus();});
  document.querySelectorAll('.affiliate').forEach(a=>{a.href=c.AFFILIATE_URL;a.addEventListener('click',()=>{if(choice.analytics&&c.GA4_ID)gtag('event','click_affiliate_cta',{send_to:c.GA4_ID,cta_position:a.dataset.position});});});
  document.querySelectorAll('.year').forEach(e=>e.textContent=new Date().getFullYear());
  const form=$('#lead-form');
  if(form && c.ENABLE_EMAIL_CAPTURE && /^https:\/\//.test(c.FORM_ENDPOINT)){
    form.hidden=false;
    form.addEventListener('submit',async e=>{
      e.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form);if(data.get('website'))return;
      const button=form.querySelector('[type=submit]'),status=$('#form-status');button.disabled=true;status.textContent='Sending your request…';
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
      try{const response=await fetch(c.FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json'},body:data,signal:controller.signal});if(!response.ok)throw Error('submit');
        if(choice.analytics&&c.GA4_ID)gtag('event','generate_lead',{send_to:c.GA4_ID});
        if(choice.ads&&c.GOOGLE_ADS_ID&&c.GOOGLE_ADS_LEAD_LABEL)gtag('event','conversion',{send_to:c.GOOGLE_ADS_ID+'/'+c.GOOGLE_ADS_LEAD_LABEL});
        sessionStorage.setItem('brige-point-lead-success','1');location.assign('thank-you.html');
      }catch{status.textContent='Your request could not be confirmed. Please try again or use the download link.';button.disabled=false;}finally{clearTimeout(timer);}
    });
  }
  if($('#thanks-message')){try{if(sessionStorage.getItem('brige-point-lead-success')==='1'){$('#thanks-message').textContent='Your request was accepted. Download the checklist now, or check your inbox if email delivery is enabled.';sessionStorage.removeItem('brige-point-lead-success');}}catch{}}
  // No conversion event on thank-you: successful submission is the single event source.
  // Meta pixel intentionally absent. Review consent and policy before adding any new tracker.
  const video=$('#video-area');
  if(video && /^[A-Za-z0-9_-]{11}$/.test(c.YOUTUBE_VIDEO_ID)){
    video.hidden=false;const b=document.createElement('button');b.textContent='▶ Watch BrigePoint’s introduction';b.setAttribute('aria-label','Load the BrigePoint introduction from YouTube');video.append(b);
    b.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+c.YOUTUBE_VIDEO_ID+'?cc_load_policy=1';frame.title='BrigePoint introduction';frame.allow='fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';video.replaceChildren(frame);});
  }else if(video&&c.SELF_HOSTED_VIDEO){video.hidden=false;video.innerHTML='<video controls preload="none" poster="assets/video/poster.webp"><source src="assets/video/hero.webm" type="video/webm"><source src="assets/video/hero.mp4" type="video/mp4"><track kind="captions" src="assets/video/hero.vtt" srclang="en" label="English" default></video>';}
  // Enable only after written approval from HighLevel affiliate team and approved content is inserted.
  const bonus=$('#personal-bonus');if(bonus && c.SHOW_PERSONAL_BONUS && bonus.textContent.trim())bonus.hidden=false;
})();

document.querySelectorAll('.video-facade').forEach(box=>{box.querySelector('button').addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+box.dataset.video+'?cc_load_policy=1';frame.title=box.closest('article').querySelector('h3').textContent;frame.allow='fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';box.replaceChildren(frame);});});
