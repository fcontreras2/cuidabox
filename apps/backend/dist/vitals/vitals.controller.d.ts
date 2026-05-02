import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class VitalsController {
    private readonly vitalsService;
    constructor(vitalsService: VitalsService);
    create(patientId: string, dto: CreateVitalDto, req: AuthRequest): Promise<import("./vitals.service").Vital>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./vitals.service").Vital[]>;
}
export {};
