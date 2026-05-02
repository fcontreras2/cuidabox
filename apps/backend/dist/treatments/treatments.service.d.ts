import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
interface StepMedication {
    id: string;
    medication_name: string;
    dose: number | null;
    unit: string | null;
    frequency: string | null;
    times_of_day: string[] | null;
}
interface TreatmentStep {
    id: string;
    treatment_id: string;
    order: number;
    depends_on_step_id: string | null;
    type: string;
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
    status: string;
    created_by: string;
    created_at: string;
    steps: TreatmentStep[];
}
export declare class TreatmentsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateTreatmentDto, userId: string): Promise<Treatment>;
    private createStep;
    findAll(patientId: string, userId: string): Promise<Treatment[]>;
    findOne(patientId: string, treatmentId: string, userId: string): Promise<Treatment>;
    updateStatus(patientId: string, treatmentId: string, status: 'active' | 'completed' | 'cancelled', userId: string): Promise<Treatment>;
    private getSteps;
}
export {};
