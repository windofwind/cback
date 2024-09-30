import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { InterbankRateService } from './schedule/interbank-rate.service';
import { SecureService } from './secure/secure.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.api', '.env.jwt'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [InterbankRateService, SecureService],
  exports: [InterbankRateService, SecureService],
})
export class CommonModule {}
