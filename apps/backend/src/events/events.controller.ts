import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { EventsService } from './events.service';
import { TimelineEventResponseDto } from './dto/event-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('events')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({
    summary: 'Timeline unificado del paciente (paginado)',
    description:
      'Devuelve vacunas, vitales y eventos en orden cronológico descendente. Usa `cursor` (ISO date) para la siguiente página. El campo `type` indica el origen: vaccine, vital, medication_given, symptom, visit, exam, note.',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  getTimeline(
    @Param('patientId') patientId: string,
    @Request() req: AuthRequest,
    @Query() query: PaginationQueryDto,
  ) {
    return this.eventsService.getTimeline(patientId, req.user.id, query);
  }
}
