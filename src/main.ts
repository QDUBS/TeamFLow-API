import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(csurf());
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'https://team-flow-one.vercel.app'],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // });
  app.use(
    session({
      secret: `${process.env.JWT}`,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true }, // Set to true if using HTTPS
    }),
  );
  app.use(csurf());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
