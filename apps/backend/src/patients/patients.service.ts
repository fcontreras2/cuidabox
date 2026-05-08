import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import type {
  Patient,
  PatientSummary,
  UpdatePatientInput,
} from '@cuidabox/api';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Paginated } from '../common/types/paginated';

@Injectable()
export class PatientsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreatePatientDto, userId: string): Promise<Patient> {
    const { data: patient, error } = (await this.supabase
      .from('patients')
      .insert({
        name: dto.name,
        birthdate: dto.birthdate,
        gender: dto.gender,
        blood_type: dto.blood_type,
        notes: dto.notes,
        insurance_provider: dto.insurance_provider,
        insurance_policy_number: dto.insurance_policy_number,
        created_by: userId,
      })
      .select()
      .single()) as { data: Patient | null; error: { message: string } | null };

    if (error) throw new Error(error.message);

    await this.supabase.from('patient_holders').insert({
      patient_id: patient!.id,
      user_id: userId,
      relationship: dto.relationship ?? 'parent',
      is_primary: true,
    });

    return patient!;
  }

  async findAllByHolder(
    userId: string,
    query: PaginationQueryDto = {},
  ): Promise<Paginated<Patient>> {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const { data, count } = (await this.supabase
      .from('patient_holders')
      .select('patients(*)', { count: 'exact' })
      .eq('user_id', userId)
      .range(offset, offset + limit - 1)) as {
      data: { patients: Patient }[] | null;
      count: number | null;
    };

    const items = (data ?? []).map((row) => row.patients);
    const total = count ?? 0;
    const hasMore = offset + items.length < total;

    return {
      data: items,
      meta: { limit, offset, total, hasMore },
    };
  }

  async findOne(id: string, userId: string): Promise<Patient> {
    const { data } = (await this.supabase
      .from('patient_holders')
      .select('patients(*)')
      .eq('user_id', userId)
      .eq('patient_id', id)
      .single()) as { data: { patients: Patient } | null };

    if (!data) throw new NotFoundException('Patient not found');
    return data.patients;
  }

  async update(
    id: string,
    dto: UpdatePatientInput,
    userId: string,
  ): Promise<Patient> {
    const { data: access } = await this.supabase
      .from('patient_holders')
      .select('patient_id')
      .eq('patient_id', id)
      .eq('user_id', userId)
      .single();

    if (!access)
      throw new ForbiddenException('No tienes acceso a este paciente');

    const fields: Partial<UpdatePatientInput> = {};
    if (dto.name !== undefined) fields.name = dto.name;
    if (dto.birthdate !== undefined) fields.birthdate = dto.birthdate;
    if (dto.gender !== undefined) fields.gender = dto.gender;
    if (dto.blood_type !== undefined) fields.blood_type = dto.blood_type;
    if (dto.notes !== undefined) fields.notes = dto.notes;
    if (dto.insurance_provider !== undefined)
      fields.insurance_provider = dto.insurance_provider;
    if (dto.insurance_policy_number !== undefined)
      fields.insurance_policy_number = dto.insurance_policy_number;

    const { data: patient, error } = (await this.supabase
      .from('patients')
      .update(fields)
      .eq('id', id)
      .select()
      .single()) as { data: Patient | null; error: { message: string } | null };

    if (error || !patient) throw new Error('Error al actualizar el paciente');
    return patient;
  }

  async getSummary(id: string, userId: string): Promise<PatientSummary> {
    const patient = await this.findOne(id, userId);

    const now = new Date().toISOString();

    const [
      { data: lastAppointment },
      { data: nextAppointment },
      { data: lastVital },
      { count: allergiesCount },
      { count: treatmentsCount },
    ] = await Promise.all([
      this.supabase
        .from('appointments')
        .select('id, title, scheduled_at, doctor_name')
        .eq('patient_id', id)
        .lt('scheduled_at', now)
        .order('scheduled_at', { ascending: false })
        .limit(1)
        .single(),
      this.supabase
        .from('appointments')
        .select('id, title, scheduled_at, doctor_name')
        .eq('patient_id', id)
        .gte('scheduled_at', now)
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .single(),
      this.supabase
        .from('vitals')
        .select('id, type, value, recorded_at')
        .eq('patient_id', id)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single(),
      this.supabase
        .from('allergies')
        .select('*', { count: 'exact', head: true })
        .eq('patient_id', id),
      this.supabase
        .from('treatments')
        .select('*', { count: 'exact', head: true })
        .eq('patient_id', id)
        .eq('status', 'active'),
    ]);

    return {
      patient,
      last_appointment: lastAppointment ?? null,
      next_appointment: nextAppointment ?? null,
      last_vital: lastVital ?? null,
      active_allergies_count: allergiesCount ?? 0,
      active_treatments_count: treatmentsCount ?? 0,
    };
  }
}
