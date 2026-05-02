import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class DoctorInfoDto {
  @ApiProperty({ example: 'uuid-doctor' })
  id: string;

  @ApiProperty({ example: 'Dr. García' })
  name: string;

  @ApiProperty({ example: 'doctor@example.com' })
  email: string;

  @ApiPropertyOptional({
    example: 'pediatrics',
    description: 'Key de especialidad, traducido en frontend',
  })
  specialty_key: string | null;
}

export class PatientDoctorResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-patient' })
  patient_id: string;

  @ApiProperty({ enum: ['pending', 'active', 'rejected'] })
  status: string;

  @ApiProperty({
    example: 'uuid-holder',
    description: 'Quien realizó el enlace',
  })
  invited_by: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  access_from: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;

  @ApiProperty({ type: DoctorInfoDto })
  doctor: DoctorInfoDto;
}
