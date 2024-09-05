import { Controller, Delete, Get, Head, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedBody, TypedHeaders, TypedParam } from '@nestia/core';
import { Login } from '../../libs/schema/src/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService;
  }

  @Post('/login')
  async login(@TypedHeaders() headers: { 'x-custom-header'?: string }, @TypedBody() payload: Login.Request) {
    let result;

    try {
      // TODO: 로그인 로직 구현
      const data = await this.authService.login(payload);
      data;
      // TODO: 프로필 가져오기

      result = 'login';
    } catch (e: any) {
      e.message;
      console.info(e);
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
  async getTokens(@TypedHeaders() headers: { 'x-custom-header'?: string }) {
    //
  }

  /**
   * 로그인된 기기를 삭제합니다. - 토큰을 삭제합니다.
   *
   * @param {{ 'x-custom-header'?: string }} headers
   * @memberof AuthController
   */
  @Delete('/token/:token')
  async tokens(@TypedHeaders() headers: { 'x-custom-header'?: string }, @TypedParam('token') token: string) {
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
