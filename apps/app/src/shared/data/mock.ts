/**
 * Mock data layer (cliente). Refleja los shapes reales que retorna el backend.
 * Cuando exista integración completa, este archivo desaparece y sus exports
 * se reemplazan por queries de TanStack Query.
 */

import type { Appointment } from "@cuidabox/api";
import type {
  PatientWithUI,
  Medication,
  TimelineEvent,
  Doctor,
} from "@/shared/types";

// ─── Patients ────────────────────────────────────────────────────────────────

export const MOCK_PATIENTS: PatientWithUI[] = [
  {
    id: "a1b2c3d4-0001-0000-0000-000000000001",
    name: "Emma Rodríguez",
    birthdate: "2020-03-12",
    gender: "female",
    blood_type: "O+",
    notes: "Le cuesta tomar jarabe sabor naranja — el de fresa funciona mejor.",
    insurance_provider: null,
    insurance_policy_number: null,
    created_by: "user-001",
    created_at: "2026-01-01T00:00:00Z",
    shortName: "Emma",
    age: "5 años",
    avatarColor: "coral",
  },
  {
    id: "a1b2c3d4-0001-0000-0000-000000000002",
    name: "Lucas Rodríguez",
    birthdate: "2017-07-30",
    gender: "male",
    blood_type: "A+",
    notes: "Miopía leve, lentes desde 2024.",
    insurance_provider: null,
    insurance_policy_number: null,
    created_by: "user-001",
    created_at: "2026-01-01T00:00:00Z",
    shortName: "Lucas",
    age: "8 años",
    avatarColor: "sky",
  },
  {
    id: "a1b2c3d4-0001-0000-0000-000000000003",
    name: "Sofía Rodríguez",
    birthdate: "2025-01-05",
    gender: "female",
    blood_type: "O+",
    notes: "Próxima vacuna pentavalente.",
    insurance_provider: null,
    insurance_policy_number: null,
    created_by: "user-001",
    created_at: "2026-01-01T00:00:00Z",
    shortName: "Sofía",
    age: "11 meses",
    avatarColor: "plum",
  },
];

// ─── Appointments ─────────────────────────────────────────────────────────────

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "appt-0001",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    doctor_id: null,
    doctor_name: "Dra. Carmen Mendoza",
    title: "Control mensual",
    scheduled_at: "2026-05-07T10:30:00Z",
    status: "scheduled",
    notes: null,
    created_by: "user-001",
    created_at: "2026-04-01T00:00:00Z",
  },
  {
    id: "appt-0002",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    doctor_id: null,
    doctor_name: "Dra. Carmen Mendoza",
    title: "Consulta faringitis",
    scheduled_at: "2026-05-05T11:00:00Z",
    status: "completed",
    notes: "Diagnóstico de faringitis bacteriana. Receta amoxicilina 5 días.",
    created_by: "user-001",
    created_at: "2026-05-04T00:00:00Z",
  },
  {
    id: "appt-0003",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000002",
    doctor_id: null,
    doctor_name: "Dr. Andrés Rojas",
    title: "Control otorrino",
    scheduled_at: "2026-05-12T16:00:00Z",
    status: "scheduled",
    notes: null,
    created_by: "user-001",
    created_at: "2026-04-20T00:00:00Z",
  },
];

// ─── Vitals (shape: Vital del backend) ───────────────────────────────────────

export interface Vital {
  id: string;
  patient_id: string;
  recorded_by: string;
  weight_kg: number | null;
  height_cm: number | null;
  temperature_c: number | null;
  heart_rate: number | null;
  notes: string | null;
  recorded_at: string;
}

export const MOCK_VITALS: Vital[] = [
  {
    id: "vital-0001",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    recorded_by: "user-001",
    weight_kg: 18,
    height_cm: 108,
    temperature_c: 38.2,
    heart_rate: 98,
    notes: "Tomada tras la siesta con termómetro timpánico.",
    recorded_at: "2026-05-06T13:40:00Z",
  },
  {
    id: "vital-0002",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000002",
    recorded_by: "user-001",
    weight_kg: 27,
    height_cm: 131,
    temperature_c: 36.6,
    heart_rate: 84,
    notes: null,
    recorded_at: "2026-05-01T09:00:00Z",
  },
];

