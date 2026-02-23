/* globals injected by index.html */
const { useState, useRef } = React;


// Indian Academy of Pediatrics (IAP) Immunization Schedule
const CDC_VACCINES = [
  { id: "bcg", name: "BCG", fullName: "Bacillus Calmette-Guérin (TB)", icon: "🩺", doses: [
    { id: "bcg-1", label: "Dose 1", age: "Birth", ageMonths: 0, window: "At birth (within 24–48 hrs)", catchup: "Up to 1 year; intradermal left arm" },
  ]},
  { id: "hepb", name: "HepB", fullName: "Hepatitis B", icon: "💙", doses: [
    { id: "hepb-1", label: "Dose 1", age: "Birth", ageMonths: 0,   window: "Within 24 hrs of birth", catchup: "As soon as possible after birth" },
    { id: "hepb-2", label: "Dose 2", age: "6 weeks", ageMonths: 1.5, window: "6 weeks", catchup: "Min 4 wks after dose 1" },
    { id: "hepb-3", label: "Dose 3", age: "14 weeks", ageMonths: 3.5, window: "14 weeks", catchup: "Min 8 wks after dose 2" },
  ]},
  { id: "opv", name: "OPV", fullName: "Oral Polio Vaccine (bOPV)", icon: "💊", doses: [
    { id: "opv-0", label: "Dose 0", age: "Birth",      ageMonths: 0,   window: "At birth (bOPV-0)", catchup: "Before hospital discharge" },
    { id: "opv-1", label: "Dose 1", age: "6 weeks",    ageMonths: 1.5, window: "6 weeks", catchup: "Min 4 wks after dose 0" },
    { id: "opv-2", label: "Dose 2", age: "10 weeks",   ageMonths: 2.5, window: "10 weeks", catchup: "Min 4 wks after dose 1" },
    { id: "opv-3", label: "Dose 3", age: "14 weeks",   ageMonths: 3.5, window: "14 weeks", catchup: "Min 4 wks after dose 2" },
    { id: "opv-4", label: "Booster 1", age: "16–18 months", ageMonths: 16, window: "16–18 months", catchup: "Min 6 mos after dose 3" },
    { id: "opv-5", label: "Booster 2", age: "5 years", ageMonths: 60,  window: "5 years (school entry)", catchup: "At 5 years if missed" },
  ]},
  { id: "dtap", name: "DTaP/DTwP", fullName: "Diphtheria, Tetanus, Pertussis", icon: "🛡️", doses: [
    { id: "dtap-1", label: "Dose 1",     age: "6 weeks",      ageMonths: 1.5, window: "6 weeks",      catchup: "Min age 6 wks" },
    { id: "dtap-2", label: "Dose 2",     age: "10 weeks",     ageMonths: 2.5, window: "10 weeks",     catchup: "Min 4 wks after dose 1" },
    { id: "dtap-3", label: "Dose 3",     age: "14 weeks",     ageMonths: 3.5, window: "14 weeks",     catchup: "Min 4 wks after dose 2" },
    { id: "dtap-4", label: "Booster 1",  age: "16–18 months", ageMonths: 16,  window: "16–18 months", catchup: "Min 6 mos after dose 3" },
    { id: "dtap-5", label: "Booster 2",  age: "5 years",      ageMonths: 60,  window: "5 years (school entry)", catchup: "At 5 years if missed" },
  ]},
  { id: "ipv", name: "IPV", fullName: "Inactivated Poliovirus Vaccine", icon: "🟡", doses: [
    { id: "ipv-1", label: "Dose 1", age: "6 weeks",  ageMonths: 1.5, window: "6 weeks (given with DTaP)", catchup: "Min age 6 wks" },
    { id: "ipv-2", label: "Dose 2", age: "14 weeks", ageMonths: 3.5, window: "14 weeks", catchup: "Min 4 wks after dose 1" },
  ]},
  { id: "hib", name: "Hib", fullName: "Haemophilus influenzae type b", icon: "🟣", doses: [
    { id: "hib-1", label: "Dose 1",    age: "6 weeks",      ageMonths: 1.5, window: "6 weeks",      catchup: "Min age 6 wks" },
    { id: "hib-2", label: "Dose 2",    age: "10 weeks",     ageMonths: 2.5, window: "10 weeks",     catchup: "Min 4 wks after dose 1" },
    { id: "hib-3", label: "Dose 3",    age: "14 weeks",     ageMonths: 3.5, window: "14 weeks",     catchup: "Min 4 wks after dose 2" },
    { id: "hib-4", label: "Booster",   age: "15–18 months", ageMonths: 15,  window: "15–18 months", catchup: "Min 8 wks after dose 3" },
  ]},
  { id: "pcv", name: "PCV", fullName: "Pneumococcal Conjugate Vaccine", icon: "🔴", doses: [
    { id: "pcv-1", label: "Dose 1",  age: "6 weeks",      ageMonths: 1.5, window: "6 weeks",      catchup: "Min age 6 wks" },
    { id: "pcv-2", label: "Dose 2",  age: "10 weeks",     ageMonths: 2.5, window: "10 weeks",     catchup: "Min 4 wks after dose 1" },
    { id: "pcv-3", label: "Dose 3",  age: "14 weeks",     ageMonths: 3.5, window: "14 weeks",     catchup: "Min 4 wks after dose 2" },
    { id: "pcv-4", label: "Booster", age: "15 months",    ageMonths: 15,  window: "15 months",    catchup: "Min 8 wks after dose 3" },
  ]},
  { id: "rota", name: "Rota", fullName: "Rotavirus Vaccine", icon: "🟠", doses: [
    { id: "rota-1", label: "Dose 1", age: "6 weeks",  ageMonths: 1.5, window: "6 weeks (min age 6 wks)", catchup: "Do not start after 15 wks" },
    { id: "rota-2", label: "Dose 2", age: "10 weeks", ageMonths: 2.5, window: "10 weeks", catchup: "Min 4 wks after dose 1" },
    { id: "rota-3", label: "Dose 3", age: "14 weeks", ageMonths: 3.5, window: "14 weeks (Rotateq only)", catchup: "Series complete by 8 mos" },
  ]},
  { id: "mmr", name: "MMR", fullName: "Measles, Mumps, Rubella", icon: "✨", doses: [
    { id: "mmr-1", label: "Dose 1", age: "9 months",  ageMonths: 9,  window: "9 completed months", catchup: "IAP recommends MMR (not measles alone)" },
    { id: "mmr-2", label: "Dose 2", age: "15 months", ageMonths: 15, window: "15 months",           catchup: "Min 4 wks after dose 1" },
    { id: "mmr-3", label: "Dose 3", age: "5 years",   ageMonths: 60, window: "5 years (school entry)", catchup: "Min 4 wks after dose 2" },
  ]},
  { id: "typhoid", name: "Typhoid", fullName: "Typhoid Conjugate Vaccine (TCV)", icon: "🌡️", doses: [
    { id: "typhoid-1", label: "TCV Dose 1", age: "9 months",  ageMonths: 9,  window: "9 months–2 years", catchup: "TCV preferred over Vi-PS below 2 yrs" },
    { id: "typhoid-2", label: "Vi-PS / TCV", age: "2 years",  ageMonths: 24, window: "2 years (Vi-PS or TCV booster)", catchup: "Vi-PS every 3 yrs; TCV single booster" },
    { id: "typhoid-3", label: "Booster",    age: "5 years",   ageMonths: 60, window: "5 years if Vi-PS used", catchup: "Every 3 yrs thereafter" },
  ]},
  { id: "hepa", name: "HepA", fullName: "Hepatitis A", icon: "🤎", doses: [
    { id: "hepa-1", label: "Dose 1", age: "12 months", ageMonths: 12, window: "12 completed months", catchup: "Min age 12 mos" },
    { id: "hepa-2", label: "Dose 2", age: "18–24 months", ageMonths: 18, window: "6 months after dose 1", catchup: "Min 6 mos after dose 1" },
  ]},
  { id: "var", name: "Varicella", fullName: "Varicella (Chickenpox)", icon: "⭐", doses: [
    { id: "var-1", label: "Dose 1", age: "15 months", ageMonths: 15, window: "15 months",  catchup: "Min age 12 mos" },
    { id: "var-2", label: "Dose 2", age: "5 years",   ageMonths: 60, window: "5 years (school entry)", catchup: "Min 3 mos after dose 1 (<13 yrs)" },
  ]},
  { id: "flu", name: "Influenza", fullName: "Influenza (Seasonal)", icon: "🌬️", doses: [
    { id: "flu-1", label: "Dose 1", age: "6 months",    ageMonths: 6,  window: "6 months+, first season", catchup: "2 doses ≥4 wks apart in first season" },
    { id: "flu-2", label: "Dose 2", age: "7 months",    ageMonths: 7,  window: "≥4 wks after dose 1",     catchup: "First season only" },
    { id: "flu-a", label: "Annual", age: "Every year",  ageMonths: 12, window: "Annually before monsoon/winter", catchup: "1 dose each subsequent season" },
  ]},
  { id: "tdap", name: "Tdap/Td", fullName: "Tetanus, Diphtheria, Pertussis (booster)", icon: "💪", doses: [
    { id: "tdap-1", label: "Booster", age: "10–12 years", ageMonths: 120, window: "10–12 years", catchup: "Tdap once; then Td every 10 yrs" },
  ]},
  { id: "hpv", name: "HPV", fullName: "Human Papillomavirus (Girls)", icon: "🌿", doses: [
    { id: "hpv-1", label: "Dose 1", age: "9–14 years",    ageMonths: 108, window: "9–14 years (routine for girls)", catchup: "2 doses if started <15 yrs; 3 doses if ≥15" },
    { id: "hpv-2", label: "Dose 2", age: "6 mos later",   ageMonths: 114, window: "6 months after dose 1",          catchup: "IAP recommends Cervarix or Gardasil" },
  ]},
];

const EMOJIS = ["👶","🧒","👦","👧","🐣","🌟","⭐","🌈","🦋","🐝","🦊","🐻","🦁","🐼","🌸","🍀"];
const COLORS = ["#f72585","#3b9edd","#e63946","#7b5ea7","#f4a261","#457b9d","#3b9edd","#4361ee","#e9c46a","#3a86ff"];

const AGE_MILESTONES = [
  { label: "Birth",         months: 0 },
  { label: "6 weeks",       months: 1.5 },
  { label: "10 weeks",      months: 2.5 },
  { label: "14 weeks",      months: 3.5 },
  { label: "9 months",      months: 9 },
  { label: "12 months",     months: 12 },
  { label: "15–18 months",  months: 15 },
  { label: "18–24 months",  months: 18 },
  { label: "5 years",       months: 60 },
  { label: "9–10 years",    months: 108 },
  { label: "14–15 years",   months: 168 },
];

const DEFAULT_CHILDREN = [
  { id: "child_bella", name: "Bella Reddy", dob: "2017-10-28", emoji: "👧", color: "#f72585", photo: null },
  { id: "child_reya",  name: "Reya Reddy",  dob: "2021-06-21", emoji: "👶", color: "#3b9edd", photo: null },
];

// All doses per IAP (Indian Academy of Pediatrics) Immunization Schedule · Rainbow Hospital
const RH = { provider: "Rainbow Hospital", lot: "", site: "", notes: "" };
const DEFAULT_LOGS = {
  child_bella: {
    // Bella born Oct 28, 2017 → now 7y 4m
    // Birth: Oct 28 2017 | 6wks: Dec 9 2017 | 10wks: Jan 6 2018 | 14wks: Feb 3 2018
    // 9mo: Jul 28 2018 | 12mo: Oct 28 2018 | 15mo: Jan 28 2019 | 18mo: Apr 28 2019
    // 5yr: Oct 28 2022
    "bcg-1":      { ...RH, date: "2017-10-28" },
    "hepb-1":     { ...RH, date: "2017-10-28" },
    "hepb-2":     { ...RH, date: "2017-12-09" },
    "hepb-3":     { ...RH, date: "2018-02-03" },
    "opv-0":      { ...RH, date: "2017-10-28" },
    "opv-1":      { ...RH, date: "2017-12-09" },
    "opv-2":      { ...RH, date: "2018-01-06" },
    "opv-3":      { ...RH, date: "2018-02-03" },
    "opv-4":      { ...RH, date: "2019-01-28" },
    "opv-5":      { ...RH, date: "2022-10-28" },
    "dtap-1":     { ...RH, date: "2017-12-09" },
    "dtap-2":     { ...RH, date: "2018-01-06" },
    "dtap-3":     { ...RH, date: "2018-02-03" },
    "dtap-4":     { ...RH, date: "2019-01-28" },
    "dtap-5":     { ...RH, date: "2022-10-28" },
    "ipv-1":      { ...RH, date: "2017-12-09" },
    "ipv-2":      { ...RH, date: "2018-02-03" },
    "hib-1":      { ...RH, date: "2017-12-09" },
    "hib-2":      { ...RH, date: "2018-01-06" },
    "hib-3":      { ...RH, date: "2018-02-03" },
    "hib-4":      { ...RH, date: "2019-01-28" },
    "pcv-1":      { ...RH, date: "2017-12-09" },
    "pcv-2":      { ...RH, date: "2018-01-06" },
    "pcv-3":      { ...RH, date: "2018-02-03" },
    "pcv-4":      { ...RH, date: "2019-01-28" },
    "rota-1":     { ...RH, date: "2017-12-09" },
    "rota-2":     { ...RH, date: "2018-01-06" },
    "rota-3":     { ...RH, date: "2018-02-03" },
    "mmr-1":      { ...RH, date: "2018-07-28" },
    "mmr-2":      { ...RH, date: "2019-01-28" },
    "mmr-3":      { ...RH, date: "2022-10-28" },
    "typhoid-1":  { ...RH, date: "2018-07-28" },
    "typhoid-2":  { ...RH, date: "2019-10-28" },
    "typhoid-3":  { ...RH, date: "2022-10-28" },
    "hepa-1":     { ...RH, date: "2018-10-28" },
    "hepa-2":     { ...RH, date: "2019-04-28" },
    "var-1":      { ...RH, date: "2019-01-28" },
    "var-2":      { ...RH, date: "2022-10-28" },
    "flu-1":      { ...RH, date: "2018-04-28" },
    "flu-2":      { ...RH, date: "2018-05-28" },
    "flu-a":      { ...RH, date: "2025-06-28" },
    // tdap-1 due Oct 2027 (10 yrs) — not yet
    // hpv due 2026+ — not yet
  },
  child_reya: {
    // Reya born Jun 21, 2021 → now 4y 8m
    // Birth: Jun 21 2021 | 6wks: Aug 2 2021 | 10wks: Aug 30 2021 | 14wks: Sep 27 2021
    // 9mo: Mar 21 2022 | 12mo: Jun 21 2022 | 15mo: Sep 21 2022 | 18mo: Dec 21 2022
    // 5yr: Jun 21 2026 — not yet due
    "bcg-1":      { ...RH, date: "2021-06-21" },
    "hepb-1":     { ...RH, date: "2021-06-21" },
    "hepb-2":     { ...RH, date: "2021-08-02" },
    "hepb-3":     { ...RH, date: "2021-09-27" },
    "opv-0":      { ...RH, date: "2021-06-21" },
    "opv-1":      { ...RH, date: "2021-08-02" },
    "opv-2":      { ...RH, date: "2021-08-30" },
    "opv-3":      { ...RH, date: "2021-09-27" },
    "opv-4":      { ...RH, date: "2022-09-21" },
    "dtap-1":     { ...RH, date: "2021-08-02" },
    "dtap-2":     { ...RH, date: "2021-08-30" },
    "dtap-3":     { ...RH, date: "2021-09-27" },
    "dtap-4":     { ...RH, date: "2022-09-21" },
    "ipv-1":      { ...RH, date: "2021-08-02" },
    "ipv-2":      { ...RH, date: "2021-09-27" },
    "hib-1":      { ...RH, date: "2021-08-02" },
    "hib-2":      { ...RH, date: "2021-08-30" },
    "hib-3":      { ...RH, date: "2021-09-27" },
    "hib-4":      { ...RH, date: "2022-09-21" },
    "pcv-1":      { ...RH, date: "2021-08-02" },
    "pcv-2":      { ...RH, date: "2021-08-30" },
    "pcv-3":      { ...RH, date: "2021-09-27" },
    "pcv-4":      { ...RH, date: "2022-09-21" },
    "rota-1":     { ...RH, date: "2021-08-02" },
    "rota-2":     { ...RH, date: "2021-08-30" },
    "rota-3":     { ...RH, date: "2021-09-27" },
    "mmr-1":      { ...RH, date: "2022-03-21" },
    "mmr-2":      { ...RH, date: "2022-09-21" },
    "typhoid-1":  { ...RH, date: "2022-03-21" },
    "typhoid-2":  { ...RH, date: "2023-06-21" },
    "hepa-1":     { ...RH, date: "2022-06-21" },
    "hepa-2":     { ...RH, date: "2022-12-21" },
    "var-1":      { ...RH, date: "2022-09-21" },
    "flu-1":      { ...RH, date: "2022-01-21" },
    "flu-2":      { ...RH, date: "2022-02-21" },
    "flu-a":      { ...RH, date: "2025-06-21" },
    // mmr-3, dtap-5, opv-5, var-2, typhoid-3 due at 5 years (Jun 2026) — not yet
  },
};

