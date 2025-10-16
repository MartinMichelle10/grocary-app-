import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  LoggerService,
} from '@nestjs/common'; // import NestJS types used for creating an interceptor and logging
import { Observable } from 'rxjs'; // import Observable type from RxJS for return type
import { tap } from 'rxjs/operators'; // import tap operator to run side-effects on the response stream

@Injectable() // mark the class as injectable so Nest can instantiate it via DI
export class LoggingInterceptor implements NestInterceptor { // interceptor class implementing NestInterceptor
  constructor(private readonly logger: LoggerService = console) {} // inject a logger (defaults to console) for logging messages
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> { // intercept method called for each request, returns an Observable
    const req = context.switchToHttp().getRequest(); // get the HTTP request object from the execution context
    const traceId = (req as any).traceId; // extract a traceId from the request (if present) for correlating logs
    const userId = (req as any).user?.id; // extract the authenticated user's id (optional chaining in case user is absent)
    const method = req.method; // read the HTTP method (GET, POST, etc.)
    const url = req.originalUrl; // read the original request URL
    const start = Date.now(); // capture the start time to compute request duration
    // After the controller finishes, process the result stream using these operators
    return next.handle().pipe( // forward the call to the next handler and attach RxJS operators
      tap({ // tap allows running side-effects without modifying the stream
        next: () => { // when the response is emitted, run this side-effect
          const ms = Date.now() - start; // compute the elapsed time in milliseconds
          this.logger.log({ traceId, method, url, durationMs: ms, userId }); // log a structured message with timing and identifiers
        }, // end of next handler
      }), // end of tap operator
    ); // end of pipe and return Observable
  } // end of intercept method
} // end of LoggingInterceptor class
