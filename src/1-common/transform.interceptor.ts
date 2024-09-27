import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import typia from 'typia';
import { Define } from './base.type';

export interface Response<T> {
  data: T;
}

export const guestToken: Define.decodedUserToken = {
  seq: '01HHRYQ90ZJ3Q7WBHPXRK56H3F',
  email: 'guest@localhost.com',
  role: 'GUEST',
};

/**
 * default interceptor
 *
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor<T, Promise<Response<T>>>}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Promise<Response<T>>> {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Promise<Response<T>>> {
    const request = context.switchToHttp().getRequest();

    const headers = request.headers as unknown as any;

    request.headers.decodedUserToken = headers.decodedUserToken = this.getUserInfoFromHeader(headers.authorization);

    return next.handle().pipe(
      map(async (data) => {
        return data;
      }),
    );
  }

  /**
   * Decompose the JWT here and insert it into the header.
   *
   * @param {string} [token]
   * @return {*}
   * @memberof TransformInterceptor
   */
  getUserInfoFromHeader(token?: string) {
    let result;
    if (!token) {
      result = typia.misc.assertClone<Define.decodedUserToken>({
        ...guestToken,
        uss: this.config.get<string>('JWT_ISSUER'),
        jti: 'A',
      });
    }

    return result;
  }
}
