import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

describe('CacheService', () => {
  let service: CacheService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.api'],
          ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
        CacheModule.registerAsync({
          isGlobal: true,
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            store: await redisStore({
              host: config.get<string>('CACHE_HOST'),
              port: config.get<number>('CACHE_PORT'),
              password: config.get<string>('CACHE_PASSWORD'),
              ttl: 60 * 60 * 1000, // 기본 TTL: 1시간
            }),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get and set cache', async () => {
    const key = 'testKey';
    const value = { name: 'Test User', age: 30 };

    await service.set(key, value);
    const result = await service.get(key);

    expect(result).toEqual(value);
  });
});
