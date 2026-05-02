import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: ['scheduled', 'completed', 'cancelled'] })
  @IsEnum(['scheduled', 'completed', 'cancelled'])
  status: 'scheduled' | 'completed' | 'cancelled';
}
