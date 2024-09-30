import { RequestHeaders } from '@app/1-common/header.dto';
import { UserProfileService } from '@app/user/user-profile.service';
import { TypedBody, TypedParam } from '@nestia/core';
import { Controller, Delete, Get, Headers, Post } from '@nestjs/common';
import typia from 'typia';
import { AuthService } from './auth.service';
import { DtoSignin } from './dto/signin.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.authService;
    this.userProfileService;
  }

  /**
   * 회원가입
   * 
   * @tag /auth
   *
   * @param {RequestHeaders} headers
   * @return {*}  {Promise<string>}
   * @memberof AuthController
   */
  @Get('/signup')
  async signup(@Headers() headers: RequestHeaders): Promise<string> {
    return 'sighup';
  }

  /**
   * 회원 로그인 
   * 
   * @tag /auth
   *
   * @param {RequestHeaders} headers
   * @param {DtoSignin.Request.PostSignin} payload
   * @return {*}  {Promise<DtoSignin.Response.PostSignin>}
   * @memberof AuthController
   */
  @Post('/signin')
  async login(
    @Headers() headers: RequestHeaders,
    @TypedBody() payload: DtoSignin.Request.PostSignin,
  ): Promise<DtoSignin.Response.PostSignin> {
    let result;

    try {
      //** TODO: 로그인 로직 구현 */
      // const userInfo = await this.authService.login(payload);

      // TODO: 프로필 가져오기
      // const profile = {};
      result = 'login';

      result = typia.misc.assertClone<DtoSignin.Response.PostSignin>({
        data: {
          auth: {
            accessToken: '',
            refreshToken: '',
          },
          profile: {},
        },
      });
    } catch (e: any) {
      e.message;
      console.info(e);
      throw e;
    }
    return result;
  }


  /**
   * 로그인 처리된 기기를 가져옵니다. - 발행된 토큰 목록을 가져옵니다.
   * 
   * @tag /auth
   * @security apiKey
   *
   * @param {RequestHeaders} headers
   * @return {Promise<string>}
   * @memberof AuthController
   */
  @Get('/token')
  async getTokens(@Headers() headers: RequestHeaders): Promise<string> {
    return "getTokens";
  }

  /**
   * 로그인된 기기를 삭제합니다. - 토큰을 삭제합니다.
   * 
   * @tag /auth
   * @security apiKey
   *
   * @param {RequestHeaders} headers
   * @param {string} token
   * @return {Promise<string>}
   * @memberof AuthController
   */
  @Delete('/token/:token')
  async deleteTokens(@Headers() headers: RequestHeaders, @TypedParam('token') token: string): Promise<string> {
    return "deleteTokens"
  }

  /**
   * 로그아웃을 합니다. - 토큰을 삭제합니다.
   * 
   * @tag /auth
   * @security apiKey
   * 
   * @param {RequestHeaders} headers
   * @return {Promise<string>}
   * @memberof AuthController
   */
  @Post('/logout')
  async logout(@Headers() headers: RequestHeaders): Promise<string> {
    // if (!headers.authorization) {
    //   throw new Error();
    // }

    return "logout";
  }

  
  /**
   * 탈퇴 
   * 
   * @tag /auth
   * @security apiKey
   *
   * @param {RequestHeaders} headers
   * @param {{ userId: string; password: string }} payload
   * @return {Promise<string>}
   * @memberof AuthController
   */
  @Delete('/leave')
  async leave(
    @Headers() headers: RequestHeaders,
    @TypedBody() payload: { userId: string; password: string },
  ): Promise<string> {
    return 'login';
  }
}
