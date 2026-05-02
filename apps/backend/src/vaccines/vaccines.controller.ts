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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('vaccines')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post()
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateVaccineDto,
    @Request() req: AuthRequest,
  ) {
    return this.vaccinesService.create(patientId, dto, req.user.id);
  }

  @Get()
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.vaccinesService.findAll(patientId, req.user.id);
  }

  @Delete(':vaccineId')
  remove(
    @Param('patientId') patientId: string,
    @Param('vaccineId') vaccineId: string,
    @Request() req: AuthRequest,
  ) {
    return this.vaccinesService.remove(patientId, vaccineId, req.user.id);
  }
}
