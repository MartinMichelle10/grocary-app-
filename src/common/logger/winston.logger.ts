import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export function createWinstonLogger(): LoggerService {
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
      level: 'info',
      format: winston.format.json(),
    }),
  ];

  const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'grocary-app' },
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports,
  });

  return {
    log: (message: any, ...meta: any[]) => logger.info(message, ...meta),
    error: (message: any, ...meta: any[]) => logger.error(message, ...meta),
    warn: (message: any, ...meta: any[]) => logger.warn(message, ...meta),
    debug: (message: any, ...meta: any[]) => logger.debug(message, ...meta),
    verbose: (message: any, ...meta: any[]) => logger.verbose(message, ...meta),
    info: (message: any, ...meta: any[]) => logger.info(message, ...meta),
  } as LoggerService;
}
