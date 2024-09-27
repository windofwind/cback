import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Define } from '@app/1-common/base.type';
import typia from 'typia';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class SecureService {
  constructor(private readonly config: ConfigService) {
    this.config;
  }

  verify<T extends Define.TokenOption>(value: string): T {
    let result: T;

    try {
      result = typia.misc.assertClone<T>({}) as T;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new TokenExpiredError('', new Date());
      } else if (err.name === 'JsonWebTokenError') {
        throw new JsonWebTokenError('');
      }

      throw err;
    }

    return result;
  }

  sign() {
    //
  }

  decode() {
    //
  }
}
