/**
 * Mock data layer (cliente). Centraliza los seed data que antes vivían
 * dentro de los hooks `useMain` de cada módulo, para que los hooks de
 * *detalle* puedan resolver una entidad por id sin duplicar arreglos.
 *
 * Cuando exista backend, este archivo desaparece y sus exports se
 * reemplazan por queries (TanStack Query u otro).
 */

import type {
  Patient,
  Medication,
  TimelineEvent,
  Doctor,
} from "@/shared/types";

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "emma",
    name: "Emma Rodríguez",
    shortName: "Emma",
    age: "5 añitos",
    gender: "F",
    avatarColor: "coral",
    status: "tiene un poquito de fiebre",
  },
  {
    id: "lucas",
    name: "Lucas Rodríguez",
    shortName: "Lucas",
    age: "8 añitos",
    gender: "M",
    avatarColor: "sky",
    status: "todo tranquilo hoy",
  },
  {
    id: "sofia",
    name: "Sofía Rodríguez",
    shortName: "Sofía",
    age: "11 mesecitos",
    gender: "F",
    avatarColor: "plum",
    status: "vacuna mañana",
  },
];

export interface PatientProfile {
  birthDate: string;
  bloodType: string;
  weight: string;
  height: string;
  allergies: string[];
  conditions: string[];
  primaryDoctorId?: string;
  notes?: string;
}

export const MOCK_PATIENT_PROFILES: Record<string, PatientProfile> = {
  emma: {
    birthDate: "12 marzo 2020",
    bloodType: "O+",
    weight: "18 kg",
    height: "108 cm",
    allergies: ["Penicilina", "Polen"],
    conditions: ["Asma leve estacional"],
    primaryDoctorId: "mendoza",
    notes:
      "Le cuesta tomar jarabe sabor naranja — el de fresa funciona mejor.",
  },
  lucas: {
    birthDate: "30 julio 2017",
    bloodType: "A+",
    weight: "27 kg",
    height: "131 cm",
    allergies: [],
    conditions: ["Miopía leve (lentes desde 2024)"],
    primaryDoctorId: "mendoza",
  },
  sofia: {
    birthDate: "05 enero 2025",
    bloodType: "O+",
    weight: "8.4 kg",
    height: "71 cm",
    allergies: [],
    conditions: [],
    primaryDoctorId: "mendoza",
    notes: "Próxima vacuna pentavalente mañana 09:30.",
  },
};

export const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "medication",
    title: "Paracetamol 5 ml",
    description: "Dosis de la tarde, justo a tiempo.",
    dateLabel: "Hoy",
    timeLabel: "14:00",
    dayKey: "today",
  },
  {
    id: "2",
    type: "fever",
    title: "Fiebre 38.2 °C",
    description: "Le tomaste la temperatura tras la siesta.",
    dateLabel: "Hoy",
    timeLabel: "13:40",
    dayKey: "today",
    meta: "Subió 0.4°",
  },
  {
    id: "3",
    type: "note",
    title: "Comió la mitad del almuerzo",
    description: "Le dolía la garganta para tragar.",
    dateLabel: "Hoy",
    timeLabel: "12:30",
    dayKey: "today",
  },
  {
    id: "4",
    type: "sleep",
    title: "Durmió 9 h 20 min",
    description: "Despertó dos veces por la tos.",
    dateLabel: "Anoche",
    timeLabel: "22:00 → 07:20",
    dayKey: "yesterday",
  },
  {
    id: "5",
    type: "medication",
    title: "Amoxicilina 7 ml",
    description: "Antibiótico, día 3 de 5.",
    dateLabel: "Ayer",
    timeLabel: "20:00",
    dayKey: "yesterday",
  },
  {
    id: "6",
    type: "appointment",
    title: "Pediatra · Dra. Mendoza",
    description: "Diagnóstico de faringitis bacteriana.",
    dateLabel: "Ayer",
    timeLabel: "11:00",
    dayKey: "yesterday",
    meta: "Receta nueva",
  },
];

