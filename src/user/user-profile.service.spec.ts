import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from './user-profile.service';
import { StorageModule } from '@storage';

describe('UserProfileService', () => {
  let module: TestingModule;
  let service: UserProfileService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [StorageModule],
      providers: [UserProfileService],
    }).compile();

    service = module.get<UserProfileService>(UserProfileService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
