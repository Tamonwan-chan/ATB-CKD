/* =========================================================================
   เครื่องมือคำนวณขนาดยาฆ่าเชื้อตามการทำงานของไต
   ออกแบบและพัฒนาโดย: ภญ.ธมลวรรณ จันทร์แก้ว (โรงพยาบาลสันกำแพง)
   ระบบนี้ถือเป็นทรัพย์สินทางปัญญาของผู้พัฒนา ห้ามคัดลอก ดัดแปลง หรือนำไปใช้โดยไม่ได้รับอนุญาต
   ลิขสิทธิ์ © 2569 (2026) สงวนสิทธิ์ทุกประการ
   =========================================================================
   Drug data — edit here, then commit & push to update the live app.
   Regenerate from IV-ATB-Renal-App_RULES.xlsx if you prefer editing the spreadsheet. */
var DATA = {
 "iv": [
  {
   "id": "amikacin",
   "generic": "Amikacin",
   "syn": "อะมิคาซิน; Amikin",
   "strength": "500 mg",
   "usual": "5 mg/kg q 8 h หรือ 7.5 mg/kg q 12 h; HDEI 15-20 mg/kg q 24 h",
   "basis": "mg_per_kg",
   "adj": true,
   "comments": "คิดขนาดตามน้ำหนักจริง (ถ้า TBW >1.2 เท่าของ IBW ใช้ adjusted BW). ผู้เชี่ยวชาญบางท่านให้ขนาดนำ 7.5-10 mg/kg.",
   "monitor": "ไม่มี TDM ในรพ.: ติดตามการทำงานของไตและการได้ยิน.",
   "regimens": [
    {
     "name": "Conventional (แบ่งหลายครั้ง/วัน)",
     "segs": [
      {
       "lo": 60.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥60): 5 mg/kg q 8 h หรือ 7.5 mg/kg q 12 h",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "q 8-12 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 60.0,
       "dose": "5-7.5 mg/kg q 12 h",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "q 12 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 40.0,
       "hi": 50.0,
       "dose": "5-7.5 mg/kg q 12 h",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "q 12 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "5-7.5 mg/kg q 24 h",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "q 24 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "5-7.5 mg/kg q 24 h",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "q 24 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 20.0,
       "dose": "ให้ครั้งเดียว แล้วปรับตามผู้ป่วย",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "ครั้งเดียว",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "ให้ครั้งเดียว แล้วปรับตามผู้ป่วย",
       "mgl": 5.0,
       "mgh": 7.5,
       "iv": "ครั้งเดียว",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "HDEI (วันละครั้ง)",
     "segs": [
      {
       "lo": 60.0,
       "hi": 9999.0,
       "dose": "15-20 mg/kg q 24 h (สูงสุด 30 mg/kg)",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 24 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 60.0,
       "dose": "15-20 mg/kg q 36 h",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 36 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 40.0,
       "hi": 50.0,
       "dose": "15-20 mg/kg q 36 h",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 36 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "15-20 mg/kg q 48 h",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 48 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 30.0,
       "dose": "ไม่แนะนำสูตร HDEI เมื่อ CrCl <30 — ใช้สูตร Conventional",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": "(เพิ่มโดยผู้จัดทำ: ตารางเดิมเว้นว่าง) ตรวจสอบ"
      }
     ]
    }
   ]
  },
  {
   "id": "amoxiclav",
   "generic": "Amoxicillin/clavulanate",
   "syn": "ออกเมนติน; Augmentin; co-amoxiclav",
   "strength": "1.2 g",
   "usual": "IV 1.2 g q 8 h",
   "basis": "fixed",
   "adj": true,
   "comments": "ขนาดยาในภาวะไตเสื่อมคิดตามส่วน amoxicillin.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 30.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥30): IV 1.2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 30.0,
       "dose": "เริ่ม 1 g จากนั้น 500 mg q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "เริ่ม 1 g จากนั้น 500 mg q 12-24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "ampicillin",
   "generic": "Ampicillin",
   "syn": "แอมพิซิลลิน",
   "strength": "1 g",
   "usual": "IV 1-2 g q 6 h (หรือ 2 g q 4 h)",
   "basis": "fixed",
   "adj": true,
   "comments": "การปรับขนาดอ้างอิงความเห็นผู้เชี่ยวชาญ ข้อมูล PK จำกัด.",
   "monitor": "",
   "regimens": [
    {
     "name": "1-2 g q6h",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥50): 1-2 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 50.0,
       "dose": "1-2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 15.0,
       "hi": 30.0,
       "dose": "1-2 g q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 15.0,
       "dose": "1-2 g q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "2 g q4h (รุนแรง)",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥50): 2 g q 4 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 50.0,
       "dose": "2 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 15.0,
       "hi": 30.0,
       "dose": "2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 15.0,
       "dose": "2 g q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "cefazolin",
   "generic": "Cefazolin",
   "syn": "เซฟาโซลิน; Ancef",
   "strength": "1 g",
   "usual": "IV 1-2 g q 8 h",
   "basis": "fixed",
   "adj": true,
   "comments": "ในการติดเชื้อรุนแรง พิจารณาให้ขนาดเต็มก่อนค่อยลดขนาด.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥50): 1-2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 50.0,
       "dose": "1-2 g q 8-12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 30.0,
       "dose": "500 mg-1 g q 12 h (2 g q 12 h ถ้ารุนแรง)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "500 mg-1 g q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "cefotaxime",
   "generic": "Cefotaxime",
   "syn": "เซโฟแทกซิม; Claforan",
   "strength": "1 g",
   "usual": "1-2 g q 8 h (หรือ q6h / 2 g q4h)",
   "basis": "fixed",
   "adj": true,
   "comments": "แสดง 3 สูตรปกติตามข้อบ่งใช้/ความรุนแรง.",
   "monitor": "",
   "regimens": [
    {
     "name": "1-2 g q8h",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 1-2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 50.0,
       "dose": "1-2 g q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "1-2 g q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "1-2 g q6h",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 1-2 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 50.0,
       "dose": "1-2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "1-2 g q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "2 g q4h (รุนแรง)",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 2 g q 4 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 50.0,
       "dose": "2 g q 6-8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "2 g q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "ceftazidime",
   "generic": "Ceftazidime",
   "syn": "เซฟตาซิดีม; Fortum",
   "strength": "1 g",
   "usual": "IV 1 g q 8 h (หรือ 2 g q 8 h)",
   "basis": "fixed",
   "adj": true,
   "comments": "เลือก 1 g หรือ 2 g q8h ตามข้อบ่งใช้/ความรุนแรง (เช่น 2 g q8h สำหรับ Pseudomonas).",
   "monitor": "",
   "regimens": [
    {
     "name": "1 g q8h",
     "segs": [
      {
       "lo": 51.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 1 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 31.0,
       "hi": 51.0,
       "dose": "1 g q 12 h (CrCl 31-50)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 16.0,
       "hi": 31.0,
       "dose": "1 g q 24 h (CrCl 16-30)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 16.0,
       "dose": "500 mg q 24 h (CrCl ≤15)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "2 g q8h (Pseudomonas/รุนแรง)",
     "segs": [
      {
       "lo": 51.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 31.0,
       "hi": 51.0,
       "dose": "2 g q 12 h (CrCl 31-50)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 16.0,
       "hi": 31.0,
       "dose": "2 g q 24 h (CrCl 16-30)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 16.0,
       "dose": "1 g q 24 h (CrCl ≤15)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "ciprofloxacin",
   "generic": "Ciprofloxacin",
   "syn": "ไซโปรฟลอกซาซิน; Cipro",
   "strength": "400 mg",
   "usual": "IV 400 mg q 8-12 h",
   "basis": "fixed",
   "adj": true,
   "comments": "การติดเชื้อรุนแรง: ใช้ความถี่ช่วงสูง. CrCl <30: ให้ขนาดนำ 400 mg ถ้าใช้ 200 mg q 24 h.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 30.0,
       "hi": 9999.0,
       "dose": "400 mg q 8-12 h (CrCl ≥30)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 30.0,
       "dose": "200-400 mg q 12-24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "colistin",
   "generic": "Colistimethate sodium",
   "syn": "โคลิสติน; Colistin; CMS",
   "strength": "150 mg (1 vial=150 mg CBA=4.5 MIU)",
   "usual": "ขนาดนำ 300 mg CBA = 2 vial แล้วขนาดคงระดับตาม CrCl (แบ่ง 2 ครั้ง)",
   "basis": "special",
   "adj": true,
   "comments": "ขนาดยาเป็น mg CBA (colistin base activity) พร้อมจำนวน vial. แบ่งให้ 2 ครั้ง/วัน. ใช้ CrCl (Cockcroft-Gault) ด้วย adjusted body weight.",
   "monitor": "ติดตามการทำงานของไต.",
   "regimens": [
    {
     "name": "ขนาดคงระดับ (แบ่ง 2 ครั้ง/วัน)",
     "segs": [
      {
       "lo": 90.0,
       "hi": 9999.0,
       "dose": "360 mg CBA/วัน (2.4 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial (เริ่มขนาดคงระดับ 12 ชม. หลังขนาดนำ)",
       "note": ""
      },
      {
       "lo": 80.0,
       "hi": 90.0,
       "dose": "340 mg CBA/วัน (2.25 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial (เริ่ม 12 ชม. หลังขนาดนำ)",
       "note": ""
      },
      {
       "lo": 70.0,
       "hi": 80.0,
       "dose": "300 mg CBA/วัน (2 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 60.0,
       "hi": 70.0,
       "dose": "275 mg CBA/วัน (1.8 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 60.0,
       "dose": "245 mg CBA/วัน (1.6 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 40.0,
       "hi": 50.0,
       "dose": "220 mg CBA/วัน (1.5 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "195 mg CBA/วัน (1.3 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "175 mg CBA/วัน (1.2 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 20.0,
       "dose": "160 mg CBA/วัน (1.1 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 5.0,
       "hi": 10.0,
       "dose": "145 mg CBA/วัน (1 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 5.0,
       "dose": "130 mg CBA/วัน (0.9 vial)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "ขนาดนำ 300 mg CBA = 2 vial",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "ertapenem",
   "generic": "Ertapenem",
   "syn": "เออร์ตาพีเนม; Invanz",
   "strength": "1 g",
   "usual": "IV 1 g วันละครั้ง",
   "basis": "fixed",
   "adj": true,
   "comments": "ไม่ต้องปรับ CrCl ตาม BSA ในการคิดขนาดยา.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 30.0,
       "hi": 9999.0,
       "dose": "1 g วันละครั้ง (CrCl >30, ไม่เปลี่ยน)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 30.0,
       "dose": "500 mg วันละครั้ง (CrCl ≤30)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "gentamicin",
   "generic": "Gentamicin",
   "syn": "เจนตามัยซิน; Garamycin",
   "strength": "80 mg",
   "usual": "Conventional 3-5 mg/kg/วัน แบ่ง q8h; HDEI 5-7 mg/kg q24h",
   "basis": "mg_per_kg",
   "adj": true,
   "comments": "คิดขนาดตามน้ำหนักจริง (ปรับถ้าอ้วน). ช่วงค่าเดิม ≥60/40-60/20-40/<20.",
   "monitor": "ไม่มี TDM ในรพ.: ติดตามการทำงานของไตและการได้ยิน.",
   "regimens": [
    {
     "name": "Conventional (3-5 mg/kg/วัน แบ่ง q8h)",
     "segs": [
      {
       "lo": 60.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥60): ขนาดปกติ q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 60.0,
       "dose": "ขนาดปกติ q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 40.0,
       "hi": 50.0,
       "dose": "ขนาดปกติ q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "ขนาดปกติ q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "ขนาดปกติ q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 20.0,
       "dose": "ขนาดปกติ q 36-48 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "ขนาดปกติ q 36-48 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "HDEI (5-7 mg/kg q24h)",
     "segs": [
      {
       "lo": 60.0,
       "hi": 9999.0,
       "dose": "5-7 mg/kg q 24 h (CrCl ≥60)",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "q 24 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 60.0,
       "dose": "5-7 mg/kg q 36 h",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "q 36 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 40.0,
       "hi": 50.0,
       "dose": "5-7 mg/kg q 36 h",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "q 36 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "5-7 mg/kg q 48 h",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "q 48 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "5-7 mg/kg q 48 h",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "q 48 h",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 20.0,
       "dose": "ให้ครั้งเดียว แล้วปรับตามผู้ป่วย",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "ครั้งเดียว",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "ให้ครั้งเดียว แล้วปรับตามผู้ป่วย",
       "mgl": 5.0,
       "mgh": 7.0,
       "iv": "ครั้งเดียว",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "meropenem",
   "generic": "Meropenem",
   "syn": "เมอโรพีเนม; Meronem",
   "strength": "1 g",
   "usual": "IV 1 g q 8 h (หรือ 2 g q 8 h)",
   "basis": "fixed",
   "adj": true,
   "comments": "การให้แบบ infusion นาน 3 ชม. ช่วยให้ถึงเป้าหมายดีขึ้น.",
   "monitor": "",
   "regimens": [
    {
     "name": "1 g q8h",
     "segs": [
      {
       "lo": 51.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 1 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 26.0,
       "hi": 51.0,
       "dose": "1 g q 12 h (CrCl 26-50)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 26.0,
       "dose": "500 mg q 12 h (CrCl 10-25)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "500 mg q 24 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "2 g q8h",
     "segs": [
      {
       "lo": 51.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50): 2 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 26.0,
       "hi": 51.0,
       "dose": "2 g q 12 h (CrCl 26-50)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 26.0,
       "dose": "1 g q 12 h (CrCl 10-25)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "1 g q 24 h หรือ 500 mg q 12 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "penicillinG",
   "generic": "Penicillin G sodium",
   "syn": "เพนิซิลลิน จี; Pen G; benzylpenicillin",
   "strength": "5 MU",
   "usual": "สูงสุด ~18-24 MU/วัน แบ่ง q4-6h หรือ continuous",
   "basis": "fixed",
   "adj": true,
   "comments": "ขนาดยาเป็น % ของขนาดปกติตามข้อบ่งใช้. ให้แบบ continuous หรือแบ่ง q 4-6 h.",
   "monitor": "ติดตามอาการพิษต่อระบบประสาท.",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 50.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl >50)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 50.0,
       "dose": "50-75% ของขนาดปกติ",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 10.0,
       "hi": 30.0,
       "dose": "25-50% ของขนาดปกติ",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 10.0,
       "dose": "20-25% ของขนาดปกติ",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "piptazo",
   "generic": "Piperacillin/tazobactam",
   "syn": "พิเพอราซิลลิน/ทาโซแบคแทม; Tazocin",
   "strength": "4.5 g",
   "usual": "IV 3.375 g q 6 h (หรือ 4.5 g q 6 h)",
   "basis": "fixed",
   "adj": true,
   "comments": "ขนาดยา = piperacillin + tazobactam รวมกัน.",
   "monitor": "",
   "regimens": [
    {
     "name": "3.375 g q6h",
     "segs": [
      {
       "lo": 40.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥40): 3.375 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "2.25 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "2.25 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 20.0,
       "dose": "2.25 g q 8 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    },
    {
     "name": "4.5 g q6h",
     "segs": [
      {
       "lo": 40.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด (CrCl ≥40): 4.5 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 40.0,
       "dose": "4.5 g q 8 h หรือ 3.375 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 20.0,
       "hi": 30.0,
       "dose": "4.5 g q 8 h หรือ 3.375 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 20.0,
       "dose": "4.5 g q 12 h หรือ 2.25 g q 6 h",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "vancomycin",
   "generic": "Vancomycin",
   "syn": "แวนโคมัยซิน; Vancocin",
   "strength": "500 mg",
   "usual": "ขนาดนำ 25-30 mg/kg แล้ว 15-20 mg/kg ตาม CrCl",
   "basis": "mg_per_kg",
   "adj": true,
   "comments": "คิดขนาดเริ่มต้นตามน้ำหนักจริง. ขนาดนำสูงสุด 3 g.",
   "monitor": "ไม่มี TDM ในรพ.: ติดตามการทำงานของไตและการตอบสนอง.",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 90.0,
       "hi": 9999.0,
       "dose": "15-20 mg/kg q 8-12 h",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 8-12 h",
       "load": "ขนาดนำ 25-30 mg/kg (สูงสุด 3 g)",
       "note": ""
      },
      {
       "lo": 50.0,
       "hi": 90.0,
       "dose": "15-20 mg/kg q 12 h",
       "mgl": 15.0,
       "mgh": 20.0,
       "iv": "q 12 h",
       "load": "ขนาดนำ 25-30 mg/kg (สูงสุด 3 g)",
       "note": ""
      },
      {
       "lo": 30.0,
       "hi": 50.0,
       "dose": "10-15 mg/kg q 24 h",
       "mgl": 10.0,
       "mgh": 15.0,
       "iv": "q 24 h",
       "load": "ขนาดนำ 25-30 mg/kg (สูงสุด 3 g)",
       "note": ""
      },
      {
       "lo": 15.0,
       "hi": 30.0,
       "dose": "10-15 mg/kg q 24 h",
       "mgl": 10.0,
       "mgh": 15.0,
       "iv": "q 24 h",
       "load": "ขนาดนำ 25-30 mg/kg (สูงสุด 3 g)",
       "note": ""
      },
      {
       "lo": 0.0,
       "hi": 15.0,
       "dose": "10-15 mg/kg q 48-72 h",
       "mgl": 10.0,
       "mgh": 15.0,
       "iv": "q 48-72 h",
       "load": "ขนาดนำ 25-30 mg/kg (สูงสุด 3 g)",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "amphotericinB",
   "generic": "Amphotericin B (deoxycholate)",
   "syn": "แอมโฟเทอริซิน บี; conventional/deoxycholate",
   "strength": "50 mg",
   "usual": "ตามข้อบ่งใช้ (conventional deoxycholate)",
   "basis": "special",
   "adj": false,
   "comments": "ไม่ปรับขนาดตามช่วง CrCl แต่เป็นพิษต่อไต. แนะนำสูตร lipid เมื่อการทำงานของไตบกพร่องอยู่แล้ว. ถ้า Scr สูงขึ้น: เปลี่ยนยา หรือหยุด 24-48 ชม. แล้วเริ่มใหม่ครึ่งขนาด.",
   "monitor": "ติดตาม Scr และเกลือแร่ (K, Mg) ใกล้ชิด. ให้สารน้ำ/โซเดียมก่อนให้ยา. เลี่ยงยาที่เป็นพิษต่อไตอื่น.",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาดตาม CrCl (ระวังพิษต่อไต — ดูหมายเหตุ/การติดตาม)",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "cloxacillin",
   "generic": "Cloxacillin",
   "syn": "คลอกซาซิลลิน",
   "strength": "",
   "usual": "ตามข้อบ่งใช้",
   "basis": "fixed",
   "adj": false,
   "comments": "ไม่ต้องปรับขนาดตามการทำงานของไต.",
   "monitor": "ติดตามใกล้ชิดถ้า CrCl <10 (เสี่ยงสะสม พิษต่อระบบประสาท/ไต; พิจารณา ≤8 g/วัน).",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "metronidazole",
   "generic": "Metronidazole",
   "syn": "เมโทรนิดาโซล; Flagyl",
   "strength": "",
   "usual": "IV 500 mg q 8 h",
   "basis": "fixed",
   "adj": false,
   "comments": "ไม่ต้องปรับขนาดตามการทำงานของไต.",
   "monitor": "ติดตามการสะสมของ metabolite ถ้า CrCl <30; 500 mg q 12 h อาจเพียงพอเมื่อ CrCl <10.",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "ceftriaxone",
   "generic": "Ceftriaxone",
   "syn": "เซฟไตรอะโซน; Rocephin",
   "strength": "",
   "usual": "IV 1-2 g วันละครั้ง",
   "basis": "fixed",
   "adj": false,
   "comments": "ไม่ต้องปรับขนาดตามการทำงานของไต.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "clindamycin",
   "generic": "Clindamycin",
   "syn": "คลินดามัยซิน; Dalacin",
   "strength": "",
   "usual": "IV 600-900 mg q 8 h",
   "basis": "fixed",
   "adj": false,
   "comments": "ไม่ต้องปรับขนาดตามการทำงานของไต.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  },
  {
   "id": "remdesivir",
   "generic": "Remdesivir",
   "syn": "เรมเดซิเวียร์; Veklury",
   "strength": "",
   "usual": "200 mg วันแรก แล้ว 100 mg วันละครั้ง",
   "basis": "fixed",
   "adj": false,
   "comments": "ไม่ต้องปรับขนาดตามการทำงานของไต.",
   "monitor": "",
   "regimens": [
    {
     "name": "",
     "segs": [
      {
       "lo": 0.0,
       "hi": 9999.0,
       "dose": "ไม่ต้องปรับขนาด",
       "mgl": "",
       "mgh": "",
       "iv": "",
       "load": "",
       "note": ""
      }
     ]
    }
   ]
  }
 ],
 "tb": [
  {
   "id": "isoniazid",
   "name": "Isoniazid (H)",
   "letter": "H",
   "mgl": 4.0,
   "mgh": 6.0,
   "b1": 300.0,
   "b2": 300.0,
   "b3": 300.0,
   "max": 300.0,
   "renalAdj": false,
   "renalDose": "เหมือนเดิม (ไม่ปรับ)",
   "note": "ให้ pyridoxine (vit B6) 50-75 มก./วัน ป้องกันปลายประสาทอักเสบ; หญิงตั้งครรภ์ 50-100 มก./วัน",
   "verify": ""
  },
  {
   "id": "rifampicin",
   "name": "Rifampicin (R)",
   "letter": "R",
   "mgl": 8.0,
   "mgh": 12.0,
   "b1": 450.0,
   "b2": 600.0,
   "b3": 600.0,
   "max": 600.0,
   "renalAdj": false,
   "renalDose": "เหมือนเดิม (ไม่ปรับ)",
   "note": "ปัสสาวะ/สารคัดหลั่งสีส้มแดงได้; มีอันตรกิริยากับยาหลายชนิด",
   "verify": ""
  },
  {
   "id": "pyrazinamide",
   "name": "Pyrazinamide (Z)",
   "letter": "Z",
   "mgl": 20.0,
   "mgh": 30.0,
   "b1": 1000.0,
   "b2": 1500.0,
   "b3": 2000.0,
   "max": 2000.0,
   "renalAdj": true,
   "renalDose": "20-30 มก./กก./วัน 3 วัน/สัปดาห์",
   "note": "ระวังพิษต่อตับ; อาจทำให้กรดยูริกสูง/ปวดข้อ",
   "verify": ""
  },
  {
   "id": "ethambutol",
   "name": "Ethambutol (E)",
   "letter": "E",
   "mgl": 15.0,
   "mgh": 20.0,
   "b1": 800.0,
   "b2": 1000.0,
   "b3": 1200.0,
   "max": 1600.0,
   "renalAdj": true,
   "renalDose": "15-20 มก./กก./วัน 3 วัน/สัปดาห์",
   "note": "ระวังพิษต่อตา (ตรวจการมองเห็น/ตาบอดสี)",
   "verify": ""
  },
  {
   "id": "streptomycin",
   "name": "Streptomycin (S)",
   "letter": "S",
   "mgl": 15.0,
   "mgh": 15.0,
   "b1": "",
   "b2": "",
   "b3": "",
   "max": 1000.0,
   "renalAdj": true,
   "renalDose": "อายุ ≥60 ปี หรือ CrCl<30/HD: 12-15 มก./กก. 2-3 ครั้ง/สัปดาห์",
   "note": "ยาฉีด IM/IV; คิดขนาดตามน้ำหนักตัว (15 มก./กก./วัน สูงสุด 1 g); เลี่ยงในหญิงตั้งครรภ์; ระวังพิษต่อหู/ไต",
   "verify": "ตรวจสอบ — ขนาดไม่ได้อยู่ในตาราง 5.1/5.9 (อยู่ในส่วนสูตรดื้อยา ตาราง 6.6) โปรดยืนยัน"
  },
  {
   "id": "levofloxacin",
   "name": "Levofloxacin (Lfx)",
   "letter": "Lfx",
   "mgl": "",
   "mgh": "",
   "b1": 750.0,
   "b2": 750.0,
   "b3": 750.0,
   "max": "",
   "renalAdj": true,
   "renalDose": "CrCl<30/HD: 750 มก. 3 ครั้ง/สัปดาห์ (ตรวจสอบ)",
   "note": "ขนาดคงที่ 750 มก./วัน (ไม่คิดตามน้ำหนัก; อ้างอิงตาราง 6.3). ใช้ในสูตรตับบกพร่อง เช่น 12-18 HE + Lfx และสูตรดื้อยา. ระวัง QT prolongation.",
   "verify": ""
  },
  {
   "id": "amikacin_tb",
   "name": "Amikacin (Am)",
   "letter": "Am",
   "mgl": 15.0,
   "mgh": 15.0,
   "b1": "",
   "b2": "",
   "b3": "",
   "max": 1000.0,
   "renalAdj": true,
   "renalDose": "อายุ ≥60 ปี หรือ CrCl<30/HD: 12-15 มก./กก. 2-3 ครั้ง/สัปดาห์",
   "note": "ยาฉีด; คิดตามน้ำหนักตัว 15 มก./กก./วัน (สูงสุด 1 g). ใช้ในสูตรตับบกพร่อง เช่น 2 AmHE/16 HE และสูตรดื้อยา. เลี่ยงในหญิงตั้งครรภ์; ระวังพิษต่อหู/ไต.",
   "verify": "ตรวจสอบ — ขนาดจากสูตรดื้อยา/แนวทางทั่วไป ไม่ได้อยู่ในตาราง 5.1; โปรดยืนยัน"
  }
 ]
};
