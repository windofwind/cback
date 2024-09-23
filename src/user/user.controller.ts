import { Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedHeaders } from '@nestia/core';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService;
  }

  /**
   * 사용자 정보를 가져옵니다.
   *
   * @secure true
   *
   * @return {*}
   * @memberof UserController
   */
  @Get('/')
  async getUser(@TypedHeaders() headers: { 'x-custom-header'?: string; authorization?: string }) {
    return 'get profile';
  }

  /**
   * 사용자 정보를 업데이트 합니다.
   *
   * @return {*}
   * @memberof UserController
   */
  @Patch('/')
  async updateUser() {
    return 'update profile';
  }

  @Post('/thumbnail')
  async updateThumbnail() {
    return 'update thumbnail';
  }
}
