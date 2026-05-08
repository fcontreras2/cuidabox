-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['holder'::text, 'doctor'::text, 'admin'::text])),
  specialty_key text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birthdate date,
  gender text CHECK (gender = ANY (ARRAY['male'::text, 'female'::text, 'other'::text])),
  blood_type text,
  notes text,
  insurance_provider text,
  insurance_policy_number text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patients_pkey PRIMARY KEY (id),
  CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id)
);

CREATE TABLE public.patient_holders (
  patient_id uuid NOT NULL,
  user_id uuid NOT NULL,
  relationship text NOT NULL,
  is_primary boolean DEFAULT false,
  CONSTRAINT patient_holders_pkey PRIMARY KEY (patient_id, user_id),
  CONSTRAINT patient_holders_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_holders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.patient_doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  user_id uuid,
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'active'::text, 'rejected'::text])),
  invited_by uuid,
  access_from timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_doctors_pkey PRIMARY KEY (id),
  CONSTRAINT patient_doctors_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_doctors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT patient_doctors_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.users(id)
);

CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  doctor_id uuid,                          -- FK a users (doctor registrado, opcional)
  doctor_name text,                        -- nombre libre si el doctor no está en el sistema
  title text NOT NULL,                     -- motivo o título de la cita
  scheduled_at timestamp with time zone NOT NULL,
  status text NOT NULL DEFAULT 'scheduled'::text CHECK (status = ANY (ARRAY['scheduled'::text, 'completed'::text, 'cancelled'::text])),
  notes text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id),
  CONSTRAINT appointments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id)
);

CREATE TABLE public.treatments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  doctor_id uuid,
  appointment_id uuid,
  title text NOT NULL,
  start_date date,
  end_date date,
  status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'completed'::text, 'cancelled'::text])),
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT treatments_pkey PRIMARY KEY (id),
  CONSTRAINT treatments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT treatments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id),
  CONSTRAINT treatments_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id),
  CONSTRAINT treatments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id)
);

CREATE TABLE public.treatment_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  treatment_id uuid,
  order integer NOT NULL,
  depends_on_step_id uuid,
  type text NOT NULL CHECK (type = ANY (ARRAY['medication'::text, 'action'::text, 'exam'::text])),
  title text NOT NULL,
  description text,
  start_offset_days integer DEFAULT 0,
  duration_days integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT treatment_steps_pkey PRIMARY KEY (id),
  CONSTRAINT treatment_steps_treatment_id_fkey FOREIGN KEY (treatment_id) REFERENCES public.treatments(id),
  CONSTRAINT treatment_steps_depends_on_step_id_fkey FOREIGN KEY (depends_on_step_id) REFERENCES public.treatment_steps(id)
);

CREATE TABLE public.treatment_step_medications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  step_id uuid,
  medication_name text NOT NULL,
  dose numeric,
  unit text,
  frequency text,
  times_of_day ARRAY,
  CONSTRAINT treatment_step_medications_pkey PRIMARY KEY (id),
  CONSTRAINT treatment_step_medications_step_id_fkey FOREIGN KEY (step_id) REFERENCES public.treatment_steps(id)
);

CREATE TABLE public.allergies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  name text NOT NULL,
  type text CHECK (type = ANY (ARRAY['drug'::text, 'food'::text, 'environmental'::text, 'other'::text])),
  severity text CHECK (severity = ANY (ARRAY['mild'::text, 'moderate'::text, 'severe'::text])),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT allergies_pkey PRIMARY KEY (id),
  CONSTRAINT allergies_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);

CREATE TABLE public.vaccines (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  name text NOT NULL,
  dose_number integer,
  administered_at timestamp with time zone,
  administered_by text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vaccines_pkey PRIMARY KEY (id),
  CONSTRAINT vaccines_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);

CREATE TABLE public.vitals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  recorded_by uuid,
  weight_kg numeric,
  height_cm numeric,
  temperature_c numeric,
  heart_rate integer,
  notes text,
  recorded_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vitals_pkey PRIMARY KEY (id),
  CONSTRAINT vitals_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT vitals_recorded_by_fkey FOREIGN KEY (recorded_by) REFERENCES public.users(id)
);

CREATE TABLE public.exams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  requested_by uuid,
  treatment_step_id uuid,
  name text NOT NULL,
  performed_at timestamp with time zone,
  result_text text,
  file_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT exams_pkey PRIMARY KEY (id),
  CONSTRAINT exams_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT exams_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES public.users(id),
  CONSTRAINT exams_treatment_step_id_fkey FOREIGN KEY (treatment_step_id) REFERENCES public.treatment_steps(id)
);

CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  uploaded_by uuid,
  treatment_id uuid,
  appointment_id uuid,
  exam_id uuid,
  name text NOT NULL,
  file_url text NOT NULL,
  type text CHECK (type = ANY (ARRAY['lab'::text, 'imaging'::text, 'prescription'::text, 'other'::text])),
  uploaded_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documents_pkey PRIMARY KEY (id),
  CONSTRAINT documents_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT documents_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id),
  CONSTRAINT documents_treatment_id_fkey FOREIGN KEY (treatment_id) REFERENCES public.treatments(id),
  CONSTRAINT documents_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id),
  CONSTRAINT documents_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id)
);

CREATE TABLE public.prescriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  doctor_id uuid,
  appointment_id uuid,
  issued_at timestamp with time zone DEFAULT now(),
  notes text,
  file_url text,
  CONSTRAINT prescriptions_pkey PRIMARY KEY (id),
  CONSTRAINT prescriptions_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id),
  CONSTRAINT prescriptions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT prescriptions_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id)
);

CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  created_by uuid,
  type text NOT NULL CHECK (type = ANY (ARRAY['medication_given'::text, 'vaccine'::text, 'symptom'::text, 'visit'::text, 'exam'::text, 'vital'::text, 'note'::text])),
  treatment_step_id uuid,
  occurred_at timestamp with time zone DEFAULT now(),
  payload jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id),
  CONSTRAINT events_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id),
  CONSTRAINT events_treatment_step_id_fkey FOREIGN KEY (treatment_step_id) REFERENCES public.treatment_steps(id)
);

CREATE TABLE public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL CHECK (action = ANY (ARRAY['insert'::text, 'update'::text, 'delete'::text])),
  changed_by uuid,
  changed_at timestamp with time zone DEFAULT now(),
  old_data jsonb,
  new_data jsonb,
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
  CONSTRAINT audit_logs_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public.users(id)
);
