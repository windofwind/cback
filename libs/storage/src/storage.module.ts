import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.api'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class StorageModule {}
