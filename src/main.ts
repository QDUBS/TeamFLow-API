import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: ['http://localhost:3000', 'https://team-flow-one.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    });

    const port = process.env.PORT || 5000;
    await app.listen(port, '0.0.0.0');
    console.log(
      `Application running on port ${port}`,
    );
  } catch (error) {
    console.error('Application startup error:', error);
  }
}
bootstrap();
