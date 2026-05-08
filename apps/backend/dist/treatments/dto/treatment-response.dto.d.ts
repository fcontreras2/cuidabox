declare class StepMedicationResponseDto {
    id: string;
    medication_name: string;
    dose: number | null;
    unit: string | null;
    frequency: string | null;
    times_of_day: string[] | null;
}
declare class TreatmentStepResponseDto {
    id: string;
    order: number;
    depends_on_step_id: string | null;
    type: string;
    title: string;
    description: string | null;
    start_offset_days: number;
    duration_days: number | null;
    medication: StepMedicationResponseDto | null;
}
export declare class TreatmentResponseDto {
    id: string;
    patient_id: string;
    doctor_id: string | null;
    appointment_id: string | null;
    title: string;
    start_date: string | null;
    end_date: string | null;
    status: string;
    created_by: string;
    created_at: string;
    steps: TreatmentStepResponseDto[];
}
export {};
