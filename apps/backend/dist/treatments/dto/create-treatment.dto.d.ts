export declare class CreateStepMedicationDto {
    medication_name: string;
    dose?: number;
    unit?: string;
    frequency?: string;
    times_of_day?: string[];
}
export declare class CreateTreatmentStepDto {
    order: number;
    depends_on_step_id?: string;
    type: string;
    title: string;
    description?: string;
    start_offset_days?: number;
    duration_days?: number;
    medication?: CreateStepMedicationDto;
}
export declare class CreateTreatmentDto {
    title: string;
    start_date?: string;
    end_date?: string;
    appointment_id?: string;
    steps?: CreateTreatmentStepDto[];
}
