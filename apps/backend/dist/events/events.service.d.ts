import { SupabaseClient } from '@supabase/supabase-js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Paginated } from '../common/types/paginated';
export interface TimelineEvent {
    id: string;
    type: string;
    occurred_at: string;
    payload: Record<string, unknown>;
    created_by: string | null;
}
export declare class EventsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    getTimeline(patientId: string, userId: string, query?: PaginationQueryDto): Promise<Paginated<TimelineEvent>>;
}
