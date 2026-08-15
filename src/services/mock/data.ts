/**
 * Centralized mock data layer for the HOSPI-NET prototype.
 * All UI reads through src/services/* so real APIs can replace this later.
 */

export type Severity = "critical" | "high" | "moderate" | "stable";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  address: string;
  allergies: string[];
  conditions: string[];
  medications: { name: string; dose: string; schedule: string }[];
  emergencyContacts: { id: string; name: string; relation: string; phone: string }[];
  healthScore: number;
  insurance: string;
  abhaId: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: "Multi-Speciality" | "Government" | "Trauma Centre" | "Super Speciality";
  city: string;
  area: string;
  distanceKm: number;
  etaMin: number;
  rating: number;
  reviews: number;
  icuBeds: { total: number; available: number };
  emergencyBeds: { total: number; available: number };
  generalBeds: { total: number; available: number };
  ventilators: { total: number; available: number };
  waitingTimeMin: number;
  doctorsOnDuty: number;
  facilities: string[];
  departments: string[];
  aiScore: number;
  aiReason: string;
  phone: string;
  trauma: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
  experienceYears: number;
  rating: number;
  availability: "available" | "in-surgery" | "off-duty";
  emergencyAvailable: boolean;
  languages: string[];
  education: string[];
  schedule: { day: string; hours: string }[];
  patientsToday: number;
}

export interface Ambulance {
  id: string;
  vehicleNo: string;
  driver: string;
  driverPhone: string;
  type: "ALS" | "BLS" | "Cardiac" | "Neonatal";
  status: "en-route" | "available" | "at-hospital" | "returning";
  etaMin: number;
  distanceKm: number;
  speedKmph: number;
  traffic: "light" | "moderate" | "heavy";
  paramedics: number;
  assignedEmergencyId?: string;
}

export interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  type: string;
  severity: Severity;
  createdAt: string;
  location: string;
  hospitalId: string;
  ambulanceId: string;
  status: string;
  vitals: { hr: number; spo2: number; bp: string };
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  category: "emergency" | "wearable" | "hospital" | "doctor" | "family" | "system";
  priority: "critical" | "high" | "normal";
  time: string;
  read: boolean;
}

export const patient: Patient = {
  id: "PT-10241",
  name: "Vishal Narayanan",
  age: 34,
  gender: "Male",
  bloodGroup: "O+",
  phone: "+91 98407 21188",
  address: "12/4 Anna Nagar East, Chennai 600102",
  allergies: ["Penicillin", "Dust mite"],
  conditions: ["Hypertension (Stage 1)", "Mild asthma"],
  medications: [
    { name: "Telmisartan 40mg", dose: "1 tablet", schedule: "Daily, morning" },
    { name: "Salbutamol inhaler", dose: "2 puffs", schedule: "As needed" },
    { name: "Vitamin D3", dose: "60,000 IU", schedule: "Weekly" },
  ],
  emergencyContacts: [
    { id: "EC-1", name: "Lakshmi Narayanan", relation: "Spouse", phone: "+91 98410 55231" },
    { id: "EC-2", name: "Dr. Arjun Mehta", relation: "Family physician", phone: "+91 90031 78420" },
    { id: "EC-3", name: "Karthik N.", relation: "Brother", phone: "+91 99620 44810" },
  ],
  healthScore: 82,
  insurance: "Star Health · Family Floater ₹10L",
  abhaId: "12-3456-7890-1234",
};

