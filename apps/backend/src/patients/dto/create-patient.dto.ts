import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ example: 'Mateo Pérez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: '2022-03-15',
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ example: 'O+', description: 'Tipo de sangre' })
  @IsOptional()
  @IsString()
  @MaxLength(5)
  blood_type?: string;

  @ApiPropertyOptional({ example: 'Paciente con asma leve' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional({ example: 'Seguros Caracas' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  insurance_provider?: string;

  @ApiPropertyOptional({ example: 'SC-123456' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  insurance_policy_number?: string;

  @ApiPropertyOptional({
    enum: ['parent', 'guardian', 'self', 'other'],
    default: 'parent',
    description: 'Relación del holder con el paciente',
  })
  @IsOptional()
  @IsEnum(['parent', 'guardian', 'self', 'other'])
  relationship?: string;
}