// ── Helpers ──────────────────────────────────────────────────────
function getAgeInMonths(dob) {
  const now = new Date(), b = new Date(dob);
  return (now.getFullYear() - b.getFullYear()) * 12 + (now.getMonth() - b.getMonth());
}
function formatAge(dob) {
  const m = getAgeInMonths(dob);
  if (m < 1) return "Newborn";
  if (m < 12) return `${m} mo`;
  const y = Math.floor(m / 12), r = m % 12;
  return r === 0 ? `${y} yr${y !== 1 ? "s" : ""}` : `${y}y ${r}m`;
}
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function getDoseStatus(dose, ageMonths, logs) {
  if (logs[dose.id]) return "logged";
  if (ageMonths >= dose.ageMonths + 3) return "overdue";
  if (ageMonths >= dose.ageMonths - 1) return "upcoming";
  return "future";
}
function getVaccineStatus(vaccine, ageMonths, logs) {
  const s = vaccine.doses.map(d => getDoseStatus(d, ageMonths, logs));
  if (s.every(x => x === "logged"))    return "completed";
  if (s.some(x => x === "overdue"))    return "overdue";
  if (s.some(x => x === "upcoming"))   return "upcoming";
  return "notdue";
}

// ── Tiny style helpers ────────────────────────────────────────────
const pill = st => {
  const m = { done:["#eff6ff","#1565c0"], next:["#fff4ec","#b45309"], late:["#ffeef0","#e63946"], future:["#f3f4f6","#6b7280"] };
  const [bg,c] = m[st] || m.future;
  return { padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:700, background:bg, color:c };
};
const badgeStyle = st => {
  const m = { completed:["#eff6ff","#1565c0"], overdue:["#ffeef0","#e63946"], upcoming:["#fff4ec","#b45309"], notdue:["#eaf2f8","#457b9d"] };
  const [bg,c] = m[st] || ["#f3f4f6","#6b7280"];
  return { padding:"4px 10px", borderRadius:99, fontSize:11, fontWeight:700, background:bg, color:c, flexShrink:0 };
};
const doseCardStyle = st => {
  const m = {
    logged:   { border:"1.5px solid #3b9edd", background:"#f0faf5" },
    overdue:  { border:"1.5px solid #e63946", background:"#ffeef0" },
    upcoming: { border:"1.5px solid #f4a261", background:"#fff4ec" },
    future:   { border:"1.5px solid #e5e7eb", background:"white"   },
  };
  return { ...(m[st] || m.future), borderRadius:10, padding:10, cursor:"pointer", position:"relative" };
};

