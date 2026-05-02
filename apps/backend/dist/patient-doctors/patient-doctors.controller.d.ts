import { PatientDoctorsService } from './patient-doctors.service';
import { LinkDoctorDto } from './dto/link-doctor.dto';
import { UpdateLinkStatusDto } from './dto/update-link-status.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class PatientDoctorsController {
    private readonly patientDoctorsService;
    constructor(patientDoctorsService: PatientDoctorsService);
    linkDoctor(patientId: string, dto: LinkDoctorDto, req: AuthRequest): Promise<import("./patient-doctors.service").PatientDoctor>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./patient-doctors.service").PatientDoctor[]>;
    updateStatus(patientId: string, linkId: string, dto: UpdateLinkStatusDto, req: AuthRequest): Promise<import("./patient-doctors.service").PatientDoctor>;
    remove(patientId: string, linkId: string, req: AuthRequest): Promise<void>;
}
export {};
