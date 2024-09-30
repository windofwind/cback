import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import jwt, { Algorithm, JsonWebTokenError, SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { Define } from '@app/1-common/base.type';


@Injectable()
export class SecureService {
  constructor(private readonly config: ConfigService) {}

  private privateKey: string;
  private publicKey: string;

  sign<T extends object>(payload: T, options: SignOptions): string {
    const result = jwt.sign(payload, this.privateKey, {
      ...options,
      algorithm: options.algorithm || this.config.get<Algorithm>('JWT_ALGORITHM'),
      issuer: options.issuer || this.config.get<string>('JWT_ISSUER'),
      subject: options.subject || this.config.get<string>('JWT_SUBJECT'),
    });

    return result;
  }

  verify<T extends Define.TokenOption>(value: string): T {
    let result;

    try {
      const verifyData = jwt.verify(value, this.publicKey, {
        complete: true,
      });
      result = verifyData.payload;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new TokenExpiredError('', new Date());
      } else if (err.name === 'JsonWebTokenError') {
        throw new JsonWebTokenError('');
      }

      throw err;
    }

    return result as T;
  }

  decode<T>(value: string): T {
    const payload = jwt.decode(value, { complete: true });
    const result = payload?.payload;
    return result as T;
  }
}
