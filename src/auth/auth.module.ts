import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StorageModule } from '@storage';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [StorageModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
