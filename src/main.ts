import { NestiaSwaggerComposer } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import compression from 'compression';
import helmet from 'helmet';
import config from '../nestia.config';
import { TransformInterceptor } from './1-common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors:{
      credentials: true,
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      optionsSuccessStatus: 200,
    }
  });

  /** web server setting */
  app.useBodyParser('json', { limit: '50mb' });
  app.useGlobalInterceptors(app.get(TransformInterceptor));
  // app.useGlobalFilters(app.get(BadRequestExceptionFilter));

  app.use(helmet());
  app.use(compression());
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  /** swagger */
  if (process.env.NODE_ENV === 'development') {
    const document = await NestiaSwaggerComposer.document(app, {
      ...config.swagger,
    });
    SwaggerModule.setup('api', app, document as any, {
      swaggerOptions: {
        showRequestDuration: true,
        // defaultModelsExpandDepth: 10,
        defaultModelExpandDepth: 10,
        filter: true,
        displayRequestDuration: true,
        docExpansion: 'list',
      },
    });
  }

  await app.listen(3_000);
}

bootstrap().catch(console.error);
