import { SupabaseClient } from '@supabase/supabase-js';
import { CreateDocumentDto } from './dto/create-document.dto';
export interface Document {
    id: string;
    patient_id: string;
    uploaded_by: string;
    treatment_id: string | null;
    appointment_id: string | null;
    exam_id: string | null;
    name: string;
    file_url: string;
    type: string;
    uploaded_at: string;
}
export declare class DocumentsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateDocumentDto, userId: string): Promise<Document>;
    findAll(patientId: string, userId: string, filters?: {
        treatment_id?: string;
        appointment_id?: string;
        exam_id?: string;
    }): Promise<Document[]>;
    getSignedUrl(patientId: string, documentId: string, userId: string): Promise<{
        signed_url: string;
        expires_in: number;
    }>;
    remove(patientId: string, documentId: string, userId: string): Promise<void>;
}
