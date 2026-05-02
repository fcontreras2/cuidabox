import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class StepMedicationResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'Amoxicilina' })
  medication_name: string;

  @ApiPropertyOptional({ example: 250 })
  dose: number | null;

  @ApiPropertyOptional({ example: 'mg' })
  unit: string | null;

  @ApiPropertyOptional({ example: 'Cada 8 horas' })
  frequency: string | null;

  @ApiPropertyOptional({ example: ['07:00', '15:00', '23:00'], type: [String] })
  times_of_day: string[] | null;
}

class TreatmentStepResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiPropertyOptional({ example: 'uuid-step-anterior' })
  depends_on_step_id: string | null;

  @ApiProperty({ enum: ['medication', 'action', 'exam'] })
  type: string;

  @ApiProperty({ example: 'Amoxicilina por 3 días' })
  title: string;

  @ApiPropertyOptional({ example: 'Dar con alimentos' })
  description: string | null;

  @ApiProperty({ example: 0 })
  start_offset_days: number;

  @ApiPropertyOptional({ example: 3 })
  duration_days: number | null;

  @ApiPropertyOptional({ type: StepMedicationResponseDto })
  medication: StepMedicationResponseDto | null;
}

export class TreatmentResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-456' })
  patient_id: string;

  @ApiPropertyOptional({ example: 'uuid-789' })
  doctor_id: string | null;

  @ApiPropertyOptional({ example: 'uuid-apt' })
  appointment_id: string | null;

  @ApiProperty({ example: 'Tratamiento infección respiratoria' })
  title: string;

  @ApiPropertyOptional({ example: '2026-05-01' })
  start_date: string | null;

  @ApiPropertyOptional({ example: '2026-05-10' })
  end_date: string | null;

  @ApiProperty({ enum: ['active', 'completed', 'cancelled'] })
  status: string;

  @ApiProperty({ example: 'uuid-holder' })
  created_by: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;

  @ApiPropertyOptional({ type: [TreatmentStepResponseDto] })
  steps: TreatmentStepResponseDto[];
}