export const hospitals: Hospital[] = [
  {
    id: "HP-001",
    name: "Apex Institute of Medical Sciences",
    type: "Super Speciality",
    city: "Chennai",
    area: "Anna Nagar",
    distanceKm: 2.4,
    etaMin: 7,
    rating: 4.8,
    reviews: 2140,
    icuBeds: { total: 48, available: 6 },
    emergencyBeds: { total: 30, available: 11 },
    generalBeds: { total: 220, available: 54 },
    ventilators: { total: 24, available: 5 },
    waitingTimeMin: 4,
    doctorsOnDuty: 38,
    facilities: ["Level-1 Trauma", "Cath Lab 24x7", "CT / MRI", "Blood Bank", "Stroke Unit"],
    departments: ["Cardiology", "Neurology", "Emergency Medicine", "Orthopaedics", "Pulmonology"],
    aiScore: 96,
    aiReason: "Cath lab free now, cardiac ICU bed available, lightest traffic corridor",
    phone: "+91 44 4000 1200",
    trauma: true,
  },
  {
    id: "HP-002",
    name: "Government General Hospital",
    type: "Government",
    city: "Chennai",
    area: "Park Town",
    distanceKm: 6.1,
    etaMin: 16,
    rating: 4.2,
    reviews: 5620,
    icuBeds: { total: 90, available: 14 },
    emergencyBeds: { total: 60, available: 22 },
    generalBeds: { total: 640, available: 138 },
    ventilators: { total: 40, available: 9 },
    waitingTimeMin: 22,
    doctorsOnDuty: 71,
    facilities: ["Free Emergency Care", "Trauma Ward", "Burns Unit", "Blood Bank"],
    departments: ["Emergency Medicine", "General Surgery", "Paediatrics", "Burns", "Toxicology"],
    aiScore: 81,
    aiReason: "Highest bed capacity, longer transit and triage wait",
    phone: "+91 44 2530 5000",
    trauma: true,
  },
  {
    id: "HP-003",
    name: "Meridian Heart & Vascular Centre",
    type: "Multi-Speciality",
    city: "Chennai",
    area: "Kilpauk",
    distanceKm: 3.8,
    etaMin: 11,
    rating: 4.6,
    reviews: 1480,
    icuBeds: { total: 32, available: 3 },
    emergencyBeds: { total: 18, available: 4 },
    generalBeds: { total: 140, available: 26 },
    ventilators: { total: 16, available: 2 },
    waitingTimeMin: 9,
    doctorsOnDuty: 21,
    facilities: ["Cardiac ICU", "Cath Lab", "ECMO", "Blood Bank"],
    departments: ["Cardiology", "Cardiothoracic Surgery", "Emergency Medicine", "Radiology"],
    aiScore: 88,
    aiReason: "Strong cardiac specialisation, limited ICU headroom",
    phone: "+91 44 4111 8080",
    trauma: false,
  },
  {
    id: "HP-004",
    name: "Sundaram Trauma & Accident Centre",
    type: "Trauma Centre",
    city: "Chennai",
    area: "Guindy",
    distanceKm: 9.3,
    etaMin: 21,
    rating: 4.4,
    reviews: 960,
    icuBeds: { total: 26, available: 8 },
    emergencyBeds: { total: 24, available: 13 },
    generalBeds: { total: 110, available: 41 },
    ventilators: { total: 14, available: 6 },
    waitingTimeMin: 6,
    doctorsOnDuty: 17,
    facilities: ["Level-2 Trauma", "Orthopaedic OT", "CT 24x7", "Air Ambulance Pad"],
    departments: ["Trauma Surgery", "Orthopaedics", "Neurosurgery", "Emergency Medicine"],
    aiScore: 74,
    aiReason: "Good trauma capacity but 21 min transit for a cardiac case",
    phone: "+91 44 2233 4455",
    trauma: true,
  },
  {
    id: "HP-005",
    name: "Lotus Mother & Child Hospital",
    type: "Multi-Speciality",
    city: "Chennai",
    area: "Adyar",
    distanceKm: 11.7,
    etaMin: 27,
    rating: 4.7,
    reviews: 1120,
    icuBeds: { total: 18, available: 5 },
    emergencyBeds: { total: 12, available: 6 },
    generalBeds: { total: 96, available: 33 },
    ventilators: { total: 10, available: 4 },
    waitingTimeMin: 8,
    doctorsOnDuty: 14,
    facilities: ["NICU Level-3", "Obstetric Emergency", "Neonatal Ambulance"],
    departments: ["Obstetrics", "Neonatology", "Paediatrics", "Emergency Medicine"],
    aiScore: 62,
    aiReason: "Specialisation mismatch for current emergency type",
    phone: "+91 44 4567 2300",
    trauma: false,
  },
];

