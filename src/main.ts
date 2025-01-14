import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { validationOptions } from './common/utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ADDED GLOBAL API PREFIX
  app.setGlobalPrefix('api');

  // GLOBAL VALIDATION PIPE
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // APP STARTED ON PORT 8000
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
