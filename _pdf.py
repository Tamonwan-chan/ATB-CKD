from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

styles=getSampleStyleSheet()
cell=ParagraphStyle("cell",parent=styles["Normal"],fontSize=7,leading=8.4)
cellb=ParagraphStyle("cellb",parent=cell,fontName="Helvetica-Bold")
hdr=ParagraphStyle("hdr",parent=styles["Normal"],fontSize=7.3,leading=8.6,textColor=colors.white,fontName="Helvetica-Bold",alignment=1)
title=ParagraphStyle("t",parent=styles["Title"],fontSize=14,textColor=colors.HexColor("#1F4E78"),spaceAfter=2)
sub=ParagraphStyle("s",parent=styles["Normal"],fontSize=7.2,textColor=colors.HexColor("#595959"),leading=9)
foot=ParagraphStyle("f",parent=styles["Normal"],fontSize=6.8,textColor=colors.HexColor("#595959"),leading=8.5)

def P(t,st=cell): return Paragraph((t or "").replace("\n","<br/>"),st)

# generic, brand, strength, status, b>50,b30-50,b10-29,b<10, comments
R=[
("Amikacin","Amikin","500 mg/2 mL","R","No adj (CrCl >=60).\n50-59: 5-7.5 mg/kg q12h.","40-50: 5-7.5 mg/kg q12h.\n30-39: q24h.","20-29: q24h.\n10-19: single dose, then individualise.","Single dose, then individualise.","Dose on actual BW (adj if TBW>1.2xIBW). No TDM: monitor renal fn & hearing. Native >=60/40-60/20-40/<20."),
("Amoxicillin/clavulanate","Augmentin","1.2 g","A","No adjustment.","No adj (CrCl >=30).","Initial 1 g, then 500 mg q12h.","Initial 1 g, then 500 mg q12-24h.","Doses as amoxicillin component (IV Canadian product)."),
("Amphotericin B (conv. deoxycholate)","Fungizone","50 mg","R","No dose adj by CrCl.","No dose adj by CrCl.","No dose adj by CrCl.","No dose adj by CrCl.","Nephrotoxic: lipid form preferred if impaired. Na load (1 L NS), longer infusion, avoid nephrotoxins; monitor kidney fn."),
("Ampicillin","Ampicin","1 g","A","1-2 g q6h (no change).","1-2 g q8h.","15-29: 1-2 g q12h.\n<15: 1-2 g q24h.","1-2 g q24h.","Expert opinion. If usual 2 g q4h: q4h/q6h/q8h/q12h."),
("Cefazolin","Ancef, Kefzol","1 g","A","1-2 g q8h (no change).","1-2 g q8-12h.","500 mg-1 g q12h (2 g q12h if severe).","500 mg-1 g q24h (<=10).","Consider an initial full dose for severe infection before reducing."),
("Cefotaxime","Claforan","1 g","A","1-2 g q8h (no change).","1-2 g q12h.","1-2 g q12h.","1-2 g q24h (<=10).","US limited availability. If usual q6h: q8h/q12h; if 2 g q4h: q6-8h/q12h."),
("Ceftazidime","Fortum, Fortaz","1 g","A","1 g q8h (no change).","1 g q12h (31-50).","16-30: 1 g q24h.\n<=15: 500 mg q24h.","500 mg q24h (<=15).","If usual 2 g q8h: 2 g q12h / 2 g q24h / 1 g q24h."),
("Ceftriaxone","Rocephin","1 g","G","No adjustment.","No adjustment.","No adjustment.","No adj (>2 g/day: monitor).","Biliary elimination; not significantly dialysed."),
("Ciprofloxacin","Ciprobay, Cipro","400 mg/vial","A","400 mg q8-12h.","400 mg q8-12h.","200-400 mg q12-24h (load 400 if 200 q24h).","200-400 mg q12-24h.","Severe infections: higher end of interval."),
("Clindamycin","Dalacin C, Cleocin","600 mg/4 mL","G","No adjustment.","No adjustment.","No adjustment.","No adjustment.","Hepatically eliminated; not dialysed."),
("Cloxacillin","Cloxapen","1 g","G","No adjustment.","No adjustment.","No adj (CrCl >=10).","No specific adj; monitor; consider <=8 g/day.","US not-available product. Nephrotoxicity at >=8 g/day."),
("Colistimethate sodium","Coly-Mycin","150 mg/vial","R","300 mg CBA/day (>=50).","183-250 mg CBA/day.","150-183 mg CBA/day.","117 mg CBA/day (<10).","Load 300 mg CBA. CBA 1 mg = 30,000 IU; 150 mg vial is CBA. Adjusted BW. Full ladder in notes."),
("Ertapenem","Invanz","1 g","A","1 g daily (no change).","1 g daily (>30).","500 mg daily (<=30).","500 mg daily.","No BSA adjustment of CrCl needed."),
("Gentamicin","Garamycin","80 mg/2 mL","R","No adj (CrCl >=60).\n50-59: usual dose q12h.","40-50: usual dose q12h.\n30-39: q24h.","20-29: q24h.\n10-19: single dose, then individualise.","Single dose, then individualise.","Dose on actual BW. No TDM: monitor renal fn & hearing. Native >=60/40-60/20-40/<20."),
("Meropenem","Meronem, Merrem","1 g/vial","A","1 g q8h (no change).","1 g q12h (>25-50).","10-25: 500 mg q12h.\n26-29: 1 g q12h.","500 mg q24h.","If usual 2 g q8h: 2 g q12h / 1 g q12h / 1 g q24h or 500 mg q12h. Extended 3-h infusion improves attainment."),
("Metronidazole","Flagyl","0.5% 100 mL (500 mg)","G","No adjustment.","No adjustment.","No adjustment.","No adj (500 mg q12h may suffice).","Single-dose regimens need no adj. Monitor in CrCl <30."),
("Penicillin G sodium","Benzylpenicillin","5 MU (3 g)","A","No adjustment (100%).","50-75% of usual dose.","25-50% of usual dose.","20-25% of usual dose.","% of usual indication-specific dose; continuous or divided q4-6h. Monitor for neurotoxicity."),
("Piperacillin/tazobactam","Tazocin, Zosyn","4.5 g/vial","A","4.5 g q6h (40-100; >100 extended infusion).","40-50: 4.5 g q6h.\n30-39: 4.5 g q8h or 3.375 g q6h.","20-29: 4.5 g q8h or 3.375 g q6h.\n<20: 4.5 g q12h or 2.25 g q6h.","4.5 g q12h or 2.25 g q6h (<20).","Combined pip+tazo. Extended infusion (3-4 h) preferred for high CrCl/severe."),
("Remdesivir","Veklury","100 mg/vial","G","No adjustment.","No adjustment.","No adjustment.","No adjustment.","Earlier eGFR <30 restriction no longer applied per current UpToDate."),
("Vancomycin","Vancocin","500 mg/vial","R","50-90: 15-20 mg/kg q12h.\n>90: q8-12h.","10-15 mg/kg q24h (15 to <50).","15-29: 10-15 mg/kg q24h.\n<15: q48-72h.","10-15 mg/kg q48-72h (<15).","Initial dose on actual BW. Normally titrated to levels; no TDM: monitor renal fn & response. Max loading 3 g."),
]
R.sort(key=lambda x:x[0].lower())
RAG={"G":colors.HexColor("#C6EFCE"),"A":colors.HexColor("#FFEB9C"),"R":colors.HexColor("#FFC7CE")}
RAGT={"G":"No adj","A":"Adjust","R":"Special"}
RAGF={"G":colors.HexColor("#006100"),"A":colors.HexColor("#9C6500"),"R":colors.HexColor("#9C0006")}

