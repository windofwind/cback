import { CommonModule } from '@common';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TransformInterceptor } from './1-common/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env', '.env.api', '.env.jwt'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    CommonModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    /** global 모듈 */
    TransformInterceptor,
  ],
})
export class AppModule {}
