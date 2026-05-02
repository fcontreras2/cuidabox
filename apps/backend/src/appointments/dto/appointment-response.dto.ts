import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AppointmentResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-patient' })
  patient_id: string;

  @ApiPropertyOptional({ example: 'uuid-doctor' })
  doctor_id: string | null;

  @ApiProperty({ example: '2026-05-15T10:00:00Z' })
  scheduled_at: string;

  @ApiProperty({ enum: ['scheduled', 'completed', 'cancelled'] })
  status: string;

  @ApiPropertyOptional({ example: 'Control mensual de peso y talla' })
  notes: string | null;

  @ApiProperty({ example: 'uuid-holder', description: 'Quien agendó la cita' })
  created_by: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;
}