export interface EventDetailExtras {
  longDescription?: string;
  measurements?: { label: string; value: string }[];
  attachments?: { id: string; label: string; kind: "photo" | "doc" | "audio" }[];
  relatedEventIds?: string[];
  doctorId?: string;
}

export const MOCK_EVENT_EXTRAS: Record<string, EventDetailExtras> = {
  "1": {
    longDescription:
      "Dosis de paracetamol de las 14:00 administrada con jugo. Emma la tomó sin protestar. Tomarle temperatura nuevamente a las 16:00.",
    measurements: [
      { label: "Dosis", value: "5 ml" },
      { label: "Vía", value: "Oral" },
      { label: "Concentración", value: "120 mg / 5 ml" },
    ],
    relatedEventIds: ["2"],
  },
  "2": {
    longDescription:
      "Le tomaste la temperatura con el termómetro de oído tras la siesta. Subió 0.4° respecto a la mañana (37.8°). Sigue dentro del rango esperado para el cuadro.",
    measurements: [
      { label: "Temperatura", value: "38.2 °C" },
      { label: "Método", value: "Timpánico" },
      { label: "Cambio", value: "+0.4 °C" },
    ],
    relatedEventIds: ["1", "5"],
  },
  "3": {
    longDescription:
      "Comió aproximadamente la mitad del almuerzo. Refirió dolor al tragar; sigue tomando líquidos bien.",
  },
  "4": {
    longDescription:
      "Durmió 9 h 20 min en total con dos despertares por episodios de tos seca. Volvió a dormirse rápido cada vez.",
    measurements: [
      { label: "Inicio", value: "22:00" },
      { label: "Despertar", value: "07:20" },
      { label: "Despertares", value: "2" },
    ],
  },
  "5": {
    longDescription:
      "Tercera dosis de la pauta de amoxicilina. Tolerada sin náuseas.",
    measurements: [
      { label: "Dosis", value: "7 ml" },
      { label: "Día", value: "3 de 5" },
    ],
    relatedEventIds: ["6"],
  },
  "6": {
    longDescription:
      "Consulta con la Dra. Mendoza. Diagnosticó faringitis bacteriana y prescribió amoxicilina por 5 días. Control la próxima semana si persiste el malestar.",
    attachments: [
      { id: "rx-1", label: "Receta médica", kind: "doc" },
      { id: "diag-1", label: "Diagnóstico", kind: "doc" },
    ],
    doctorId: "mendoza",
    relatedEventIds: ["5"],
  },
};

export interface MedicationDetail {
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
  presentation: string;
  instructions: string;
  warnings?: string[];
  doseTimes: string[];
  doseHistory: { id: string; label: string; takenAt: string; status: "taken" | "missed" | "scheduled" }[];
}

export const MOCK_ACTIVE_MEDS: Medication[] = [
  {
    id: "para",
    name: "Paracetamol",
    shortDose: "5 ml",
    schedule: "cada 6 h si tiene fiebre",
    reason: "fiebre",
    nextDoseAt: "14:00",
    status: "active",
    doseProgress: { taken: 7, total: 15 },
  },
  {
    id: "amoxi",
    name: "Amoxicilina",
    shortDose: "7 ml",
    schedule: "2 veces al día · día 3 de 5",
    reason: "antibiótico",
    nextDoseAt: "20:00",
    status: "active",
    doseProgress: { taken: 6, total: 10 },
  },
];

export const MOCK_PAST_MEDS: Medication[] = [
  {
    id: "ibu",
    name: "Ibuprofeno",
    shortDose: "4 ml",
    schedule: "Tratamiento finalizado · 18 abr",
    nextDoseAt: "—",
    status: "past",
  },
  {
    id: "vit",
    name: "Vitamina D",
    shortDose: "3 gotas",
    schedule: "Tratamiento finalizado · 02 mar",
    nextDoseAt: "—",
    status: "past",
  },
];