headers=["#","Drug (brand)","Strength","Status","CrCl >50","CrCl 30-50","CrCl 10-29","CrCl <10","Comments"]
data=[[P(h,hdr) for h in headers]]
for i,row in enumerate(R,1):
    g,br,sf,st,b1,b2,b3,b4,cm=row
    drug=P(f"<b>{g}</b><br/><font size=6 color='#666666'>{br}</font>",cell)
    data.append([P(str(i)),drug,P(sf),P(f"<b>{RAGT[st]}</b>",ParagraphStyle('x',parent=cell,alignment=1,textColor=RAGF[st])),P(b1),P(b2),P(b3),P(b4),P(cm)])

cw=[14,92,58,40,92,104,108,92,158]
t=Table(data,colWidths=cw,repeatRows=1)
ts=[("BACKGROUND",(0,0),(3,0),colors.HexColor("#1F4E78")),
    ("BACKGROUND",(4,0),(7,0),colors.HexColor("#2E6CA4")),
    ("BACKGROUND",(8,0),(8,0),colors.HexColor("#1F4E78")),
    ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#BFBFBF")),
    ("VALIGN",(0,0),(-1,-1),"TOP"),("TOPPADDING",(0,0),(-1,-1),2),("BOTTOMPADDING",(0,0),(-1,-1),2),
    ("LEFTPADDING",(0,0),(-1,-1),3),("RIGHTPADDING",(0,0),(-1,-1),3),
    ("ALIGN",(0,0),(0,-1),"CENTER")]
for r,row in enumerate(R,1):
    ts.append(("BACKGROUND",(3,r),(3,r),RAG[row[3]]))
    if r%2==0:
        for c in [0,1,2,4,5,6,7,8]:
            ts.append(("BACKGROUND",(c,r),(c,r),colors.HexColor("#F2F6FB")))
t.setStyle(TableStyle(ts))

doc=SimpleDocTemplate("IV-ATB-Renal-Adjustment_CHART.pdf",pagesize=landscape(A4),
 leftMargin=12*mm,rightMargin=12*mm,topMargin=10*mm,bottomMargin=10*mm,
 title="IV Antibiotic Renal Dose Adjustment (Adults)")
story=[Paragraph("IV Antibiotic Renal Dose Adjustment (Adults)",title),
 Paragraph("Dose by CrCl (Cockcroft-Gault, mL/min). Adults only. NOT for dialysis patients (no RRT on site) - refer. "
 "Lab eGFR is a rough screen only; calculate Cockcroft-Gault CrCl for dosing. "
 "Status: <font color='#006100'><b>green=no adjustment</b></font>, <font color='#9C6500'><b>amber=adjust by CrCl</b></font>, <font color='#9C0006'><b>red=special caution</b></font>.",sub),
 Spacer(1,4),t,Spacer(1,5),
 Paragraph("Colistin full maintenance ladder (total daily CBA, 2 divided doses): CrCl >=90: 360; 80-90: 340; 70-80: 300; 60-70: 275; 50-60: 245; 40-50: 220; 30-40: 195; 20-30: 175; 10-20: 160; 5-10: 145; <5: 130 mg/day.",foot),
 Paragraph("No on-site TDM: aminoglycosides (amikacin, gentamicin) and vancomycin are normally titrated to serum levels; monitor renal function, hearing, and response. Clinical reference only - verify against current UpToDate. Sole reference: UpToDate / Lexicomp, accessed 2026-06-23.",foot)]
doc.build(story)
print("saved PDF")
