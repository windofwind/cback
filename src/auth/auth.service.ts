import { Injectable } from '@nestjs/common';
import { PrismaService } from '@storage';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
    this.prisma;
  }

  async login(payload: { userId: string; password: string }) {
    //
  }
}
