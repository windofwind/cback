import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('PrismaService', () => {
  let module: TestingModule;
  let service: PrismaService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          envFilePath: ['.env', '.env.api', '.env.jwt'],
          ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
      ],
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('select 1', async () => {
    const result = await service.$queryRaw`SELECT 1;`;

    expect(result).toBeDefined();
  });
});
