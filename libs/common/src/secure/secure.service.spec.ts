import { Test, TestingModule } from '@nestjs/testing';
import { SecureService } from './secure.service';
import { ConfigModule } from '@nestjs/config';

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.api', '.env.jwt'],
          ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
      ],
      providers: [SecureService],
    }).compile();

    service = module.get<SecureService>(SecureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
