import { Injectable } from '@nestjs/common';
import { PrismaService } from '@storage';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async login(payload: { email: string; password: string }) {
    let result;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          ...payload,
        },
      });

      user;

      // TODO: generate token
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      result = {
        seq: user?.seq,
        accessToken,
        refreshToken,
      };
    } catch (e) {
      console.error(e);
    }

    return result;
  }
}
