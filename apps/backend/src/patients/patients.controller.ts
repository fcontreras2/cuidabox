import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('patients')
@UseGuards(JwtGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() dto: CreatePatientDto, @Request() req: AuthRequest) {
    return this.patientsService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.patientsService.findAllByHolder(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.patientsService.findOne(id, req.user.id);
  }
}
