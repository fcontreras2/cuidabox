-- Add title and doctor_name columns to appointments
ALTER TABLE public.appointments
  ADD COLUMN title text,
  ADD COLUMN doctor_name text;

-- Backfill existing rows with a default title
UPDATE public.appointments SET title = 'Cita médica' WHERE title IS NULL;

-- Enforce NOT NULL after backfill
ALTER TABLE public.appointments ALTER COLUMN title SET NOT NULL;
