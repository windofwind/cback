import { RequestHeaders } from '@app/1-common/header.dto';
import { UserProfileService } from '@app/user/user-profile.service';
import { TypedBody, TypedHeaders, TypedParam } from '@nestia/core';
import { Controller, Delete, Get, Head, Headers, Post } from '@nestjs/common';
import typia from 'typia';
import { AuthService } from './auth.service';
import { DtoSignin } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.authService;
    this.userProfileService;
  }

  @Get('/signup')
  async index(@Headers() headers: RequestHeaders) {
    return 'sighup';
  }

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
   * @param {{ 'x-custom-header'?: string }} headers
   * @memberof AuthController
   */
  @Get('/token')
  async getTokens(@Headers() headers: RequestHeaders) {
    //
  }

  /**
   * 로그인된 기기를 삭제합니다. - 토큰을 삭제합니다.
   *
   * @param {{ 'x-custom-header'?: string }} headers
   * @memberof AuthController
   */
  @Delete('/token/:token')
  async tokens(@Headers() headers: RequestHeaders, @TypedParam('token') token: string) {
    //
  }

  /**
   * 로그아웃을 합니다. - 토큰을 삭제합니다.
   *
   * @param {{ 'x-custom-header'?: string; authorization?: string }} headers
   * @memberof AuthController
   */
  @Head('/logout')
  async logout(@TypedHeaders() headers: { 'x-custom-header'?: string; authorization?: string }) {
    if (!headers.authorization) {
      throw new Error();
    }

    // TODO: access token delete
  }

  @Delete('/leave')
  async leave(
    @TypedHeaders() headers: { 'x-custom-header': string },
    @TypedBody() payload: { userId: string; password: string },
  ) {
    return 'login';
  }
}
