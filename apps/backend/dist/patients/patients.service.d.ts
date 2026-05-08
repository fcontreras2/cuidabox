import { SupabaseClient } from '@supabase/supabase-js';
import type { Patient, PatientSummary, UpdatePatientInput } from '@cuidabox/api';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Paginated } from '../common/types/paginated';
export declare class PatientsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    create(dto: CreatePatientDto, userId: string): Promise<Patient>;
    findAllByHolder(userId: string, query?: PaginationQueryDto): Promise<Paginated<Patient>>;
    findOne(id: string, userId: string): Promise<Patient>;
    update(id: string, dto: UpdatePatientInput, userId: string): Promise<Patient>;
    getSummary(id: string, userId: string): Promise<PatientSummary>;
}
