import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { EventsService } from './events.service';
import { TimelineEventResponseDto } from './dto/event-response.dto';
import { CreateEventDto } from './dto/create-event.dto';
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

  @Post()
  @ApiOperation({
    summary: 'Registrar un evento manual (medication_given, symptom, etc.)',
  })
  @ApiResponse({ status: 201, type: TimelineEventResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateEventDto,
    @Request() req: AuthRequest,
  ) {
    return this.eventsService.create(patientId, req.user.id, dto);
  }

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
