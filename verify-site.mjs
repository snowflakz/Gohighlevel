import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
const root='site/dist', failures=[],checks=[];
const context={window:{}};vm.runInNewContext(await fs.readFile(root+'/js/config.js','utf8'),context);
const expected='https://www.gohighlevel.com/highlevel-bootcamp?fp_ref=tayo17';
if(context.window.BRIGEPOINT.AFFILIATE_URL!==expected)failures.push('Wrong referral destination');
let refs=0,ctas=0;
for(const file of await fs.readdir(root)){
 if(!file.endsWith('.html'))continue;const html=await fs.readFile(root+'/'+file,'utf8');
 if((html.match(/<h1[ >]/g)||[]).length!==1)failures.push(file+': heading count');
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const value=match[1];if(/^(https?:|mailto:|data:|#)/.test(value))continue;const p=value.split('#')[0].split('?')[0];if(p){try{await fs.access(path.join(root,p))}catch{failures.push(file+': missing '+p)}}}
 for(const match of html.matchAll(/<a[^>]*class="[^"]*affiliate[^"]*"[^>]*>.*?<\/a>/g)){ctas++;if(!match[0].includes('target="_blank"')||!match[0].includes('rel="sponsored noopener"'))failures.push(file+': referral attributes');const after=html.slice(match.index+match[0].length,match.index+match[0].length+110);if(!after.includes('Paid link — I earn a commission'))failures.push(file+': inline disclosure');}
 for(const m of html.matchAll(/fp_ref=([^"&< ]+)/g)){if(m[1]!=='tayo17')failures.push(file+': wrong referral id');}
 if(html.includes('tywo-24'))failures.push(file+': obsolete id');
 refs++;
}
const js=await fs.readFile(root+'/js/app.js','utf8');new vm.Script(js);checks.push({htmlPages:refs,affiliateCtas:ctas,exactUrl:context.window.BRIGEPOINT.AFFILIATE_URL,formEnabled:context.window.BRIGEPOINT.ENABLE_EMAIL_CAPTURE,ga4Configured:!!context.window.BRIGEPOINT.GA4_ID,checks:'HTML structure, existing assets, referral attributes, adjacent disclosures, syntax'});
await fs.writeFile('outputs/strategy/site-checks.json',JSON.stringify({checks,failures},null,2));console.log(JSON.stringify({checks,failures}));if(failures.length)process.exit(1);
