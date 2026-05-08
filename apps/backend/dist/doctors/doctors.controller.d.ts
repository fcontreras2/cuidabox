import { DoctorsService } from './doctors.service';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    getMyPatients(req: AuthRequest): Promise<import("./doctors.service").DoctorPatient[]>;
}
export {};
