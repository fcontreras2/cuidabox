import { EventsService } from './events.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
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
    getTimeline(patientId: string, req: AuthRequest, query: PaginationQueryDto): Promise<import("../common/types/paginated").Paginated<import("./events.service").TimelineEvent>>;
}
export {};
