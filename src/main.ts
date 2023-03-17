import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const config = new DocumentBuilder()
  //   .setTitle('ManageProduct')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('Oryza')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);

  const config = new DocumentBuilder()
    .setTitle('Rest API Nestjs')
    .setDescription('Manage Product')
    .setVersion('1.0.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(3000);
}
bootstrap();
