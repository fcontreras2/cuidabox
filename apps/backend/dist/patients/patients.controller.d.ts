import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): import("./patients.service").Patient[];
    findOne(id: string): import("./patients.service").Patient | undefined;
}
