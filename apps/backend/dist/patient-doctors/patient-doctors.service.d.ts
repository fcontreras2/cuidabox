import { SupabaseClient } from '@supabase/supabase-js';
export interface PatientDoctor {
    id: string;
    patient_id: string;
    status: string;
    invited_by: string;
    access_from: string;
    created_at: string;
    doctor: {
        id: string;
        name: string;
        email: string;
        specialty_key: string | null;
    };
}
export declare class PatientDoctorsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertHolderAccess;
    linkDoctor(patientId: string, email: string, userId: string): Promise<PatientDoctor>;
    findAll(patientId: string, userId: string): Promise<PatientDoctor[]>;
    updateStatus(patientId: string, linkId: string, status: 'active' | 'rejected', userId: string): Promise<PatientDoctor>;
    remove(patientId: string, linkId: string, userId: string): Promise<void>;
    private mapRow;
}
