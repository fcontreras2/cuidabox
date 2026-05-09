export type { Paginated, PaginatedMeta, PaginationParams } from "./types";

export { authClient } from "./auth/auth.client";
export type { AuthUser, AuthResponse } from "./auth/auth.client";

export { patientsClient } from "./patients/patients.client";
export type {
  Patient,
  PatientSummary,
  CreatePatientInput,
  UpdatePatientInput,
  AppointmentSnapshot,
  VitalSnapshot,
} from "./patients/types";

export { appointmentsClient } from "./appointments/appointments.client";
export type { Appointment, CreateAppointmentInput } from "./appointments/types";

export { eventsClient } from "./events/events.client";
export type { TimelineEvent } from "./events/types";

export { treatmentsClient } from "./treatments/treatments.client";
export type {
  Treatment,
  TreatmentStep,
  StepMedication,
} from "./treatments/types";
