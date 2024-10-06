import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export namespace CustomError {
  export interface ResposeError {
    /**
     * error status
     *
     * @memberof ResposeError
     */
    status: number;
  }

  export class Base extends Error implements ResposeError {
    /**
     * @memberof Base
     */
    status: number;

    /**
     * @hidden
     */
    name: string;
    /**
     * @hidden
     */
    stack: string;
  }

  export class Unauthorized extends Base {
    status: 401;
    message: 'Bad Request';
  }

  export class ForbiddenException extends Base {
    status: 403;
    message: 'Forbidden';
  }

  export class BadRequestException extends Base {
    status: 404;
    message: 'Bad Request';
  }

  export class Conflict extends Base {
    status: 409;
    message: 'Conflict';
  }

  export const DatabaseError = (err: PrismaClientKnownRequestError) => {
    switch (err.code) {
      case 'P2000':
        throw new Conflict();
      case 'P2001':
        break;
      case 'P2003':
      case 'P2025':
        throw new BadRequestException();
      case 'P2004':
        break;
      default:
        throw new Base();
    }
  };
}
