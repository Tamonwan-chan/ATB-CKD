# IV ATB Renal Adjustment — Web App Specification (for sign-off)

Status: COMPLETE — all open items resolved; awaiting PL final approval to build · Date: 2026-07-16 · Author: PL
Scope of this document: the design decisions, calculation logic, data schema, and open items for a GAS web app built from `IV-ATB-Renal-Adjustment_TABLE_TH.xlsx`. No code is written until PL approves this spec.

---

## 1. Purpose & users

A mobile- and PC-friendly web tool that lets a physician or pharmacist enter sex, age, weight, and serum creatinine, pick one IV anti-infective, and see the renally-adjusted dose in Thai. It is clinical decision support, not an order. No patient-identifying data is entered or stored.

- Users: physicians and pharmacists (hospital staff).
- Language: interface and output in Thai; source data in Thai (`_TABLE_TH`).
- Devices: responsive single page, phone and desktop.

## 2. Scope

In scope: 15 renally-adjusted IV drugs + 5 no-adjustment IV drugs, adults, IV route, CrCl (Cockcroft-Gault).
Out of scope (unchanged from the table project): paediatric/neonatal dosing, oral antibiotics, dialysis/RRT dosing, TDM-guided dosing.

## 3. Locked design decisions

| # | Decision | Choice |
|---|---|---|
| 1 | Core behavior | Hybrid: compute CrCl → auto-resolve the exact matching line using each drug's native thresholds → show authored Thai dose text |
| 2 | Weight basis | Actual body weight only |
| 3 | Scr units | mg/dL only, value used as entered |
| 4 | Implausible result | Soft flag when CrCl > 120 mL/min (prompt sanity-check; do not block) |
| 5 | Age guard | Hard block under 16 years; note that individual monographs may differ |
| 6 | CrCl < 10 flow | Ask "on RRT/dialysis?" first → referral message if yes; otherwise show < 10 dose + non-dialysis caution |
| 7 | No-adjust drugs | Selectable; return "ไม่ต้องปรับขนาด" + any monitoring note |
| 8 | Weight-based drugs | Show a labelled `mg/kg × weight = mg` helper for aminoglycosides, colistin, vancomycin |
| 9 | Architecture | GAS web app reading a live, normalized rules Google Sheet (edit Sheet to update; no redeploy) |
| 10 | Access | Open link, no login, no blocking gate |
| 11 | Disclaimer + source | Permanent page footer (not a gate) |
| 12 | Usual dose | Shown alongside adjusted dose |
| 13 | Status colours | None (the table dropped colour flags; app follows) |
| 14 | Result layout | "A" — matched band shown, expandable to the full 4-band table |
| 15 | Sign-off | PL verifies solo before publishing |
| 16 | Logging | None (no usage data recorded) |

## 4. CrCl calculation logic

Formula: Cockcroft-Gault.

```
CrCl (mL/min) = ((140 − age) × weight_kg × sexFactor) / (72 × Scr_mg/dL)
sexFactor = 1.0 (male), 0.85 (female)
```

Inputs and validation:

- Sex: male / female (required; sets sexFactor).
- Age: integer years. Block calculation if age < 16 (message: adults only; individual drugs may differ).
- Weight: kg, actual body weight. Plausibility bounds (e.g. 25–250 kg) with a warning outside range.
- Scr: mg/dL, positive number, used as entered (no rounding). Plausibility warning for very low/high values.
- Output CrCl displayed as an integer mL/min.
- Reliability flags (calculation still uses actual BW): soft flag if CrCl > 120; weight-threshold caution if weight > 100 kg ("CG with actual BW may overestimate CrCl at high weight — use clinical judgement") or weight < 40 kg ("low muscle mass may overestimate CrCl"). No height field.

## 5. CrCl → dose resolution logic (the core)

