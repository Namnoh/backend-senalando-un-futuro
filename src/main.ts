import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,               
      whitelist: true,               
      forbidNonWhitelisted: true,    
      disableErrorMessages: false,   
    })
  );
  app.enableCors();
  await app.listen(4000);
}

bootstrap();
