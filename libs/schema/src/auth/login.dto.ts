export namespace Login {
  export class Request {
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

  export class Response {
    token: string;
  }
}
