import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@storage';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async getProfile(email: string) {
    let result;

    try {
      result = await this.prisma.user.findFirst({
        where: {
          email,
          deletedAt: null,
        },
      });

      if (result === null) {
        // TODO: USER NOT FOUNDED.
        throw new ForbiddenException();
      }

      console.info(result);
    } catch (err) {
      throw new Error();
    }

    return result;
  }

  async updateProfile(id: string) {
    return {};
  }

  async updateThumbnail(id: string) {
    return {};
  }
}
