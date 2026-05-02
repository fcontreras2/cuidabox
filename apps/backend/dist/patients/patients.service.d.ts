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
export interface UpdatePatientDto {
    name?: string;
    birthdate?: string;
    gender?: string;
    blood_type?: string;
    notes?: string;
    insurance_provider?: string;
    insurance_policy_number?: string;
}
export interface PatientSummary {
    patient: Patient;
    last_appointment: {
        id: string;
        title: string;
        scheduled_at: string;
        doctor_name: string | null;
    } | null;
    next_appointment: {
        id: string;
        title: string;
        scheduled_at: string;
        doctor_name: string | null;
    } | null;
    last_vital: {
        id: string;
        type: string;
        value: string;
        recorded_at: string;
    } | null;
    active_allergies_count: number;
    active_treatments_count: number;
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
    update(id: string, dto: UpdatePatientDto, userId: string): Promise<Patient>;
    getSummary(id: string, userId: string): Promise<PatientSummary>;
}