export const doctors: Doctor[] = [
  {
    id: "DR-101",
    name: "Dr. Ananya Krishnan",
    specialization: "Interventional Cardiology",
    hospitalId: "HP-001",
    experienceYears: 16,
    rating: 4.9,
    availability: "available",
    emergencyAvailable: true,
    languages: ["English", "Tamil", "Hindi"],
    education: ["MBBS — CMC Vellore", "MD Cardiology — AIIMS Delhi", "Fellowship — Cleveland Clinic"],
    schedule: [
      { day: "Mon – Fri", hours: "09:00 – 15:00" },
      { day: "Sat", hours: "10:00 – 13:00" },
      { day: "Emergency call", hours: "24x7 rotation" },
    ],
    patientsToday: 18,
  },
  {
    id: "DR-102",
    name: "Dr. Rohit Verma",
    specialization: "Emergency Medicine",
    hospitalId: "HP-001",
    experienceYears: 11,
    rating: 4.7,
    availability: "available",
    emergencyAvailable: true,
    languages: ["English", "Hindi"],
    education: ["MBBS — KGMU Lucknow", "MD Emergency Medicine — PGIMER"],
    schedule: [
      { day: "Mon – Sat", hours: "20:00 – 08:00 (night ER)" },
      { day: "Emergency call", hours: "Always on" },
    ],
    patientsToday: 32,
  },
  {
    id: "DR-103",
    name: "Dr. Meera Sundaram",
    specialization: "Neurology / Stroke",
    hospitalId: "HP-003",
    experienceYears: 14,
    rating: 4.8,
    availability: "in-surgery",
    emergencyAvailable: false,
    languages: ["English", "Tamil", "Malayalam"],
    education: ["MBBS — Madras Medical College", "DM Neurology — NIMHANS"],
    schedule: [
      { day: "Tue – Sat", hours: "11:00 – 17:00" },
      { day: "Stroke call", hours: "Alternate nights" },
    ],
    patientsToday: 9,
  },
  {
    id: "DR-104",
    name: "Dr. Imran Sheikh",
    specialization: "Trauma & Orthopaedic Surgery",
    hospitalId: "HP-004",
    experienceYears: 19,
    rating: 4.6,
    availability: "available",
    emergencyAvailable: true,
    languages: ["English", "Hindi", "Urdu"],
    education: ["MBBS — JIPMER", "MS Orthopaedics — Seth GS Mumbai"],
    schedule: [
      { day: "Mon – Fri", hours: "08:00 – 14:00" },
      { day: "Trauma call", hours: "Weekend rotation" },
    ],
    patientsToday: 12,
  },
  {
    id: "DR-105",
    name: "Dr. Kavya Reddy",
    specialization: "Pulmonology",
    hospitalId: "HP-002",
    experienceYears: 9,
    rating: 4.5,
    availability: "off-duty",
    emergencyAvailable: false,
    languages: ["English", "Telugu", "Tamil"],
    education: ["MBBS — Osmania", "MD Pulmonary Medicine — CMC Vellore"],
    schedule: [
      { day: "Mon – Thu", hours: "10:00 – 16:00" },
      { day: "Fri", hours: "OPD only" },
    ],
    patientsToday: 0,
  },
  {
    id: "DR-106",
    name: "Dr. Sneha Pillai",
    specialization: "Paediatric Emergency",
    hospitalId: "HP-005",
    experienceYears: 12,
    rating: 4.9,
    availability: "available",
    emergencyAvailable: true,
    languages: ["English", "Malayalam", "Tamil"],
    education: ["MBBS — Trivandrum MC", "MD Paediatrics — JIPMER"],
    schedule: [
      { day: "Mon – Sat", hours: "09:00 – 18:00" },
      { day: "Neonatal call", hours: "24x7 rotation" },
    ],
    patientsToday: 21,
  },
];

