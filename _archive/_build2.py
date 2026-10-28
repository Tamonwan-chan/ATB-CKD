from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.utils import get_column_letter
S="UpToDate/Lexicomp, {} : Drug information. Accessed 2026-06-23."

# name, strength, usual, b>50, b30-50, b10-29, b<10, comments, source-key
R=[
("Amikacin","500 mg/2 mL inj",
 "Conventional: 5 mg/kg q8h or 7.5 mg/kg q12h.\n(HDEI: 15-20 mg/kg q24h.)",
 "No adjustment (CrCl >=60).\n50-59: 5-7.5 mg/kg q12h.",
 "40-50: 5-7.5 mg/kg q12h.\n30-39: q24h.",
 "20-29: q24h.\n10-19: single dose, then individualise.",
 "Single dose, then individualise.",
 "Dose on actual BW (adjusted if TBW >1.2x IBW). No on-site TDM: monitor renal function & hearing. Native bands >=60/40-60/20-40/<20. Some give loading 7.5-10 mg/kg.",
 "Amikacin (systemic)"),
("Gentamicin","80 mg/2 mL inj",
 "Conventional: 3-5 mg/kg/day divided q8h.\n(HDEI: 5-7 mg/kg q24h.)",
 "No adjustment (CrCl >=60).\n50-59: usual dose q12h.",
 "40-50: usual dose q12h.\n30-39: q24h.",
 "20-29: q24h.\n10-19: single dose, then individualise.",
 "Single dose, then individualise.",
 "Dose on actual BW (adjust if obese). No on-site TDM: monitor renal function & hearing. Native bands >=60/40-60/20-40/<20.",
 "Gentamicin (systemic)"),
("Amoxicillin/clavulanate","1.2 g inj",
 "IV 1.2 g q8h (amoxicillin 1 g component).",
 "No adjustment.","No adjustment (CrCl >=30).",
 "Initial 1 g, then 500 mg q12h.","Initial 1 g, then 500 mg q12-24h.",
 "Renal doses expressed as amoxicillin component (IV Canadian product).",
 "Amoxicillin and clavulanate"),
("Ampicillin","1 g inj",
 "IV 1-2 g q6h (severe: 2 g q4h).",
 "1-2 g q6h (no change).","1-2 g q8h.",
 "15-29: 1-2 g q12h.\n<15: 1-2 g q24h.","1-2 g q24h.",
 "Expert-opinion adjustments. If usual 2 g q4h: q4h / q6h / q8h / q12h across bands.",
 "Ampicillin"),
("Penicillin G sodium","5 MU (3 g) inj",
 "Indication-specific; serious infection up to ~18-24 MU/day IV (divided q4-6h or continuous).",
 "No adjustment (100%).","50-75% of usual dose.",
 "25-50% of usual dose.","20-25% of usual dose.",
 "Doses are % of the usual indication-specific dose; give continuous or divided q4-6h. Monitor for neurotoxicity.",
 "Penicillin G (IV and short-acting IM)"),
("Cefazolin","1 g inj",
 "IV 1-2 g q8h.",
 "1-2 g q8h (no change).","1-2 g q8-12h.",
 "500 mg-1 g q12h (2 g q12h if severe).","500 mg-1 g q24h (CrCl <=10).",
 "Consider an initial full dose for severe infection before reducing.",
 "Cefazolin"),
("Cefotaxime","1 g inj",
 "IV 1-2 g q8h (or q6h; severe 2 g q4h).",
 "1-2 g q8h (no change).","1-2 g q12h.",
 "1-2 g q12h.","1-2 g q24h (CrCl <=10).",
 "US limited-availability. If usual q6h: q8h then q12h; if 2 g q4h: q6-8h then q12h.",
 "Cefotaxime"),
("Ceftazidime","1 g inj",
 "IV 1 g (or 2 g) q8h.",
 "1 g q8h (no change).","1 g q12h (CrCl 31-50).",
 "16-30: 1 g q24h.\n<=15: 500 mg q24h.","500 mg q24h (CrCl <=15).",
 "If usual 2 g q8h: 2 g q12h / 2 g q24h / 1 g q24h.",
 "Ceftazidime"),
("Ceftriaxone","1 g inj",
 "IV 1-2 g once daily (up to 2 g q12h for CNS).",
 "No adjustment.","No adjustment.","No adjustment.",
 "No adjustment (>2 g/day: monitor, esp. hepatic dysfunction).",
 "Biliary elimination; not significantly dialysed.",
 "Ceftriaxone"),
("Ciprofloxacin","400 mg/vial inj",
 "IV 400 mg q8-12h.",
 "400 mg q8-12h.","400 mg q8-12h.",
 "200-400 mg q12-24h (load 400 mg if 200 q24h).","200-400 mg q12-24h.",
 "Severe infections: use the higher end of the interval.",
 "Ciprofloxacin (systemic)"),
("Clindamycin","600 mg/4 mL inj",
 "IV 600-900 mg q8h.",
 "No adjustment.","No adjustment.","No adjustment.","No adjustment.",
 "Hepatically eliminated; not dialysed.",
 "Clindamycin (systemic)"),
("Cloxacillin","1 g inj",
 "IV 1-2 g q4-6h (max ~6 g/day).",
 "No adjustment.","No adjustment.","No adjustment (CrCl >=10).",
 "No specific adjustment; monitor closely; consider <=8 g/day.",
 "US not-available product. Nephrotoxicity reported at >=8 g/day.",
 "Cloxacillin"),
("Colistimethate sodium","150 mg/vial inj",
 "Loading 300 mg CBA, then maintenance by CrCl (start 12 h later), in 2 divided doses.",
 "300 mg CBA/day (CrCl >=50).","183-250 mg CBA/day.",
 "150-183 mg CBA/day.","117 mg CBA/day (CrCl <10).",
 "Simplified strategy shown; detailed per-10 CBA ladder in Notes tab. CBA 1 mg = 30,000 IU; 150 mg vial is CBA-labelled. CrCl by Cockcroft-Gault, adjusted BW.",
 "Colistin (colistimethate)"),
("Meropenem","1 g/vial inj",
 "IV 1 g (or 2 g) q8h (30-min or extended 3-h infusion).",
 "1 g q8h (no change).","1 g q12h (CrCl >25-50).",
 "10-25: 500 mg q12h.\n26-29: 1 g q12h.","500 mg q24h.",
 "If usual 2 g q8h: 2 g q12h / 1 g q12h / 1 g q24h or 500 mg q12h. Extended 3-h infusion improves attainment.",
 "Meropenem"),
("Metronidazole","0.5% in 100 mL (500 mg) inj",
 "IV 500 mg q8h (q8-12h).",
 "No adjustment.","No adjustment.","No adjustment.",
 "No adjustment (500 mg q12h may suffice; monitor).",
 "Single-dose regimens need no adjustment. Monitor in CrCl <30 (metabolite accumulation).",
 "Metronidazole (systemic)"),
("Piperacillin/tazobactam","4.5 g/vial inj",
 "IV 4.5 g q6h (or 3.375 g q6h); extended infusion if CrCl >100.",
 "4.5 g q6h (CrCl 40-100; >100 use extended infusion).",
 "40-50: 4.5 g q6h.\n30-39: 4.5 g q8h or 3.375 g q6h.",
 "20-29: 4.5 g q8h or 3.375 g q6h.\n<20: 4.5 g q12h or 2.25 g q6h.",
 "4.5 g q12h or 2.25 g q6h (CrCl <20).",
 "Doses = piperacillin + tazobactam combined. If usual 3.375 g q6h: 3.375 q6h / 2.25 q6h / 2.25 q8h. Extended infusion (3-4 h) preferred for high CrCl/severe.",
 "Piperacillin and tazobactam"),
("Vancomycin","500 mg/vial inj",
 "Loading 25-30 mg/kg, then maintenance by CrCl.",
 "50-90: 15-20 mg/kg q12h.\n>90: q8-12h.",
 "10-15 mg/kg q24h (CrCl 15 to <50).",
 "15-29: 10-15 mg/kg q24h.\n<15: q48-72h.",
 "10-15 mg/kg q48-72h (CrCl <15).",
 "Initial dose on actual body weight. Normally titrated to levels (AUC/MIC 400-600); no on-site TDM, monitor renal function & response. Max loading 3 g.",
 "Vancomycin"),
("Ertapenem","1 g inj",
 "IV 1 g once daily.",
 "1 g daily (no change).","1 g daily (CrCl >30).",
 "500 mg daily (CrCl <=30).","500 mg daily.",
 "No BSA adjustment of CrCl needed for dosing.",
 "Ertapenem"),
("Amphotericin B (conventional deoxycholate)","50 mg inj",
 "IV 0.5-1 mg/kg/day (range 0.3-1.5; max 1.5).",
 "No dose adjustment by CrCl (see comments).","No dose adjustment by CrCl.",
 "No dose adjustment by CrCl.","No dose adjustment by CrCl.",
 "Nephrotoxic: use only if benefits outweigh risks; lipid formulation preferred if kidney function already impaired. Hydration/Na loading (1 L NS pre-dose), longer infusion, avoid other nephrotoxins; monitor kidney function.",
 "Amphotericin B deoxycholate (conventional)"),
("Remdesivir","100 mg/vial inj",
 "IV 200 mg day 1, then 100 mg once daily (5 days, up to 10).",
 "No adjustment.","No adjustment.","No adjustment.","No adjustment.",
 "Earlier eGFR <30 restriction no longer applied per current UpToDate.",
 "Remdesivir"),
]

