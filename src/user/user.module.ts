import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StorageModule } from '@storage';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [StorageModule],
  controllers: [UserController],
  providers: [UserService, UserProfileService],
  exports: [UserProfileService],
})
export class UserModule {}
