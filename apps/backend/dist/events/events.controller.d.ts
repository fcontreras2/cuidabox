import { EventsService } from './events.service';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getTimeline(patientId: string, req: AuthRequest): Promise<import("./events.service").TimelineEvent[]>;
}
export {};
