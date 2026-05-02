import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'Mateo Pérez' })
  name: string;

  @ApiPropertyOptional({ example: '2022-03-15' })
  birthdate: string | null;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'] })
  gender: string | null;

  @ApiPropertyOptional({ example: 'O+' })
  blood_type: string | null;

  @ApiPropertyOptional({ example: 'Paciente con asma leve' })
  notes: string | null;

  @ApiPropertyOptional({ example: 'Seguros Caracas' })
  insurance_provider: string | null;

  @ApiPropertyOptional({ example: 'SC-123456' })
  insurance_policy_number: string | null;

  @ApiProperty({ example: 'uuid-456' })
  created_by: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;
}
