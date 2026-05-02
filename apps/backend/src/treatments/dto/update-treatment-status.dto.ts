import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateTreatmentStatusDto {
  @ApiProperty({ enum: ['active', 'completed', 'cancelled'] })
  @IsEnum(['active', 'completed', 'cancelled'])
  status: 'active' | 'completed' | 'cancelled';
}
