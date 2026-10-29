// Loads the real app scripts with a stub DOM, then checks vancomycin behaviour.
const fs=require('fs'), assert=require('assert');
const html=fs.readFileSync(process.argv[2],'utf8');
const scripts=[...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const els={};
function el(id){return els[id]||(els[id]={id,value:'',innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setAttribute(){},getAttribute(){return 'iv'},onclick:null});}
global.document={body:el('body'),getElementById:el,querySelectorAll:()=>[],createElement:()=>el('x'+Math.random())};
global.navigator={}; global.addEventListener=()=>{};
const code=scripts.filter(s=>!s.includes('serviceWorker')).join('\n')+'\n;global.__t={runCalc,matchSeg,fmtBand,IV,setSel:function(v){selDrug=v}};';
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
for(const d of T.IV) if(d.id!=='vancomycin') for(const g of d.regimens) for(const s of g.segs) assert(!s.loExc&&!s.hiInc,d.id);
assert(!run('amikacin',100,70).includes('(เกิน'),'no warn on other drugs');
// amikacin HDEI follows UpToDate like gentamicin (#2): >=60 q24h, 40-<60 q36h, 20-<40 q48h, <20 once
const hdei=id=>T.IV.find(d=>d.id===id).regimens.find(g=>g.name.startsWith('HDEI')).segs;
const ivAt=(segs,cr)=>segs[T.matchSeg(segs,cr)].iv;
for(const cr of [100,60,59.9,40,39.9,20,19.9,10,9.9,0.5]) assert.equal(ivAt(hdei('amikacin'),cr),ivAt(hdei('gentamicin'),cr),'amikacin vs gentamicin HDEI at '+cr);
assert.equal(ivAt(hdei('amikacin'),25),'q 48 h');
assert(!JSON.stringify(hdei('amikacin')).includes('ไม่แนะนำ'),'old <30 row gone');
console.log('all checks passed');
