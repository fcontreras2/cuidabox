import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'Mateo Pérez' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: '2022-03-15' })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ example: 'O+' })
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
}
