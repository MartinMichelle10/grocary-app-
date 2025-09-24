import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService = console) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const traceId = (req as any).traceId;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: any = { message: 'Internal server error' };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseBody = exception.getResponse();
    }

    this.logger.error('HTTP Error', { traceId, path: req.originalUrl, exception: responseBody });

    res.status(status).json({
      success: false,
      error: {
        message: (responseBody as any)?.message || responseBody || 'Unexpected error',
        details: (responseBody as any)?.error || null,
      },
    });
  }
}
