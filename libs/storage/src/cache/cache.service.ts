import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    this.redisClient = new Redis({
      host: this.config.get<string>('CACHE_HOST'),
      port: this.config.get<number>('CACHE_PORT'),
      password: this.config.get<string>('CACHE_PASSWORD'),
    });
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl as number);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  getRedisClient(): Redis {
    return this.redisClient;
  }

  // Redis 특화 메서드들
  async hget(key: string, field: string): Promise<string | null> {
    return this.redisClient.hget(key, field);
  }

  async hset(key: string, field: string, value: string): Promise<number> {
    return this.redisClient.hset(key, field, value);
  }

  async publish(channel: string, message: string): Promise<number> {
    return this.redisClient.publish(channel, message);
  }

  async subscribe(channel: string, callback: (message: string) => void): Promise<void> {
    await this.redisClient.subscribe(channel);
    this.redisClient.on('message', (ch, message) => {
      if (ch === channel) {
        callback(message);
      }
    });
  }
}
