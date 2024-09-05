export namespace Login {
  export interface Request {
    /**
     * @format email
     *
     * @type {string}
     * @memberof Request
     */
    email: string;

    /**
     * @minLength 8
     * @maxLength 20
     *
     * @type {string}
     * @memberof Request
     */
    password: string;
  }

  export interface Response {
    data: Data;
  }

  export interface Data extends Token {}

  export interface Token {
    /**
     * 억세스 토큰
     *
     * @type {string}
     * @memberof Token
     */
    assessToken: string;

    /**
     * 리푸레시 토큰
     *
     * @type {string}
     * @memberof Token
     */
    refreshToken: string;
  }
}
