import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Asegúrate de que esto apunte correctamente

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,               // Convierte los datos al tipo que se espera en el DTO
      whitelist: true,               // Elimina las propiedades no permitidas en el DTO
      forbidNonWhitelisted: true,    // Lanza un error si hay propiedades no permitidas
      disableErrorMessages: false,   // Habilita los mensajes de error detallados
    })
  );
  app.enableCors();
  await app.listen(4000);
}

bootstrap();