export const MOCK_MEDICATION_DETAILS: Record<string, MedicationDetail> = {
  para: {
    startDate: "08 may",
    endDate: "12 may (estimado)",
    prescribedBy: "mendoza",
    presentation: "Suspensión 120 mg / 5 ml · sabor fresa",
    instructions:
      "Dar 5 ml por boca cada 6 horas si la temperatura es ≥ 38 °C. No exceder 4 dosis al día.",
    warnings: ["No combinar con otros antifebriles", "Tomar con algo de comida"],
    doseTimes: ["08:00", "14:00", "20:00", "02:00"],
    doseHistory: [
      { id: "d1", label: "Dosis 7", takenAt: "Hoy 14:00", status: "taken" },
      { id: "d2", label: "Dosis 8", takenAt: "Hoy 20:00", status: "scheduled" },
      { id: "d3", label: "Dosis 6", takenAt: "Hoy 08:00", status: "taken" },
      { id: "d4", label: "Dosis 5", takenAt: "Ayer 20:00", status: "taken" },
      { id: "d5", label: "Dosis 4", takenAt: "Ayer 14:00", status: "missed" },
    ],
  },
  amoxi: {
    startDate: "06 may",
    endDate: "10 may",
    prescribedBy: "mendoza",
    presentation: "Suspensión 250 mg / 5 ml",
    instructions:
      "Dar 7 ml por boca dos veces al día (08:00 y 20:00) durante 5 días completos, aunque ya se sienta mejor.",
    warnings: [
      "Completar el tratamiento entero",
      "Si aparece sarpullido, suspender y llamar",
    ],
    doseTimes: ["08:00", "20:00"],
    doseHistory: [
      { id: "a1", label: "Dosis 6", takenAt: "Hoy 08:00", status: "taken" },
      { id: "a2", label: "Dosis 7", takenAt: "Hoy 20:00", status: "scheduled" },
      { id: "a3", label: "Dosis 5", takenAt: "Ayer 20:00", status: "taken" },
      { id: "a4", label: "Dosis 4", takenAt: "Ayer 08:00", status: "taken" },
    ],
  },
  ibu: {
    startDate: "14 abr",
    endDate: "18 abr",
    presentation: "Suspensión 100 mg / 5 ml",
    instructions: "Tratamiento completado satisfactoriamente.",
    doseTimes: [],
    doseHistory: [],
  },
  vit: {
    startDate: "01 ene",
    endDate: "02 mar",
    presentation: "Gotas 1.000 UI / gota",
    instructions: "Tratamiento estacional invernal completado.",
    doseTimes: [],
    doseHistory: [],
  },
};

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "mendoza",
    name: "Dra. Carmen Mendoza",
    specialty: "Pediatra de cabecera",
    hospital: "Centro Salud Norte",
    phone: "+56 9 8765 4321",
    nextAppointment: "Mañana · 10:30",
    avatarColor: "sky",
    isPrimary: true,
  },
  {
    id: "rojas",
    name: "Dr. Andrés Rojas",
    specialty: "Otorrino",
    hospital: "Clínica Las Condes",
    nextAppointment: "12 may · 16:00",
    avatarColor: "plum",
  },
  {
    id: "navarro",
    name: "Dra. Paula Navarro",
    specialty: "Dermatóloga",
    hospital: "Clínica Alemana",
    avatarColor: "gold",
  },
  {
    id: "torres",
    name: "Dr. Felipe Torres",
    specialty: "Nutriólogo infantil",
    hospital: "Centro Médico Sur",
    avatarColor: "sage",
  },
];

// ────── helpers ──────────────────────────────────────────────────────────
export function getPatient(id: string) {
  return MOCK_PATIENTS.find((p) => p.id === id) ?? null;
}
export function getPatientProfile(id: string) {
  return MOCK_PATIENT_PROFILES[id] ?? null;
}
export function getEvent(id: string) {
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}
export function getEventExtras(id: string) {
  return MOCK_EVENT_EXTRAS[id] ?? null;
}
export function getMedication(id: string) {
  return [...MOCK_ACTIVE_MEDS, ...MOCK_PAST_MEDS].find((m) => m.id === id) ?? null;
}
export function getMedicationDetail(id: string) {
  return MOCK_MEDICATION_DETAILS[id] ?? null;
}
export function getDoctor(id: string) {
  return MOCK_DOCTORS.find((d) => d.id === id) ?? null;
}
