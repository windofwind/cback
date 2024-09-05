import { Controller, Delete, Head, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedBody, TypedHeaders } from '@nestia/core';
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
      result = 'login';
    } catch (e: any) {
      e.message;
      console.info(e);
    }
    return result;
  }

  @Head('/logout')
  async logout(@TypedHeaders() headers: { 'x-custom-header'?: string; authorization?: string }) {
    if (!headers.authorization) {
      throw new Error();
    }
    //
  }

  @Delete('/leave')
  async leave(
    @TypedHeaders() headers: { 'x-custom-header': string },
    @TypedBody() payload: { userId: string; password: string },
  ) {
    return 'login';
  }
}
