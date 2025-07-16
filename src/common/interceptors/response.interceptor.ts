import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';

export type Response<T> = {
  statusCode: number;
  data: T;
  timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: unknown) => this.responseHandler(data, context)),
    );
  }

  responseHandler(data: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return {
      statusCode,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      data,
    };
  }
}