export declare class AppointmentResponseDto {
    id: string;
    patient_id: string;
    doctor_id: string | null;
    scheduled_at: string;
    status: string;
    notes: string | null;
    created_by: string;
    created_at: string;
}
