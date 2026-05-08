export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  doctor_name: string | null;
  title: string;
  scheduled_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  created_by: string;
  created_at: string;
}

export interface CreateAppointmentInput {
  title: string;
  scheduled_at: string;
  doctor_id?: string;
  doctor_name?: string;
  notes?: string;
}
