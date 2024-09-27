import { Injectable } from '@nestjs/common';
import { PrismaService } from '@storage';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        seq: id,
        deletedAt: null,
      },
    });

    return user;
  }

  async updateProfile(id: string) {
    return {};
  }

  async updateThumbnail(id: string) {
    return {};
  }
}