export const ambulances: Ambulance[] = [
  {
    id: "AMB-204",
    vehicleNo: "TN 09 EM 4204",
    driver: "Suresh Kumar",
    driverPhone: "+91 90807 11204",
    type: "Cardiac",
    status: "en-route",
    etaMin: 6,
    distanceKm: 2.1,
    speedKmph: 42,
    traffic: "moderate",
    paramedics: 2,
    assignedEmergencyId: "EM-5581",
  },
  {
    id: "AMB-117",
    vehicleNo: "TN 09 EM 1117",
    driver: "Mohammed Rafi",
    driverPhone: "+91 90807 11117",
    type: "ALS",
    status: "available",
    etaMin: 9,
    distanceKm: 3.6,
    speedKmph: 0,
    traffic: "light",
    paramedics: 2,
  },
  {
    id: "AMB-338",
    vehicleNo: "TN 09 EM 3338",
    driver: "Prakash Iyer",
    driverPhone: "+91 90807 13338",
    type: "BLS",
    status: "at-hospital",
    etaMin: 0,
    distanceKm: 0,
    speedKmph: 0,
    traffic: "light",
    paramedics: 1,
  },
  {
    id: "AMB-402",
    vehicleNo: "TN 09 EM 4402",
    driver: "Deepak Raj",
    driverPhone: "+91 90807 14402",
    type: "ALS",
    status: "returning",
    etaMin: 14,
    distanceKm: 7.2,
    speedKmph: 38,
    traffic: "heavy",
    paramedics: 2,
  },
  {
    id: "AMB-511",
    vehicleNo: "TN 09 EM 5511",
    driver: "Vignesh S.",
    driverPhone: "+91 90807 15511",
    type: "Neonatal",
    status: "available",
    etaMin: 12,
    distanceKm: 5.4,
    speedKmph: 0,
    traffic: "moderate",
    paramedics: 3,
  },
];

export const emergencies: EmergencyCase[] = [
  {
    id: "EM-5581",
    patientName: "Vishal Narayanan",
    age: 34,
    type: "Suspected cardiac event",
    severity: "critical",
    createdAt: "23:41",
    location: "Anna Nagar East, Chennai",
    hospitalId: "HP-001",
    ambulanceId: "AMB-204",
    status: "Ambulance en route",
    vitals: { hr: 128, spo2: 91, bp: "148/96" },
  },
  {
    id: "EM-5579",
    patientName: "Radha Menon",
    age: 68,
    type: "Fall with head injury",
    severity: "high",
    createdAt: "23:12",
    location: "Kilpauk Garden Road",
    hospitalId: "HP-004",
    ambulanceId: "AMB-402",
    status: "At hospital — triage",
    vitals: { hr: 96, spo2: 95, bp: "132/84" },
  },
  {
    id: "EM-5576",
    patientName: "Arun Prakash",
    age: 41,
    type: "Road traffic accident",
    severity: "high",
    createdAt: "22:38",
    location: "Poonamallee High Road",
    hospitalId: "HP-002",
    ambulanceId: "AMB-338",
    status: "Treatment started",
    vitals: { hr: 104, spo2: 93, bp: "126/78" },
  },
  {
    id: "EM-5570",
    patientName: "Fatima Begum",
    age: 29,
    type: "Severe asthma attack",
    severity: "moderate",
    createdAt: "21:55",
    location: "Adyar Depot",
    hospitalId: "HP-005",
    ambulanceId: "AMB-511",
    status: "Discharged",
    vitals: { hr: 88, spo2: 97, bp: "118/76" },
  },
];

