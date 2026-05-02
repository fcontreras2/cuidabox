import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(patientId: string, dto: CreateDocumentDto, req: AuthRequest): Promise<import("./documents.service").Document>;
    findAll(patientId: string, req: AuthRequest, treatment_id?: string, appointment_id?: string, exam_id?: string): Promise<import("./documents.service").Document[]>;
    getSignedUrl(patientId: string, documentId: string, req: AuthRequest): Promise<{
        signed_url: string;
        expires_in: number;
    }>;
    remove(patientId: string, documentId: string, req: AuthRequest): Promise<void>;
}
export {};
