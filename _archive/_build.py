from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter

S="UpToDate/Lexicomp, {} : Drug information. Accessed 2026-06-23."

rows=[
 ("Amikacin","500 mg/2 mL inj",
  "Conventional: 7.5 mg/kg q12h or 5 mg/kg q8h.\nHigh-dose extended-interval: 15-20 mg/kg q24h (up to 30 mg/kg if critically ill).",
  "Conventional dosing (CrCl, mL/min):\n>=60: no adjustment.\n40 to <60: 5-7.5 mg/kg q12h.\n20 to <40: 5-7.5 mg/kg q24h.\n<20: 5-7.5 mg/kg once, then individualise.",
  "Dose on actual body weight; if TBW >1.2x IBW use adjusted BW. No on-site TDM: monitor renal function and hearing closely. Some experts give a loading dose 7.5-10 mg/kg. High-dose extended-interval: use caution if CrCl <40.",
  S.format("Amikacin (systemic)")),
 ("Amoxicillin/clavulanate","1.2 g inj",
  "IV 1.2 g q8h (amoxicillin 1 g component q8h); up to 2 g q8-12h.",
  "CrCl >=30: no adjustment.\n10 to 30: initial 1 g, then 500 mg q12h.\n<10: initial 1 g, then 500 mg q12-24h.",
  "Renal doses expressed as the amoxicillin component (IV Canadian product).",
  S.format("Amoxicillin and clavulanate")),
 ("Ampicillin","1 g inj",
  "IV 1-2 g q6h; severe infections 2 g q4h.",
  "If usual 1-2 g q6h:\n50 to <130: 1-2 g q6h.\n30 to <50: 1-2 g q8h.\n15 to <30: 1-2 g q12h.\n<15: 1-2 g q24h.\n(If usual 2 g q4h: 2 g q4h / q6h / q8h / q12h across the same bands.)",
  "Expert-opinion adjustments; pharmacokinetic data limited.",
  S.format("Ampicillin")),
 ("Penicillin G sodium","5 MU (3 g) inj",
  "Indication-specific; serious infections commonly up to ~18-24 million units/day IV, divided q4-6h or continuous infusion.",
  "Doses are % of the usual indication-specific dose:\n>50: no adjustment.\n>30 to 50: 50-75% of usual dose (continuous or divided q4-6h).\n10 to 30: 25-50% of usual dose.\n<10: 20-25% of usual dose.",
  "Reduced kidney function increases accumulation and neurotoxicity risk; monitor.",
  S.format("Penicillin G (IV and short-acting IM)")),
 ("Cefazolin","1 g inj",
  "IV 1-2 g q8h.",
  "CrCl >=50: 1-2 g q8h (no adjustment).\n30 to <50: 1-2 g q8-12h.\n>10 to <30: 500 mg-1 g q12h (some give 2 g q12h for severe).\n<=10: 500 mg-1 g q24h.",
  "Consider an initial unadjusted dose appropriate to infection severity before reducing.",
  S.format("Cefazolin")),
 ("Cefotaxime","1 g inj",
  "IV 1-2 g q8h or q6h; severe 2 g q4h.",
  "If usual 1-2 g q8h:\n>50: no adjustment.\n>10 to 50: 1-2 g q12h.\n<=10: 1-2 g q24h.\n(If usual q6h: q8h / q12h; if 2 g q4h: 2 g q6-8h / q12h.)",
  "US limited-availability product.",
  S.format("Cefotaxime")),
 ("Ceftazidime","1 g inj",
  "IV 1 g or 2 g q8h.",
  "If usual 1 g q8h:\n>50: no adjustment.\n31-50: 1 g q12h.\n16-30: 1 g q24h.\n<=15: 500 mg q24h.\n(If usual 2 g q8h: 2 g q12h / 2 g q24h / 1 g q24h.)",
  "CrCl by Cockcroft-Gault.",
  S.format("Ceftazidime")),
 ("Ceftriaxone","1 g inj",
  "IV 1-2 g once daily (up to 2 g q12h for CNS infection).",
  "No dosage adjustment at any CrCl.\n>2 g/day not studied in CrCl <15; use with close monitoring (especially with hepatic dysfunction).",
  "Biliary elimination; not significantly dialysed.",
  S.format("Ceftriaxone")),
 ("Ciprofloxacin","400 mg/vial inj",
  "IV 400 mg q8-12h.",
  ">50 to <130: 400 mg q8-12h.\n30-50: 400 mg q8-12h.\n<30: 200-400 mg q12-24h (loading 400 mg if using 200 mg q24h).",
  "Severe infections may use the higher end of the interval.",
  S.format("Ciprofloxacin (systemic)")),
 ("Clindamycin","600 mg/4 mL inj",
  "IV 600-900 mg q8h.",
  "No dosage adjustment for any degree of impairment.",
  "Hepatically eliminated; not dialysed.",
  S.format("Clindamycin (systemic)")),
 ("Cloxacillin","1 g inj",
  "IV 1-2 g q4-6h (max ~6 g/day).",
  "CrCl >=10: no adjustment.\n<10: no specific adjustment; monitor closely (supratherapeutic levels, neuro/nephrotoxicity reported); for less severe infections consider limiting to 8 g/day.",
  "US not-available product. Nephrotoxicity reported with high-dose (>=8 g/day).",
  S.format("Cloxacillin")),
 ("Colistimethate sodium","150 mg/vial inj",
  "Loading 300 mg CBA, then maintenance by CrCl (start 12 h after loading), in 2 divided doses.",
  "Maintenance, total daily (CBA):\n>=90: 360 mg/day.\n80-<90: 340.\n70-<80: 300.\n60-<70: 275.\n50-<60: 245.\n40-<50: 220.\n30-<40: 195.\n20-<30: 175.\n10-<20: 160.\n5-<10: 145.\n<5: 130 mg/day.",
  "UpToDate doses in colistin base activity (CBA): CBA 1 mg = colistimethate 30,000 IU; the US 150 mg vial is labelled in CBA mg. CrCl by Cockcroft-Gault with adjusted body weight.",
  S.format("Colistin (colistimethate)")),
 ("Gentamicin","80 mg/2 mL inj",
  "Conventional: 3-5 mg/kg/day divided q8h.\nHigh-dose extended-interval: 5-7 mg/kg q24h.\nSynergy: 3 mg/kg/day.",
  "Conventional dosing (CrCl, mL/min):\n>=60: no adjustment.\n40 to <60: usual dose q12h.\n20 to <40: usual dose q24h.\n<20: usual dose once, then individualise.",
  "Dose on actual body weight (adjust if obese). No on-site TDM: monitor renal function and hearing. High-dose extended-interval: caution if CrCl <40.",
  S.format("Gentamicin (systemic)")),
 ("Meropenem","1 g/vial inj",
  "IV 1 g or 2 g q8h (30-min or extended 3-h infusion).",
  "If usual 1 g q8h:\n>50 to <130: no adjustment.\n>25 to <=50: 1 g q12h.\n10 to <=25: 500 mg q12h.\n<10: 500 mg q24h.\n(If usual 2 g q8h: 2 g q12h / 1 g q12h / 1 g q24h or 500 mg q12h.)",
  "Extended 3-hour infusion improves target attainment in severe infection.",
  S.format("Meropenem")),
 ("Metronidazole","0.5% in 100 mL (500 mg/100 mL) inj",
  "IV 500 mg q8h (q8-12h).",
  "CrCl >=10: no adjustment (monitor in CrCl <30 for metabolite accumulation).\n<10: no adjustment; 500 mg q12h may suffice for non-severe, non-C. difficile infections.",
  "Single-dose regimens need no adjustment.",
  S.format("Metronidazole (systemic)")),
 ("Piperacillin/tazobactam","4.5 g/vial inj",
  "IV 3.375 g or 4.5 g q6h (30-min traditional); extended infusion preferred if CrCl >100.",
  "Traditional infusion, if usual 4.5 g q6h:\n40 to <100: 4.5 g q6h.\n20 to <40: 4.5 g q8h or 3.375 g q6h.\n<20: 4.5 g q12h or 2.25 g q6h.\n100-130: use extended infusion.\n(If usual 3.375 g q6h: 3.375 g q6h / 2.25 g q6h / 2.25 g q8h.)",
  "Doses = combined piperacillin + tazobactam. Extended infusion (3-4 h) preferred for high CrCl or severe infection.",
  S.format("Piperacillin and tazobactam")),
 ("Vancomycin","500 mg/vial inj",
  "Loading 25-30 mg/kg (serious infection), then 15-20 mg/kg per band.",
  "Intermittent, initial maintenance (CrCl, mL/min):\n>90 to <130: 15-20 mg/kg q8-12h.\n50-90: 15-20 mg/kg q12h.\n15 to <50: 10-15 mg/kg q24h.\n<15: 10-15 mg/kg q48-72h.",
  "Initial dose on actual body weight. Normally titrated to serum levels (AUC/MIC 400-600); no on-site TDM, so monitor renal function and clinical response closely. Max loading 3 g.",
  S.format("Vancomycin")),
 ("Ertapenem","1 g inj",
  "IV 1 g once daily.",
  "CrCl >30: no adjustment.\n<=30: 500 mg once daily.",
  "No BSA adjustment of CrCl needed for dosing.",
  S.format("Ertapenem")),
 ("Amphotericin B (conventional deoxycholate)","50 mg inj",
  "IV 0.5-1 mg/kg/day (range 0.3-1.5; max 1.5 mg/kg/day).",
  "No specific dose adjustment by CrCl.\nNephrotoxic: use only if benefits outweigh risks; a lipid formulation is preferred in pre-existing impairment. Mitigate with hydration / sodium loading (1 L NS pre-dose), longer infusion, and avoiding concomitant nephrotoxins; monitor kidney function.",
  "Conventional deoxycholate formulation (per hospital stock).",
  S.format("Amphotericin B deoxycholate (conventional)")),
 ("Remdesivir","100 mg/vial inj",
  "IV 200 mg on day 1, then 100 mg once daily (5 days, up to 10).",
  "No dosage adjustment for any degree of kidney impairment.",
  "The earlier eGFR <30 restriction is no longer applied per current UpToDate.",
  S.format("Remdesivir")),
]

