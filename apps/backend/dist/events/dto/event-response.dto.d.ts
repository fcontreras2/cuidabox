export declare class TimelineEventResponseDto {
    id: string;
    type: string;
    occurred_at: string;
    payload: Record<string, unknown>;
    created_by: string | null;
}
