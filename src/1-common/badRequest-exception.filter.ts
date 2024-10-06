import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import dayjs from 'dayjs';
import typia from 'typia';
import { CustomError } from './error.type';

/**
 * controller arguments validation 에 의한 에러가 여기로 온다.
 *
 * @export
 * @class BadRequestExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  async catch(exception: any & { name: string; status: number; response: typia.TypeGuardError }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const startTime = dayjs().valueOf();

    res.status(exception.status).send(
      typia.misc.assertClone<CustomError.ResposeError>({
        startTime,
        error_code: '404',
        error_msg: exception.response.message || '',
      }),
    );
  }
}
