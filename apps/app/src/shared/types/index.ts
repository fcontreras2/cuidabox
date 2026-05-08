export type { Patient } from '@cuidabox/api';
import type { Patient } from '@cuidabox/api';

export interface PatientUI {
  shortName: string;
  age: string;
  avatarColor: "coral" | "sky" | "plum" | "gold" | "sage";
  highlight?: string;
}

export type PatientWithUI = Patient & PatientUI;

export interface Medication {
  id: string;
  name: string;
  shortDose: string;
  schedule: string;
  reason?: string;
  nextDoseAt: string;
  status: "active" | "past";
  doseProgress?: { taken: number; total: number };
}

export interface UpcomingItem {
  id: string;
  type: "appointment" | "vaccine" | "exam" | "medication";
  title: string;
  when: string;
  meta?: string;
}

export interface QuickExample {
  id: string;
  icon: "thermometer" | "pill" | "stethoscope" | "moon" | "syringe";
  text: string;
}

export type TimelineEventType =
  | "fever"
  | "medication"
  | "appointment"
  | "vaccine"
  | "exam"
  | "note"
  | "sleep";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  dateLabel: string;
  timeLabel: string;
  dayKey: string;
  meta?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital?: string;
  phone?: string;
  nextAppointment?: string;
  avatarColor: "coral" | "sky" | "plum" | "gold" | "sage";
  isPrimary?: boolean;
}
