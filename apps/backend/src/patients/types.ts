export interface Patient {
  id: string;
  name: string;
  birthdate: string | null;
  gender: string | null;
  blood_type: string | null;
  notes: string | null;
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  created_by: string;
  created_at: string;
}

export interface UpdatePatientInput {
  name?: string;
  birthdate?: string;
  gender?: string;
  blood_type?: string;
  notes?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
}

export interface AppointmentSnapshot {
  id: string;
  title: string;
  scheduled_at: string;
  doctor_name: string | null;
}

export interface VitalSnapshot {
  id: string;
  type: string;
  value: string;
  recorded_at: string;
}

export interface PatientSummary {
  patient: Patient;
  last_appointment: AppointmentSnapshot | null;
  next_appointment: AppointmentSnapshot | null;
  last_vital: VitalSnapshot | null;
  active_allergies_count: number;
  active_treatments_count: number;
}
