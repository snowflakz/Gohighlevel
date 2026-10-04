import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
let html=await fs.readFile('site/dist/index.html','utf8');html=html.replaceAll('<br>',' <br>');await fs.writeFile('site/dist/index.html',html);
for(const name of await fs.readdir('site/dist'))if(name.endsWith('.html')){let h=await fs.readFile('site/dist/'+name,'utf8');h=h.replace(/<link rel="canonical"[^>]+>/g,'');await fs.writeFile('site/dist/'+name,h);}
await fs.appendFile('site/README.md','\n## Vercel error recovery\nThe workspace root has vercel.json with outputDirectory site/dist. If importing only the site folder, its own vercel.json uses outputDirectory dist. Use Framework Other, no build command, no install command. The downloadable ZIP contains the site folder contents: extract it and deploy that extracted root, not the ZIP and not the parent strategy folder. Vercel must receive dist/index.html. Do not select Next.js or run npm run build. A live error has not been diagnosed without its deployment URL/log. Canonical tags are temporarily omitted until the real deployed domain is confirmed.\n');
console.log('Vercel configuration and mobile headline updated.');
