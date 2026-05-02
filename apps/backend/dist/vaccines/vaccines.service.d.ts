import { SupabaseClient } from '@supabase/supabase-js';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
export interface Vaccine {
    id: string;
    patient_id: string;
    name: string;
    dose_number: number | null;
    administered_at: string | null;
    administered_by: string | null;
    notes: string | null;
    created_at: string;
}
export declare class VaccinesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateVaccineDto, userId: string): Promise<Vaccine>;
    findAll(patientId: string, userId: string): Promise<Vaccine[]>;
    remove(patientId: string, vaccineId: string, userId: string): Promise<void>;
}
