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
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';

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
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateAllergyDto,
    @Request() req: AuthRequest,
  ) {
    return this.allergiesService.create(patientId, dto, req.user.id);
  }

  @Get()
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.allergiesService.findAll(patientId, req.user.id);
  }

  @Delete(':allergyId')
  remove(
    @Param('patientId') patientId: string,
    @Param('allergyId') allergyId: string,
    @Request() req: AuthRequest,
  ) {
    return this.allergiesService.remove(patientId, allergyId, req.user.id);
  }
}
