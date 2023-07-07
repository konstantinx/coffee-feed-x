import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyCookie);
  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory(errors) {
        return new BadRequestException({
          meta: this.flattenValidationErrors(errors),
        });
      },
    })
  );

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  app.setGlobalPrefix(appConfig.globalApiPrefix);

  const port = appConfig.port;
  await app.listen(port, '0.0.0.0');

  Logger.log(`Application is running on port ${port}`);
}

bootstrap();
