import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
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
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { AllergyResponseDto } from './dto/allergy-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('allergies')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar alergia del paciente' })
  @ApiResponse({ status: 201, type: AllergyResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateAllergyDto,
    @Request() req: AuthRequest,
  ) {
    return this.allergiesService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar alergias del paciente' })
  @ApiResponse({ status: 200, type: [AllergyResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.allergiesService.findAll(patientId, req.user.id);
  }

  @Delete(':allergyId')
  @ApiOperation({ summary: 'Eliminar alergia del paciente' })
  @ApiResponse({ status: 200, description: 'Alergia eliminada' })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Alergia no encontrada' })
  remove(
    @Param('patientId') patientId: string,
    @Param('allergyId') allergyId: string,
    @Request() req: AuthRequest,
  ) {
    return this.allergiesService.remove(patientId, allergyId, req.user.id);
  }
}
