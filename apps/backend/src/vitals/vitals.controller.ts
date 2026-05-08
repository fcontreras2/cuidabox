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
import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { VitalResponseDto } from './dto/vital-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('vitals')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar vitales del paciente' })
  @ApiResponse({ status: 201, type: VitalResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateVitalDto,
    @Request() req: AuthRequest,
  ) {
    return this.vitalsService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Historial de vitales del paciente ordenado por fecha (paginado)',
    description: 'Usa `cursor` (ISO date) para obtener la siguiente página.',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(
    @Param('patientId') patientId: string,
    @Request() req: AuthRequest,
    @Query() query: PaginationQueryDto,
  ) {
    return this.vitalsService.findAll(patientId, req.user.id, query);
  }
}