wb=Workbook(); ws=wb.active; ws.title="Renal adjustment"
navy=PatternFill("solid",fgColor="1F4E78"); band=PatternFill("solid",fgColor="2E6CA4")
hdrf=Font(bold=True,color="FFFFFF",size=10); title=Font(bold=True,size=13,color="1F4E78"); sub=Font(italic=True,size=9,color="595959")
thin=Side(style="thin",color="BFBFBF"); border=Border(left=thin,right=thin,top=thin,bottom=thin)
wrap=Alignment(wrap_text=True,vertical="top"); ctr=Alignment(horizontal="center",vertical="center"); alt=PatternFill("solid",fgColor="F2F6FB")

ws.merge_cells("A1:J1"); ws["A1"]="IV Antibiotic Renal Dose Adjustment (Adults)"; ws["A1"].font=title
ws.merge_cells("A2:J2")
ws["A2"]=("Reference: UpToDate / Lexicomp only. Adults only. Not for dialysis patients (no RRT on site) - refer. "
 "Dose by CrCl (Cockcroft-Gault, mL/min). Lab eGFR (mL/min/1.73m2) is a rough screen only - calculate Cockcroft-Gault CrCl for dosing; the two diverge at extremes of body weight. "
 "Where a drug's true cutoff differs from a column edge, the exact threshold is noted in the cell. Verify against current UpToDate before use.")
