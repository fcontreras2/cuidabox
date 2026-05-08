import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAllergyDto } from './dto/create-allergy.dto';
export interface Allergy {
    id: string;
    patient_id: string;
    name: string;
    type: string | null;
    severity: string | null;
    notes: string | null;
    created_at: string;
}
export declare class AllergiesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateAllergyDto, userId: string): Promise<Allergy>;
    findAll(patientId: string, userId: string): Promise<Allergy[]>;
    remove(patientId: string, allergyId: string, userId: string): Promise<void>;
}
