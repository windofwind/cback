import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService;
  }

  @Get('/')
  async getUser() {
    return 'user';
  }
}