const INP = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"11px 13px", fontSize:15, fontWeight:600, outline:"none", fontFamily:"inherit", color:"#111827", background:"white", boxSizing:"border-box" };
const BTN_P = { width:"100%", padding:14, border:"none", borderRadius:10, background:"linear-gradient(135deg,#1565c0,#3b9edd)", color:"white", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit", marginTop:6 };
const BTN_S = { width:"100%", padding:14, border:"none", borderRadius:10, background:"#f3f4f6", color:"#374151", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginTop:10 };
const BTN_D = { width:"100%", padding:14, border:"none", borderRadius:10, background:"#ffeef0", color:"#e63946", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginTop:10 };
const LBL = { display:"block", fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:0.5, marginBottom:6 };

// ── Avatar ───────────────────────────────────────────────────────
function Avatar({ child, size = 52, style: extra = {} }) {
  const base = { width:size, height:size, borderRadius:"50%", flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", ...extra };
  if (child.photo) return <div style={base}><img src={child.photo} alt={child.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} /></div>;
  return <div style={{ ...base, background:child.color+"22", fontSize:size*0.46 }}>{child.emoji}</div>;
}

// ── Photo Upload ─────────────────────────────────────────────────
function PhotoUpload({ current, onChange }) {
  const ref = useRef();
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  }
  return (
    <div>
      <input ref={ref} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
      <div onClick={() => ref.current.click()}
        style={{ display:"flex", alignItems:"center", gap:12, border:"1.5px dashed #d1d5db", borderRadius:12, padding:"12px 14px", cursor:"pointer", background:"#fafafa", transition:"background 0.15s" }}>
        {current
          ? <img src={current} alt="preview" style={{ width:56, height:56, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:"2px solid #e5e7eb" }} />
          : <div style={{ width:56, height:56, borderRadius:"50%", background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>📷</div>
        }
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#374151" }}>{current ? "Change Photo" : "Upload a Photo"}</div>
          <div style={{ fontSize:11, color:"#9ca3af", marginTop:3 }}>Tap to choose from your camera roll</div>
        </div>
        {current && (
          <button onClick={e => { e.stopPropagation(); onChange(null); }}
            style={{ background:"#ffeef0", color:"#e63946", border:"none", borderRadius:8, padding:"5px 10px", fontSize:12, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

// ── Add / Edit Child Modal ───────────────────────────────────────
function ChildModal({ existing, onSave, onClose }) {
  const isEdit = !!existing;
  const [name,  setName]  = useState(existing?.name  || "");
  const [dob,   setDob]   = useState(existing?.dob   || "");
  const [emoji, setEmoji] = useState(existing?.emoji || "👶");
  const [color, setColor] = useState(existing?.color || COLORS[0]);
  const [photo, setPhoto] = useState(existing?.photo || null);

  function handleSave() {
    if (!name.trim() || !dob) { alert("Please enter a name and date of birth."); return; }
    onSave({ ...(existing || {}), id: existing?.id || "child_" + Date.now(), name: name.trim(), dob, emoji, color, photo });
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"white", borderRadius:"22px 22px 0 0", padding:"22px 20px 36px", width:"100%", maxWidth:480, maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ width:36, height:4, background:"#e5e7eb", borderRadius:99, margin:"0 auto 18px" }} />
        <div style={{ fontSize:18, fontWeight:800, marginBottom:4 }}>{isEdit ? "Edit Profile" : "Add Child"}</div>
        <div style={{ fontSize:13, color:"#6b7280", marginBottom:20 }}>Track immunizations for your child</div>

        <div style={{ marginBottom:16 }}>
          <label style={LBL}>Profile Photo</label>
          <PhotoUpload current={photo} onChange={setPhoto} />
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={LBL}>Child's Full Name</label>
          <input style={INP} placeholder="e.g. Bella Reddy…" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={LBL}>Date of Birth</label>
          <input type="date" style={INP} value={dob} onChange={e => setDob(e.target.value)} />
        </div>

        {/* Emoji + color — shown below photo section when no photo */}
        <div style={{ marginBottom:14, opacity: photo ? 0.4 : 1, pointerEvents: photo ? "none" : "auto" }}>
          <label style={LBL}>Emoji (used when no photo)</label>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:6, marginTop:4 }}>
            {EMOJIS.map(e => (
              <button key={e}
                style={{ width:38, height:38, border:emoji===e?"2px solid #3b9edd":"1.5px solid #e5e7eb", borderRadius:9, fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", background:emoji===e?"#eff6ff":"white" }}
                onClick={() => setEmoji(e)}>{e}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:22, opacity: photo ? 0.4 : 1, pointerEvents: photo ? "none" : "auto" }}>
          <label style={LBL}>Accent Color</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
            {COLORS.map(c => (
              <div key={c} onClick={() => setColor(c)}
                style={{ width:30, height:30, borderRadius:"50%", background:c, cursor:"pointer", border:color===c?"3px solid #111827":"2px solid transparent", transform:color===c?"scale(1.18)":"scale(1)", transition:"all 0.15s" }} />
            ))}
          </div>
        </div>

        <button style={BTN_P} onClick={handleSave}>{isEdit ? "Save Changes" : "Add Child"}</button>
        <button style={BTN_S} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// ── Log Dose Modal ───────────────────────────────────────────────
function LogDoseModal({ vaccine, dose, existing, defaultProvider, onSave, onRemove, onClose }) {
  const [date,     setDate]     = useState(existing?.date     || new Date().toISOString().split("T")[0]);
  const [provider, setProvider] = useState(existing?.provider ?? defaultProvider ?? "");
  const [lot,      setLot]      = useState(existing?.lot      || "");
  const [site,     setSite]     = useState(existing?.site     || "");
  const [notes,    setNotes]    = useState(existing?.notes    || "");

  const INP_SM = { ...INP, padding:"7px 10px", fontSize:13 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:"white", borderRadius:"22px 22px 0 0", padding:"16px 16px 28px", width:"100%", maxWidth:480 }}>
        <div style={{ width:32, height:3, background:"#e5e7eb", borderRadius:99, margin:"0 auto 12px" }} />

        {/* Header row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:"#1565c0" }}>{vaccine.name} — {dose.label}</div>
            <div style={{ fontSize:11, color:"#9ca3af", marginTop:1 }}>Recommended: {dose.age}</div>
          </div>
          <button onClick={onClose} style={{ background:"#f3f4f6", border:"none", borderRadius:99, width:28, height:28, fontSize:14, cursor:"pointer", color:"#6b7280" }}>✕</button>
        </div>

        {/* Two-column grid for compact fields */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 10px", marginBottom:8 }}>
          <div>
            <label style={{ ...LBL, fontSize:9 }}>Date</label>
            <input type="date" style={INP_SM} value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label style={{ ...LBL, fontSize:9 }}>Provider</label>
            <input style={INP_SM} placeholder="Clinic / Doctor" value={provider} onChange={e => setProvider(e.target.value)} />
          </div>
          <div>
            <label style={{ ...LBL, fontSize:9 }}>Lot No.</label>
            <input style={INP_SM} placeholder="ABC12345" value={lot} onChange={e => setLot(e.target.value)} />
          </div>
          <div>
            <label style={{ ...LBL, fontSize:9 }}>Site</label>
            <select style={{ ...INP_SM, appearance:"none" }} value={site} onChange={e => setSite(e.target.value)}>
              <option value="">Not specified</option>
              {["Left arm","Right arm","Left thigh","Right thigh","Oral","Nasal"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginBottom:10 }}>
          <label style={{ ...LBL, fontSize:9 }}>Notes</label>
          <textarea style={{ ...INP_SM, resize:"none", height:48 }} placeholder="Reactions, doctor notes…" value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button style={{ ...BTN_P, flex:1, padding:"10px", marginTop:0 }} onClick={() => onSave({ date: date || new Date().toISOString().split("T")[0], provider, lot, site, notes })}>Save</button>
          {existing && <button style={{ ...BTN_D, flex:1, padding:"10px", marginTop:0 }} onClick={onRemove}>Remove</button>}
          <button style={{ ...BTN_S, flex:1, padding:"10px", marginTop:0 }} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── IAP Chart Modal ─────────────────────────────────────────────
// Matches IAP 2023 schedule reference chart exactly
// Cell types: R=Recommended(green), Y=Catchup(yellow), S=Special(blue)
const _R = (l="") => ({ t:"R", l });
const _Y = (l="") => ({ t:"Y", l });
const _S = (l="") => ({ t:"S", l });

// 16 columns matching reference image
const IAP_COLS_CHART = [
  "Birth","6w","10w","14w","6m","7m","9m","12m","13m","15m","16-18m","18-24m","2-3Y","4-6Y","9-14Y","15-18Y"
];

// Data rows — built cell-by-cell matching the reference chart
// Index:          0       1         2         3         4            5         6         7       8       9         10          11        12      13        14         15
const IAP_ROWS = [
  { name:"BCG",
    cells:[_R("BCG"), null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },

  { name:"Hepatitis B",
    cells:[_R("HB 1ᵃ"), _R("HB 2"), _R("HB 3"), _R("HB 4ᵇ"), null, null, null, null, null, null, null, null, null, null, null, null] },

  { name:"Polio",
    cells:[_R("OPV"), _R("IPV 1ᶜ\nOPV 1"), _R("IPV 2ᶜ\nOPV 2"), _R("IPV 3\nOPV 3"), null, null, null, null, null, null, _R("IPVᵉB1\nOPV B1"), null, null, _R("IPVᶠB2\nOPV B2"), _Y(), _Y()] },

  { name:"DTwP/DTaP",
    cells:[null, _R("DPT 1"), _R("DPT 2"), _R("DPT 3"), null, null, null, null, null, null, _R("DPT B1"), null, null, _R("DPT B2"), _Y(), _Y()] },

  { name:"Hib",
    cells:[null, _R("Hib 1"), _R("Hib 2"), _R("Hib 3"), null, null, null, null, null, null, _R("Hib B1"), null, null, _Y(), _Y(), null] },

  { name:"PCV",
    cells:[null, _R("PCV 1"), _R("PCV 2"), _R("PCV 3"), null, null, null, null, null, _R("PCV B"), null, null, null, _Y(), _Y(), null] },

  { name:"Rotavirus",
    cells:[null, _R("RV 1"), _R("RV 2"), _R("RV 3ᵈ"), _Y("Dose 1ᵉ"), _Y("Dose 2"), null, null, null, null, null, null, null, null, null, null] },

  { name:"Influenza",
    cells:[null, null, null, null, null, null, _R("Dose 1"), _R("Dose 2"), null, _Y("Annual\nVaccin."), _Y("Annual\nVaccin."), _Y("Annual\nVaccin."), _Y("Annual\nVaccin."), _Y("Annual\nVaccin."), _Y("Annual\nVaccin."), _Y("Annual\nVaccin.")] },

  { name:"MMR",
    cells:[null, null, null, null, null, null, _R("Dose 1"), null, null, _R("Dose 2"), null, null, null, _R("Dose 3"), _Y(), _Y()] },

  { name:"TCV",
    cells:[null, null, null, null, null, null, _R("Dose 1"), null, null, _R("Dose 2"), null, _Y("Dose 2ᶠ"), _Y(), null, null, null] },

  { name:"Hepatitis A",
    cells:[null, null, null, null, null, null, null, null, null, _R("Dose 1"), null, _Y("Dose 2ᵍ"), _Y(), _Y(), null, null] },

  { name:"Varicella",
    cells:[null, null, null, null, null, null, null, null, null, _R("Dose 1"), null, _Y("Dose 2ᶠ"), _Y(), _Y(), null, null] },

  { name:"Tdapʰ/Td",
    cells:[null, null, null, null, null, null, null, null, null, null, null, null, null, null, _R("1 & 2ʲ"), _Y("1,2 & 3ʲ")] },

  { name:"HPV",
    cells:[null, null, null, null, null, null, null, null, null, null, null, null, null, null, _R("1 & 2ʲ"), _Y("1,2 & 3ʲ")] },

  { name:"Meningococcalᵏ",
    cells:[null, null, null, null, null, null, _S("D1"), _S("D2"), _S("D2"), _S(), _S(), _S(), _S(), _S(), _S(), _S()] },

  { name:"JE",
    cells:[null, null, null, null, null, null, null, null, _S("Dose 1"), _S("Dose 2"), _S("Dose 2"), _S(), _S(), _S(), null, null] },

  { name:"Cholera",
    cells:[null, null, null, null, null, null, null, null, _S("Dose 1"), _S("Dose 2"), _S("Dose 2"), _S(), null, null, null, null] },

  { name:"PPSV 23",
    cells:[null, null, null, null, null, null, null, null, null, null, null, null, null, null, _S(), _S()] },

  { name:"Rabies",
    cells:[null, null, null, null, null, null, null, null, null, null, null, null, null, null, _S(), _S()] },

  { name:"Yellow Fever",
    cells:[null, null, null, null, null, null, null, null, null, null, null, null, null, null, _S(), _S()] },
];

function IAPChartModal({ onClose, children, logs }) {
  const { useState: useS } = React;
  const [selectedChildId, setSelectedChildId] = useS(null);
  const CW = 46;
  const VW = 94;
  const RH = 40; // taller to fit date

  const selectedChild = children.find(c => c.id === selectedChildId);
  const childLogs = selectedChild ? (logs[selectedChildId] || {}) : {};

  // Map IAP_ROWS vaccine names → CDC_VACCINES entries
  const vaccineNameMap = {
    "BCG":            ["bcg"],
    "Hepatitis B":    ["hepb"],
    "Polio":          ["opv","ipv"],
    "DTwP/DTaP":      ["dtap"],
    "Hib":            ["hib"],
    "PCV":            ["pcv"],
    "Rotavirus":      ["rota"],
    "Influenza":      ["flu"],
    "MMR":            ["mmr"],
    "TCV":            ["typhoid"],
    "Hepatitis A":    ["hepa"],
    "Varicella":      ["var"],
    "Tdapʰ/Td":       ["tdap"],
    "HPV":            ["hpv"],
    "Meningococcalᵏ": [],
    "JE":             [],
    "Cholera":        [],
    "PPSV 23":        [],
    "Rabies":         [],
    "Yellow Fever":   [],
  };

  // IAP column month boundaries for matching given dates to columns
  const COL_MONTHS = [0, 1.5, 2.5, 3.5, 6, 7, 9, 12, 13, 15, 16, 18, 30, 54, 108, 168];

  function getGivenDateForCell(vaccineName, colIdx) {
    if (!selectedChild) return null;
    const dob = new Date(selectedChild.dob);
    const vIds = vaccineNameMap[vaccineName] || [];
    const colMonths = COL_MONTHS[colIdx];
    const nextColMonths = COL_MONTHS[colIdx + 1] || colMonths + 12;

    // Gather all logged doses for this vaccine
    for (const vId of vIds) {
      const vaccine = CDC_VACCINES.find(v => v.id === vId);
      if (!vaccine) continue;
      for (const dose of vaccine.doses) {
        const logEntry = childLogs[dose.id];
        if (!logEntry) continue;
        // Check if dose ageMonths falls in this column's range
        const ageM = dose.ageMonths;
        const colMid = colMonths;
        const colEnd = colIdx < COL_MONTHS.length - 1 ? (COL_MONTHS[colIdx+1] + COL_MONTHS[colIdx]) / 2 : colMonths + 12;
        const colStart = colIdx > 0 ? (COL_MONTHS[colIdx] + COL_MONTHS[colIdx-1]) / 2 : -1;
        if (ageM > colStart && ageM <= colEnd) {
          return logEntry.date;
        }
      }
    }
    return null;
  }

  function fmtShort(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months[d.getMonth()]+" "+d.getDate()+" '"+String(d.getFullYear()).slice(2);
  }

  const bg  = t => t==="R"?"#a8d594":t==="Y"?"#f5e642":t==="S"?"#90c8f0":"white";
  const fg  = t => t==="R"?"#1a5c2a":t==="Y"?"#5c4400":t==="S"?"#0d3f7a":"transparent";
  const bd  = t => t==="R"?"#4a9a50":t==="Y"?"#c8a800":t==="S"?"#3a82c0":"#ddd";

  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", flexDirection:"column", background:"#000" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", maxWidth:480, width:"100%", margin:"0 auto", background:"white", overflow:"hidden" }}>

        {/* ── Header */}
        <div style={{ background:"linear-gradient(135deg,#1565c0,#3b9edd)", padding:"11px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:900, color:"white", letterSpacing:.3 }}>IAP Immunization Schedule</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.85)", marginTop:1 }}>Indian Academy of Pediatrics · 2023</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)", borderRadius:99, width:28, height:28, fontSize:14, cursor:"pointer", color:"white", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* ── Child selector */}
        <div style={{ display:"flex", gap:6, padding:"8px 12px", background:"#1a3a6a", flexShrink:0, alignItems:"center" }}>
          <span style={{ fontSize:9, color:"rgba(255,255,255,0.7)", fontWeight:700, marginRight:2 }}>View for:</span>
          <button
            onClick={() => setSelectedChildId(null)}
            style={{ padding:"3px 8px", borderRadius:99, border:"none", cursor:"pointer", fontSize:9, fontWeight:800,
              background: selectedChildId===null ? "white" : "rgba(255,255,255,0.15)",
              color: selectedChildId===null ? "#1565c0" : "white" }}>
            Schedule Only
          </button>
          {children.map(c => (
            <button key={c.id}
              onClick={() => setSelectedChildId(c.id)}
              style={{ padding:"3px 8px", borderRadius:99, border:"none", cursor:"pointer", fontSize:9, fontWeight:800,
                background: selectedChildId===c.id ? "white" : "rgba(255,255,255,0.15)",
                color: selectedChildId===c.id ? "#1565c0" : "white",
                display:"flex", alignItems:"center", gap:4 }}>
              <Avatar child={c} size={20} /> {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* ── Legend */}
        <div style={{ display:"flex", gap:8, padding:"6px 12px", background:"#f0f7ff", borderBottom:"1px solid #dde7f5", flexShrink:0, flexWrap:"wrap" }}>
          {[["#a8d594","#1a5c2a","Recommended"],["#f5e642","#5c4400","Catch-up"],["#90c8f0","#0d3f7a","Special"]].map(([bgC,fgC,label]) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:12, height:10, borderRadius:2, background:bgC, border:`1px solid ${fgC}55`, flexShrink:0 }} />
              <span style={{ fontSize:8, fontWeight:700, color:"#333" }}>{label}</span>
            </div>
          ))}
          {selectedChildId && (
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:12, height:10, borderRadius:2, background:"#1565c0", border:"1px solid #0d3f7a", flexShrink:0 }} />
              <span style={{ fontSize:8, fontWeight:700, color:"#333" }}>Given ✓</span>
            </div>
          )}
        </div>

        {/* ── Scrollable matrix with sticky first column */}
        <div style={{ flex:1, overflow:"auto", position:"relative" }}>
          <table style={{ borderCollapse:"collapse", tableLayout:"fixed", minWidth: VW + IAP_COLS_CHART.length * CW }}>
            <colgroup>
              <col style={{ width:VW }} />
              {IAP_COLS_CHART.map((_,i) => <col key={i} style={{ width:CW }} />)}
            </colgroup>
            <thead>
              <tr>
                <th style={{ position:"sticky", left:0, top:0, zIndex:20, background:"#1e3a5f", color:"white", fontSize:8.5, fontWeight:900, textAlign:"left", padding:"6px 7px", verticalAlign:"middle", boxShadow:"3px 0 6px rgba(0,0,0,0.25)", borderRight:"2px solid #4a7ab5", height:30, whiteSpace:"nowrap" }}>Vaccine</th>
                {IAP_COLS_CHART.map((col, ci) => (
                  <th key={ci} style={{ position:"sticky", top:0, zIndex:15, background:"#1565c0", color:"white", fontSize:ci < 4 ? 8 : 7.5, fontWeight:900, textAlign:"center", padding:"3px 1px", borderLeft:"1px solid rgba(255,255,255,0.18)", verticalAlign:"middle", height:30, whiteSpace:"nowrap" }}>{col}</th>
                ))}
              </tr>
              <tr>
                <th style={{ position:"sticky", left:0, top:30, zIndex:20, background:"#c7813a", color:"white", fontSize:7, fontWeight:700, textAlign:"left", padding:"3px 7px", whiteSpace:"nowrap", boxShadow:"3px 0 5px rgba(0,0,0,0.2)", borderRight:"2px solid #a06020" }}>Age →</th>
                {IAP_COLS_CHART.map((_,ci) => (
                  <td key={ci} style={{ position:"sticky", top:30, zIndex:14, background:"#c7813a", borderLeft:"1px solid rgba(255,255,255,0.2)", height:6 }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {IAP_ROWS.map((row, ri) => (
                <tr key={ri} style={{ borderBottom:"1px solid #ccc" }}>
                  <td style={{
                    position:"sticky", left:0, zIndex:5,
                    background:ri%2===0?"#f0f7ff":"#f8fafc",
                    boxShadow:"3px 0 5px rgba(0,0,0,0.08)",
                    padding:"4px 7px",
                    borderRight:"2px solid #c0d8f5",
                    verticalAlign:"middle",
                    height:RH
                  }}>
                    <div style={{ fontSize:8.5, fontWeight:800, color:"#1a3a6a", lineHeight:1.3, whiteSpace:"nowrap" }}>{row.name}</div>
                  </td>
                  {row.cells.map((cell, ci) => {
                    const givenDate = selectedChildId ? getGivenDateForCell(row.name, ci) : null;
                    const hasFill = cell !== null;
                    let cellBg, cellFg, cellBd;
                    if (givenDate) {
                      cellBg = "#1565c0"; cellFg = "white"; cellBd = "#0d3f7a";
                    } else if (hasFill) {
                      cellBg = bg(cell.t); cellFg = fg(cell.t); cellBd = bd(cell.t);
                    } else {
                      cellBg = ri%2===0?"#f7f7f7":"#fff"; cellFg="#999"; cellBd="#ddd";
                    }
                    return (
                      <td key={ci} style={{
                        background:cellBg,
                        borderLeft:`1px solid ${cellBd}`,
                        borderTop: (hasFill||givenDate) ? `1px solid ${cellBd}` : "none",
                        borderBottom: (hasFill||givenDate) ? `1px solid ${cellBd}` : "none",
                        verticalAlign:"middle",
                        textAlign:"center",
                        padding:"2px 1px",
                        height:RH,
                      }}>
                        {givenDate ? (
                          <span style={{ display:"block", lineHeight:1.25 }}>
                            <span style={{ fontSize:7.5, fontWeight:900, color:"white", display:"block" }}>✓</span>
                            <span style={{ fontSize:6.5, fontWeight:800, color:"rgba(255,255,255,0.9)", display:"block", whiteSpace:"pre" }}>{fmtShort(givenDate)}</span>
                          </span>
                        ) : hasFill && cell.l ? (
                          <span style={{ fontSize:7, fontWeight:900, color:cellFg, lineHeight:1.25, whiteSpace:"pre", display:"block" }}>{cell.l}</span>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div style={{ padding:"5px 12px", background:"#f0f7ff", borderTop:"1px solid #dde7f5", flexShrink:0 }}>
          <div style={{ fontSize:7.5, color:"#888", textAlign:"center" }}>
            Age in completed weeks / months / years  ·  Scroll right to see all ages
          </div>
        </div>
      </div>
    </div>
  );
}

// ── IAP Chart Inline (tab page) ─────────────────────────────────
function IAPChartInline({ children, logs }) {
  const { useState: useS } = React;
  const [selectedChildId, setSelectedChildId] = useS(null);
  const CW = 46, VW = 94, RH = 40;
  const selectedChild = children.find(c => c.id === selectedChildId);
  const childLogs = selectedChild ? (logs[selectedChildId] || {}) : {};
  const vaccineNameMap = {
    "BCG":["bcg"],"Hepatitis B":["hepb"],"Polio":["opv","ipv"],"DTwP/DTaP":["dtap"],
    "Hib":["hib"],"PCV":["pcv"],"Rotavirus":["rota"],"Influenza":["flu"],
    "MMR":["mmr"],"TCV":["typhoid"],"Hepatitis A":["hepa"],"Varicella":["var"],
    "Tdapʰ/Td":["tdap"],"HPV":["hpv"],
  };
  const COL_MONTHS = [0,1.5,2.5,3.5,6,7,9,12,13,15,16,18,30,54,108,168];
  function getGivenDate(vaccineName, colIdx) {
    if (!selectedChild) return null;
    const dob = new Date(selectedChild.dob);
    const vIds = vaccineNameMap[vaccineName]||[];
    for (const vId of vIds) {
      const vaccine = CDC_VACCINES.find(v=>v.id===vId); if(!vaccine) continue;
      for (const dose of vaccine.doses) {
        const logEntry = childLogs[dose.id]; if(!logEntry) continue;
        const ageM = dose.ageMonths;
        const colStart = colIdx>0?(COL_MONTHS[colIdx]+COL_MONTHS[colIdx-1])/2:-1;
        const colEnd = colIdx<COL_MONTHS.length-1?(COL_MONTHS[colIdx+1]+COL_MONTHS[colIdx])/2:COL_MONTHS[colIdx]+12;
        if(ageM>colStart&&ageM<=colEnd) return logEntry.date;
      }
    }
    return null;
  }
  function fmtShort(ds) {
    if(!ds) return null;
    const d=new Date(ds);
    const m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return m[d.getMonth()]+" "+d.getDate()+" '"+String(d.getFullYear()).slice(2);
  }
  const bg=t=>t==="R"?"#a8d594":t==="Y"?"#f5e642":t==="S"?"#90c8f0":"white";
  const fg=t=>t==="R"?"#1a5c2a":t==="Y"?"#5c4400":t==="S"?"#0d3f7a":"transparent";
  const bd=t=>t==="R"?"#4a9a50":t==="Y"?"#c8a800":t==="S"?"#3a82c0":"#ddd";

  return (
    <div style={{ margin:"0 -16px", display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>
      {/* Child selector */}
      <div style={{ display:"flex", gap:6, padding:"8px 12px", background:"#1a3a6a", flexShrink:0, alignItems:"center" }}>
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.7)", fontWeight:700, marginRight:2 }}>View for:</span>
        <button onClick={()=>setSelectedChildId(null)}
          style={{ padding:"3px 8px", borderRadius:99, border:"none", cursor:"pointer", fontSize:9, fontWeight:800,
            background:selectedChildId===null?"white":"rgba(255,255,255,0.15)", color:selectedChildId===null?"#1565c0":"white" }}>
          Schedule Only
        </button>
        {children.map(c=>(
          <button key={c.id} onClick={()=>setSelectedChildId(c.id)}
            style={{ padding:"3px 8px", borderRadius:99, border:"none", cursor:"pointer", fontSize:9, fontWeight:800,
              background:selectedChildId===c.id?"white":"rgba(255,255,255,0.15)", color:selectedChildId===c.id?"#1565c0":"white",
              display:"flex", alignItems:"center", gap:4 }}>
            <Avatar child={c} size={20} /> {c.name.split(" ")[0]}
          </button>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display:"flex", gap:8, padding:"6px 12px", background:"#f0f7ff", borderBottom:"1px solid #dde7f5", flexShrink:0, flexWrap:"wrap" }}>
        {[["#a8d594","#1a5c2a","Recommended"],["#f5e642","#5c4400","Catch-up"],["#90c8f0","#0d3f7a","Special"]].map(([bgC,fgC,label])=>(
          <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
            <div style={{ width:12, height:10, borderRadius:2, background:bgC, border:`1px solid ${fgC}55` }}/>
            <span style={{ fontSize:8, fontWeight:700, color:"#333" }}>{label}</span>
          </div>
        ))}
        {selectedChildId&&<div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:12, height:10, borderRadius:2, background:"#1565c0", border:"1px solid #0d3f7a" }}/>
          <span style={{ fontSize:8, fontWeight:700, color:"#333" }}>Given ✓</span>
        </div>}
      </div>
      {/* Scrollable matrix */}
      <div style={{ flex:1, overflow:"auto", position:"relative" }}>
        <table style={{ borderCollapse:"collapse", tableLayout:"fixed", minWidth:VW+IAP_COLS_CHART.length*CW }}>
          <colgroup>
            <col style={{ width:VW }}/>
            {IAP_COLS_CHART.map((_,i)=><col key={i} style={{ width:CW }}/>)}
          </colgroup>
          <thead>
            <tr>
              <th style={{ position:"sticky", left:0, top:0, zIndex:20, background:"#1e3a5f", color:"white", fontSize:8.5, fontWeight:900, textAlign:"left", padding:"6px 7px", verticalAlign:"middle", boxShadow:"3px 0 6px rgba(0,0,0,0.25)", borderRight:"2px solid #4a7ab5", height:30, whiteSpace:"nowrap" }}>Vaccine</th>
              {IAP_COLS_CHART.map((col,ci)=>(
                <th key={ci} style={{ position:"sticky", top:0, zIndex:15, background:"#1565c0", color:"white", fontSize:ci<4?8:7.5, fontWeight:900, textAlign:"center", padding:"3px 1px", borderLeft:"1px solid rgba(255,255,255,0.18)", verticalAlign:"middle", height:30, whiteSpace:"nowrap" }}>{col}</th>
              ))}
            </tr>
            <tr>
              <th style={{ position:"sticky", left:0, top:30, zIndex:20, background:"#c7813a", color:"white", fontSize:7, fontWeight:700, textAlign:"left", padding:"3px 7px", whiteSpace:"nowrap", boxShadow:"3px 0 5px rgba(0,0,0,0.2)", borderRight:"2px solid #a06020" }}>Age →</th>
              {IAP_COLS_CHART.map((_,ci)=>(
                <td key={ci} style={{ position:"sticky", top:30, zIndex:14, background:"#c7813a", borderLeft:"1px solid rgba(255,255,255,0.2)", height:6 }}/>
              ))}
            </tr>
          </thead>
          <tbody>
            {IAP_ROWS.map((row,ri)=>(
              <tr key={ri} style={{ borderBottom:"1px solid #ccc" }}>
                <td style={{ position:"sticky", left:0, zIndex:5, background:ri%2===0?"#f0f7ff":"#f8fafc", boxShadow:"3px 0 5px rgba(0,0,0,0.08)", padding:"4px 7px", borderRight:"2px solid #c0d8f5", verticalAlign:"middle", height:RH }}>
                  <div style={{ fontSize:8.5, fontWeight:800, color:"#1a3a6a", lineHeight:1.3, whiteSpace:"nowrap" }}>{row.name}</div>
                </td>
                {row.cells.map((cell,ci)=>{
                  const givenDate=selectedChildId?getGivenDate(row.name,ci):null;
                  const hasFill=cell!==null;
                  let cBg,cFg,cBd;
                  if(givenDate){cBg="#1565c0";cFg="white";cBd="#0d3f7a";}
                  else if(hasFill){cBg=bg(cell.t);cFg=fg(cell.t);cBd=bd(cell.t);}
                  else{cBg=ri%2===0?"#f7f7f7":"#fff";cFg="#999";cBd="#ddd";}
                  return(
                    <td key={ci} style={{ background:cBg, borderLeft:`1px solid ${cBd}`, borderTop:(hasFill||givenDate)?`1px solid ${cBd}`:"none", borderBottom:(hasFill||givenDate)?`1px solid ${cBd}`:"none", verticalAlign:"middle", textAlign:"center", padding:"2px 1px", height:RH }}>
                      {givenDate?(
                        <span style={{ display:"block", lineHeight:1.25 }}>
                          <span style={{ fontSize:7.5, fontWeight:900, color:"white", display:"block" }}>✓</span>
                          <span style={{ fontSize:6.5, fontWeight:800, color:"rgba(255,255,255,0.9)", display:"block", whiteSpace:"pre" }}>{fmtShort(givenDate)}</span>
                        </span>
                      ):hasFill&&cell.l?(
                        <span style={{ fontSize:7, fontWeight:900, color:cFg, lineHeight:1.25, whiteSpace:"pre", display:"block" }}>{cell.l}</span>
                      ):null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding:"5px 12px", background:"#f0f7ff", borderTop:"1px solid #dde7f5", flexShrink:0 }}>
        <div style={{ fontSize:7.5, color:"#888", textAlign:"center" }}>Age in completed weeks / months / years  ·  Scroll right →</div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────
function VaxTrack() {
  const [children,        setChildren]        = useState(DEFAULT_CHILDREN);
  const [logs,            setLogs]            = useState(DEFAULT_LOGS);
  const [currentChildId,  setCurrentChildId]  = useState(DEFAULT_CHILDREN[0].id);
  const [tab,             setTab]             = useState("vaccines");
  const [filter,          setFilter]          = useState("all");
  const [expanded,        setExpanded]        = useState({});
  const [showAddChild,    setShowAddChild]     = useState(false);
  const [editingChild,    setEditingChild]     = useState(null);
  const [logModal,        setLogModal]         = useState(null);
  const [defaultProvider, setDefaultProvider] = useState("Rainbow Hospital");
  const [savedProviders,  setSavedProviders]  = useState(["Rainbow Hospital"]);
  const [newProviderInput,setNewProviderInput]= useState("");
  const [vaccineView,     setVaccineView]     = useState("timeline"); // "cards" | "timeline"
  const [sortOrder,       setSortOrder]       = useState("desc"); // "desc" = latest first (default), "asc" = oldest first
  const [showIAPChart,    setShowIAPChart]     = useState(false);
  const [pdfExporting,    setPdfExporting]     = useState(null);
  const [whatsappNumber,  setWhatsappNumber]   = useState("");
  const [waSharing,       setWaSharing]        = useState(null);
  const [settingsTab,     setSettingsTab]      = useState("general");
  const [reportChild,     setReportChild]      = useState(null); // in-app report modal
  const firstSoonRef = useRef(null);
  const firstOverdueRef = useRef(null);

  const currentChild = children.find(c => c.id === currentChildId);
  const childLogs    = currentChild ? (logs[currentChild.id] || {}) : {};
  const ageMonths    = currentChild ? getAgeInMonths(currentChild.dob) : 0;

  function upsertChild(child) {
    setChildren(prev => prev.find(c => c.id === child.id) ? prev.map(c => c.id === child.id ? child : c) : [...prev, child]);
    setCurrentChildId(child.id);
    setShowAddChild(false);
    setEditingChild(null);
  }

  function saveLog(doseId, entry) {
    setLogs(prev => {
      const cl = { ...(prev[currentChildId] || {}) };
      if (entry === null) delete cl[doseId]; else cl[doseId] = entry;
      return { ...prev, [currentChildId]: cl };
    });
    setLogModal(null);
  }

  // Quick-log: mark given with scheduled date (DOB + recommended age) + defaultProvider
  function quickGiven(doseId, ageMonths, e) {
    e.stopPropagation();
    const dob = new Date(currentChild.dob);
    const scheduled = new Date(dob.getFullYear(), dob.getMonth() + Math.round(ageMonths), dob.getDate());
    const date = scheduled.toISOString().split("T")[0];
    setLogs(prev => {
      const cl = { ...(prev[currentChildId] || {}) };
      cl[doseId] = { date, provider: defaultProvider, lot: "", site: "", notes: "" };
      return { ...prev, [currentChildId]: cl };
    });
  }

  // Quick-remove
  function quickRemove(doseId, e) {
    e.stopPropagation();
    setLogs(prev => {
      const cl = { ...(prev[currentChildId] || {}) };
      delete cl[doseId];
      return { ...prev, [currentChildId]: cl };
    });
  }

  // Compute stats
  let done = 0, soon = 0, late = 0, total = 0;
  const _thisYear = new Date().getFullYear();
  if (currentChild) CDC_VACCINES.forEach(v => v.doses.forEach(d => {
    total++;
    const st = getDoseStatus(d, ageMonths, childLogs);
    if (st === "logged") done++;
    else if (st === "overdue") late++;
    else {
      const dob_ = new Date(currentChild.dob);
      const sd = new Date(dob_.getFullYear(), dob_.getMonth() + Math.round(d.ageMonths), dob_.getDate());
      if (st === "upcoming" || sd.getFullYear() === _thisYear) soon++;
    }
  }));
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;


  // Build HTML report string for a child — no external deps
  function buildReportHTML(child) {
    const cLogs = logs[child.id] || {};
    const now = new Date();
    const dob = new Date(child.dob);
    const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
    const doneDoses  = CDC_VACCINES.reduce((a,v)=>a+v.doses.filter(d=>cLogs[d.id]).length,0);
    const pct2 = Math.round((doneDoses/totalDoses)*100);
    function fmtD(s){ if(!s)return""; const d=new Date(s); return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" "+d.getDate()+" "+d.getFullYear(); }
    const rows = CDC_VACCINES.map(v => {
      const doseRows = v.doses.map(d => {
        const sd = new Date(dob.getFullYear(), dob.getMonth()+Math.round(d.ageMonths), dob.getDate());
        const log = cLogs[d.id];
        const st = log ? "given" : sd < now ? "overdue" : "upcoming";
        return `<tr><td style="padding:5px 10px;border:1px solid #e5e7eb;color:#374151;font-size:12px">${d.label}</td>
          <td style="padding:5px 10px;border:1px solid #e5e7eb;font-size:11px;color:#6b7280">${fmtD(sd.toISOString().split("T")[0])}</td>
          <td style="padding:5px 10px;border:1px solid #e5e7eb;font-size:11px;${st==="given"?"background:#d1fae5;color:#065f46":st==="overdue"?"background:#fee2e2;color:#991b1b":"background:#fef9c3;color:#854d0e"}">
            ${st==="given"?"✓ "+fmtD(log.date)+(log.provider?" · "+log.provider:""):st==="overdue"?"⚠ Overdue":"⏰ Upcoming"}</td></tr>`;
      }).join("");
      return `<tr><td colspan="3" style="padding:8px 10px;background:#eff6ff;border:1px solid #bfdbfe;font-weight:800;font-size:13px;color:#1565c0">${v.name}</td></tr>${doseRows}`;
    }).join("");
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>VaxTrack · ${child.name}</title>
      <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#f8fafc;color:#111}
      @media print{.noprint{display:none!important}body{background:white}}</style></head>
      <body>
      <div style="background:linear-gradient(135deg,#1565c0,#3b9edd);padding:20px;color:white">
        <div style="font-size:11px;opacity:0.8;margin-bottom:4px">VaxTrack · IAP Immunization Record</div>
        <div style="font-size:20px;font-weight:900">${child.name}</div>
        <div style="font-size:12px;opacity:0.85;margin-top:4px">DOB: ${fmtD(child.dob)} · Age: ${formatAge(child.dob)} · ${doneDoses}/${totalDoses} doses (${pct2}%)</div>
        <div style="margin-top:10px;background:rgba(255,255,255,0.2);border-radius:6px;height:6px;overflow:hidden">
          <div style="height:100%;width:${pct2}%;background:white;border-radius:6px"></div></div>
      </div>
      <div style="padding:16px;max-width:700px;margin:0 auto">
        <table style="width:100%;border-collapse:collapse;margin-top:8px">
          <thead><tr>
            <th style="padding:6px 10px;background:#1565c0;color:white;text-align:left;font-size:12px;border:1px solid #1565c0">Dose</th>
            <th style="padding:6px 10px;background:#1565c0;color:white;text-align:left;font-size:12px;border:1px solid #1565c0">Scheduled</th>
            <th style="padding:6px 10px;background:#1565c0;color:white;text-align:left;font-size:12px;border:1px solid #1565c0">Status</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:16px;font-size:10px;color:#9ca3af;text-align:center">Generated by VaxTrack · ${fmtD(now.toISOString().split("T")[0])}</div>
      </div></body></html>`;
  }

  // Share report as HTML file via native share sheet — no CDN needed
  async function shareReport(child) {
    if (!child) return;
    const html = buildReportHTML(child);
    const fileName = `VaxTrack_${child.name.replace(/ /g,"_")}_Record.html`;
    const blob = new Blob([html], { type: "text/html" });
    const file = new File([blob], fileName, { type: "text/html" });

    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // ✅ Native share sheet with file attached (iOS & Android)
        await navigator.share({ files: [file], title: `${child.name} · Vaccination Record` });
        return;
      }
    } catch(err) {
      if (err?.name === "AbortError") return; // user cancelled
    }

    // Fallback: try text-only share
    try {
      if (navigator.share) {
        const cLogs = logs[child.id] || {};
        const doneDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.filter(d=>cLogs[d.id]).length,0);
        const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
        const pct = Math.round((doneDoses/totalDoses)*100);
        await navigator.share({
          title: `${child.name} · Vaccination Record`,
          text: `${child.name}'s Vaccination Record 💉\n${doneDoses}/${totalDoses} doses (${pct}%)\nDOB: ${child.dob} · Age: ${formatAge(child.dob)}\nGenerated by VaxTrack`
        });
        return;
      }
    } catch(err) {
      if (err?.name === "AbortError") return;
    }

    // Final fallback: show in-app report modal
    setReportChild(child);
  }


  // Returns a Promise<{blob, fileName}> using jsPDF — same matrix as exportPDF
  function buildPDFBlob(child) {
    return new Promise((resolve, reject) => {
      const cLogs = logs[child.id] || {};
      const dob = new Date(child.dob);
      const now = new Date();
      const ageStr = formatAge(child.dob);
      const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
      const doneDoses  = CDC_VACCINES.reduce((a,v)=>a+v.doses.filter(d=>cLogs[d.id]).length,0);
      const pct2 = Math.round((doneDoses/totalDoses)*100);
      const fileName = "VaxTrack_" + child.name.replace(/ /g,"_") + ".pdf";
      function fmtDate(s){ if(!s)return""; const d=new Date(s); return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" "+d.getDate()+" "+d.getFullYear(); }
      const AGE_COLS = [
        {label:"Birth",months:0},{label:"6w",months:1.5},{label:"10w",months:2.5},{label:"14w",months:3.5},
        {label:"6m",months:6},{label:"7m",months:7},{label:"9m",months:9},{label:"12m",months:12},
        {label:"15-18m",months:15},{label:"18-24m",months:18},{label:"5Y",months:60},
        {label:"9-14Y",months:108},{label:"10-12Y",months:120},{label:"14-15Y",months:168},
      ];
      function findCol(am){ let best=-1,bd=99; AGE_COLS.forEach((c,i)=>{ const diff=Math.abs(c.months-am); if(diff<bd&&diff<=4){bd=diff;best=i;} }); return best; }
      const vaccineRows = CDC_VACCINES.map(v => {
        const cells=AGE_COLS.map(()=>null);
        v.doses.forEach(d=>{
          const ci=findCol(d.ageMonths); if(ci<0)return;
          const sd=new Date(dob.getFullYear(),dob.getMonth()+Math.round(d.ageMonths),dob.getDate());
          const log=cLogs[d.id];
          const short=d.label.replace("Dose ","D").replace("Booster","Bst").replace(" 1","1").replace(" 2","2").replace(" 3","3");
          cells[ci]={short,sdStr:fmtDate(sd.toISOString().split("T")[0]),logDate:log?fmtDate(log.date):null,overdue:!log&&sd<now};
        });
        return {name:v.name,cells};
      });
      const printDate=fmtDate(now.toISOString().split("T")[0]);
      const dobStr=fmtDate(child.dob); const childName=child.name;

      function generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({orientation:"landscape",unit:"mm",format:"a4"});
        const W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight();
        const MARGIN=8,headerH=14,infoH=10,legendH=8,colHeaderH=10;
        const vaccineColW=20,cellW=(W-2*MARGIN-vaccineColW)/AGE_COLS.length;
        const rowH=12,rowsPerPage=Math.floor((H-MARGIN-headerH-infoH-legendH-colHeaderH-8)/rowH);
        function drawPageHeader(pageNum){
          doc.setFillColor(21,101,192);doc.rect(0,0,W,headerH,"F");
          doc.setTextColor(255,255,255);doc.setFontSize(11);doc.setFont("helvetica","bold");
          doc.text("VaxTrack  |  IAP Immunization Schedule",MARGIN,9);
          doc.setFontSize(7);doc.setFont("helvetica","normal");doc.text("Page "+pageNum,W-MARGIN-10,9);
          doc.setFillColor(240,247,255);doc.rect(0,headerH,W,infoH,"F");
          doc.setTextColor(21,101,192);doc.setFontSize(9);doc.setFont("helvetica","bold");doc.text(childName,MARGIN,headerH+6.5);
          doc.setFontSize(7);doc.setFont("helvetica","normal");doc.setTextColor(80,80,80);
          doc.text("DOB: "+dobStr+"   Age: "+ageStr+"   "+doneDoses+"/"+totalDoses+" doses ("+pct2+"%)   Printed: "+printDate,MARGIN+32,headerH+6.5);
          doc.setFillColor(229,231,235);doc.roundedRect(W-60,headerH+3,50,3,1,1,"F");
          doc.setFillColor(21,101,192);doc.roundedRect(W-60,headerH+3,50*pct2/100,3,1,1,"F");
          const ly=headerH+infoH+2;
          [[[168,224,168],"Given"],[[254,243,134],"Upcoming"],[[252,165,165],"Overdue"]].forEach(([rgb,lbl],i)=>{
            const x=MARGIN+i*38; doc.setFillColor(rgb[0],rgb[1],rgb[2]);doc.rect(x,ly,5,3,"F");
            doc.setDrawColor(160,160,160);doc.rect(x,ly,5,3,"S");doc.setTextColor(50,50,50);doc.setFontSize(6.5);doc.text(lbl,x+6.5,ly+2.5);
          });
        }
        function drawColHeaders(startY){
          doc.setFillColor(21,101,192);doc.rect(MARGIN,startY,vaccineColW,colHeaderH,"F");
          doc.setTextColor(255,255,255);doc.setFontSize(7);doc.setFont("helvetica","bold");doc.text("Vaccine",MARGIN+1,startY+7);
          AGE_COLS.forEach((col,ci)=>{ const x=MARGIN+vaccineColW+ci*cellW; doc.setFillColor(21,101,192);doc.rect(x,startY,cellW,colHeaderH,"F");
            doc.setTextColor(255,255,255);doc.setFontSize(7);doc.setFont("helvetica","bold");const tw=doc.getTextWidth(col.label);doc.text(col.label,x+cellW/2-tw/2,startY+7); });
        }
        function drawRow(row,pos,startY){
          const y=startY+pos*rowH,isEven=pos%2===0;
          doc.setFillColor(isEven?245:255,isEven?248:255,255);doc.rect(MARGIN,y,vaccineColW,rowH,"F");
          doc.setDrawColor(210,210,210);doc.rect(MARGIN,y,vaccineColW,rowH,"S");
          doc.setTextColor(21,101,192);doc.setFontSize(6.5);doc.setFont("helvetica","bold");doc.text(row.name,MARGIN+1,y+rowH/2+1);
          row.cells.forEach((cell,ci)=>{
            const x=MARGIN+vaccineColW+ci*cellW;
            if(cell){if(cell.logDate)doc.setFillColor(168,224,168);else if(cell.overdue)doc.setFillColor(252,165,165);else doc.setFillColor(254,243,134);}
            else{doc.setFillColor(isEven?245:255,isEven?248:255,255);}
            doc.rect(x,y,cellW,rowH,"F");doc.setDrawColor(210,210,210);doc.rect(x,y,cellW,rowH,"S");
            if(cell){doc.setTextColor(30,30,30);doc.setFont("helvetica","bold");doc.setFontSize(6);
              const lbl=cell.logDate?cell.short+" ✓":cell.short;doc.text(lbl,x+cellW/2-doc.getTextWidth(lbl)/2,y+3.8);
              const dateStr=cell.logDate||cell.sdStr;doc.text(dateStr,x+cellW/2-doc.getTextWidth(dateStr)/2,y+8.5);}
          });
        }
        const tableStartY=headerH+infoH+legendH+colHeaderH; let page=1;
        drawPageHeader(page);drawColHeaders(headerH+infoH+legendH);
        vaccineRows.forEach((row,ri)=>{
          const pos=ri%rowsPerPage;
          if(ri>0&&pos===0){ doc.setFontSize(6);doc.setTextColor(160,160,160);doc.text("VaxTrack · IAP 2023 Schedule · "+printDate,MARGIN,H-3);
            doc.addPage();page++;drawPageHeader(page);drawColHeaders(headerH+infoH+legendH); }
          drawRow(row,pos,tableStartY);
        });
        doc.setFontSize(6);doc.setTextColor(160,160,160);doc.text("VaxTrack · IAP 2023 Immunization Schedule · "+printDate,MARGIN,H-3);
        resolve({ blob: doc.output("blob"), fileName });
      }

      if (window.jspdf) { try { generate(); } catch(e) { reject(e); } }
      else {
        const s1 = document.createElement("script");
        s1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s1.onerror = reject;
        s1.onload = () => { try { generate(); } catch(e) { reject(e); } };
        document.head.appendChild(s1);
      }
    });
  }

  function exportPDF(child) {
    const cLogs = logs[child.id] || {};
    const dob = new Date(child.dob);
    const now = new Date();
    const ageStr = formatAge(child.dob);
    const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
    const doneDoses  = CDC_VACCINES.reduce((a,v)=>a+v.doses.filter(d=>cLogs[d.id]).length,0);
    const pct2 = Math.round((doneDoses/totalDoses)*100);
    const fileName = "VaxTrack_" + child.name.replace(/ /g,"_") + ".pdf";

    function fmtDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      return m[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
    }

    const AGE_COLS = [
      {label:"Birth",months:0},{label:"6w",months:1.5},{label:"10w",months:2.5},
      {label:"14w",months:3.5},{label:"6m",months:6},{label:"7m",months:7},
      {label:"9m",months:9},{label:"12m",months:12},{label:"15-18m",months:15},
      {label:"18-24m",months:18},{label:"5Y",months:60},{label:"9-14Y",months:108},
      {label:"10-12Y",months:120},{label:"14-15Y",months:168},
    ];
    function findCol(am) {
      let best=-1, bd=99;
      AGE_COLS.forEach((c,i)=>{ const diff=Math.abs(c.months-am); if(diff<bd&&diff<=4){bd=diff;best=i;} });
      return best;
    }
    const vaccineRows = CDC_VACCINES.map(v => {
      const cells = AGE_COLS.map(()=>null);
      v.doses.forEach(d => {
        const ci = findCol(d.ageMonths); if(ci<0) return;
        const sd = new Date(dob.getFullYear(), dob.getMonth()+Math.round(d.ageMonths), dob.getDate());
        const log = cLogs[d.id];
        const short = d.label.replace("Dose ","D").replace("Booster","Bst").replace(" 1","1").replace(" 2","2").replace(" 3","3");
        cells[ci] = { short, sdStr:fmtDate(sd.toISOString().split("T")[0]), logDate:log?fmtDate(log.date):null, overdue:!log&&sd<now };
      });
      return { name:v.name, cells };
    });
    const printDate = fmtDate(now.toISOString().split("T")[0]);
    const dobStr = fmtDate(child.dob);
    const childName = child.name;

    function generate() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation:"landscape", unit:"mm", format:"a4" });
      const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight();
      const MARGIN=8, headerH=14, infoH=10, legendH=8, colHeaderH=10;
      const vaccineColW=20, cellW=(W-2*MARGIN-vaccineColW)/AGE_COLS.length;
      const rowH=12, rowsPerPage=Math.floor((H-MARGIN-headerH-infoH-legendH-colHeaderH-8)/rowH);

      function drawPageHeader(pageNum) {
        doc.setFillColor(21,101,192); doc.rect(0,0,W,headerH,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(11); doc.setFont("helvetica","bold");
        doc.text("VaxTrack  |  IAP Immunization Schedule", MARGIN, 9);
        doc.setFontSize(7); doc.setFont("helvetica","normal");
        doc.text("Page "+pageNum, W-MARGIN-10, 9);
        doc.setFillColor(240,247,255); doc.rect(0,headerH,W,infoH,"F");
        doc.setTextColor(21,101,192); doc.setFontSize(9); doc.setFont("helvetica","bold");
        doc.text(childName, MARGIN, headerH+6.5);
        doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.setTextColor(80,80,80);
        doc.text("DOB: "+dobStr+"   Age: "+ageStr+"   "+doneDoses+"/"+totalDoses+" doses ("+pct2+"%)   Printed: "+printDate, MARGIN+32, headerH+6.5);
        doc.setFillColor(229,231,235); doc.roundedRect(W-60,headerH+3,50,3,1,1,"F");
        doc.setFillColor(21,101,192); doc.roundedRect(W-60,headerH+3,50*pct2/100,3,1,1,"F");
        const ly=headerH+infoH+2;
        [[[168,224,168],"Given"],[[254,243,134],"Upcoming"],[[252,165,165],"Overdue"]].forEach(([rgb,lbl],i)=>{
          const x=MARGIN+i*38;
          doc.setFillColor(rgb[0],rgb[1],rgb[2]); doc.rect(x,ly,5,3,"F");
          doc.setDrawColor(160,160,160); doc.rect(x,ly,5,3,"S");
          doc.setTextColor(50,50,50); doc.setFontSize(6.5); doc.text(lbl,x+6.5,ly+2.5);
        });
      }
      function drawColHeaders(startY) {
        doc.setFillColor(21,101,192); doc.rect(MARGIN,startY,vaccineColW,colHeaderH,"F");
        doc.setTextColor(255,255,255); doc.setFontSize(7); doc.setFont("helvetica","bold");
        doc.text("Vaccine", MARGIN+1, startY+7);
        AGE_COLS.forEach((col,ci)=>{
          const x=MARGIN+vaccineColW+ci*cellW;
          doc.setFillColor(21,101,192); doc.rect(x,startY,cellW,colHeaderH,"F");
          doc.setTextColor(255,255,255); doc.setFontSize(7); doc.setFont("helvetica","bold");
          const tw=doc.getTextWidth(col.label);
          doc.text(col.label, x+cellW/2-tw/2, startY+7);
        });
      }
      function drawRow(row, pos, startY) {
        const y=startY+pos*rowH, isEven=pos%2===0;
        doc.setFillColor(isEven?245:255,isEven?248:255,255);
        doc.rect(MARGIN,y,vaccineColW,rowH,"F");
        doc.setDrawColor(210,210,210); doc.rect(MARGIN,y,vaccineColW,rowH,"S");
        doc.setTextColor(21,101,192); doc.setFontSize(6.5); doc.setFont("helvetica","bold");
        doc.text(row.name, MARGIN+1, y+rowH/2+1);
        row.cells.forEach((cell,ci)=>{
          const x=MARGIN+vaccineColW+ci*cellW;
          if(cell){ if(cell.logDate) doc.setFillColor(168,224,168); else if(cell.overdue) doc.setFillColor(252,165,165); else doc.setFillColor(254,243,134); }
          else { doc.setFillColor(isEven?245:255,isEven?248:255,255); }
          doc.rect(x,y,cellW,rowH,"F"); doc.setDrawColor(210,210,210); doc.rect(x,y,cellW,rowH,"S");
          if(cell){
            doc.setTextColor(30,30,30); doc.setFont("helvetica","bold"); doc.setFontSize(6);
            const lbl=cell.logDate?cell.short+" ✓":cell.short;
            doc.text(lbl, x+cellW/2-doc.getTextWidth(lbl)/2, y+3.8);
            const dateStr=cell.logDate||cell.sdStr;
            doc.text(dateStr, x+cellW/2-doc.getTextWidth(dateStr)/2, y+8.5);
          }
        });
      }

      const tableStartY=headerH+infoH+legendH+colHeaderH;
      let page=1;
      drawPageHeader(page); drawColHeaders(headerH+infoH+legendH);
      vaccineRows.forEach((row,ri)=>{
        const pos=ri%rowsPerPage;
        if(ri>0&&pos===0){
          doc.setFontSize(6); doc.setTextColor(160,160,160);
          doc.text("VaxTrack · IAP 2023 Schedule · "+printDate, MARGIN, H-3);
          doc.addPage(); page++;
          drawPageHeader(page); drawColHeaders(headerH+infoH+legendH);
        }
        drawRow(row, pos, tableStartY);
      });
      doc.setFontSize(6); doc.setTextColor(160,160,160);
      doc.text("VaxTrack · IAP 2023 Immunization Schedule · "+printDate, MARGIN, H-3);

      // Download — multi-method for iOS/Android/desktop
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        const dataUri = doc.output("datauristring");
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(
            `<html><head><title>${fileName}</title><meta name="viewport" content="width=device-width"/></head>` +
            `<body style="margin:0;background:#111;"><p style="color:#fff;font-family:sans-serif;padding:14px;font-size:13px;">` +
            `📄 <b>${fileName}</b> — tap the Share button (⬆) to save.</p>` +
            `<iframe src="${dataUri}" style="width:100%;height:calc(100vh - 60px);border:none;"></iframe></body></html>`
          );
        } else {
          window.location.href = dataUri;
        }
      } else {
        try {
          const blob = doc.output("blob");
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a"); a.href=url; a.download=fileName;
          a.style.cssText="position:fixed;top:-999px;"; document.body.appendChild(a); a.click();
          setTimeout(()=>{ try{document.body.removeChild(a);URL.revokeObjectURL(url);}catch(e){} },3000);
        } catch(e) {
          const a = document.createElement("a"); a.href=doc.output("datauristring"); a.download=fileName;
          a.style.cssText="position:fixed;top:-999px;"; document.body.appendChild(a); a.click();
          setTimeout(()=>{ try{document.body.removeChild(a);}catch(e){} },2000);
        }
      }
    }

    setPdfExporting(child.name);
    if (window.jspdf) {
      generate();
      setPdfExporting(null);
    } else {
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s1.onerror = () => { alert("Could not load PDF library. Check your internet connection."); setPdfExporting(null); };
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
        s2.onload = () => { generate(); setPdfExporting(null); };
        s2.onerror = () => { generate(); setPdfExporting(null); };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    }
  }

    const lmVaccine = logModal ? CDC_VACCINES.find(v => v.id === logModal.vaccineId) : null;
  const lmDose    = logModal ? lmVaccine?.doses.find(d => d.id === logModal.doseId)  : null;

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#f0f7f5", minHeight:"100vh", maxWidth:480, margin:"0 auto", color:"#111827" }}>

      {/* ── Header ── */}
      <div style={{ background:"linear-gradient(135deg,#1565c0,#3b9edd)", padding:"28px 16px 12px", color:"white" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:20 }}>💉</span>
            <div>
              <div style={{ fontWeight:900, fontSize:22, letterSpacing:-0.5 }}>VaxTrack</div>
              <div style={{ fontSize:10, opacity:0.8, marginTop:0 }}>IAP Immunization Log · India</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {late > 0 && <span onClick={() => { setTab("vaccines"); setVaccineView("timeline"); setTimeout(() => firstOverdueRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }), 80); }}
              style={{ fontSize:11, fontWeight:700, color:"#fca5a5", cursor:"pointer" }}>⚠ {late} overdue</span>}
            <button onClick={() => setShowAddChild(true)}
              style={{ background:"rgba(255,255,255,0.2)", border:"1.5px solid rgba(255,255,255,0.45)", color:"white", borderRadius:50, padding:"6px 13px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              + Add Child
            </button>
          </div>
        </div>

        {/* Child tabs — hidden on settings */}
        {tab !== "settings" && tab !== "iap" && <div style={{ display:"flex", alignItems:"center", gap:7, overflowX:"auto", paddingBottom:2 }}>
          {children.map(c => (
            <div key={c.id} onClick={() => setCurrentChildId(c.id)}
              style={{ background:c.id===currentChildId?"white":"rgba(255,255,255,0.15)", border:"1.5px solid", borderColor:c.id===currentChildId?"white":"rgba(255,255,255,0.3)", borderRadius:50, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", color:c.id===currentChildId?"#1565c0":"rgba(255,255,255,0.9)", flexShrink:0, display:"flex", alignItems:"center", gap:6, transition:"all 0.2s" }}>
              <Avatar child={c} size={18} />
              {c.name.split(" ")[0]}
            </div>
          ))}
          <div style={{ flex:1 }} />
          {soon > 0 && (
            <span onClick={() => { setTab("vaccines"); setVaccineView("timeline"); setTimeout(() => firstSoonRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }), 80); }}
              style={{ fontSize:10, fontWeight:700, color:"white", background:"#f4a261", borderRadius:99, padding:"3px 9px", cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>
              {soon} upcoming
            </span>
          )}
          {/* Share icon */}
          {currentChild && <button onClick={() => exportPDF(currentChild)}
            style={{ background:"rgba(255,255,255,0.2)", border:"1.5px solid rgba(255,255,255,0.35)", borderRadius:8, padding:"5px 8px", color:"white", cursor:"pointer", flexShrink:0, lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>}
        </div>}
      </div>

      {/* ── Main ── */}
      <div style={{ padding:"18px 14px 90px" }}>
        {!currentChild ? (
          <div style={{ textAlign:"center", padding:"60px 24px" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>👶</div>
            <div style={{ fontSize:18, fontWeight:800, color:"#374151", marginBottom:8 }}>No Children Added Yet</div>
            <div style={{ fontSize:14, color:"#6b7280" }}>Tap <strong>+ Add Child</strong> above to get started.</div>
          </div>
        ) : (<>
          {/* Child card — hidden on settings */}
          {tab !== "settings" && tab !== "iap" && <div style={{ background:"white", borderRadius:14, padding:16, marginBottom:18, display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <Avatar child={currentChild} size={60} />
              <div onClick={() => setEditingChild(currentChild)}
                style={{ position:"absolute", bottom:-2, right:-2, width:22, height:22, background:"#1565c0", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, cursor:"pointer", border:"2px solid white", color:"white" }}>
                ✏️
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:800 }}>{currentChild.name}</div>
              <div style={{ display:"flex", gap:12, marginTop:4 }}>
                <span style={{ fontSize:12, color:"#6b7280", fontWeight:600 }}>🎂 {formatAge(currentChild.dob)}</span>
                <span style={{ fontSize:12, color:"#6b7280", fontWeight:600 }}>🗓️ {formatDate(currentChild.dob)}</span>
              </div>
              <div style={{ background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden", marginTop:8 }}>
                <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#3b9edd,#3b9edd)", width:`${pct}%`, transition:"width 0.4s" }} />
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:20, fontWeight:900, color:"#1565c0" }}>{pct}%</div>
              <div style={{ fontSize:10, color:"#6b7280", fontWeight:600 }}>complete</div>
            </div>
          </div>}

          {/* Stats — hidden on settings */}
          {tab !== "settings" && tab !== "iap" && <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:18 }}>
            {[[done,"#3b9edd","Done",null],[soon,"#f4a261","Soon",() => { setTab("vaccines"); setVaccineView("timeline"); setTimeout(() => firstSoonRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }), 80); }],[late,"#e63946","Overdue",() => { setTab("vaccines"); setVaccineView("timeline"); setTimeout(() => firstOverdueRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }), 80); }]].map(([n,c,l,onClick]) => (
              <div key={l} onClick={onClick||undefined} style={{ background:"white", borderRadius:10, padding:12, textAlign:"center", cursor:onClick?"pointer":"default", border:onClick&&n>0?`1.5px solid ${c}33`:"1.5px solid transparent" }}>
                <div style={{ fontSize:24, fontWeight:900, color:c, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:10, fontWeight:600, color:"#6b7280", marginTop:2, textTransform:"uppercase", letterSpacing:0.5 }}>{l}</div>
              </div>
            ))}
          </div>}

          {/* ── Vaccines tab ── */}
          {tab === "vaccines" && (<>
            {/* Toggle + filter row */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              {/* View toggle — Timeline, Cards, IAP Chart all in same pill group */}
              <div style={{ display:"flex", background:"#f3f4f6", borderRadius:10, padding:3, flexShrink:0 }}>
                <button onClick={() => setVaccineView("timeline")}
                  style={{ padding:"5px 12px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:800, background:vaccineView==="timeline"?"white":"transparent", color:vaccineView==="timeline"?"#1565c0":"#9ca3af", boxShadow:vaccineView==="timeline"?"0 1px 3px rgba(0,0,0,0.08)":"none", transition:"all 0.15s" }}>
                  🕐 Timeline
                </button>
                <button onClick={() => setVaccineView("cards")}
                  style={{ padding:"5px 12px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:800, background:vaccineView==="cards"?"white":"transparent", color:vaccineView==="cards"?"#1565c0":"#9ca3af", boxShadow:vaccineView==="cards"?"0 1px 3px rgba(0,0,0,0.08)":"none", transition:"all 0.15s" }}>
                  📋 Cards
                </button>
                <button onClick={() => setShowIAPChart(true)}
                  style={{ padding:"5px 10px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:12, fontWeight:800, background:"transparent", color:"#9ca3af", boxShadow:"none", transition:"all 0.15s", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="1" y="1" width="22" height="22" rx="3" fill="white" stroke="#d1d5db" strokeWidth="1.5"/>
                    <rect x="1" y="1" width="22" height="7" rx="3" fill="#1565c0"/>
                    <rect x="1" y="5" width="22" height="3" fill="#1565c0"/>
                    <line x1="9"  y1="8" x2="9"  y2="23" stroke="#e2e8f0" strokeWidth="1"/>
                    <line x1="17" y1="8" x2="17" y2="23" stroke="#e2e8f0" strokeWidth="1"/>
                    <line x1="1" y1="13" x2="23" y2="13" stroke="#e2e8f0" strokeWidth="1"/>
                    <line x1="1" y1="18" x2="23" y2="18" stroke="#e2e8f0" strokeWidth="1"/>
                    <rect x="2"  y="8.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
                    <rect x="10" y="8.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
                    <rect x="18" y="8.5" width="5" height="4" rx="0.5" fill="#facc15"/>
                    <rect x="2"  y="13.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
                    <rect x="10" y="13.5" width="6" height="4" rx="0.5" fill="#86efac"/>
                    <rect x="18" y="13.5" width="5" height="4" rx="0.5" fill="#93c5fd"/>
                    <rect x="2"  y="18.5" width="6" height="4" rx="0.5" fill="#86efac"/>
                  </svg>
                  IAP Chart
                </button>
              </div>
              {/* Filter pills — only in card view */}
              {vaccineView === "cards" && <div style={{ display:"flex", gap:5, overflowX:"auto", flex:1 }}>
                {[["all","All"],["due","Late"],["completed","✓"],["upcoming","Soon"]].map(([f,l]) => (
                  <div key={f} onClick={() => setFilter(f)}
                    style={{ background:filter===f?"#1565c0":"white", border:`1px solid ${filter===f?"#1565c0":"#e5e7eb"}`, borderRadius:99, padding:"1px 7px", fontSize:9, fontWeight:700, cursor:"pointer", color:filter===f?"white":"#6b7280", whiteSpace:"nowrap", flexShrink:0 }}>{l}</div>
                ))}
              </div>}
              {/* Sort toggle — timeline only in its row, cards gets own row below */}
              {vaccineView === "timeline" && (
                <button onClick={() => setSortOrder(o => o==="desc"?"asc":"desc")}
                  style={{ marginLeft:"auto", flexShrink:0, display:"flex", alignItems:"center", gap:4, background:"white", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:800, color:"#6b7280", cursor:"pointer", whiteSpace:"nowrap" }}>
                  {sortOrder==="desc" ? "↑ Latest first" : "↓ Oldest first"}
                </button>
              )}
            </div>
            {/* Sort toggle — cards view, own line */}
            {vaccineView === "cards" && (
              <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:10 }}>
                <button onClick={() => setSortOrder(o => o==="desc"?"asc":"desc")}
                  style={{ display:"flex", alignItems:"center", gap:4, background:"white", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:800, color:"#6b7280", cursor:"pointer" }}>
                  {sortOrder==="desc" ? "↑ Latest first" : "↓ Oldest first"}
                </button>
              </div>
            )}

            {/* ── CARD VIEW ── */}
            {vaccineView === "cards" && (() => {
              const dob2 = new Date(currentChild.dob);
              const sorted = [...CDC_VACCINES].sort((a, b) => {
                const aDate = Math.min(...a.doses.map(d => new Date(dob2.getFullYear(), dob2.getMonth() + Math.round(d.ageMonths), dob2.getDate())));
                const bDate = Math.min(...b.doses.map(d => new Date(dob2.getFullYear(), dob2.getMonth() + Math.round(d.ageMonths), dob2.getDate())));
                return sortOrder === "desc" ? bDate - aDate : aDate - bDate;
              });
              return sorted.map(vaccine => {
              const vstatus = getVaccineStatus(vaccine, ageMonths, childLogs);
              const thisYear = new Date().getFullYear();
              const hasThisYearDose = vaccine.doses.some(d => {
                const dob3 = new Date(currentChild.dob);
                const sd = new Date(dob3.getFullYear(), dob3.getMonth() + Math.round(d.ageMonths), dob3.getDate());
                return sd.getFullYear() === thisYear && !childLogs[d.id];
              });
              if (filter==="due"       && vstatus!=="overdue") return null;
              if (filter==="completed" && vstatus!=="completed") return null;
              if (filter==="upcoming"  && vstatus!=="upcoming" && !hasThisYearDose) return null;
              const isOpen = expanded[vaccine.id];
              const bdrC   = { completed:"#3b9edd", overdue:"#e63946", upcoming:"#f4a261", notdue:"#457b9d" };
              const iconBg = { completed:"#eff6ff", overdue:"#ffeef0", upcoming:"#fff4ec", notdue:"#eaf2f8" };
              const badgeTxt = { completed:"✓ Complete", overdue:"⚠ Overdue", upcoming:"⏰ Due Soon", notdue:"Not Yet Due" }[vstatus];
              const scheduleSummary = vaccine.doses.map(d => {
                const short = d.label.replace("Dose ","D").replace("Annual","Ann").replace("Primary","Pri").replace("Booster","Bst");
                return `${short}: ${d.age}`;
              }).join("  ·  ");
              return (
                <div key={vaccine.id} style={{ background:"white", borderRadius:10, marginBottom:10, overflow:"hidden", borderLeft:`4px solid ${bdrC[vstatus]||"#e5e7eb"}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px 10px", cursor:"pointer" }}
                    onClick={() => setExpanded(p=>({...p,[vaccine.id]:!p[vaccine.id]}))}>
                    <div style={{ width:40, height:40, borderRadius:10, background:iconBg[vstatus]||"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{vaccine.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, fontWeight:800, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{vaccine.name}</div>
                      <div style={{ fontSize:11, color:"#6b7280", fontWeight:600, marginTop:1 }}>{vaccine.fullName}</div>
                    </div>
                    <div style={badgeStyle(vstatus)}>{badgeTxt}</div>
                    <div style={{ fontSize:12, color:"#9ca3af", marginLeft:2 }}>{isOpen?"▲":"▼"}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px 10px", borderTop:"1px solid #f3f4f6", flexWrap:"wrap" }}>
                    <span style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5, flexShrink:0 }}>IAP</span>
                    {vaccine.doses.map((d) => {
                      const st = getDoseStatus(d, ageMonths, childLogs);
                      const dob2 = new Date(currentChild.dob);
                      const dotColor  = st==="logged"?"#3b9edd" : st==="overdue"?"#e63946" : st==="upcoming"?"#f4a261" : "#d1d5db";
                      const textColor = st==="logged"?"#1565c0" : st==="overdue"?"#e63946" : st==="upcoming"?"#b45309" : "#9ca3af";
                      const bgColor   = st==="logged"?"#eff6ff" : st==="overdue"?"#ffeef0" : st==="upcoming"?"#fff4ec" : "#f3f4f6";
                      const scheduledDate = new Date(dob2.getFullYear(), dob2.getMonth() + Math.round(d.ageMonths), dob2.getDate());
                      const schedDay  = scheduledDate.getDate();
                      const schedMon  = scheduledDate.toLocaleDateString("en-IN", { month:"short" });
                      const schedYear = scheduledDate.getFullYear();
                      const shortLabel = d.label.replace("Dose ","D").replace("Annual","Ann").replace("Primary","Pri").replace("Booster","Bst");
                      return (
                        <span key={d.id} style={{ display:"inline-flex", alignItems:"center", gap:3, background:bgColor, borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:700, color:textColor }}>
                          <span style={{ width:6, height:6, borderRadius:"50%", background:dotColor, flexShrink:0, display:"inline-block" }} />
                          {shortLabel}: {d.age} · {schedDay} <span style={{ color:"#e05c2a", fontWeight:800 }}>{schedMon} {schedYear}</span>
                        </span>
                      );
                    })}
                  </div>
                  {isOpen && (
                    <div style={{ display:"flex", flexDirection:"column", gap:8, padding:"0 14px 14px" }}>
                      {vaccine.doses.map(dose => {
                        const st = getDoseStatus(dose, ageMonths, childLogs);
                        const logged = childLogs[dose.id];
                        const statusColor = st==="logged"?"#3b9edd" : st==="overdue"?"#e63946" : st==="upcoming"?"#b45309" : "#9ca3af";
                        const cardBg = { logged:"#f0faf5", overdue:"#ffeef0", upcoming:"#fff4ec", future:"white" }[st] || "white";
                        const cardBorder = { logged:"#3b9edd", overdue:"#e63946", upcoming:"#f4a261", future:"#e5e7eb" }[st] || "#e5e7eb";
                        const dob2 = new Date(currentChild.dob);
                        const scheduledDate = new Date(dob2.getFullYear(), dob2.getMonth() + Math.round(dose.ageMonths), dob2.getDate());
                        const scheduledStr = scheduledDate.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
                        return (
                          <div key={dose.id} style={{ border:`1.5px solid ${cardBorder}`, borderRadius:10, background:cardBg, overflow:"hidden" }}>
                            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px 8px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                                <div style={{ width:28, height:28, borderRadius:7, background: st==="logged"?"#3b9edd":st==="overdue"?"#e63946":st==="upcoming"?"#f4a261":"#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"white", fontWeight:900, flexShrink:0 }}>
                                  {st==="logged" ? "✓" : dose.label.replace("Dose ","").replace("Dose","#")}
                                </div>
                                <div>
                                  <div style={{ fontSize:13, fontWeight:800, color:"#1f2937" }}>{dose.label}</div>
                                  <div style={{ fontSize:11, color:statusColor, fontWeight:700 }}>
                                    {logged ? `Given ${formatDate(logged.date)}` : st==="overdue"?"⚠ Overdue":st==="upcoming"?"⏰ Due soon":"○ Not yet due"}
                                  </div>
                                </div>
                              </div>
                              <div onClick={() => setLogModal({ vaccineId:vaccine.id, doseId:dose.id })}
                                style={{ fontSize:10, color:"#9ca3af", cursor:"pointer", padding:"3px 8px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", fontWeight:700, flexShrink:0 }}>
                                {logged ? "✏️ Edit" : "Details"}
                              </div>
                            </div>
                            <div style={{ borderTop:`1px solid ${cardBorder}`, padding:"8px 12px", background: st==="logged"?"rgba(82,183,136,0.06)":"rgba(0,0,0,0.02)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
                              <div>
                                <div style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>CDC Schedule</div>
                                <div style={{ fontSize:11, fontWeight:700, color:"#374151" }}>{dose.window}</div>
                              </div>
                              <div>
                                <div style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>Scheduled Date</div>
                                <div style={{ fontSize:11, fontWeight:700, color: st==="logged"?"#3b9edd":st==="overdue"?"#e63946":st==="upcoming"?"#b45309":"#374151" }}>🗓️ {scheduledStr}</div>
                              </div>
                              <div>
                                <div style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>Catch-up</div>
                                <div style={{ fontSize:11, fontWeight:600, color:"#6b7280" }}>{dose.catchup}</div>
                              </div>
                              {logged?.provider && (
                                <div>
                                  <div style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5, marginBottom:2 }}>Given at</div>
                                  <div style={{ fontSize:11, fontWeight:700, color:"#1565c0" }}>🏥 {logged.provider}</div>
                                </div>
                              )}
                            </div>
                            <div style={{ display:"flex", gap:0, borderTop:`1px solid ${cardBorder}` }}>
                              <button onClick={e => quickGiven(dose.id, dose.ageMonths, e)}
                                style={{ flex:1, padding:"9px 0", fontSize:12, fontWeight:800, border:"none", cursor:"pointer", background:logged?"#52b788":"#f0faf5", color:logged?"white":"#1565c0", borderBottomLeftRadius:8, transition:"all 0.15s" }}>
                                ✓ Given
                              </button>
                              <div style={{ width:1, background:cardBorder }} />
                              <button onClick={e => quickRemove(dose.id, e)}
                                style={{ flex:1, padding:"9px 0", fontSize:12, fontWeight:800, border:"none", cursor:"pointer", background:logged?"#ffeef0":"#fafafa", color:logged?"#e63946":"#d1d5db", borderBottomRightRadius:8, transition:"all 0.15s" }}>
                                Not Given
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
              }); })()}

            {/* ── TIMELINE VIEW ── */}
            {vaccineView === "timeline" && (() => {
              // Collect all doses with their scheduled dates and sort chronologically
              const allDoses = [];
              CDC_VACCINES.forEach(v => v.doses.forEach(d => {
                const dob2 = new Date(currentChild.dob);
                const scheduledDate = new Date(dob2.getFullYear(), dob2.getMonth() + Math.round(d.ageMonths), dob2.getDate());
                const st = getDoseStatus(d, ageMonths, childLogs);
                const logged = childLogs[d.id];
                allDoses.push({ vaccine:v, dose:d, scheduledDate, st, logged });
              }));
              allDoses.sort((a,b) => sortOrder === "desc" ? b.scheduledDate - a.scheduledDate : a.scheduledDate - b.scheduledDate);

              // Group by age milestone label (collapse doses on same date)
              const groups = [];
              allDoses.forEach(item => {
                const key = item.scheduledDate.toISOString().split("T")[0];
                const last = groups[groups.length-1];
                if (last && last.key === key) {
                  last.items.push(item);
                } else {
                  groups.push({ key, date: item.scheduledDate, items:[item] });
                }
              });

              const now = new Date();
              return (
                <div style={{ position:"relative", paddingLeft:30 }}>
                  {/* Vertical spine */}
                  <div style={{ position:"absolute", left:12, top:6, bottom:6, width:2, background:"linear-gradient(to bottom,#3b9edd,#e5e7eb)" }} />

                  {groups.map((group, gi) => {
                    const isPast   = group.date < now;
                    const allDone  = group.items.every(i => i.st==="logged");
                    const hasLate  = group.items.some(i  => i.st==="overdue");
                    const hasSoon  = !allDone && !hasLate && group.items.some(i => i.st==="upcoming");
                    const dotColor = allDone?"#52b788":hasLate?"#e63946":hasSoon?"#f4a261":"#d1d5db";
                    const dotSize  = hasSoon || hasLate ? 14 : 10;
                    const accentColor = allDone?"#1565c0":hasLate?"#b91c1c":hasSoon?"#b45309":"#6b7280";
                    const bgColor     = allDone?"#52b788":hasLate?"#e63946":hasSoon?"#f4a261":"#d1d5db";
                    const lightBg     = allDone?"#eff6ff":hasLate?"#ffeef0":hasSoon?"#fff4ec":"#f3f4f6";
                    const monthStr = group.date.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
                    const ageStr   = (() => {
                      const dob2=new Date(currentChild.dob);
                      const m=Math.round((group.date-dob2)/(1000*60*60*24*30.44));
                      if(m<1) return "Birth";
                      if(m<12) return `${m} mo`;
                      const y=Math.floor(m/12),r=m%12;
                      return r===0?`${y}yr`:`${y}y${r}m`;
                    })();

                    const isFutureOtherYear = !allDone && !hasLate && !hasSoon && group.date >= now && group.date.getFullYear() !== new Date().getFullYear();
                    const isCurrentYearUpcoming = !allDone && !hasLate && !hasSoon && group.date >= now && group.date.getFullYear() === new Date().getFullYear();
                    const isFirstSoon = (hasSoon || isCurrentYearUpcoming) && gi === groups.findIndex(g => {
                      const gDone = g.items.every(i=>i.st==="logged"), gLate = g.items.some(i=>i.st==="overdue"), gSoon = !gDone&&!gLate&&g.items.some(i=>i.st==="upcoming");
                      const gCYU = !gDone&&!gLate&&!gSoon&&g.date>=now&&g.date.getFullYear()===new Date().getFullYear();
                      return gSoon || gCYU;
                    });
                    const isFirstOverdue = hasLate && gi === groups.findIndex(g => g.items.some(i=>i.st==="overdue"));

                    return (
                      <div key={group.key} ref={isFirstOverdue ? firstOverdueRef : isFirstSoon ? firstSoonRef : null} style={{ position:"relative", marginBottom:14, opacity: isFutureOtherYear ? 0.38 : 1, filter: isFutureOtherYear ? "grayscale(0.4)" : "none", transition:"opacity 0.2s" }}>
                        {/* Timeline dot */}
                        <div style={{ position:"absolute", left:-(dotSize/2+12), top:14, width:dotSize, height:dotSize, borderRadius:"50%", background:bgColor, border:"2.5px solid white", boxShadow:"0 1px 3px rgba(0,0,0,0.08)", transition:"all 0.2s" }} />

                        {/* Unified card: date header + dose rows together */}
                        <div style={{
                          background:"white", borderRadius:12, overflow:"hidden",
                          boxShadow: hasLate?"0 1px 4px rgba(230,57,70,0.12)":hasSoon||isCurrentYearUpcoming?"0 1px 4px rgba(244,162,97,0.15)":"0 1px 3px rgba(0,0,0,0.07)",
                          border: hasLate?"2px solid #fca5a5":hasSoon||isCurrentYearUpcoming?"2px solid #f4a261":allDone?"1px solid #e5e7eb":"1px solid #e5e7eb"
                        }}>
                          {/* Date header row inside the card */}
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", padding:"8px 12px",
                            background: hasLate?"#fff5f5":hasSoon||isCurrentYearUpcoming?"#fffbeb":allDone?"#f8fbff":"#fafafa",
                            borderBottom:"1px solid #f3f4f6"
                          }}>
                            {/* Year pill */}
                            <div style={{ background: allDone?"#64a9e0":hasLate?"#b91c1c":hasSoon?"#b45309":group.date>=now?"#1565c0":"#6b7280", borderRadius:7, padding:"3px 10px" }}>
                              <span style={{ fontSize:16, fontWeight:900, color:"white", lineHeight:1.1, letterSpacing:-0.5 }}>{group.date.getFullYear()}</span>
                            </div>
                            {/* Month pill */}
                            <div style={{ background:lightBg, borderRadius:7, padding:"3px 9px" }}>
                              <span style={{ fontSize:12, fontWeight:800, color:accentColor, textTransform:"uppercase", letterSpacing:0.5 }}>{group.date.toLocaleDateString("en-IN",{month:"short"})}</span>
                            </div>
                            {/* Day */}
                            <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af" }}>{group.date.getDate()}</span>
                            <div style={{ width:1, height:14, background:"#e5e7eb" }} />
                            {/* Age label */}
                            <span style={{ fontSize:14, fontWeight:900, color: allDone?"#1565c0":hasLate?"#e63946":hasSoon?"#b45309":group.date>=now?"#1565c0":"#374151" }}>{ageStr}</span>
                            {/* Status badge */}
                            {allDone && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#52b788", borderRadius:4, padding:"2px 8px" }}>✓ Done</span>}
                            {hasLate  && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#e63946", borderRadius:4, padding:"2px 8px" }}>⚠ Overdue</span>}
                            {hasSoon  && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#f4a261", borderRadius:4, padding:"2px 8px" }}>⏰ Due Soon</span>}
                            {!allDone && !hasLate && !hasSoon && group.date >= now && <span style={{ fontSize:10, fontWeight:700, color:"white", background:"#f4a261", borderRadius:99, padding:"3px 9px" }}>Upcoming</span>}
                            {!allDone && !hasLate && !hasSoon && group.date < now  && <span style={{ fontSize:10, fontWeight:700, color:"#9ca3af", background:"#f3f4f6", borderRadius:4, padding:"2px 8px" }}>Past</span>}
                          </div>

                          {/* Dose rows */}
                          {group.items.map((item, ii) => {
                            const { vaccine, dose, st, logged } = item;
                            const rowBorder = ii < group.items.length-1 ? "1px solid #f3f4f6" : "none";
                            const stColor = st==="logged"?"#3b9edd":st==="overdue"?"#e63946":st==="upcoming"?"#b45309":"#9ca3af";
                            const stBg    = st==="logged"?"#eff6ff":st==="overdue"?"#ffeef0":st==="upcoming"?"#fff4ec":"#f3f4f6";
                            return (
                              <div key={dose.id} onClick={() => setLogModal({vaccineId:vaccine.id, doseId:dose.id})}
                                onMouseDown={e => e.currentTarget.style.background="#f0f7ff"}
                                onMouseUp={e => e.currentTarget.style.background=""}
                                onMouseLeave={e => e.currentTarget.style.background=""}
                                onTouchStart={e => e.currentTarget.style.background="#f0f7ff"}
                                onTouchEnd={e => e.currentTarget.style.background=""}
                                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderBottom:rowBorder, cursor:"pointer", transition:"background 0.15s" }}>
                                <div style={{ width:32, height:32, borderRadius:8, background:stBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{vaccine.icon}</div>
                                <div style={{ flex:1, minWidth:0 }}>
                                  <div style={{ fontSize:13, fontWeight:800, color:"#1f2937", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{vaccine.name} <span style={{ fontWeight:600, color:"#6b7280" }}>— {dose.label}</span></div>
                                  <div style={{ fontSize:11, color:"#9ca3af", fontWeight:600, marginTop:1 }}>{vaccine.fullName}</div>
                                  {logged && <div style={{ fontSize:10, color:"#3b9edd", fontWeight:700, marginTop:2 }}>🏥 {logged.provider || "Logged"} · {formatDate(logged.date)}</div>}
                                </div>
                                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                                  <span style={{ fontSize:10, fontWeight:800, color:stColor, background:stBg, borderRadius:5, padding:"2px 8px" }}>
                                    {st==="logged"?"✓ Given":st==="overdue"?"⚠ Overdue":st==="upcoming"?"⏰ Soon":"○ Future"}
                                  </span>
                                  <div style={{ display:"flex", gap:4 }} onClick={e => e.stopPropagation()}>
                                    <button onClick={e=>quickGiven(dose.id,dose.ageMonths,e)}
                                      style={{ padding:"3px 10px", fontSize:11, fontWeight:800, border:"none", borderRadius:6, cursor:"pointer", background:logged?"#52b788":"#eff6ff", color:logged?"white":"#1565c0" }}>✓</button>
                                    <button onClick={e=>quickRemove(dose.id,e)}
                                      style={{ padding:"3px 10px", fontSize:11, fontWeight:800, border:"none", borderRadius:6, cursor:"pointer", background:logged?"#ffeef0":"#f3f4f6", color:logged?"#e63946":"#d1d5db" }}>✕</button>
                                    <button onClick={e=>{e.stopPropagation();setLogModal({vaccineId:vaccine.id,doseId:dose.id})}}
                                      style={{ padding:"3px 8px", fontSize:11, fontWeight:700, border:"1px solid #e5e7eb", borderRadius:6, cursor:"pointer", background:"white", color:"#9ca3af" }}>···</button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </>)}

          {/* ── Schedule tab ── */}
          {tab === "schedule" && (
            <div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
                <button onClick={() => setSortOrder(o => o==="desc"?"asc":"desc")}
                  style={{ display:"flex", alignItems:"center", gap:4, background:"white", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:800, color:"#6b7280", cursor:"pointer" }}>
                  {sortOrder==="desc" ? "↑ Latest first" : "↓ Oldest first"}
                </button>
              </div>
            <div style={{ position:"relative", paddingLeft:28, marginTop:4 }}>
              <div style={{ position:"absolute", left:10, top:0, bottom:0, width:2, background:"linear-gradient(to bottom,#e5e7eb,#3b9edd)" }} />
              {(sortOrder==="desc" ? [...AGE_MILESTONES].reverse() : AGE_MILESTONES).map(milestone => {
                const here = [];
                CDC_VACCINES.forEach(v => v.doses.forEach(d => {
                  if (Math.abs(d.ageMonths - milestone.months) <= 1.5)
                    here.push({ name:v.name, status:getDoseStatus(d, ageMonths, childLogs) });
                }));
                if (!here.length) return null;

                const dob = new Date(currentChild.dob);
                const milestoneDate = new Date(dob.getFullYear(), dob.getMonth() + milestone.months, dob.getDate());
                const isInPast = milestoneDate <= new Date();

                const allDone = here.every(d => d.status==="logged");
                const hasLate = here.some(d  => d.status==="overdue");
                const hasNext = !allDone && !hasLate && here.some(d => d.status==="upcoming");
                const dotC    = allDone?"#52b788":hasLate?"#e63946":hasNext?"#f4a261":"#d1d5db";
                const dotSize = hasLate || hasNext ? 14 : 10;
                const accentColor = allDone?"#1565c0":hasLate?"#b91c1c":hasNext?"#b45309":"#6b7280";
                const lightBg     = allDone?"#eff6ff":hasLate?"#ffeef0":hasNext?"#fff4ec":"#f3f4f6";

                const isFutureOtherYear = !allDone && !hasLate && !hasNext && milestoneDate >= new Date() && milestoneDate.getFullYear() !== new Date().getFullYear();
                const isCurrentYearUpcoming = !allDone && !hasLate && !hasNext && milestoneDate >= new Date() && milestoneDate.getFullYear() === new Date().getFullYear();

                return (
                  <div key={milestone.label} style={{ position:"relative", marginBottom:16, opacity: isFutureOtherYear ? 0.38 : 1, filter: isFutureOtherYear ? "grayscale(0.4)" : "none", transition:"opacity 0.2s" }}>
                    {/* Timeline dot */}
                    <div style={{ position:"absolute", left:-(dotSize/2+12), top:14, width:dotSize, height:dotSize, borderRadius:"50%", background:dotC, border:"2.5px solid white", boxShadow:"none" }} />

                    {/* Unified card: date header + vaccine pills */}
                    <div style={{
                      background:"white", borderRadius:12, overflow:"hidden",
                      border: hasLate ? "2px solid #fca5a5" : (hasNext||isCurrentYearUpcoming) ? "2px solid #f4a261" : allDone ? "1px solid #e5e7eb" : "1px solid #e5e7eb",
                      boxShadow: hasLate ? "0 1px 4px rgba(230,57,70,0.12)" : (hasNext||isCurrentYearUpcoming) ? "0 1px 4px rgba(244,162,97,0.15)" : "0 1px 3px rgba(0,0,0,0.07)"
                    }}>
                      {/* Date header row */}
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", padding:"8px 12px",
                        background: hasLate?"#fff5f5" : (hasNext||isCurrentYearUpcoming)?"#fffbeb" : allDone?"#f8fbff":"#fafafa",
                        borderBottom:"1px solid #f3f4f6"
                      }}>
                        {/* Year */}
                        <div style={{ background: allDone?"#64a9e0":hasLate?"#b91c1c":hasNext?"#b45309":milestoneDate>=new Date()?"#1565c0":"#6b7280", borderRadius:7, padding:"3px 10px" }}>
                          <span style={{ fontSize:16, fontWeight:900, color:"white", lineHeight:1.1, letterSpacing:-0.5 }}>
                            {milestoneDate.getFullYear()}
                          </span>
                        </div>
                        {/* Month */}
                        <div style={{ background:lightBg, borderRadius:7, padding:"3px 9px" }}>
                          <span style={{ fontSize:12, fontWeight:800, color:accentColor, textTransform:"uppercase", letterSpacing:0.5 }}>
                            {milestoneDate.toLocaleDateString("en-IN",{month:"short"})}
                          </span>
                        </div>
                        {/* Day */}
                        <span style={{ fontSize:11, fontWeight:700, color:"#9ca3af" }}>{milestoneDate.getDate()}</span>
                        <div style={{ width:1, height:14, background:"#e5e7eb" }} />
                        {/* Milestone age label */}
                        <span style={{ fontSize:14, fontWeight:900, color: allDone?"#1565c0":hasLate?"#e63946":hasNext?"#b45309":milestoneDate>=new Date()?"#1565c0":"#374151" }}>
                          {milestone.label}
                        </span>
                        {/* Status badge */}
                        {allDone && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#52b788", borderRadius:4, padding:"2px 8px" }}>✓ Done</span>}
                        {hasLate  && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#e63946", borderRadius:4, padding:"2px 8px" }}>⚠ Overdue</span>}
                        {hasNext  && <span style={{ fontSize:10, fontWeight:800, color:"white", background:"#f4a261", borderRadius:4, padding:"2px 8px" }}>⏰ Due Soon</span>}
                        {isCurrentYearUpcoming && <span style={{ fontSize:10, fontWeight:700, color:"white", background:"#f4a261", borderRadius:99, padding:"3px 9px" }}>Upcoming</span>}
                        {isFutureOtherYear && <span style={{ fontSize:10, fontWeight:700, color:"#9ca3af", background:"#f3f4f6", borderRadius:4, padding:"2px 8px" }}>Future</span>}
                        {!allDone && !hasLate && !hasNext && milestoneDate < new Date() && <span style={{ fontSize:10, fontWeight:700, color:"#9ca3af", background:"#f3f4f6", borderRadius:4, padding:"2px 8px" }}>Past</span>}
                      </div>

                      {/* Vaccine pills inside the card */}
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:"9px 12px" }}>
                        {here.map((d,i) => <span key={i} style={pill(d.status==="logged"?"done":d.status==="overdue"?"late":d.status==="upcoming"?"next":"future")}>{d.name}</span>)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginTop:20, background:"white", borderRadius:12, padding:14 }}>
                {[["#52b788","#15803d","Completed"],["#f4a261","#b45309","Due Soon"],["#e63946","#b91c1c","Overdue"],["#f4a261","#b45309","Upcoming"],["#d1d5db","#6b7280","Past"]].map(([bg,c,l]) => (
                  <div key={l} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, color:c }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:bg }} />{l}
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

          {/* ── Records tab ── */}
          {tab === "records" && (() => {
            const entries = [];
            CDC_VACCINES.forEach(v => v.doses.forEach(d => {
              if (childLogs[d.id]) entries.push({ vaccine:v, dose:d, log:childLogs[d.id] });
            }));
            entries.sort((a,b) => sortOrder==="desc"
              ? new Date(b.log.date)-new Date(a.log.date)
              : new Date(a.log.date)-new Date(b.log.date));

            if (!entries.length) return (
              <div style={{ textAlign:"center", padding:"60px 24px" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>💉</div>
                <div style={{ fontSize:17, fontWeight:800, color:"#374151", marginBottom:8 }}>No Records Yet</div>
                <div style={{ fontSize:14, color:"#6b7280", lineHeight:1.6 }}>Log vaccinations from the Vaccines tab.<br/>They'll appear here as a complete history.</div>
              </div>
            );

            // Summary bar
            const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
            const completionPct = Math.round((entries.length/totalDoses)*100);

            // Group by year-month for timeline
            const grouped = {};
            entries.forEach(e => {
              const d = new Date(e.log.date);
              const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
              const label = d.toLocaleDateString("en-IN",{month:"long",year:"numeric"});
              if (!grouped[key]) grouped[key] = { label, entries:[] };
              grouped[key].entries.push(e);
            });
            const months = Object.keys(grouped).sort((a,b) => sortOrder==="desc" ? b.localeCompare(a) : a.localeCompare(b));

            return (
              <div>
                {/* Summary card */}
                <div style={{ background:"linear-gradient(135deg,#1565c0,#3b9edd)", borderRadius:14, padding:"16px 18px", marginBottom:20, color:"white" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, opacity:0.85 }}>Vaccination Record</div>
                      <div style={{ fontSize:22, fontWeight:900, marginTop:2 }}>{currentChild.name.split(" ")[0]}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:32, fontWeight:900, lineHeight:1 }}>{entries.length}</div>
                        <div style={{ fontSize:11, opacity:0.8, fontWeight:600 }}>of {totalDoses} doses</div>
                      </div>
                      {/* Download PDF button */}
                      <button onClick={() => exportPDF(currentChild)}
                        style={{ background:"rgba(255,255,255,0.2)", border:"1.5px solid rgba(255,255,255,0.5)", borderRadius:8, padding:"5px 11px", color:"white", fontSize:11, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                          <polyline points="16 6 12 2 8 6"/>
                          <line x1="12" y1="2" x2="12" y2="15"/>
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                  <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:99, height:7, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:99, background:"white", width:`${completionPct}%`, transition:"width 0.5s" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
                    <span style={{ fontSize:11, fontWeight:700, opacity:0.85 }}>{completionPct}% complete · {totalDoses - entries.length} remaining</span>
                    {/* Sort toggle — compact, inside card */}
                    <button onClick={() => setSortOrder(o => o==="desc"?"asc":"desc")}
                      style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:6, padding:"3px 9px", fontSize:10, fontWeight:800, color:"white", cursor:"pointer" }}>
                      {sortOrder==="desc" ? "↑ Latest" : "↓ Oldest"}
                    </button>
                  </div>
                </div>

                {/* Timeline grouped by month */}
                {months.map(monthKey => {
                  const { label, entries: monthEntries } = grouped[monthKey];
                  return (
                    <div key={monthKey} style={{ marginBottom:22 }}>
                      {/* Month header */}
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ fontSize:11, fontWeight:800, color:"#6b7280", textTransform:"uppercase", letterSpacing:0.8, whiteSpace:"nowrap" }}>{label}</div>
                        <div style={{ flex:1, height:1, background:"#e5e7eb" }} />
                        <div style={{ fontSize:11, fontWeight:700, color:"#9ca3af", background:"#f3f4f6", borderRadius:99, padding:"2px 8px" }}>{monthEntries.length} dose{monthEntries.length>1?"s":""}</div>
                      </div>

                      {/* Cards in this month */}
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {monthEntries.map((e, i) => {
                          const d = new Date(e.log.date);
                          const dayNum  = d.getDate();
                          const dayName = d.toLocaleDateString("en-IN",{weekday:"short"});
                          const vaxColor = { completed:"#3b9edd", notdue:"#457b9d", overdue:"#e63946", upcoming:"#f4a261" };
                          return (
                            <div key={i} style={{ background:"white", borderRadius:12, overflow:"hidden", display:"flex" }}>
                              {/* Date strip */}
                              <div style={{ width:54, background:"#f8fafc", borderRight:"1px solid #f0f0f0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"12px 6px", flexShrink:0 }}>
                                <div style={{ fontSize:9, fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:0.5 }}>{dayName}</div>
                                <div style={{ fontSize:22, fontWeight:900, color:"#1565c0", lineHeight:1.1 }}>{dayNum}</div>
                              </div>

                              {/* Content */}
                              <div style={{ flex:1, padding:"12px 14px" }}>
                                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                                  <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0 }}>
                                    <div style={{ width:34, height:34, borderRadius:9, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{e.vaccine.icon}</div>
                                    <div style={{ minWidth:0 }}>
                                      <div style={{ fontSize:13, fontWeight:800, color:"#1f2937", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{e.vaccine.fullName}</div>
                                      <div style={{ fontSize:11, color:"#6b7280", fontWeight:600, marginTop:1 }}>{e.dose.label} · {e.dose.age}</div>
                                    </div>
                                  </div>
                                  <button onClick={() => setLogModal({ vaccineId:e.vaccine.id, doseId:e.dose.id })}
                                    style={{ background:"#f3f4f6", border:"none", borderRadius:7, padding:"4px 10px", fontSize:11, fontWeight:700, color:"#6b7280", cursor:"pointer", flexShrink:0 }}>
                                    Edit
                                  </button>
                                </div>

                                {/* Details row */}
                                <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 10px", marginTop:8 }}>
                                  {e.log.provider && (
                                    <div style={{ display:"flex", alignItems:"center", gap:4, background:"#eff6ff", borderRadius:5, padding:"2px 8px" }}>
                                      <span style={{ fontSize:10 }}>🏥</span>
                                      <span style={{ fontSize:11, fontWeight:700, color:"#1565c0" }}>{e.log.provider}</span>
                                    </div>
                                  )}
                                  {e.log.site && (
                                    <div style={{ display:"flex", alignItems:"center", gap:4, background:"#f3f4f6", borderRadius:5, padding:"2px 8px" }}>
                                      <span style={{ fontSize:10 }}>📍</span>
                                      <span style={{ fontSize:11, fontWeight:600, color:"#6b7280" }}>{e.log.site}</span>
                                    </div>
                                  )}
                                  {e.log.lot && (
                                    <div style={{ display:"flex", alignItems:"center", gap:4, background:"#f3f4f6", borderRadius:5, padding:"2px 8px" }}>
                                      <span style={{ fontSize:10 }}>🔢</span>
                                      <span style={{ fontSize:11, fontWeight:600, color:"#6b7280" }}>Lot: {e.log.lot}</span>
                                    </div>
                                  )}
                                </div>
                                {e.log.notes && (
                                  <div style={{ marginTop:7, fontSize:11, color:"#6b7280", fontStyle:"italic", display:"flex", gap:5 }}>
                                    <span>📝</span><span>{e.log.notes}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
          {/* ── IAP Chart tab ── */}
          {tab === "iap" && (
            <IAPChartInline children={children} logs={logs} />
          )}

          {/* ── Settings tab ── */}
          {tab === "settings" && (
            <div>
              {/* Settings sub-tabs */}
              <div style={{ display:"flex", gap:0, marginBottom:16, borderRadius:12, overflow:"hidden", border:"2px solid #1565c0" }}>
                {[["general","⚙️ General"],["share","📤 Share Report"]].map(([k,label],i) => (
                  <button key={k} onClick={() => setSettingsTab(k)}
                    style={{ flex:1, padding:"12px 0", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:800,
                      background:settingsTab===k?"#1565c0":"white",
                      color:settingsTab===k?"white":"#1565c0",
                      borderRight: i===0 ? "2px solid #1565c0" : "none",
                      transition:"all 0.15s", letterSpacing:0.2 }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* ── General settings ── */}
              {settingsTab === "general" && (<>
                {/* Default Provider */}
                <div style={{ background:"white", borderRadius:14, padding:18, marginBottom:14 }}>
                  <div style={{ fontSize:15, fontWeight:800, marginBottom:4 }}>🏥 Default Healthcare Provider</div>
                  <div style={{ fontSize:12, color:"#6b7280", marginBottom:14 }}>Pre-filled when logging any vaccination</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {savedProviders.map(p => (
                      <div key={p} onClick={() => setDefaultProvider(p)}
                        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", borderRadius:10, border:`1.5px solid ${defaultProvider===p?"#3b9edd":"#e5e7eb"}`, background:defaultProvider===p?"#eff6ff":"white", cursor:"pointer", transition:"all 0.15s" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${defaultProvider===p?"#3b9edd":"#d1d5db"}`, background:defaultProvider===p?"#3b9edd":"white", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            {defaultProvider===p && <div style={{ width:8, height:8, borderRadius:"50%", background:"white" }} />}
                          </div>
                          <span style={{ fontSize:14, fontWeight:700, color: defaultProvider===p?"#1565c0":"#374151" }}>{p}</span>
                        </div>
                        {savedProviders.length > 1 && (
                          <button onClick={e => { e.stopPropagation(); const next = savedProviders.filter(x=>x!==p); setSavedProviders(next); if(defaultProvider===p) setDefaultProvider(next[0]||""); }}
                            style={{ background:"none", border:"none", color:"#d1d5db", fontSize:16, cursor:"pointer", padding:"0 4px" }}>✕</button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8, marginTop:12 }}>
                    <input style={{ ...INP, flex:1 }} placeholder="Add new clinic / hospital…"
                      value={newProviderInput} onChange={e => setNewProviderInput(e.target.value)}
                      onKeyDown={e => { if(e.key==="Enter" && newProviderInput.trim()) { const v=newProviderInput.trim(); if(!savedProviders.includes(v)){setSavedProviders(p=>[...p,v]);} setDefaultProvider(v); setNewProviderInput(""); }}} />
                    <button
                      onClick={() => { const v=newProviderInput.trim(); if(!v) return; if(!savedProviders.includes(v)) setSavedProviders(p=>[...p,v]); setDefaultProvider(v); setNewProviderInput(""); }}
                      style={{ padding:"11px 16px", background:"linear-gradient(135deg,#1565c0,#3b9edd)", color:"white", border:"none", borderRadius:10, fontSize:13, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>
                      + Add
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div style={{ background:"white", borderRadius:14, padding:18 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                    <div style={{ fontSize:15, fontWeight:800 }}>👩‍👧‍👦 Children</div>
                    <button onClick={() => setShowAddChild(true)}
                      style={{ background:"linear-gradient(135deg,#1565c0,#3b9edd)", border:"none", borderRadius:8, padding:"6px 14px", fontSize:12, fontWeight:800, cursor:"pointer", color:"white" }}>
                      + Add Child
                    </button>
                  </div>
                  {children.map(c => (
                    <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f3f4f6" }}>
                      <Avatar child={c} size={40} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:800 }}>{c.name}</div>
                        <div style={{ fontSize:12, color:"#6b7280" }}>Born {formatDate(c.dob)} · {formatAge(c.dob)} old</div>
                      </div>
                      <button onClick={() => setEditingChild(c)}
                        style={{ background:"#f3f4f6", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", color:"#374151" }}>
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </>)}

              {/* ── Share Report tab ── */}
              {settingsTab === "share" && (<>
                {/* Download PDF */}
                <div style={{ background:"white", borderRadius:14, padding:18, marginBottom:16 }}>
                  <div style={{ fontSize:15, fontWeight:800, marginBottom:6 }}>📄 Download PDF</div>
                  <div style={{ fontSize:12, color:"#6b7280", marginBottom:14 }}>Download an IAP vaccination record PDF for each child.</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {children.map(c => {
                      const pct = Math.round((Object.keys(logs[c.id]||{}).length / CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0))*100);
                      const isExporting = pdfExporting === c.name;
                      return (
                        <div key={c.id} style={{ display:"flex", gap:8 }}>
                          {/* View Report — always works in-app */}
                          <button onClick={() => setReportChild(c)}
                            style={{ flex:1, display:"flex", alignItems:"center", gap:10, padding:"11px 12px",
                              background:"white", border:"2px solid #1565c0", borderRadius:10, cursor:"pointer", color:"#1565c0" }}>
                            <Avatar child={c} size={26} />
                            <div style={{ textAlign:"left", flex:1 }}>
                              <div style={{ fontSize:12, fontWeight:800 }}>{c.name}</div>
                              <div style={{ fontSize:10, color:"#6b7280" }}>{pct}% complete</div>
                            </div>
                            <span style={{ fontSize:11, fontWeight:800 }}>👁 View</span>
                          </button>
                          {/* Download */}
                          <button onClick={() => exportPDF(c)} disabled={isExporting}
                            style={{ padding:"11px 14px", background: isExporting?"#4a90d9":"linear-gradient(135deg,#1565c0,#3b9edd)",
                              border:"none", borderRadius:10, cursor:isExporting?"wait":"pointer", color:"white", fontSize:11, fontWeight:800, whiteSpace:"nowrap" }}>
                            {isExporting ? "⏳" : "⬇ Download PDF"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Share via WhatsApp */}
                <div style={{ background:"white", borderRadius:14, padding:18, marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:20 }}>💬</span>
                    <div style={{ fontSize:15, fontWeight:800 }}>Share via WhatsApp</div>
                  </div>
                  <div style={{ fontSize:12, color:"#6b7280", marginBottom:14, lineHeight:1.5 }}>
                    Enter a number and select the child name below to go directly to that chat OR leave blank to pick any contact later and tap a child name to download their PDF and open WhatsApp.
                  </div>

                  {/* Optional phone number */}
                  <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", background:"#f3f4f6", borderRadius:10, padding:"0 12px", flex:1, border:"1.5px solid #e5e7eb", gap:6 }}>
                      <span style={{ fontSize:13, color:"#6b7280", fontWeight:700 }}>+</span>
                      <input type="tel" placeholder="91 98765 43210 (optional)"
                        value={whatsappNumber}
                        onChange={e => setWhatsappNumber(e.target.value.replace(/[^0-9 ]/g,""))}
                        style={{ flex:1, border:"none", background:"transparent", fontSize:13, fontWeight:600, color:"#111827", padding:"10px 0", outline:"none", fontFamily:"inherit" }} />
                      {whatsappNumber && <button onClick={() => setWhatsappNumber("")}
                        style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"#9ca3af" }}>✕</button>}
                    </div>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {children.map(c => {
                      const pct = Math.round((Object.keys(logs[c.id]||{}).length / CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0))*100);
                      const isSharing = waSharing === c.name;
                      return (
                        <button key={c.id} disabled={isSharing}
                          onClick={async () => {
                            setWaSharing(c.name);
                            try {
                              const { blob, fileName } = await buildPDFBlob(c);
                              const file = new File([blob], fileName, { type: "application/pdf" });
                              // Try native share with PDF file attached
                              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                                await navigator.share({ files: [file], title: `${c.name} · Vaccination Record` });
                              } else if (navigator.share) {
                                // File share not supported — share text + also trigger download
                                const done2 = Object.keys(logs[c.id]||{}).length;
                                const total2 = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
                                await navigator.share({ title:`${c.name} · Vaccination Record`, text:`${c.name}'s Vaccination Record 💉\n${done2}/${total2} doses (${pct}%)\nGenerated by VaxTrack` });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a"); a.href=url; a.download=fileName;
                                a.style.cssText="position:fixed;top:-999px;"; document.body.appendChild(a); a.click();
                                setTimeout(()=>{try{document.body.removeChild(a);URL.revokeObjectURL(url);}catch(e){}},2000);
                              } else {
                                // Desktop: open WhatsApp Web + download PDF
                                const num = whatsappNumber.replace(/\s/g,"");
                                const done2 = Object.keys(logs[c.id]||{}).length;
                                const total2 = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
                                const msg = encodeURIComponent(`${c.name}'s Vaccination Record 💉\n${done2}/${total2} doses (${pct}%)\nSee attached PDF: ${fileName}`);
                                const waUrl = num.length>5 ? `https://wa.me/${num}?text=${msg}` : `https://web.whatsapp.com/send?text=${msg}`;
                                const a2 = document.createElement("a"); a2.href=waUrl; a2.target="_blank"; a2.rel="noopener";
                                a2.style.cssText="position:fixed;top:-999px;"; document.body.appendChild(a2); a2.click();
                                setTimeout(()=>{try{document.body.removeChild(a2);}catch(e){}},1000);
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a"); a.href=url; a.download=fileName;
                                a.style.cssText="position:fixed;top:-999px;"; document.body.appendChild(a); a.click();
                                setTimeout(()=>{try{document.body.removeChild(a);URL.revokeObjectURL(url);}catch(e){}},2000);
                              }
                            } catch(err) {
                              if (err?.name !== "AbortError") alert("Could not share PDF. Try the Download PDF button instead.");
                            } finally { setWaSharing(null); }
                          }}
                          style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px",
                            background: isSharing ? "#128c7e99" : "linear-gradient(135deg,#25d366,#128c7e)",
                            border:"none", borderRadius:10, cursor: isSharing?"wait":"pointer", color:"white", opacity:isSharing?0.8:1 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <Avatar child={c} size={28} />
                            <div style={{ textAlign:"left" }}>
                              <div style={{ fontSize:13, fontWeight:800 }}>{c.name}</div>
                              <div style={{ fontSize:10, opacity:0.85 }}>{formatAge(c.dob)} · {pct}% complete</div>
                            </div>
                          </div>
                          <span style={{ fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                            {isSharing ? "⏳ Preparing..." : (<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share PDF</>)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ marginTop:12, padding:"9px 12px", background:"#f0fdf4", borderRadius:8, border:"1px solid #bbf7d0" }}>
                    <div style={{ fontSize:10.5, color:"#15803d", lineHeight:1.5 }}>
                      💡 On iPhone/Android, tapping <b>Share PDF</b> opens the native share sheet with the PDF attached — pick WhatsApp, iMessage, or any app to send it directly.
                    </div>
                  </div>
                </div>
              </>)}
            </div>
          )}
        </>)}
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"white", borderTop:"1px solid #f3f4f6", display:"flex", zIndex:100 }}>
        {[["vaccines","💉","Vaccines"],["schedule","🗓️","Schedule"],["records","📋","Records"]].map(([t,icon,label]) => (
          <div key={t} onClick={() => setTab(t)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, padding:"8px 0", cursor:"pointer", color:tab===t?"#1565c0":"#9ca3af" }}>
            <div style={{ fontSize:22, lineHeight:1 }}>{icon}</div>
            <div style={{ fontSize:10, fontWeight:700 }}>{label}</div>
          </div>
        ))}

        {/* IAP Chart */}
        <div onClick={() => setTab("iap")} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, padding:"8px 0", cursor:"pointer" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="1" width="22" height="22" rx="3" fill="white" stroke={tab==="iap"?"#1565c0":"#d1d5db"} strokeWidth="1.5"/>
            <rect x="1" y="1" width="22" height="7" rx="3" fill="#1565c0"/>
            <rect x="1" y="5" width="22" height="3" fill="#1565c0"/>
            <line x1="9"  y1="8" x2="9"  y2="23" stroke="#e2e8f0" strokeWidth="1"/>
            <line x1="17" y1="8" x2="17" y2="23" stroke="#e2e8f0" strokeWidth="1"/>
            <line x1="1" y1="13" x2="23" y2="13" stroke="#e2e8f0" strokeWidth="1"/>
            <line x1="1" y1="18" x2="23" y2="18" stroke="#e2e8f0" strokeWidth="1"/>
            <rect x="2"  y="8.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
            <rect x="10" y="8.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
            <rect x="18" y="8.5" width="5" height="4" rx="0.5" fill="#facc15"/>
            <rect x="2"  y="13.5" width="6" height="4" rx="0.5" fill="#4ade80"/>
            <rect x="10" y="13.5" width="6" height="4" rx="0.5" fill="#86efac"/>
            <rect x="18" y="13.5" width="5" height="4" rx="0.5" fill="#93c5fd"/>
            <rect x="2"  y="18.5" width="6" height="4" rx="0.5" fill="#86efac"/>
          </svg>
          <div style={{ fontSize:10, fontWeight:700, color:tab==="iap"?"#1565c0":"#9ca3af" }}>IAP Chart</div>
        </div>

        {/* Settings */}
        <div onClick={() => setTab("settings")} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, padding:"8px 0", cursor:"pointer", color:tab==="settings"?"#1565c0":"#9ca3af" }}>
          <div style={{ fontSize:22, lineHeight:1 }}>⚙️</div>
          <div style={{ fontSize:10, fontWeight:700 }}>Settings</div>
        </div>
      </div>

      {/* ── In-App Report Modal ── */}
      {reportChild && (() => {
        const c = reportChild;
        const cLogs = logs[c.id] || {};
        const now = new Date();
        const dob = new Date(c.dob);
        const totalDoses = CDC_VACCINES.reduce((a,v)=>a+v.doses.length,0);
        const doneDoses  = CDC_VACCINES.reduce((a,v)=>a+v.doses.filter(d=>cLogs[d.id]).length,0);
        const pct2 = Math.round((doneDoses/totalDoses)*100);
        const fmtD = s => { if(!s)return""; const d=new Date(s); return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]+" "+d.getDate()+" "+d.getFullYear(); };
        return (
          <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.5)", display:"flex", flexDirection:"column" }}>
            <div style={{ background:"white", flex:1, display:"flex", flexDirection:"column", maxWidth:480, margin:"0 auto", width:"100%", borderRadius:"16px 16px 0 0", marginTop:40, overflow:"hidden" }}>
              {/* Report header */}
              <div style={{ background:"linear-gradient(135deg,#1565c0,#3b9edd)", padding:"16px 16px 12px", color:"white", flexShrink:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:11, opacity:0.8, marginBottom:2 }}>VaxTrack · Vaccination Record</div>
                    <div style={{ fontSize:18, fontWeight:900 }}>{c.name}</div>
                    <div style={{ fontSize:11, opacity:0.85, marginTop:2 }}>DOB: {fmtD(c.dob)} · {formatAge(c.dob)} · {doneDoses}/{totalDoses} doses ({pct2}%)</div>
                  </div>
                  <button onClick={() => setReportChild(null)}
                    style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, padding:"6px 10px", color:"white", fontSize:16, cursor:"pointer", fontWeight:800 }}>✕</button>
                </div>
                {/* Progress bar */}
                <div style={{ marginTop:10, background:"rgba(255,255,255,0.25)", borderRadius:4, height:5 }}>
                  <div style={{ height:"100%", width:`${pct2}%`, background:"white", borderRadius:4 }} /></div>
                {/* Share button */}
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  {navigator.share && <button onClick={() => shareReport(c)}
                    style={{ flex:1, padding:"8px 0", background:"#25d366", border:"none", borderRadius:8, color:"white", fontSize:12, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                      <polyline points="16 6 12 2 8 6"/>
                      <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                    Share
                  </button>}
                  <button onClick={() => exportPDF(c)}
                    style={{ flex:1, padding:"8px 0", background:"rgba(255,255,255,0.2)", border:"1.5px solid rgba(255,255,255,0.5)", borderRadius:8, color:"white", fontSize:12, fontWeight:800, cursor:"pointer" }}>
                    ⬇ Save File
                  </button>
                </div>
              </div>
              {/* Scrollable vaccine list */}
              <div style={{ flex:1, overflowY:"auto", padding:14 }}>
                {CDC_VACCINES.map(v => {
                  const doseItems = v.doses.map(d => {
                    const sd = new Date(dob.getFullYear(), dob.getMonth()+Math.round(d.ageMonths), dob.getDate());
                    const log = cLogs[d.id];
                    const st = log ? "given" : sd < now ? "overdue" : "upcoming";
                    return (
                      <div key={d.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid #f3f4f6" }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:"#374151" }}>{d.label}</div>
                          <div style={{ fontSize:10, color:"#9ca3af" }}>Scheduled: {fmtD(sd.toISOString().split("T")[0])}</div>
                        </div>
                        <div style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99,
                          background:st==="given"?"#d1fae5":st==="overdue"?"#fee2e2":"#fef9c3",
                          color:st==="given"?"#065f46":st==="overdue"?"#991b1b":"#854d0e" }}>
                          {st==="given" ? `✓ ${fmtD(log.date)}` : st==="overdue" ? "⚠ Overdue" : "⏰ Upcoming"}
                        </div>
                      </div>
                    );
                  });
                  return (
                    <div key={v.id} style={{ marginBottom:12 }}>
                      <div style={{ fontSize:13, fontWeight:800, color:"#1565c0", background:"#eff6ff", padding:"6px 10px", borderRadius:8, marginBottom:4 }}>{v.name}</div>
                      {doseItems}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Modals ── */}
      {showAddChild && <ChildModal onSave={upsertChild} onClose={() => setShowAddChild(false)} />}
      {editingChild  && <ChildModal existing={editingChild} onSave={upsertChild} onClose={() => setEditingChild(null)} />}

      {/* IAP Chart Modal */}
      {showIAPChart && <IAPChartModal onClose={() => setShowIAPChart(false)} children={children} logs={logs} />}
      {logModal && lmVaccine && lmDose && (
        <LogDoseModal
          vaccine={lmVaccine} dose={lmDose}
          existing={childLogs[logModal.doseId] || null}
          defaultProvider={defaultProvider}
          onSave={entry => saveLog(logModal.doseId, entry)}
          onRemove={() => saveLog(logModal.doseId, null)}
          onClose={() => setLogModal(null)}
        />
      )}
    </div>
  );
}


window.VaxTrack = VaxTrack;
