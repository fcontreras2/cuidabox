import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateVitalDto } from './dto/create-vital.dto';

export interface Vital {
  id: string;
  patient_id: string;
  recorded_by: string;
  weight_kg: number | null;
  height_cm: number | null;
  temperature_c: number | null;
  heart_rate: number | null;
  notes: string | null;
  recorded_at: string;
}

@Injectable()
export class VitalsService {
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
    dto: CreateVitalDto,
    userId: string,
  ): Promise<Vital> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('vitals')
      .insert({
        patient_id: patientId,
        recorded_by: userId,
        ...dto,
      })
      .select()
      .single()) as { data: Vital | null; error: { message: string } | null };

    if (error) throw new Error(error.message);
    return data!;
  }

  async findAll(patientId: string, userId: string): Promise<Vital[]> {
    await this.assertAccess(patientId, userId);

    const { data } = (await this.supabase
      .from('vitals')
      .select('*')
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false })) as {
      data: Vital[] | null;
    };

    return data ?? [];
  }
}
