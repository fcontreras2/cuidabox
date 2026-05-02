import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(dto: CreatePatientDto, req: AuthRequest): Promise<import("./patients.service").Patient>;
    findAll(req: AuthRequest): Promise<import("./patients.service").Patient[]>;
    findOne(id: string, req: AuthRequest): Promise<import("./patients.service").Patient>;
}
export {};