// ─── Allergies (shape: Allergy del backend) ───────────────────────────────────

export interface Allergy {
  id: string;
  patient_id: string;
  name: string;
  type: "drug" | "food" | "environmental" | "other" | null;
  severity: "mild" | "moderate" | "severe" | null;
  notes: string | null;
  created_at: string;
}

export const MOCK_ALLERGIES: Allergy[] = [
  {
    id: "allergy-0001",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    name: "Penicilina",
    type: "drug",
    severity: "severe",
    notes: "Erupción cutánea generalizada en exposición previa.",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "allergy-0002",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    name: "Polen",
    type: "environmental",
    severity: "mild",
    notes: null,
    created_at: "2026-02-01T00:00:00Z",
  },
];

// ─── Vaccines (shape: Vaccine del backend) ────────────────────────────────────

export interface Vaccine {
  id: string;
  patient_id: string;
  name: string;
  dose_number: number | null;
  administered_at: string | null;
  administered_by: string | null;
  notes: string | null;
  created_at: string;
}

export const MOCK_VACCINES: Vaccine[] = [
  {
    id: "vaccine-0001",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000003",
    name: "Pentavalente",
    dose_number: 3,
    administered_at: null,
    administered_by: null,
    notes: "Pendiente — programada para mañana 09:30.",
    created_at: "2026-05-01T00:00:00Z",
  },
  {
    id: "vaccine-0002",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    name: "Influenza",
    dose_number: 1,
    administered_at: "2026-03-15T09:00:00Z",
    administered_by: "Dra. Carmen Mendoza",
    notes: null,
    created_at: "2026-03-15T09:00:00Z",
  },
];

// ─── Treatments (shape: Treatment del backend) ────────────────────────────────

export interface StepMedication {
  id: string;
  medication_name: string;
  dose: number | null;
  unit: string | null;
  frequency: string | null;
  times_of_day: string[] | null;
}

export interface TreatmentStep {
  id: string;
  treatment_id: string;
  order: number;
  depends_on_step_id: string | null;
  type: "medication" | "action" | "exam";
  title: string;
  description: string | null;
  start_offset_days: number;
  duration_days: number | null;
  medication: StepMedication | null;
}

export interface Treatment {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  appointment_id: string | null;
  title: string;
  start_date: string | null;
  end_date: string | null;
  status: "active" | "completed" | "cancelled";
  created_by: string;
  created_at: string;
  steps: TreatmentStep[];
}

export const MOCK_TREATMENTS: Treatment[] = [
  {
    id: "treatment-0001",
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    doctor_id: null,
    appointment_id: "appt-0002",
    title: "Tratamiento faringitis bacteriana",
    start_date: "2026-05-06",
    end_date: "2026-05-10",
    status: "active",
    created_by: "user-001",
    created_at: "2026-05-05T11:30:00Z",
    steps: [
      {
        id: "step-0001",
        treatment_id: "treatment-0001",
        order: 1,
        depends_on_step_id: null,
        type: "medication",
        title: "Amoxicilina",
        description: "Dar 7 ml por boca dos veces al día durante 5 días completos.",
        start_offset_days: 0,
        duration_days: 5,
        medication: {
          id: "stepmed-0001",
          medication_name: "Amoxicilina",
          dose: 7,
          unit: "ml",
          frequency: "2 veces al día",
          times_of_day: ["08:00", "20:00"],
        },
      },
      {
        id: "step-0002",
        treatment_id: "treatment-0001",
        order: 2,
        depends_on_step_id: null,
        type: "medication",
        title: "Paracetamol si fiebre",
        description: "Dar 5 ml cada 6 horas si temperatura ≥ 38 °C. No exceder 4 dosis al día.",
        start_offset_days: 0,
        duration_days: null,
        medication: {
          id: "stepmed-0002",
          medication_name: "Paracetamol",
          dose: 5,
          unit: "ml",
          frequency: "cada 6 h si fiebre",
          times_of_day: ["08:00", "14:00", "20:00", "02:00"],
        },
      },
    ],
  },
];

