import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentStatusDto } from './dto/update-treatment-status.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class TreatmentsController {
    private readonly treatmentsService;
    constructor(treatmentsService: TreatmentsService);
    create(patientId: string, dto: CreateTreatmentDto, req: AuthRequest): Promise<import("./treatments.service").Treatment>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./treatments.service").Treatment[]>;
    findOne(patientId: string, treatmentId: string, req: AuthRequest): Promise<import("./treatments.service").Treatment>;
    updateStatus(patientId: string, treatmentId: string, dto: UpdateTreatmentStatusDto, req: AuthRequest): Promise<import("./treatments.service").Treatment>;
}
export {};
