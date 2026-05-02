import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface TimelineEvent {
  id: string;
  type: string;
  occurred_at: string;
  payload: Record<string, unknown>;
  created_by: string | null;
}

@Injectable()
export class EventsService {
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

  async getTimeline(
    patientId: string,
    userId: string,
  ): Promise<TimelineEvent[]> {
    await this.assertAccess(patientId, userId);

    // Vacunas
    const { data: vaccines } = (await this.supabase
      .from('vaccines')
      .select('id, name, dose_number, administered_at, administered_by, notes')
      .eq('patient_id', patientId)) as {
      data: Record<string, unknown>[] | null;
    };

    // Vitales
    const { data: vitals } = (await this.supabase
      .from('vitals')
      .select(
        'id, weight_kg, height_cm, temperature_c, heart_rate, notes, recorded_at, recorded_by',
      )
      .eq('patient_id', patientId)) as {
      data: Record<string, unknown>[] | null;
    };

    // Eventos directos (medicamentos, síntomas, notas, etc.)
    const { data: events } = (await this.supabase
      .from('events')
      .select('id, type, occurred_at, payload, created_by')
      .eq('patient_id', patientId)) as {
      data: Record<string, unknown>[] | null;
    };

    const timeline: TimelineEvent[] = [
      ...(vaccines ?? []).map((v) => ({
        id: v.id as string,
        type: 'vaccine',
        occurred_at: (v.administered_at as string) ?? '',
        payload: v,
        created_by: null,
      })),
      ...(vitals ?? []).map((v) => ({
        id: v.id as string,
        type: 'vital',
        occurred_at: v.recorded_at as string,
        payload: v,
        created_by: v.recorded_by as string,
      })),
      ...(events ?? []).map((e) => ({
        id: e.id as string,
        type: e.type as string,
        occurred_at: e.occurred_at as string,
        payload: e.payload as Record<string, unknown>,
        created_by: e.created_by as string | null,
      })),
    ];

    // Ordenar por fecha descendente
    return timeline.sort(
      (a, b) =>
        new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime(),
    );
  }
}
