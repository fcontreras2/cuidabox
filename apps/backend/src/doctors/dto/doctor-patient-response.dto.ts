import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PatientSnapshotDto {
  @ApiProperty({ example: 'uuid-patient' })
  id: string;

  @ApiProperty({ example: 'Mateo Pérez' })
  name: string;

  @ApiPropertyOptional({ example: '2022-03-15', nullable: true })
  birthdate: string | null;

  @ApiPropertyOptional({ enum: ['male', 'female', 'other'], nullable: true })
  gender: string | null;
}

export class DoctorPatientResponseDto {
  @ApiProperty({ example: 'uuid-link' })
  link_id: string;

  @ApiProperty({ enum: ['active'] })
  status: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  access_from: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;

  @ApiProperty({ type: PatientSnapshotDto })
  patient: PatientSnapshotDto;
}
