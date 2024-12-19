import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173', // Замените на ваш фронтенд URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Добавьте эту строку для включения credentials
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
