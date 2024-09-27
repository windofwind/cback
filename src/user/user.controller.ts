import { Controller, Get, Patch, Post, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedBody } from '@nestia/core';
import { UserProfileService } from './user-profile.service';
import typia from 'typia';
import { DtoProfile } from './dto/profile.dto';
import { RequestHeaders } from '@app/1-common/header.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {
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
  @UseGuards()
  @Get('/')
  async getUser(@Headers() headers: RequestHeaders) {
    let result;

    try {
      result = typia.misc.assertClone<DtoProfile.Response.GetProfile>(await this.userProfileService.getProfile(''));
    } catch (error: any) {
      throw new Error(error);
    }

    return result;
  }

  /**
   * 사용자 정보를 업데이트 합니다.
   *
   * @return {*}
   * @memberof UserController
   */
  @Patch('/')
  async updateUser(@TypedBody() body: DtoProfile.Request.PostProfile) {
    return 'update profile';
  }

  @Post('/thumbnail')
  async updateThumbnail() {
    return 'update thumbnail';
  }
}
