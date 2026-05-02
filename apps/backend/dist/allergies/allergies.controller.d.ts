import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class AllergiesController {
    private readonly allergiesService;
    constructor(allergiesService: AllergiesService);
    create(patientId: string, dto: CreateAllergyDto, req: AuthRequest): Promise<import("./allergies.service").Allergy>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./allergies.service").Allergy[]>;
    remove(patientId: string, allergyId: string, req: AuthRequest): Promise<void>;
}
export {};
