import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketAdaptor } from '@nestia/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await WebSocketAdaptor.upgrade(app);
  await app.listen(3000);
}
bootstrap();
