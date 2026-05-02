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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    AllergiesModule,
    VaccinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
