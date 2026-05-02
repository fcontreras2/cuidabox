import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiPropertyOptional({
    example: 'uuid-doctor',
    description: 'ID del doctor en el sistema (opcional si es doctor ficticio)',
  })
  @IsOptional()
  @IsUUID()
  doctor_id?: string;

  @ApiProperty({
    example: '2026-05-15T10:00:00Z',
    description: 'Fecha y hora de la cita',
  })
  @IsDateString()
  scheduled_at: string;

  @ApiPropertyOptional({ example: 'Control mensual de peso y talla' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  notes?: string;
}
