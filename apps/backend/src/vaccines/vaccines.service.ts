import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateVaccineDto } from './dto/create-vaccine.dto';

export interface Vaccine {
  id: string;
  patient_id: string;
  name: string;
  dose_number: number | null;
  administered_at: string | null;
  administered_by: string | null;
  notes: string | null;
  created_at: string;
}

@Injectable()
export class VaccinesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  private async assertAccess(patientId: string, userId: string): Promise<void> {
    const { data } = await this.supabase
      .from('patient_holders')
      .select('patient_id')
      .eq('patient_id', patientId)
      .eq('user_id', userId)
      .single();

    if (!data) throw new ForbiddenException('No tienes acceso a este paciente');
  }

  async create(
    patientId: string,
    dto: CreateVaccineDto,
    userId: string,
  ): Promise<Vaccine> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('vaccines')
      .insert({ patient_id: patientId, ...dto })
      .select()
      .single()) as { data: Vaccine | null; error: { message: string } | null };

    if (error) throw new Error(error.message);
    return data!;
  }

  async findAll(patientId: string, userId: string): Promise<Vaccine[]> {
    await this.assertAccess(patientId, userId);

    const { data } = (await this.supabase
      .from('vaccines')
      .select('*')
      .eq('patient_id', patientId)
      .order('administered_at', { ascending: false })) as {
      data: Vaccine[] | null;
    };

    return data ?? [];
  }

  async remove(
    patientId: string,
    vaccineId: string,
    userId: string,
  ): Promise<void> {
    await this.assertAccess(patientId, userId);

    const { error } = await this.supabase
      .from('vaccines')
      .delete()
      .eq('id', vaccineId)
      .eq('patient_id', patientId);

    if (error) throw new NotFoundException('Vacuna no encontrada');
  }
}
