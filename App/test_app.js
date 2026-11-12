// Loads the real app scripts with a stub DOM, then checks vancomycin behaviour.
const fs=require('fs'), assert=require('assert');
const html=fs.readFileSync(process.argv[2],'utf8');
const scripts=[...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const els={};
function el(id){return els[id]||(els[id]={id,value:'',innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return 'iv'},onclick:null});}
global.document={body:el('body'),getElementById:el,querySelectorAll:()=>[],createElement:()=>el('x'+Math.random())};
global.navigator={}; global.addEventListener=()=>{};
const code=scripts.filter(s=>!s.includes('serviceWorker')).join('\n')+'\n;global.__t={runCalc,runTB,matchSeg,fmtBand,IV,setSel:function(v){selDrug=v}};';
(0,eval)(code);
const T=global.__t;
// CrCl via Cockcroft-Gault (male): (140-age)*wt/(72*scr); pick scr to hit an exact CrCl
function run(drug,cr,wt){T.setSel(drug);el('age').value='40';el('wt').value=String(wt);el('scr').value=String((100*wt)/(72*cr));T.runCalc(false);return el('result').innerHTML;}
const segs=T.IV.find(d=>d.id==='vancomycin').regimens[0].segs;
const band=cr=>segs[T.matchSeg(segs,cr)].dose;
assert.equal(band(90.01),'15-20 mg/kg q 8-12 h');
assert.equal(band(90),'15-20 mg/kg q 12 h');      // source: "50 to 90" includes 90
assert.equal(band(50),'15-20 mg/kg q 12 h');
assert.equal(band(49.99),'10-15 mg/kg q 24 h');
assert.equal(band(15),'10-15 mg/kg q 24 h');
assert.equal(band(14.99),'10-15 mg/kg q 48-72 h');
assert.deepEqual(segs.map(T.fmtBand),['>90','50–90','30–<50','15–<30','<15']);
let r=run('vancomycin',100,70);   // 20 mg/kg*70=1400 q8h = 4.2 g/day -> warn
assert(r.includes('25-30 mg/kg ครั้งเดียว'),'>90 loading'); assert(r.includes('4.2 g/วัน'),'warn 4.2');
r=run('vancomycin',100,60);       // 1200 q8h = 3.6 g -> no warn
assert(!r.includes('g/วัน (เกิน'),'no warn at 60 kg');
r=run('vancomycin',70,70);        // q12h: 1400*2 = 2.8 g, loading 20-25
assert(r.includes('20-25 mg/kg ครั้งเดียว') && !r.includes('25-30 mg/kg ครั้งเดียว') && !r.includes('(เกิน'),'50-90 band');
// other drugs unchanged: every non-vanco segment still has no loExc/hiInc and same match behaviour
for(const d of T.IV) if(!['vancomycin','cefotaxime','cefazolin','ertapenem','penicillinG','amoxiclav','fosfomycin'].includes(d.id)) for(const g of d.regimens) for(const s of g.segs) assert(!s.loExc&&!s.hiInc,d.id);
assert(!run('amikacin',100,70).includes('(เกิน'),'no warn on other drugs');
// cefotaxime (#4): source ">50" none, ">10 to 50" adjust, "<=10" lowest
for(const g of T.IV.find(d=>d.id==='cefotaxime').regimens){const b=cr=>T.matchSeg(g.segs,cr);
  assert.deepEqual([50.01,50,10.01,10,0].map(b),[0,1,1,2,2],g.name); assert.deepEqual(g.segs.map(T.fmtBand),['>50','>10–50','≤10']);}
// other #4 cut-offs: value at the boundary falls in the source's (lower, adjusted) band
const cut=(id,crs,want,bands)=>{const s=T.IV.find(d=>d.id===id).regimens[0].segs;
  assert.deepEqual(crs.map(c=>T.matchSeg(s,c)),want,id); assert.deepEqual(s.map(T.fmtBand),bands,id);};
