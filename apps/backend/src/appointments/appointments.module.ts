import { Module } from '@nestjs/common';
import {
  AppointmentsController,
  AppointmentsUpcomingController,
} from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  controllers: [AppointmentsController, AppointmentsUpcomingController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
