import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class VaccinesController {
    private readonly vaccinesService;
    constructor(vaccinesService: VaccinesService);
    create(patientId: string, dto: CreateVaccineDto, req: AuthRequest): Promise<import("./vaccines.service").Vaccine>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./vaccines.service").Vaccine[]>;
    remove(patientId: string, vaccineId: string, req: AuthRequest): Promise<void>;
}
export {};
