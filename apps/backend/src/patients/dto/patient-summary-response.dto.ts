import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PatientResponseDto } from './patient-response.dto';

class AppointmentSnapshotDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'Control mensual' })
  title: string;

  @ApiProperty({ example: '2026-05-15T10:00:00Z' })
  scheduled_at: string;

  @ApiPropertyOptional({ example: 'Dr. García' })
  doctor_name: string | null;
}

class VitalSnapshotDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'weight' })
  type: string;

  @ApiProperty({ example: '12.5 kg' })
  value: string;

  @ApiProperty({ example: '2026-04-28T08:00:00Z' })
  recorded_at: string;
}

export class PatientSummaryResponseDto {
  @ApiProperty({ type: PatientResponseDto })
  patient: PatientResponseDto;

  @ApiPropertyOptional({ type: AppointmentSnapshotDto, nullable: true })
  last_appointment: AppointmentSnapshotDto | null;

  @ApiPropertyOptional({ type: AppointmentSnapshotDto, nullable: true })
  next_appointment: AppointmentSnapshotDto | null;

  @ApiPropertyOptional({ type: VitalSnapshotDto, nullable: true })
  last_vital: VitalSnapshotDto | null;

  @ApiProperty({ example: 3, description: 'Total de alergias registradas' })
  active_allergies_count: number;

  @ApiProperty({ example: 1, description: 'Tratamientos con status active' })
  active_treatments_count: number;
}
