import { Injectable } from '@nestjs/common';
import { PrismaService } from '@storage/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async selectUserByUserId(userId: string) {
    // await this.prisma.user;
    //
  }

  async selectUser(userSeq: string) {
    //
  }

  async selectUsers(userIds: string[]) {
    //
  }

  async selectUserBySeq(seq: string) {
    //
  }
}
