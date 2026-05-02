import { SupabaseClient } from '@supabase/supabase-js';
import { CreateVitalDto } from './dto/create-vital.dto';
export interface Vital {
    id: string;
    patient_id: string;
    recorded_by: string;
    weight_kg: number | null;
    height_cm: number | null;
    temperature_c: number | null;
    heart_rate: number | null;
    notes: string | null;
    recorded_at: string;
}
export declare class VitalsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateVitalDto, userId: string): Promise<Vital>;
    findAll(patientId: string, userId: string): Promise<Vital[]>;
}
