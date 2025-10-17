import { CallHandler, ExecutionContext, Injectable, NestInterceptor, LoggerService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService = console) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const traceId = (req as any).traceId;
    const userId = (req as any).user?.id;
    const method = req.method;
    const url = req.originalUrl;
    const start = Date.now();
    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          this.logger.log({ traceId, method, url, durationMs: ms, userId });
        },
      }),
    );
  }
}