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
  @ApiProperty({ example: 'Control mensual', description: 'Motivo o título de la cita' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional({
    example: 'uuid-doctor',
    description: 'ID del doctor registrado en el sistema (opcional)',
  })
  @IsOptional()
  @IsUUID()
  doctor_id?: string;

  @ApiPropertyOptional({
    example: 'Dr. García',
    description: 'Nombre libre del doctor si no está registrado en el sistema',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  doctor_name?: string;

  @ApiProperty({
    example: '2026-05-15T10:00:00Z',
    description: 'Fecha y hora de la cita',
  })
  @IsDateString()
  scheduled_at: string;

  @ApiPropertyOptional({ example: 'Llevar carnet de vacunas' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  notes?: string;
}