1. Compute CrCl.
2. For the selected drug, look up its ordered CrCl segments (native thresholds, not the display grid). Select the segment where `crcl_lower ≤ CrCl < crcl_upper`.
3. Display that segment's authored Thai dose text as the primary result. This automatically handles drugs whose real cutoffs differ from the >50 / 30–50 / 10–29 / <10 display grid (e.g. amikacin adjusts at 40–60; ceftazidime, meropenem, ertapenem have their own edges).
4. If the drug is weight-based, additionally show the `mg/kg × weight` helper (see §7).
5. If CrCl < 10, run the RRT prompt first (decision #6).
6. Provide an expandable panel listing all of the drug's segments (the full "row").

Boundary convention: lower bound inclusive, upper bound exclusive; top segment upper = 9999, bottom segment lower = 0. Each drug's true breakpoints are encoded in data, so a patient at CrCl 55 correctly lands in amikacin's 40–60 segment even though the display grid would call it ">50".

## 6. Normalized rules Sheet — schema

Two tabs. This is the machine-readable source the app reads; it is re-derived from `_TABLE_TH.xlsx` and PL-verified.

### Tab `drugs` (one row per drug)

| Column | Meaning |
|---|---|
| drug_id | stable key (e.g. `ampicillin`) |
| generic_name | EN generic (display + search) |
| brand_synonym | optional |
| strength | e.g. `1 g` |
| usual_dose_th | normal dose, Thai |
| dose_basis | `fixed` / `mg_per_kg` / `special` |
| needs_adjustment | Y / N |
| comments_th | general comments, Thai |
| monitoring_th | monitoring cautions, Thai (e.g. cloxacillin, metronidazole) |

### Tab `rules` (one row per drug × regimen × CrCl segment)

| Column | Meaning |
|---|---|
| drug_id | FK to `drugs` |
| regimen | e.g. `conventional`, `HDEI` (once-daily) — a drug may have >1 regimen |
| seg_order | display order within the regimen |
| crcl_lower | inclusive lower bound, mL/min |
| crcl_upper | exclusive upper bound, mL/min (9999 for top) |
| dose_th | authored Thai dose text for this segment |
| mgkg_low | numeric mg/kg (for helper); blank if not weight-based |
| mgkg_high | numeric mg/kg upper of a range; blank if single value |
| interval | e.g. `q8h` (for helper display) |
| loading_th | optional loading dose, Thai |
| note_th | optional per-segment note |

### Worked example — Ampicillin (fixed-dose, real data)

`drugs`: `ampicillin | Ampicillin | | 1 g | IV 1–2 g q 6 h | fixed | Y | (expert-opinion adjustment; limited PK; 2 usual regimens 1–2 g q6h or 2 g q4h) |`

`rules`:

| regimen | seg | crcl_lower | crcl_upper | dose_th |
|---|---|---|---|---|
| conventional | 1 | 50 | 9999 | ไม่ต้องปรับขนาด (CrCl ≥50) |
| conventional | 2 | 30 | 50 | 1–2 g q 8 h (CrCl 30 ถึง <50) |
| conventional | 3 | 15 | 30 | 1–2 g q 12 h |
| conventional | 4 | 10 | 15 | 1–2 g q 24 h |
| conventional | 5 | 0 | 10 | 1–2 g q 24 h |

A patient at CrCl 18 → segment 3 → "1–2 g q 12 h" (this is the auto-resolved sub-band the display cell wrote as "15–29: q12h / <15: q24h").

### Structural note — amikacin (weight-based, native thresholds)

Amikacin needs its own segments (≥60 / 40–60 / 20–40 / <20) and TWO regimens (conventional `5–7.5 mg/kg` and HDEI `15–20 mg/kg q24h`), each with `mgkg_low/high` filled so the helper can multiply. This is why `regimen` and `mgkg_low/high` exist in the schema.

## 7. mg/kg helper

For `dose_basis = mg_per_kg`, show under the authored text, clearly labelled as a calculation aid:

- Single value: `5 mg/kg × 60 kg = 300 mg q8h`
- Range: `5–7.5 mg/kg × 60 kg = 300–450 mg q8h`

Range format `300–450 mg` is approved.

Multiple regimens: when a drug has more than one regimen (e.g. amikacin `conventional` and `HDEI` once-daily), the result shows each regimen as its own labelled block, stacked — each with its own resolved band line and mg/kg helper. Both are always shown so the clinician picks the strategy.

Colistin is `special`: dose is authored in mg colistin base activity (CBA) with vial equivalents already in the text (1 vial = 150 mg CBA = 4.5 MIU; loading 300 mg CBA = 2 vials). The app displays this text and any `loading_th`; it does not re-multiply.

## 8. Output / UI spec

- App title (header): ปรับขนาดยาปฏิชีวนะฉีดตามการทำงานของไต
- Inputs: sex, age, weight, Scr, drug picker (searchable by EN generic + Thai synonyms; includes no-adjust drugs).
- Result (layout A): computed CrCl + band label; usual dose; adjusted dose (large); auto-resolved sub-band note; mg/kg helper if applicable; loading dose if applicable; multiple regimens as stacked labelled blocks; expandable "ดูทุกช่วง CrCl" showing the full segment table.
- Footer (always visible): disclaimer ("เครื่องมือช่วยตัดสินใจ ไม่ใช่คำสั่งใช้ยา ตรวจสอบกับแหล่งอ้างอิงเสมอ"), source ("อ้างอิง: UpToDate/Lexicomp"), version + "ปรับปรุงล่าสุด (last reviewed): 2026-07-16".
- No colour status badges. Neutral highlight only for the matched band.
- No personal name anywhere (per PL preference for public-facing material).

## 9. Architecture & deployment

- Google Apps Script web app, `HtmlService`, served responsive.
- Reads the normalized rules Google Sheet at runtime (cached). PL edits the Sheet to update content; no redeploy needed.
- Deploy: "Execute as me", "Anyone with the link". Share link via LINE.
- Requires internet each use (inherent to GAS). Wards with weak wifi are a known limitation (raised and accepted).

## 10. Governance

- PL re-verifies every `rules` row against source before go-live (solo).
- Version + last-reviewed date shown in footer; bump on any content change.
- No usage logging; no patient data collected or stored.

## 11. Open items — RESOLVED (2026-07-16)

1. mg/kg range `300–450 mg` format approved. Amikacin's two regimens (conventional + HDEI) shown as stacked labelled blocks (§7).
2. Reliability flags: CrCl > 120 soft flag; weight > 100 kg or < 40 kg caution; no height field (§4). Data-entry bounds: weight ~25–250 kg, age 16–120, Scr ~0.2–15 mg/dL as sanity warnings.
3. Boundary handling at native thresholds encoded per drug in data; PL verifies each. Approved to proceed.
4. App title: ปรับขนาดยาปฏิชีวนะฉีดตามการทำงานของไต.
5. Picker searches EN generic + Thai synonyms.
6. Footer shows "ปรับปรุงล่าสุด (last reviewed): 2026-07-16" + version.

## 12. Build sequence (after approval)

1. Build the normalized rules Google Sheet from `_TABLE_TH.xlsx`; PL verifies.
2. Build the GAS app (CrCl engine + resolver + layout A) against the Sheet.
3. Test cases across all drugs and every band boundary, including amikacin native thresholds, colistin CBA/vials, no-adjust drugs, CrCl < 10 RRT flow, and age/Scr guards.
4. PL clinical verification, then publish and share via LINE.