wb=Workbook(); ws=wb.active; ws.title="Renal adjustment"
navy=PatternFill("solid",fgColor="1F4E78"); hdr=Font(bold=True,color="FFFFFF",size=10)
title=Font(bold=True,size=13,color="1F4E78"); sub=Font(italic=True,size=9,color="595959")
thin=Side(style="thin",color="BFBFBF"); border=Border(left=thin,right=thin,top=thin,bottom=thin)
wrap=Alignment(wrap_text=True,vertical="top"); center=Alignment(horizontal="center",vertical="center")
alt=PatternFill("solid",fgColor="F2F6FB")

ws.merge_cells("A1:H1"); ws["A1"]="IV Antibiotic Renal Dose Adjustment (Adults)"; ws["A1"].font=title
ws.merge_cells("A2:H2")
ws["A2"]=("Reference: UpToDate / Lexicomp only. Adults only. Not for dialysis patients (hospital offers no RRT) - refer. "
 "Thresholds are each drug's own UpToDate CrCl (Cockcroft-Gault) cut points; the eGFR column mirrors the same mL/min values. "
 "Verify against the current UpToDate entry before use.")
ws["A2"].font=sub; ws["A2"].alignment=Alignment(wrap_text=True,vertical="top"); ws.row_dimensions[2].height=42