// ─── UI-only types (sin equivalente directo en backend aún) ──────────────────

export const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: "event-0001",
    type: "medication",
    title: "Paracetamol 5 ml",
    description: "Dosis de la tarde, justo a tiempo.",
    dateLabel: "Hoy",
    timeLabel: "14:00",
    dayKey: "today",
  },
  {
    id: "event-0002",
    type: "fever",
    title: "Fiebre 38.2 °C",
    description: "Tomada tras la siesta con termómetro timpánico.",
    dateLabel: "Hoy",
    timeLabel: "13:40",
    dayKey: "today",
    meta: "Subió 0.4°",
  },
  {
    id: "event-0003",
    type: "note",
    title: "Comió la mitad del almuerzo",
    description: "Le dolía la garganta para tragar.",
    dateLabel: "Hoy",
    timeLabel: "12:30",
    dayKey: "today",
  },
  {
    id: "event-0004",
    type: "sleep",
    title: "Durmió 9 h 20 min",
    description: "Despertó dos veces por la tos.",
    dateLabel: "Anoche",
    timeLabel: "22:00 → 07:20",
    dayKey: "yesterday",
  },
  {
    id: "event-0005",
    type: "medication",
    title: "Amoxicilina 7 ml",
    description: "Antibiótico, día 3 de 5.",
    dateLabel: "Ayer",
    timeLabel: "20:00",
    dayKey: "yesterday",
  },
  {
    id: "event-0006",
    type: "appointment",
    title: "Pediatra · Dra. Mendoza",
    description: "Diagnóstico de faringitis bacteriana.",
    dateLabel: "Ayer",
    timeLabel: "11:00",
    dayKey: "yesterday",
    meta: "Receta nueva",
  },
];

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

// ─── UI-only: Medication (shape de presentación, derivado de Treatment.steps) ─

export const MOCK_ACTIVE_MEDS: Medication[] = [
  {
    id: "stepmed-0002",
    name: "Paracetamol",
    shortDose: "5 ml",
    schedule: "cada 6 h si tiene fiebre",
    reason: "fiebre",
    nextDoseAt: "14:00",
    status: "active",
    doseProgress: { taken: 7, total: 15 },
  },
  {
    id: "stepmed-0001",
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
    id: "stepmed-past-001",
    name: "Ibuprofeno",
    shortDose: "4 ml",
    schedule: "Tratamiento finalizado · 18 abr",
    nextDoseAt: "—",
    status: "past",
  },
  {
    id: "stepmed-past-002",
    name: "Vitamina D",
    shortDose: "3 gotas",
    schedule: "Tratamiento finalizado · 02 mar",
    nextDoseAt: "—",
    status: "past",
  },
];

