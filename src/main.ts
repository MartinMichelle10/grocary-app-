import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { json } from 'express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TraceMiddleware } from './common/middleware/trace.middleware';
import { createWinstonLogger } from './common/logger/winston.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const logger = createWinstonLogger();
  const app = await NestFactory.create(AppModule, { logger });

  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(json({ limit: '10mb' }));
  app.enableCors({
    origin: (() => {
      const v = process.env.CORS_ALLOWED_ORIGINS ?? '*';
      if (v === '*') return true;
      return v.split(',').map((s) => s.trim());
    })(),
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger), new ResponseInterceptor());

  // trace middleware ensures traceId on req
  app.use(TraceMiddleware);

  const config = new DocumentBuilder()
    .setTitle('grocary app API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
