import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ResetPasswordRequestsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async createPasswordRequest(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const resetPasswordRequest =
      await this.prismaService.resetPasswordRequest.create({
        data: {
          user: {
            connect: {
              email,
            },
          },
        },
      });
    return resetPasswordRequest;
  }

  async getById(id: string) {
    const resetPasswordRequest =
      await this.prismaService.resetPasswordRequest.findUnique({
        where: {
          id: Number(id),
        },
      });
    return resetPasswordRequest;
  }

  async validatePasswordRequest(id: string): Promise<boolean> {
    const currentRequest = await this.getById(id);
    if (!currentRequest) return false;
    return currentRequest.isActive;
  }
}
