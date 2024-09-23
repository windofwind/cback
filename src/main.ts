import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { NestExpressApplication } from '@nestjs/platform-express';

import config from '../nestia.config';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });

  app.use(
    helmet({
      hidePoweredBy: false,
    }),
  );

  app.use(compression());
  app.disable('x-powered-by');

  // Swagger
  if (process.env.NODE_ENV === 'development') {
    const document = await NestiaSwaggerComposer.document(app, {
      ...config.swagger,
    });
    SwaggerModule.setup('api', app, document as any, {
      swaggerOptions: {
        showRequestDuration: true,
        // defaultModelsExpandDepth: 10,
        // defaultModelExpandDepth: 10,
        filter: true,
        displayRequestDuration: true,
        docExpansion: 'list',
      },
    });
  }

  await app.listen(3_000);
}

bootstrap().catch(console.error);
