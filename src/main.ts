import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response, static as static_ } from 'express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({
    origin: 'http://localhost:3000', // Укажите ваш фронтенд-адрес
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'], // Для доступа браузера к заголовку
    credentials: true, // Для передачи кук и заголовков авторизации
  });


  app.use(function (request: Request, response: Response, next: NextFunction) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With',
    );
    response.setHeader('Content-Disposition', 'attachment');
    next();
  });
  app.use(cookieParser());
  app.use('/static', static_(join(__dirname, '..', 'static')));

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5500, '0.0.0.0');
}
bootstrap();
