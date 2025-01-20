import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { validationOptions } from './common/utils/validation-options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ADDED GLOBAL API PREFIX
  app.setGlobalPrefix('api');

  // GLOBAL VALIDATION PIPE
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // SWAGGER CONFIGURATION
  const config = new DocumentBuilder()
    .setTitle('WEBEZE API')
    .setDescription('SERVER APP API BASE URL : http://localhost:8000')
    .setVersion('1.0')
    .addServer('http://localhost:8000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // APP STARTED ON PORT 8000
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
