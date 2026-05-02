import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AllergiesModule } from './allergies/allergies.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { VitalsModule } from './vitals/vitals.module';
import { EventsModule } from './events/events.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DocumentsModule } from './documents/documents.module';
import { PatientDoctorsModule } from './patient-doctors/patient-doctors.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    AllergiesModule,
    VaccinesModule,
    VitalsModule,
    EventsModule,
    TreatmentsModule,
    AppointmentsModule,
    DocumentsModule,
    PatientDoctorsModule,
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