headers=["No.","Generic name","Strength/form","Usual adult dose\n(normal renal function)",
 "Renal adjustment - CrCl\n(Cockcroft-Gault, mL/min)","Renal adjustment - eGFR\n(CKD-EPI, mL/min/1.73m2)","Comments","Source"]
hr=4
for c,h in enumerate(headers,1):
    cell=ws.cell(hr,c,h); cell.fill=navy; cell.font=hdr; cell.alignment=Alignment(wrap_text=True,horizontal="center",vertical="center"); cell.border=border
ws.row_dimensions[hr].height=44

def egfr_text(crcl):
    return "Same thresholds as CrCl (read eGFR in mL/min/1.73m2 in place of CrCl):\n"+crcl

for i,(name,sf,usual,crcl,comm,src) in enumerate(rows,1):
    r=hr+i
    egfr=egfr_text(crcl)
    vals=[i,name,sf,usual,crcl,egfr,comm,src]
    for c,v in enumerate(vals,1):
        cell=ws.cell(r,c,v); cell.border=border; cell.alignment=center if c==1 else wrap
        if i%2==0: cell.fill=alt
    maxlines=max(str(v).count("\n")+1 for v in vals)
    ws.row_dimensions[r].height=max(30, maxlines*13+6)

widths=[5,22,17,30,40,40,34,30]
for c,w in enumerate(widths,1): ws.column_dimensions[get_column_letter(c)].width=w
ws.freeze_panes="C5"; ws.auto_filter.ref=f"A{hr}:H{hr+len(rows)}"

ns=wb.create_sheet("Notes & disclaimers")
notes=[
 "IV Antibiotic Renal Dose Adjustment - Notes & Disclaimers",
 "",
 "1. Population: adults only. Not for paediatric, neonatal, or pregnancy dosing.",
 "2. Not applicable to patients on any dialysis (HD/PD/CRRT). The hospital offers no renal replacement therapy; refer these patients.",
 "3. Renal thresholds follow each drug's own UpToDate/Lexicomp cut points (per-drug native bands), not a single fixed grid.",
 "4. CrCl is by Cockcroft-Gault using actual body weight (adjusted body weight where the monograph specifies, e.g. amikacin if TBW >1.2x IBW, and colistin). The eGFR column mirrors the same mL/min cut points for staff reading lab eGFR; CrCl and eGFR diverge at extremes of body weight, so Cockcroft-Gault CrCl is preferred for dosing.",
 "5. No on-site therapeutic drug monitoring (TDM). Aminoglycosides (amikacin, gentamicin) and vancomycin are normally titrated to serum levels; in their absence the fixed dosing shown is used, with close monitoring of renal function, hearing (aminoglycosides), and clinical response.",
 "6. Colistin is dosed in colistin base activity (CBA): CBA 1 mg = colistimethate sodium 30,000 IU. The US 150 mg vial is labelled in CBA mg.",
 "7. Amphotericin B refers to the conventional deoxycholate formulation; a lipid formulation is preferred where kidney function is already impaired.",
 "8. This is a clinical reference, not a substitute for prescriber judgement. Verify against the current UpToDate entry before use.",
 "",
 "Sole reference: UpToDate / Lexicomp. Sources accessed 2026-06-23. Built 2026-06-23.",
]
for i,t in enumerate(notes,1):
    cell=ns.cell(i,1,t)
    if i==1: cell.font=Font(bold=True,size=12,color="1F4E78")
    else: cell.alignment=Alignment(wrap_text=True,vertical="top")
ns.column_dimensions["A"].width=115

out="IV-ATB-Renal-Adjustment_TABLE.xlsx"; wb.save(out); print("saved",out,"rows:",len(rows))
