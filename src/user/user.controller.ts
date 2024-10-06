import { RequestHeaders } from '@app/1-common/header.dto';
import { TypedBody, TypedException } from '@nestia/core';
import { Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import typia from 'typia';
import { DtoProfile } from './dto/profile.dto';
import { UserProfileService } from './user-profile.service';
import { UserService } from './user.service';
import { CustomError } from '@app/1-common/Error.type';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.userService;
    this.userProfileService;
  }

  /**
   * 사용자 정보를 가져옵니다.
   *
   * @summary 사용자 정보를 가져옵니다. - en
   * @tag /user
   * @security apiKey
   *
   * @param {RequestHeaders} headers
   * @return {(Promise<DtoProfile.Response.GetProfile>)}
   * @memberof UserController
   */
  @TypedException<CustomError.BadRequestException>({ status: 404 })
  @Get('/')
  async getUser(@Headers() headers: RequestHeaders): Promise<DtoProfile.Response.GetProfile> {
    let result;

    try {
      const data = await this.userProfileService.getProfile(headers.decodedUserToken?.email || '');
      result = typia.misc.assertClone<DtoProfile.Response.GetProfile>(data);
    } catch (error: any) {
      throw new Error(error);
    }

    return result;
  }

  /**
   * 사용자 정보를 업데이트 합니다.
   *
   * @tag /user
   * @security apiKey
   *
   * @param {DtoProfile.Request.PostProfile} body
   * @return {*}
   * @memberof UserController
   */
  @Patch('/')
  async updateUser(@TypedBody() body: DtoProfile.Request.PostProfile) {
    return 'update profile';
  }

  /**
   * 사용자의 썸네일을 업데이트 합니다.
   * @tag /user
   * @security apiKey
   *
   * @return {*}
   * @memberof UserController
   */
  @Post('/thumbnail')
  async updateThumbnail() {
    return 'update thumbnail';
  }
}
