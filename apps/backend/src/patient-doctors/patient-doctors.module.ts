import { Module } from '@nestjs/common';
import { PatientDoctorsController } from './patient-doctors.controller';
import { PatientDoctorsService } from './patient-doctors.service';

@Module({
  controllers: [PatientDoctorsController],
  providers: [PatientDoctorsService],
})
export class PatientDoctorsModule {}
