import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StorageModule } from '@storage';

@Module({
  imports: [StorageModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
