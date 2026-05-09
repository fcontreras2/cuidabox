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
