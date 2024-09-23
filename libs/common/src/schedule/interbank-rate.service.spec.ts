import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { InterbankRateService } from './interbank-rate.service';

import { InterbankRateType } from '@schema';
import typia from 'typia';

describe('InterbankRateService', () => {
  let module: TestingModule;
  let service: InterbankRateService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          envFilePath: ['.env', '.env.api'],
          ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
      ],
      providers: [InterbankRateService],
    }).compile();

    service = module.get<InterbankRateService>(InterbankRateService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return result', async () => {
    const result = await service.cron();

    expect(result).toBeDefined();

    typia.assertEquals<InterbankRateType>(result);
  });
});
