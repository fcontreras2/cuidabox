import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class TreatmentQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: ['active', 'completed', 'cancelled'],
    description: 'Filtrar por estado del tratamiento',
  })
  @IsOptional()
  @IsIn(['active', 'completed', 'cancelled'])
  status?: 'active' | 'completed' | 'cancelled';
}
