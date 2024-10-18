import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Asegúrate de que esto apunte correctamente

async function bootstrap() {
  console.log("Iniciando la aplicación...");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
  console.log("Aplicación escuchando en http://localhost:4000");
}

bootstrap();
