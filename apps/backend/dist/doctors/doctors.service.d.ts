import { SupabaseClient } from '@supabase/supabase-js';
export interface DoctorPatient {
    link_id: string;
    status: string;
    access_from: string;
    created_at: string;
    patient: {
        id: string;
        name: string;
        birthdate: string | null;
        gender: string | null;
    };
}
export declare class DoctorsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getMyPatients(doctorId: string): Promise<DoctorPatient[]>;
}
