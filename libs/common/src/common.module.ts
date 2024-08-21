import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { InterbankRateService } from './schedule/interbank-rate.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.api'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    EventEmitterModule.forRoot({ global: true }),
    ScheduleModule.forRoot(),
  ],
  providers: [InterbankRateService],
  exports: [InterbankRateService],
})
export class CommonModule {}
