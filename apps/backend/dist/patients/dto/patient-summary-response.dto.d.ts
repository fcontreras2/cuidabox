import { PatientResponseDto } from './patient-response.dto';
declare class AppointmentSnapshotDto {
    id: string;
    title: string;
    scheduled_at: string;
    doctor_name: string | null;
}
declare class VitalSnapshotDto {
    id: string;
    type: string;
    value: string;
    recorded_at: string;
}
export declare class PatientSummaryResponseDto {
    patient: PatientResponseDto;
    last_appointment: AppointmentSnapshotDto | null;
    next_appointment: AppointmentSnapshotDto | null;
    last_vital: VitalSnapshotDto | null;
    active_allergies_count: number;
    active_treatments_count: number;
}
export {};
