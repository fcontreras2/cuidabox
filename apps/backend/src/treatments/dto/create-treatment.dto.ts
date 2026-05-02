import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStepMedicationDto {
  @ApiProperty({ example: 'Amoxicilina' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  medication_name: string;

  @ApiPropertyOptional({ example: 250 })
  @IsOptional()
  @IsInt()
  @Min(0)
  dose?: number;

  @ApiPropertyOptional({ example: 'mg' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  unit?: string;

  @ApiPropertyOptional({ example: 'Cada 8 horas' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  frequency?: string;

  @ApiPropertyOptional({ example: ['07:00', '15:00', '23:00'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  times_of_day?: string[];
}

export class CreateTreatmentStepDto {
  @ApiProperty({
    example: 1,
    description: 'Orden del paso dentro del tratamiento',
  })
  @IsInt()
  @Min(1)
  order: number;

  @ApiPropertyOptional({
    example: 'uuid-step-anterior',
    description: 'ID del paso del que depende este (opcional)',
  })
  @IsOptional()
  @IsUUID()
  depends_on_step_id?: string;

  @ApiProperty({ enum: ['medication', 'action', 'exam'] })
  @IsEnum(['medication', 'action', 'exam'])
  type: string;

  @ApiProperty({ example: 'Amoxicilina por 3 días' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional({
    example: 'Dar con alimentos para evitar malestar estomacal',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Días desde el inicio del tratamiento',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  start_offset_days?: number;

  @ApiPropertyOptional({
    example: 3,
    description: 'Duración en días de este paso',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration_days?: number;

  @ApiPropertyOptional({
    type: CreateStepMedicationDto,
    description: 'Requerido si type es medication',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStepMedicationDto)
  medication?: CreateStepMedicationDto;
}

export class CreateTreatmentDto {
  @ApiProperty({ example: 'Tratamiento infección respiratoria' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional({ example: '2026-05-01' })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({ example: '2026-05-10' })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiPropertyOptional({ example: 'uuid-appointment' })
  @IsOptional()
  @IsUUID()
  appointment_id?: string;

  @ApiPropertyOptional({ type: [CreateTreatmentStepDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTreatmentStepDto)
  steps?: CreateTreatmentStepDto[];
}
