# IV Antibiotic Renal Adjustment Table — PRD and Plan

_Version 1.0. Date: 2026-06-22. Status: APPROVED by PL. Scope and 20-drug list signed off; section 11 open questions resolved (see section 14)._
_Sole reference for all dosing content: UpToDate / Lexicomp. No other source will be used._

---

## 1. Problem

Prescribers, nurses, and pharmacists at the hospital need a single, consistent reference for adjusting intravenous anti-infective doses by renal function. At present the information is scattered across drug inserts and individual UpToDate look-ups, which is slow at the point of care and prone to inconsistency. A consolidated table keyed to renal function would shorten the time to a correct dose and reduce dosing error in patients with impaired kidneys.

## 2. Success criteria (definition of done)

1. One Excel file containing every formulary IV anti-infective in scope, with the usual adult dose and the adjusted dose for each renal band.
2. Every dose cell traceable to a UpToDate / Lexicomp source page.
3. The table is readable by pharmacists, nurses, and doctors without further explanation, in English.
4. Drugs requiring no adjustment are present and explicitly marked, so an omission is never read as "not yet checked".
5. Disclaimers and caveats (dialysis out of scope, Cockcroft-Gault basis, verify against source) are printed on the sheet.

## 3. Scope

**In scope**

- Population: adults only.
- Route: intravenous only. IM-only agents are excluded.
- Drugs: the formulary injectable anti-infectives listed in section 8, that is the antibacterials plus amphotericin B and remdesivir.
- Renal metrics: both CrCl (Cockcroft-Gault) and eGFR (CKD-EPI), presented as two separate dose blocks.
- Renal bands: four bands, >50, 30-50, 10-29, and <10 (mL/min).
- Dosing granularity: usual dosing per drug. One representative adult regimen, not indication-specific variants.

**Out of scope**

- Renal replacement therapy (haemodialysis, peritoneal dialysis, CRRT). The hospital does not offer RRT. Dialysis patients are flagged as outside the table and for referral.
- Therapeutic drug monitoring. The hospital has no TDM service, so vancomycin, amikacin, and gentamicin are given fixed per-band empiric dosing with no "adjust to levels" instruction.
- Paediatric and neonatal dosing (handled by your existing neonatal sepsis materials).
- Indication-specific high-dose regimens (for example meropenem for meningitis).

## 4. Constraints

- Reference restricted to UpToDate / Lexicomp by your instruction.
- Output format: Excel only.
- Source data is pulled manually by you; I do not have UpToDate access.
- Tooling: Microsoft 365 Excel.

## 5. Reference and sourcing workflow

You hold full UpToDate access. You log into UpToDate in Brave; I then drive the browser through Claude in Chrome, navigate to each drug's Lexicomp entry, and read the "Dosing: Adult" and "Dosing: Kidney impairment (adult)" sections live off the page. I transfer the figures into the table and record the source URL and access date. I never see or handle your credentials. Reading on-page text replaces downloading PDFs, which removes a per-file step; offline PDFs remain an option if you want archived copies.

## 6. Deliverables

1. **Extraction drug list** (Task 1): a strictly minimal Excel list of the in-scope drugs so you can work through the downloads one by one. Columns: No., Generic name, Formulary strength/form. Nothing else.
2. **Final renal-adjustment table**: the Excel reference described in section 7, built once the Lexicomp PDFs are in the folder.

## 7. Final table design

One worksheet, one row per drug. Proposed columns, left to right:

| Block | Columns |
|---|---|
| Identity | No., Generic name, Formulary strength/form |
| Normal | Usual adult dose (normal renal function) |
| CrCl block (Cockcroft-Gault, mL/min) | >50, 30-50, 10-29, <10 |
| eGFR block (CKD-EPI, mL/min/1.73m²) | >50, 30-50, 10-29, <10 |
| Notes | Comments (loading dose, maximum dose, key caveats), Source reference |

Design notes:
- The usual-dose column and the CrCl >50 column will often match; you asked to keep both explicit.
- The CrCl and eGFR blocks use identical numeric bands, so their dose entries will usually be identical. This is the redundancy flagged during planning. If the first draft reads as repetitive, we can collapse the two blocks into one labelled for both metrics.
- Loading doses (for example colistin, vancomycin) appear in the Comments column, not as a separate column.
- Drugs needing no adjustment are marked "no adjustment required" across the bands.

