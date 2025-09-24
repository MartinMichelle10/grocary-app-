import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function TraceMiddleware(req: Request, res: Response, next: NextFunction) {
  const incoming = req.headers['x-trace-id'] as string | undefined;
  const traceId = incoming || randomUUID();
  (req as any).traceId = traceId;
  res.setHeader('X-Trace-Id', traceId);
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // minimal console for visibility; Winston adds structured logs elsewhere
    console.info(`[trace:${traceId}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
}
