import typia from 'typia';

export namespace Define {
  export type Password = string &
    typia.tags.Pattern<'^(?=.*[0-9]{1,50})(?=.*[!@#$^&*()]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$'> &
    typia.tags.MinLength<8> &
    typia.tags.MaxLength<50>;

  export type Email = string & typia.tags.Format<'email'> & typia.tags.MinLength<8> & typia.tags.MaxLength<64>;
  export type UserRoles = 'GUEST' | 'USER' | 'ADMIN' | 'MANAGER' | 'SUPER';

  export interface TokenOption {
    /**
     * 토큰 발급자
     *
     * @type {string}
     * @memberof TokenOption
     */
    iss?: string;
    /**
     * 토큰 제목
     *
     * @type {string}
     * @memberof TokenOption
     */
    sub?: string;
    /**
     * 토큰 대상자
     *
     * @type {(string | string[])}
     * @memberof TokenOption
     */
    aud?: string | string[];
    /**
     * 토큰 만료 시간
     *
     * @type {number}
     * @memberof TokenOption
     */
    exp?: number;
    /**
     * 토큰 활성 날짜
     *
     * @type {number}
     * @memberof TokenOption
     */
    nbf?: number;
    /**
     * 토큰 발급 날짜
     *
     * @type {number}
     * @memberof TokenOption
     */
    iat?: number;
    /**
     * 토큰 고유 식별자
     *
     * @type {string}
     * @memberof TokenOption
     */
    jti?: string;
  }

  export interface decodedUserToken extends TokenOption {
    /**
     * 유저 고유키
     *
     * @type {string}
     */
    seq: string;

    /**
     * 유저 아이디
     *
     * @type {Email}
     * @memberof decodedUserToken
     */
    email: Email;

    /**
     * 등급
     *
     * @type {UserRoles}
     * @memberof decodedUserToken
     */
    role: UserRoles;
  }
}