## 8. Proposed in-scope drug list (for your confirmation)

Derived from `รายการรพ.ตามแผนจัดซื้อ 69.xls`, injectable anti-infectives, IV only. The "renal adjustment" column is my expectation, to be confirmed against Lexicomp.

| No. | Generic name | Formulary strength | Renal adjustment expected? |
|---|---|---|---|
| 1 | Amikacin | 500 mg/2 mL | Yes |
| 2 | Amoxicillin/clavulanate | 1.2 g | Yes |
| 3 | Ampicillin | 1 g | Yes |
| 4 | Penicillin G sodium | 5 MU | Yes |
| 5 | Cefazolin | 1 g | Yes |
| 6 | Cefotaxime | 1 g | Yes |
| 7 | Ceftazidime | 1 g | Yes |
| 8 | Ceftriaxone | 1 g | No |
| 9 | Ciprofloxacin | 400 mg/vial | Yes |
| 10 | Clindamycin | 600 mg/4 mL | No |
| 11 | Cloxacillin | 1 g | No |
| 12 | Colistimethate sodium | 150 mg/vial | Yes |
| 13 | Gentamicin | 80 mg/2 mL | Yes |
| 14 | Meropenem | 1 g/vial | Yes |
| 15 | Metronidazole | 0.5% in 100 mL | Minimal |
| 16 | Piperacillin/tazobactam | 4.5 g/vial | Yes |
| 17 | Vancomycin | 500 mg/vial | Yes |
| 18 | Ertapenem | 1 g | Yes |
| 19 | Amphotericin B | 50 mg | By nephrotoxicity, not CrCl band |
| 20 | Remdesivir | 100 mg/vial | By eGFR threshold |

Excluded by rule: Benzathine penicillin (IM route).

## 9. Division of labour

**What you (PL) do**

1. Confirm or amend this plan, including the drug list in section 8 and the open questions in section 11.
2. For each drug, download the Lexicomp "Dosing: Adult" and "Dosing: Kidney impairment (adult)" pages as PDF and save them to this folder.
3. Decide the open questions in section 11.
4. Review the final table and confirm clinical accuracy before it is used.

**What I (Claude) do**

1. Produce this plan and, on approval, the extraction drug list (Task 1).
2. Parse the Lexicomp PDFs you provide.
3. Build the Excel table to the section 7 design, every cell sourced.
4. Cross-check each dose against its source PDF and flag any gap or ambiguity.
5. Apply your voice and formatting conventions and the required disclaimers.

## 10. Workflow steps in order

1. You approve this plan.
2. I generate the extraction drug list (Excel).
3. You download the Lexicomp PDFs into the folder.
4. I build the table from those PDFs.
5. I verify every cell against source and flag gaps.
6. You review and confirm clinical accuracy.
7. Final file saved to this folder, versioned and dated.

## 14. Resolved decisions (was section 11 open questions; closed 2026-06-22)

1. **Amphotericin B formulation**: conventional deoxycholate (not liposomal).
2. **Colistin units**: colistimethate sodium (CMS) milligrams. Revisit if UpToDate expresses dosing in colistin base activity.
3. **Body weight for Cockcroft-Gault**: actual body weight. Revisit if UpToDate advises ideal or adjusted weight.
4. **File location**: dedicated workstation folder "IV ATB Renal Adjustment" inside the ATB folder. Done.
5. **eGFR equation**: CKD-EPI 2021 race-free, or as UpToDate clarifies its own eGFR basis.

## 12. Assumptions and defaults

- Generic drug names will be standardised to English (for example "Meropenem", "Piperacillin/tazobactam"), not the abbreviated formulary spellings.
- A printed footer will carry: version, date, "Reference: UpToDate/Lexicomp", and "Not applicable to dialysis patients, refer".
- One worksheet, with the drug identity columns frozen for scrolling.

## 13. Disclaimers to print on the sheet

1. For adults only. Not for paediatric, neonatal, or pregnant dosing.
2. Not applicable to patients on any form of dialysis. Refer these patients.
3. CrCl by Cockcroft-Gault is the basis for dosing; lab eGFR is an estimate and may diverge at extremes of body weight.
4. A clinical reference, not a substitute for prescriber judgement. Verify against the current UpToDate entry.

---

_Next step: confirm or amend, and answer section 11. On your approval I will generate the extraction drug list._
