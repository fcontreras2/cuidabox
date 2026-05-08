import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
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
    create(dto: CreatePatientDto, req: AuthRequest): Promise<import("@cuidabox/api").Patient>;
    findAll(req: AuthRequest, query: PaginationQueryDto): Promise<import("../common/types/paginated").Paginated<import("@cuidabox/api").Patient>>;
    findOne(id: string, req: AuthRequest): Promise<import("@cuidabox/api").Patient>;
    update(id: string, dto: UpdatePatientDto, req: AuthRequest): Promise<import("@cuidabox/api").Patient>;
    getSummary(id: string, req: AuthRequest): Promise<import("@cuidabox/api").PatientSummary>;
}
export {};
