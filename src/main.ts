import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { NestiaSwaggerComposer } from '@nestia/sdk';

import config from '../nestia.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await NestiaSwaggerComposer.document(app, config.swagger || {});
  SwaggerModule.setup('api', app, document as any);

  await app.listen(3000);
}
bootstrap().catch(console.error);
