import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet.default());

  app.enableCors(config.security.cors);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.app.name)
    .setDescription('Hierarchical menu management system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.app.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
