export interface Patient {
    id: string;
    name: string;
    age: number;
}
export declare class PatientsService {
    findAll(): Patient[];
    findOne(id: string): Patient | undefined;
}
