import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  scheduled_at: string;
  status: string;
  notes: string | null;
  created_by: string;
  created_at: string;
}

@Injectable()
export class AppointmentsService {
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
    dto: CreateAppointmentDto,
    userId: string,
  ): Promise<Appointment> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('appointments')
      .insert({
        patient_id: patientId,
        doctor_id: dto.doctor_id ?? null,
        scheduled_at: dto.scheduled_at,
        notes: dto.notes ?? null,
        created_by: userId,
      })
      .select()
      .single()) as {
      data: Appointment | null;
      error: { message: string } | null;
    };

    if (error) throw new Error(error.message);
    return data!;
  }

  async findAll(patientId: string, userId: string): Promise<Appointment[]> {
    await this.assertAccess(patientId, userId);

    const { data } = (await this.supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('scheduled_at', { ascending: false })) as {
      data: Appointment[] | null;
    };

    return data ?? [];
  }

  async findOne(
    patientId: string,
    appointmentId: string,
    userId: string,
  ): Promise<Appointment> {
    await this.assertAccess(patientId, userId);

    const { data } = (await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .eq('patient_id', patientId)
      .single()) as { data: Appointment | null };

    if (!data) throw new NotFoundException('Cita no encontrada');
    return data;
  }

  async findUpcoming(userId: string, limit = 10): Promise<Appointment[]> {
    const patientIds = await this.getHolderPatientIds(userId);
    if (!patientIds.length) return [];

    const now = new Date().toISOString();

    const { data } = (await this.supabase
      .from('appointments')
      .select('*')
      .in('patient_id', patientIds)
      .eq('status', 'scheduled')
      .gte('scheduled_at', now)
      .order('scheduled_at', { ascending: true })
      .limit(limit)) as { data: Appointment[] | null };

    return data ?? [];
  }

  private async getHolderPatientIds(userId: string): Promise<string[]> {
    const { data } = (await this.supabase
      .from('patient_holders')
      .select('patient_id')
      .eq('user_id', userId)) as {
      data: { patient_id: string }[] | null;
    };
    return (data ?? []).map((r) => r.patient_id);
  }

  async updateStatus(
    patientId: string,
    appointmentId: string,
    status: 'scheduled' | 'completed' | 'cancelled',
    userId: string,
  ): Promise<Appointment> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('appointments')
      .update({ status })
      .eq('id', appointmentId)
      .eq('patient_id', patientId)
      .select()
      .single()) as {
      data: Appointment | null;
      error: { message: string } | null;
    };

    if (error || !data) throw new NotFoundException('Cita no encontrada');
    return data;
  }
}
