import { SupabaseClient } from '@supabase/supabase-js';
export interface Patient {
    id: string;
    name: string;
    birthdate?: string;
    gender?: string;
    blood_type?: string;
    notes?: string;
    insurance_provider?: string;
    insurance_policy_number?: string;
    created_by: string;
    created_at: string;
}
export declare class CreatePatientDto {
    name: string;
    birthdate?: string;
    gender?: string;
    blood_type?: string;
    notes?: string;
    insurance_provider?: string;
    insurance_policy_number?: string;
    relationship?: string;
}
export declare class PatientsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    create(dto: CreatePatientDto, userId: string): Promise<Patient>;
    findAllByHolder(userId: string): Promise<Patient[]>;
    findOne(id: string, userId: string): Promise<Patient>;
}