cut('cefazolin',[50,49.99,30,29.99,10.01,10],[0,1,1,2,2,3],['≥50','30–<50','>10–<30','≤10']);
cut('ertapenem',[30.01,30],[0,1],['>30','≤30']);
cut('penicillinG',[50.01,50,30.01,30,10,9.99],[0,1,1,2,2,3],['>50','>30–50','10–30','<10']);
cut('amoxiclav',[30.01,30,10,9.99],[0,1,1,2],['>30','10–30','<10']);
assert(run('amoxiclav',30,60).includes('CrCl = 30 พอดี'),'amox/clav overlap note at 30');
// #7 added drugs. Fosfomycin rounds CrCl first (.5 up), so test through the real render; these age/wt/scr give the exact CrCl
const exact=(age,wt,scr)=>{T.setSel('fosfomycin');el('age').value=String(age);el('wt').value=String(wt);el('scr').value=String(scr);T.runCalc(false);return el('result').innerHTML;};
const has=(r,dose,label)=>assert(r.includes('class="dose">'+dose),label);   // the selected band only, not the hidden all-bands table
// #11 amox/clav: every band in vial weight with amoxicillin in brackets (renal 500 mg = 600 mg = half a 1.2 g vial)
has(run('amoxiclav',60,60),'ไม่ต้องปรับขนาด (CrCl &gt;30): IV 1.2 g q 8 h (amoxicillin 1 g)','amox >30');
has(run('amoxiclav',20,60),'เริ่ม IV 1.2 g (amoxicillin 1 g) จากนั้น 600 mg (amoxicillin 500 mg = ครึ่งขวด) q 12 h','amox 10-30');
has(run('amoxiclav',5,60),'เริ่ม IV 1.2 g (amoxicillin 1 g) จากนั้น 600 mg (amoxicillin 500 mg = ครึ่งขวด) q 12-24 h','amox <10');
has(exact(50,101,2.5),'ไม่ต้องปรับขนาด (CrCl &gt;50)','fosfo 50.5 -> >50');
has(exact(50,81,2.5),'6 g ครั้งเดียว จากนั้น 4 g q 8 h','fosfo 40.5 -> 41-50');
has(exact(50,84,10),'6 g ครั้งเดียว จากนั้น 3 g q 24 h','fosfo 10.5 -> 11-20');
has(run('fosfomycin',50.4,60),'6 g ครั้งเดียว จากนั้น 4 g q 8 h','fosfo 50.4 -> 41-50');
has(run('fosfomycin',40.4,60),'6 g ครั้งเดียว จากนั้น 3 g q 8 h','fosfo 40.4 -> 31-40');
has(run('fosfomycin',30.4,60),'6 g ครั้งเดียว จากนั้น 5 g q 24 h','fosfo 30.4 -> 21-30');
has(run('fosfomycin',20.4,60),'6 g ครั้งเดียว จากนั้น 3 g q 24 h','fosfo 20.4 -> 11-20');
has(run('fosfomycin',10.4,60),"Manufacturer's labeling ไม่ครอบคลุม CrCl &lt;11",'fosfo 10.4 -> <11');
assert.deepEqual(T.IV.find(d=>d.id==='fosfomycin').regimens[0].segs.map(T.fmtBand),['>50','41–50','31–40','21–30','11–20','<11']);
for(const g of T.IV.find(d=>d.id==='imipenem').regimens){assert.deepEqual([60,59.99,30,29.99,15,14.99].map(c=>T.matchSeg(g.segs,c)),[0,1,1,2,2,3],g.name);
  assert.deepEqual(g.segs.map(T.fmtBand),['≥60','30–<60','15–<30','<15']); assert(g.segs[3].dose.startsWith('ไม่ควรให้ยา'),g.name);}
