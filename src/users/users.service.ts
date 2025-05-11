import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAllMentors() {
    console.log('работаем наж этим');
    const users = await this.prismaService.user.findMany({
      where: { role: { title: 'MENTOR' } },
    });
    console.log(users, 'педики');
    return users;
  }
}
