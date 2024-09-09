import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheService } from './cache/cache.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.api'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          host: configService.get<string>('CACHE_HOST'),
          port: configService.get<number>('CACHE_PORT'),
          password: configService.get<string>('CACHE_PASSWORD'),
          db: configService.get<number>('CACHE_DB'),
          ttl: 10 * 1000,
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PrismaService, CacheService],
  exports: [PrismaService, CacheService],
})
export class StorageModule {}