// ─── UI-only: PatientProfile ──────────────────────────────────────────────────

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
  "a1b2c3d4-0001-0000-0000-000000000001": {
    birthDate: "12 marzo 2020",
    bloodType: "O+",
    weight: "18 kg",
    height: "108 cm",
    allergies: ["Penicilina", "Polen"],
    conditions: ["Asma leve estacional"],
    primaryDoctorId: "mendoza",
    notes: "Le cuesta tomar jarabe sabor naranja — el de fresa funciona mejor.",
  },
  "a1b2c3d4-0001-0000-0000-000000000002": {
    birthDate: "30 julio 2017",
    bloodType: "A+",
    weight: "27 kg",
    height: "131 cm",
    allergies: [],
    conditions: ["Miopía leve (lentes desde 2024)"],
    primaryDoctorId: "mendoza",
  },
  "a1b2c3d4-0001-0000-0000-000000000003": {
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

// ─── UI-only: EventDetailExtras ───────────────────────────────────────────────

export interface EventDetailExtras {
  longDescription?: string;
  measurements?: { label: string; value: string }[];
  attachments?: { id: string; label: string; kind: "photo" | "doc" | "audio" }[];
  relatedEventIds?: string[];
  doctorId?: string;
}

export const MOCK_EVENT_EXTRAS: Record<string, EventDetailExtras> = {
  "event-0001": {
    longDescription:
      "Dosis de paracetamol de las 14:00 administrada con jugo. Emma la tomó sin protestar. Tomarle temperatura nuevamente a las 16:00.",
    measurements: [
      { label: "Dosis", value: "5 ml" },
      { label: "Vía", value: "Oral" },
      { label: "Concentración", value: "120 mg / 5 ml" },
    ],
    relatedEventIds: ["event-0002"],
  },
  "event-0002": {
    longDescription:
      "Le tomaste la temperatura con el termómetro de oído tras la siesta. Subió 0.4° respecto a la mañana (37.8°). Sigue dentro del rango esperado para el cuadro.",
    measurements: [
      { label: "Temperatura", value: "38.2 °C" },
      { label: "Método", value: "Timpánico" },
      { label: "Cambio", value: "+0.4 °C" },
    ],
    relatedEventIds: ["event-0001", "event-0005"],
  },
  "event-0003": {
    longDescription:
      "Comió aproximadamente la mitad del almuerzo. Refirió dolor al tragar; sigue tomando líquidos bien.",
  },
  "event-0004": {
    longDescription:
      "Durmió 9 h 20 min en total con dos despertares por episodios de tos seca. Volvió a dormirse rápido cada vez.",
    measurements: [
      { label: "Inicio", value: "22:00" },
      { label: "Despertar", value: "07:20" },
      { label: "Despertares", value: "2" },
    ],
  },
  "event-0005": {
    longDescription: "Tercera dosis de la pauta de amoxicilina. Tolerada sin náuseas.",
    measurements: [
      { label: "Dosis", value: "7 ml" },
      { label: "Día", value: "3 de 5" },
    ],
    relatedEventIds: ["event-0006"],
  },
  "event-0006": {
    longDescription:
      "Consulta con la Dra. Mendoza. Diagnosticó faringitis bacteriana y prescribió amoxicilina por 5 días. Control la próxima semana si persiste el malestar.",
    attachments: [
      { id: "rx-1", label: "Receta médica", kind: "doc" },
      { id: "diag-1", label: "Diagnóstico", kind: "doc" },
    ],
    doctorId: "mendoza",
    relatedEventIds: ["event-0005"],
  },
};

// ─── UI-only: MedicationDetail ────────────────────────────────────────────────

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

export const MOCK_MEDICATION_DETAILS: Record<string, MedicationDetail> = {
  "stepmed-0002": {
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
  "stepmed-0001": {
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
  "stepmed-past-001": {
    startDate: "14 abr",
    endDate: "18 abr",
    presentation: "Suspensión 100 mg / 5 ml",
    instructions: "Tratamiento completado satisfactoriamente.",
    doseTimes: [],
    doseHistory: [],
  },
  "stepmed-past-002": {
    startDate: "01 ene",
    endDate: "02 mar",
    presentation: "Gotas 1.000 UI / gota",
    instructions: "Tratamiento estacional invernal completado.",
    doseTimes: [],
    doseHistory: [],
  },
};

// ─── helpers ──────────────────────────────────────────────────────────────────

export function getPatient(id: string) {
  return MOCK_PATIENTS.find((p) => p.id === id) ?? null;
}
export function getAppointment(id: string) {
  return MOCK_APPOINTMENTS.find((a) => a.id === id) ?? null;
}
export function getVitals(patientId: string) {
  return MOCK_VITALS.filter((v) => v.patient_id === patientId);
}
export function getAllergies(patientId: string) {
  return MOCK_ALLERGIES.filter((a) => a.patient_id === patientId);
}
export function getVaccines(patientId: string) {
  return MOCK_VACCINES.filter((v) => v.patient_id === patientId);
}
export function getTreatments(patientId: string) {
  return MOCK_TREATMENTS.filter((t) => t.patient_id === patientId);
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
