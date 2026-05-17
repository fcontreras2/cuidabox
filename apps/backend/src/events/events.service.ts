import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { EventsQueryDto } from './dto/events-query.dto';
import { Paginated } from '../common/types/paginated';

// Tipos que solo existen en la tabla `events` (no en vaccines ni vitals)
const EVENT_ONLY_TYPES = new Set([
  'medication_given',
  'symptom',
  'visit',
  'exam',
  'note',
]);

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

  async create(
    patientId: string,
    userId: string,
    dto: {
      type: string;
      occurred_at: string;
      payload?: Record<string, unknown>;
    },
  ): Promise<TimelineEvent> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('events')
      .insert({
        patient_id: patientId,
        created_by: userId,
        type: dto.type,
        occurred_at: dto.occurred_at,
        payload: dto.payload ?? {},
      })
      .select('id, type, occurred_at, payload, created_by')
      .single()) as {
      data: TimelineEvent | null;
      error: { message: string } | null;
    };

    if (error || !data)
      throw new Error(error?.message ?? 'Error creating event');
    return data;
  }

  async getTimeline(
    patientId: string,
    userId: string,
    query: EventsQueryDto = {},
  ): Promise<Paginated<TimelineEvent>> {
    await this.assertAccess(patientId, userId);

    const limit = query.limit ?? 20;
    const fetchLimit = limit + 1;

    // Si el tipo pedido solo existe en la tabla events, saltamos vaccines y vitals
    const onlyEvents = query.type ? EVENT_ONLY_TYPES.has(query.type) : false;
    const onlyVaccines = query.type === 'vaccine';
    const onlyVitals = query.type === 'vital';

    // ── Queries condicionales ────────────────────────────────────────────────

    const runVaccines = !onlyEvents && !onlyVitals;
    const runVitals = !onlyEvents && !onlyVaccines;
    const runEvents = !onlyVaccines && !onlyVitals;

    const buildVaccinesQ = () => {
      let q = this.supabase
        .from('vaccines')
        .select('id, name, dose_number, administered_at, administered_by, notes')
        .eq('patient_id', patientId)
        .order('administered_at', { ascending: false })
        .limit(fetchLimit);
      if (query.cursor) q = q.lt('administered_at', query.cursor);
      if (query.from) q = q.gte('administered_at', query.from);
      if (query.to) q = q.lte('administered_at', query.to + 'T23:59:59Z');
      return q;
    };

    const buildVitalsQ = () => {
      let q = this.supabase
        .from('vitals')
        .select(
          'id, weight_kg, height_cm, temperature_c, heart_rate, notes, recorded_at, recorded_by',
        )
        .eq('patient_id', patientId)
        .order('recorded_at', { ascending: false })
        .limit(fetchLimit);
      if (query.cursor) q = q.lt('recorded_at', query.cursor);
      if (query.from) q = q.gte('recorded_at', query.from);
      if (query.to) q = q.lte('recorded_at', query.to + 'T23:59:59Z');
      return q;
    };

    const buildEventsQ = () => {
      let q = this.supabase
        .from('events')
        .select('id, type, occurred_at, payload, created_by')
        .eq('patient_id', patientId)
        .order('occurred_at', { ascending: false })
        .limit(fetchLimit);
      if (query.type && EVENT_ONLY_TYPES.has(query.type))
        q = q.eq('type', query.type);
      if (query.cursor) q = q.lt('occurred_at', query.cursor);
      if (query.from) q = q.gte('occurred_at', query.from);
      if (query.to) q = q.lte('occurred_at', query.to + 'T23:59:59Z');
      return q;
    };

    // Solo lanzamos las queries necesarias en paralelo
    const [vaccinesResult, vitalsResult, eventsResult] = await Promise.all([
      runVaccines
        ? (buildVaccinesQ() as unknown as Promise<{
            data: Record<string, unknown>[] | null;
          }>)
        : Promise.resolve({ data: [] as Record<string, unknown>[] }),
      runVitals
        ? (buildVitalsQ() as unknown as Promise<{
            data: Record<string, unknown>[] | null;
          }>)
        : Promise.resolve({ data: [] as Record<string, unknown>[] }),
      runEvents
        ? (buildEventsQ() as unknown as Promise<{
            data: Record<string, unknown>[] | null;
          }>)
        : Promise.resolve({ data: [] as Record<string, unknown>[] }),
    ]);

    const timeline: TimelineEvent[] = [
      ...(vaccinesResult.data ?? []).map((v) => ({
        id: v.id as string,
        type: 'vaccine',
        occurred_at: (v.administered_at as string) ?? '',
        payload: v,
        created_by: null,
      })),
      ...(vitalsResult.data ?? []).map((v) => ({
        id: v.id as string,
        type: 'vital',
        occurred_at: v.recorded_at as string,
        payload: v,
        created_by: v.recorded_by as string,
      })),
      ...(eventsResult.data ?? []).map((e) => ({
        id: e.id as string,
        type: e.type as string,
        occurred_at: e.occurred_at as string,
        payload: e.payload as Record<string, unknown>,
        created_by: e.created_by as string | null,
      })),
    ];

    timeline.sort(
      (a, b) =>
        new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime(),
    );

    const hasMore = timeline.length > limit;
    const items = hasMore ? timeline.slice(0, limit) : timeline;
    const nextCursor = hasMore
      ? items[items.length - 1].occurred_at
      : undefined;

    return { data: items, meta: { limit, hasMore, nextCursor } };
  }
}
