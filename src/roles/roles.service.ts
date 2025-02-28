import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(title: string) {
    const roleExists = await this.prismaService.role.findFirst({
      where: { title },
    });
    if (roleExists) {
      throw new BadRequestException('role already in use');
    }
    const role = await this.prismaService.role.create({ data: { title } });
    return role;
  }

  async getRoleByTitle(title: string) {
    const role = await this.prismaService.role.findFirst({
      where: { title },
    });
    if (!role) {
      throw new BadRequestException('role not found');
    }
    return role;
  }
}
