import { Define } from "./base.type";

export interface RequestHeaders {
  /**
   * JWT 토큰
   *
   * @hidden
   * @type {string}
   * @memberof Headers
   */
  authorization?: string;

  /**
   * 유저 에이전트
   * @hidden
   *
   * @type {string}
   * @memberof Headers
   * @default swagger
   */
  'user-agent': string;

  /**
   * 디코드된 유저 정보
   * @hidden
   *
   * @type {Define.decodedUserToken | any}
   * @memberof RequestHeaders
   */
  decodedUserToken?: Define.decodedUserToken | any;
}
