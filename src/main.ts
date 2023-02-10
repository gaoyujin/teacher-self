import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ---------------- Swagger的初始化配置 ---------------
  // 这些信息后续时通过配置文件动态读取和配置的
  const options = new DocumentBuilder()
    .setTitle('Hello example')
    .setDescription('The hello API description')
    .setVersion('1.0')
    .addTag('hello')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // ---------------- Swagger的初始化配置 ---------------

  await app.listen(3000);
}
bootstrap();
