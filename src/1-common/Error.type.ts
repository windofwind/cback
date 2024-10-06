import typia from 'typia';

export namespace CustomError {
  export interface ResposeError {
    /**
     * error status
     *
     * @type {(string & typia.tags.MinLength<3> & typia.tags.MaxLength<4>)}
     * @memberof ResposeError
     */
    error_code: string & typia.tags.MinLength<3> & typia.tags.MaxLength<4>;
    error_msg: string;
  }

  export interface BadRequestException extends ResposeError {
    error_code: '404';
    error_msg: 'BadRequest';
  }
}
