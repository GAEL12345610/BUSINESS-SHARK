const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:540,height:960},recordVideo:{dir:'video',size:{width:540,height:960}}});
const p=await ctx.newPage();await p.goto('http://localhost:4173/');await p.waitForTimeout(500);
const s=await p.evaluate(()=>{const el=document.querySelector('section[aria-label="Cómo se usa el sello"]');const r=el.getBoundingClientRect();return {top:r.top+scrollY,h:r.height}});
await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),s.top);await p.waitForTimeout(900);
const pasos=140;for(let i=0;i<=pasos;i++){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),s.top+(s.h-960)*(i/pasos));await p.waitForTimeout(45);}
await p.waitForTimeout(1600);
await ctx.close();await b.close();})();