export const notifications: AppNotification[] = [
  {
    id: "NT-1",
    title: "Critical: abnormal heart rhythm detected",
    body: "Wearable flagged sustained tachycardia (128 bpm) with SpO₂ dip to 91%.",
    category: "wearable",
    priority: "critical",
    time: "23:40",
    read: false,
  },
  {
    id: "NT-2",
    title: "Ambulance AMB-204 assigned",
    body: "Cardiac ambulance dispatched from Anna Nagar hub. ETA 6 minutes.",
    category: "emergency",
    priority: "critical",
    time: "23:42",
    read: false,
  },
  {
    id: "NT-3",
    title: "Apex Institute confirmed emergency bed",
    body: "Cardiac ICU bed ICU-14 held for 30 minutes pending arrival.",
    category: "hospital",
    priority: "high",
    time: "23:43",
    read: false,
  },
  {
    id: "NT-4",
    title: "Dr. Ananya Krishnan acknowledged",
    body: "Cath lab team on standby. Send 12-lead ECG on arrival.",
    category: "doctor",
    priority: "high",
    time: "23:44",
    read: true,
  },
  {
    id: "NT-5",
    title: "Family alert delivered",
    body: "Lakshmi Narayanan notified with live tracking link.",
    category: "family",
    priority: "normal",
    time: "23:44",
    read: true,
  },
  {
    id: "NT-6",
    title: "Health record sync complete",
    body: "ABHA-linked records shared with receiving hospital.",
    category: "system",
    priority: "normal",
    time: "23:45",
    read: true,
  },
];

export const wearable = {
  live: { hr: 128, spo2: 91, bpSys: 148, bpDia: 96, temp: 37.4, resp: 22, steps: 6412 },
  today: [
    { t: "06:00", hr: 62, spo2: 98, resp: 14 },
    { t: "09:00", hr: 78, spo2: 98, resp: 15 },
    { t: "12:00", hr: 84, spo2: 97, resp: 16 },
    { t: "15:00", hr: 91, spo2: 97, resp: 17 },
    { t: "18:00", hr: 88, spo2: 96, resp: 16 },
    { t: "21:00", hr: 104, spo2: 94, resp: 19 },
    { t: "23:40", hr: 128, spo2: 91, resp: 22 },
  ],
  weekly: [
    { t: "Mon", hr: 74, spo2: 98, sleep: 7.2 },
    { t: "Tue", hr: 78, spo2: 98, sleep: 6.4 },
    { t: "Wed", hr: 81, spo2: 97, sleep: 6.9 },
    { t: "Thu", hr: 86, spo2: 96, sleep: 5.8 },
    { t: "Fri", hr: 92, spo2: 96, sleep: 5.4 },
    { t: "Sat", hr: 88, spo2: 97, sleep: 7.6 },
    { t: "Sun", hr: 96, spo2: 95, sleep: 6.1 },
  ],
  monthly: [
    { t: "Week 1", hr: 76, spo2: 98, risk: 12 },
    { t: "Week 2", hr: 80, spo2: 97, risk: 18 },
    { t: "Week 3", hr: 87, spo2: 96, risk: 27 },
    { t: "Week 4", hr: 94, spo2: 95, risk: 41 },
  ],
  ecg: Array.from({ length: 60 }, (_, i) => ({
    t: i,
    mv: Math.sin(i / 2) * 0.3 + (i % 12 === 0 ? 1.6 : i % 12 === 1 ? -0.7 : 0),
  })),
  insights: [
    {
      title: "Rising resting heart rate",
      detail: "Average resting HR is up 24% over 4 weeks. Cardiology review recommended.",
      level: "warning" as const,
    },
    {
      title: "Sleep debt affecting recovery",
      detail: "5.4h average on weekdays — below your 7h target for 9 consecutive days.",
      level: "warning" as const,
    },
    {
      title: "Medication adherence strong",
      detail: "Telmisartan taken on 27 of the last 28 days.",
      level: "success" as const,
    },
  ],
};