ws["A2"].font=sub; ws["A2"].alignment=Alignment(wrap_text=True,vertical="top"); ws.row_dimensions[2].height=56

headers=["No.","Generic name","Strength/form","Usual adult dose\n(normal renal function)",
 "CrCl >50","CrCl 30-50","CrCl 10-29","CrCl <10","Comments","Source"]
hr=4
for c,h in enumerate(headers,1):
    cell=ws.cell(hr,c,h); cell.fill=band if 5<=c<=8 else navy; cell.font=hdrf
    cell.alignment=Alignment(wrap_text=True,horizontal="center",vertical="center"); cell.border=border
ws.row_dimensions[hr].height=34

for i,row in enumerate(R,1):
    name,sf,usual,b1,b2,b3,b4,comm,sk=row
    r=hr+i
    vals=[i,name,sf,usual,b1,b2,b3,b4,comm,S.format(sk)]
    for c,v in enumerate(vals,1):
        cell=ws.cell(r,c,v); cell.border=border; cell.alignment=ctr if c==1 else wrap
        if i%2==0: cell.fill=alt
    maxlines=max(str(v).count("\n")+1 for v in vals)
    ws.row_dimensions[r].height=max(28, maxlines*13+6)

widths=[4,20,16,25,17,18,20,18,30,24]
for c,w in enumerate(widths,1): ws.column_dimensions[get_column_letter(c)].width=w
ws.freeze_panes="C5"; ws.auto_filter.ref=f"A{hr}:J{hr+len(R)}"

ns=wb.create_sheet("Notes & disclaimers")
notes=[
 "IV Antibiotic Renal Dose Adjustment - Notes & Disclaimers","",
 "1. Population: adults only. Not for paediatric, neonatal, or pregnancy dosing.",
 "2. Not applicable to patients on any dialysis (HD/PD/CRRT). The hospital offers no renal replacement therapy; refer these patients.",
 "3. Dose by CrCl (Cockcroft-Gault, mL/min) using actual body weight, except amikacin (adjusted BW if TBW >1.2x IBW) and colistin (adjusted BW).",
 "4. Lab eGFR (CKD-EPI, mL/min/1.73m2) may be used as a rough screen only. Calculate Cockcroft-Gault CrCl for actual dosing; CrCl and eGFR diverge at extremes of body weight.",
 "5. Band columns use >50 / 30-50 / 10-29 / <10 for readability. Some drugs have different native cutoffs (e.g. aminoglycosides >=60/40-60/20-40/<20; ceftazidime 31/16/15; meropenem >25-50/10-25/<10; ertapenem >30). The exact threshold is stated inside the affected cell.",
 "6. No on-site therapeutic drug monitoring (TDM). Aminoglycosides (amikacin, gentamicin) and vancomycin are normally titrated to serum levels; in their absence the fixed dosing shown is used, with close monitoring of renal function, hearing (aminoglycosides), and clinical response.",
 "7. Colistin is dosed in colistin base activity (CBA): CBA 1 mg = colistimethate 30,000 IU; the US 150 mg vial is CBA-labelled. The grid uses the simplified renal strategy. Detailed maintenance ladder (primary strategy, total daily CBA in 2 divided doses): CrCl >=90: 360 mg/day; 80-<90: 340; 70-<80: 300; 60-<70: 275; 50-<60: 245; 40-<50: 220; 30-<40: 195; 20-<30: 175; 10-<20: 160; 5-<10: 145; <5: 130 mg/day.",
 "8. Amphotericin B refers to the conventional deoxycholate formulation; a lipid formulation is preferred where kidney function is already impaired.",
 "9. This is a clinical reference, not a substitute for prescriber judgement. Verify against the current UpToDate entry before use.","",
 "Sole reference: UpToDate / Lexicomp. Sources accessed 2026-06-23. Built 2026-06-23.",
]
for i,t in enumerate(notes,1):
    cell=ns.cell(i,1,t)
    if i==1: cell.font=Font(bold=True,size=12,color="1F4E78")
    else: cell.alignment=Alignment(wrap_text=True,vertical="top")
ns.column_dimensions["A"].width=120

out="IV-ATB-Renal-Adjustment_TABLE.xlsx"; wb.save(out); print("saved",out,"rows:",len(R))
