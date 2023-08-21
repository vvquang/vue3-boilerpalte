import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { Reflector } from '@nestjs/core';

import { ResponseDto } from '@/common/dtos/response.dto';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  // constructor(private reflector: Reflector) {}

  /**
   * Intercept the request and add the timestamp
   * @param context {ExecutionContext}
   * @param next {CallHandler}
   * @returns { payload:Response<T>, timestamp: string }
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true, // TODO
          statusCode: context.switchToHttp().getResponse().statusCode,
          result: {
            data: data,
          },
          error:
            // TODO: get error messages
            // this.reflector.get<string>(
            //   'response_message',
            //   context.getHandler(),
            // ) ||
            data.message || '',
        };
      }),
    );
  }
}