export const labReports = [
  { id: "LB-901", name: "Lipid Profile", date: "02 Aug 2026", lab: "Apex Diagnostics", status: "Attention", note: "LDL 148 mg/dL (high)" },
  { id: "LB-902", name: "Complete Blood Count", date: "02 Aug 2026", lab: "Apex Diagnostics", status: "Normal", note: "All values within range" },
  { id: "LB-903", name: "HbA1c", date: "18 Jun 2026", lab: "Meridian Labs", status: "Borderline", note: "5.9% — pre-diabetic range" },
  { id: "LB-904", name: "Chest X-Ray", date: "11 Mar 2026", lab: "Apex Radiology", status: "Normal", note: "No active pathology" },
];

export const prescriptions = [
  { id: "RX-441", doctor: "Dr. Ananya Krishnan", date: "05 Aug 2026", items: "Telmisartan 40mg, Aspirin 75mg", note: "Review in 6 weeks" },
  { id: "RX-427", doctor: "Dr. Kavya Reddy", date: "22 May 2026", items: "Salbutamol inhaler, Montelukast 10mg", note: "Use before exertion" },
  { id: "RX-410", doctor: "Dr. Arjun Mehta", date: "14 Jan 2026", items: "Vitamin D3 60,000 IU", note: "Weekly for 8 weeks" },
];

export const vaccinations = [
  { name: "COVID-19 (Precaution dose)", date: "12 Jan 2024", place: "Anna Nagar UPHC" },
  { name: "Influenza (Annual)", date: "09 Oct 2025", place: "Apex Institute" },
  { name: "Tetanus Toxoid", date: "23 Jul 2023", place: "Government General Hospital" },
  { name: "Hepatitis B (3rd dose)", date: "04 Feb 2019", place: "Meridian Centre" },
];

export const medicalTimeline = [
  { date: "05 Aug 2026", title: "Cardiology consultation", detail: "Hypertension staged; medication adjusted.", hospital: "Apex Institute" },
  { date: "02 Aug 2026", title: "Lab panel", detail: "Lipid profile flagged elevated LDL.", hospital: "Apex Diagnostics" },
  { date: "22 May 2026", title: "Pulmonology follow-up", detail: "Asthma controlled; inhaler technique reviewed.", hospital: "Government General Hospital" },
  { date: "14 Jan 2026", title: "Annual health check", detail: "Vitamin D deficiency identified.", hospital: "Meridian Centre" },
];

export const emergencyHistory = [
  { id: "EM-4410", date: "18 Feb 2026", type: "Asthma exacerbation", outcome: "Treated & discharged", hospital: "Government General Hospital", responseMin: 11 },
  { id: "EM-3902", date: "07 Nov 2025", type: "Road traffic accident (minor)", outcome: "Observation 6h", hospital: "Sundaram Trauma Centre", responseMin: 14 },
  { id: "EM-3311", date: "29 Apr 2025", type: "Heat exhaustion", outcome: "Rehydration therapy", hospital: "Apex Institute", responseMin: 9 },
];

export const hospitalVisits = [
  { month: "Mar", visits: 2 },
  { month: "Apr", visits: 1 },
  { month: "May", visits: 3 },
  { month: "Jun", visits: 1 },
  { month: "Jul", visits: 2 },
  { month: "Aug", visits: 4 },
];

export const environment = {
  location: "Anna Nagar East, Chennai",
  coords: "13.0878° N, 80.2205° E",
  gpsAccuracyM: 8,
  traffic: "Moderate on 2nd Avenue — 3 min delay",
  weather: "29°C · Humid · Light rain",
  airQuality: "AQI 96 · Moderate",
  nearestHub: "Anna Nagar ambulance hub · 1.2 km",
};

