import { Injectable } from '@nestjs/common';
import { PrismaService } from '@storage';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async getProfile(id: string) {
    return {};
  }

  async updateProfile(id: string) {
    return {};
  }

  async updateThumbnail(id: string) {
    return {};
  }
}