assert.deepEqual(T.IV.find(d=>d.id==='imipenem').regimens.map(g=>g.segs[1].dose),['250 mg q 6 h หรือ 500 mg q 8 h','500 mg q 8 h','500 mg q 6 h']);
cut('levofloxacin',[50,49.99,20,19.99],[0,1,1,2],['≥50','20–<50','<20']);
assert(!T.IV.some(d=>/cefoperazone/i.test(d.generic)),'Sulperazone stays archived');
// #8 ethambutol: no mg cap (guideline 2564 and UpToDate state none), only 15-20 mg/kg/day
const tb=wt=>{T.runTB(40,wt,null);return el('result').innerHTML;};
assert(tb(90).includes('15-20 mg/kg × 90 กก. = 1350-1800 mg'),'E 90 kg uncapped');
assert(tb(120).includes('15-20 mg/kg × 120 กก. = 1800-2400 mg')&&!tb(120).includes('(สูงสุด 1600 mg)'),'E 120 kg uncapped');
assert(tb(120).includes('(สูงสุด 2000 mg)')&&tb(60).includes('ขนาดสำหรับผู้ใหญ่ (อายุ &gt;15 ปี) เท่านั้น'),'Z cap kept, adult note shown');
// amikacin HDEI follows UpToDate like gentamicin (#2): >=60 q24h, 40-<60 q36h, 20-<40 q48h, <20 once
const hdei=id=>T.IV.find(d=>d.id===id).regimens.find(g=>g.name.startsWith('HDEI')).segs;
const ivAt=(segs,cr)=>segs[T.matchSeg(segs,cr)].iv;
for(const cr of [100,60,59.9,40,39.9,20,19.9,10,9.9,0.5]) assert.equal(ivAt(hdei('amikacin'),cr),ivAt(hdei('gentamicin'),cr),'amikacin vs gentamicin HDEI at '+cr);
assert.equal(ivAt(hdei('amikacin'),25),'q 48 h');
assert(!JSON.stringify(hdei('amikacin')).includes('ไม่แนะนำ'),'old <30 row gone');
for(const id of ['amikacin','gentamicin']){const c=T.IV.find(d=>d.id===id).comments;assert(c.includes('CrCl <40')&&c.includes('severe sepsis/shock'),id+' HDEI caution note');}
// amikacin conventional CrCl >=60 (#3): helper shows the two valid pairs, never a merged 300-450 mg q8-12h range
{const r=run('amikacin',83.33,60);assert(r.includes('300 mg q 8 h หรือ 450 mg q 12 h'),'amikacin pairs');assert(!r.includes('300-450 mg'),'no merged range');}
// CrCl <10 (no HD/RRT on site): doses shown directly with the non-dialysis note, no yes/no prompt
{const r=run('cefotaxime',5,60); assert(r.includes('1-2 g q 24 h')&&r.includes('ไม่ได้</b>ฟอกไต/RRT')&&!r.includes('id="rY"'),'crcl<10 direct');
 assert(!run('cefotaxime',10,60).includes('ฟอกไต/RRT เท่านั้น'),'no note at 10');}
// normal link: no admin box value is ever used
assert(!run('vancomycin',100,60).includes('โหมดทดสอบ'),'no test label in normal mode');
// admin mode (?admin): typed CrCl overrides Cockcroft-Gault, Scr not needed, result labelled as a test
global.location={search:'?admin',hash:''}; for(const k in els) delete els[k]; global.document.body=el('body');
(0,eval)(code);
{const A=global.__t; A.setSel('vancomycin'); el('age').value='40'; el('wt').value='60'; el('scr').value=''; el('crclx').value='90'; A.runCalc(false);
 let r=el('result').innerHTML; assert(r.includes('<b>90.00</b>')&&r.includes('(กรอกเอง)')&&r.includes('โหมดทดสอบ'),'manual CrCl shown and labelled');
 assert(r.includes('15-20 mg/kg q 12 h'),'typed CrCl 90 uses the 50-90 band');
 el('crclx').value=''; el('scr').value='1'; A.runCalc(false); r=el('result').innerHTML;
 assert(!r.includes('โหมดทดสอบ')&&r.includes('83.33'),'empty admin box falls back to Cockcroft-Gault');}
// admin: only CrCl typed (age/weight/Scr blank) -> result without errors; mg lines skipped, mg/kg dose text kept
{const A=global.__t; el('age').value=''; el('wt').value=''; el('scr').value=''; el('crclx').value='83';
 for(const id of ['vancomycin','amikacin','cefotaxime']){A.setSel(id); A.runCalc(false); const r=el('result').innerHTML;
  assert(!r.includes('กรอก')||r.includes('(กรอกเอง)'),id+': no missing-input error'); assert(!r.includes('NaN'),id+': no NaN');
  assert(!r.includes('class="helper"'),id+': mg line skipped without weight'); assert(r.includes('โหมดทดสอบ'),id+': test label');}
 A.setSel('amikacin'); el('wt').value='60'; A.runCalc(false); assert(el('result').innerHTML.includes('300 mg q 8 h หรือ 450 mg q 12 h'),'weight given -> mg line back');}
console.log('all checks passed');