export const patientQueue = [
  { id: "PQ-1", name: "Vishal Narayanan", triage: "Red", complaint: "Chest pain, tachycardia", waitMin: 0, status: "Inbound · 6 min" },
  { id: "PQ-2", name: "Radha Menon", triage: "Orange", complaint: "Head injury after fall", waitMin: 4, status: "In triage" },
  { id: "PQ-3", name: "Arun Prakash", triage: "Orange", complaint: "Polytrauma — RTA", waitMin: 12, status: "In resus bay 2" },
  { id: "PQ-4", name: "Selvi Ramesh", triage: "Yellow", complaint: "Abdominal pain", waitMin: 26, status: "Awaiting scan" },
  { id: "PQ-5", name: "Naveen Gupta", triage: "Green", complaint: "Laceration — left hand", waitMin: 38, status: "Awaiting suture" },
];

export const hospitalLoad = [
  { name: "Apex Institute", occupancy: 87, inbound: 3 },
  { name: "Govt General", occupancy: 78, inbound: 5 },
  { name: "Meridian Heart", occupancy: 91, inbound: 2 },
  { name: "Sundaram Trauma", occupancy: 69, inbound: 1 },
  { name: "Lotus Mother & Child", occupancy: 66, inbound: 0 },
];

export const criticalPatients = [
  { id: "CP-1", name: "Vishal Narayanan", risk: 92, flag: "Cardiac — inbound", hospital: "Apex Institute" },
  { id: "CP-2", name: "Radha Menon", risk: 78, flag: "Head trauma — GCS 13", hospital: "Sundaram Trauma" },
  { id: "CP-3", name: "Arun Prakash", risk: 71, flag: "Internal bleeding watch", hospital: "Govt General" },
  { id: "CP-4", name: "Ismail Khan", risk: 64, flag: "Post-op arrhythmia", hospital: "Meridian Heart" },
];

export const aiSuggestions = [
  "Which hospital is best for my emergency?",
  "Which nearby hospitals have ICU beds?",
  "What should I do during this emergency?",
  "Show my recent health trends.",
  "Which doctor is available now?",
];

export const aiResponses: Record<string, string> = {
  "Which hospital is best for my emergency?":
    "Based on your live vitals (HR 128, SpO₂ 91%) and a suspected cardiac event, **Apex Institute of Medical Sciences** ranks highest at 96/100 — 2.4 km away, 7 min ETA, cath lab free and one cardiac ICU bed available. Meridian Heart & Vascular Centre is the backup at 88/100.",
  "Which nearby hospitals have ICU beds?":
    "Right now: Apex Institute — 6 ICU beds, Government General — 14 ICU beds, Sundaram Trauma — 8 ICU beds, Lotus Mother & Child — 5 ICU beds. Meridian Heart is nearly full with 3 remaining.",
  "What should I do during this emergency?":
    "Stay seated and upright, loosen tight clothing and avoid exertion. Keep your phone unlocked next to you — the ambulance crew has your location. If chest pain worsens or you feel faint, tap SOS again so the dispatcher escalates. This is prototype guidance, not medical advice.",
  "Show my recent health trends.":
    "Over 4 weeks your resting heart rate rose from 76 to 94 bpm and average SpO₂ drifted from 98% to 95%. Weekday sleep averages 5.4 hours. The composite risk index moved from 12 to 41.",
  "Which doctor is available now?":
    "Available for emergencies: Dr. Ananya Krishnan (Interventional Cardiology, Apex — on call), Dr. Rohit Verma (Emergency Medicine, Apex — night ER), Dr. Imran Sheikh (Trauma Surgery, Sundaram). Dr. Meera Sundaram is in surgery.",
};

export const aiFallback =
  "I'm a prototype assistant running on demo data, so I can't answer that yet. Try one of the suggested questions — hospital recommendations, ICU bed availability, health trends or doctor availability all have demo responses.";
