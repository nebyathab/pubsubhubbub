import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RawBodyMiddleware } from './raw-body-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new RawBodyMiddleware().use);
  
  await app.listen(3000);
}
bootstrap();
