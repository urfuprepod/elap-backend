import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { RolesService } from 'src/roles/roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private rolesService: RolesService,
    private prismaService: PrismaService,
  ) {}

  async findAllMentors() {
    const users = await this.prismaService.user.findMany({
      where: { role: { title: 'MENTOR' } },
    });
    return users;
  }

  async findAllStudents() {
    const role = await this.prismaService.role.findFirst({
      where: { title: 'USER' },
    });
    if (!role) throw new NotFoundException('Bad');
    const users = await this.prismaService.user.findMany({
      where: { role: { id: role.id } },
      include: {
        mentor: true,
      },
    });
    return users;
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: +id,
      },
    });

    return user;
  }

  async create(dto: AuthDto, role?: string) {
    const password = await hash(dto?.password ?? '1234567890');
    const roleModel = await this.rolesService.getRoleByTitle(role || 'USER');
    const login = dto?.login || dto.email.split('@')[0];
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password,
        login,
        mentorRole: dto?.mentorRole ?? null,
        role: {
          connect: {
            id: roleModel.id,
          },
        },
      },
    });

    if (!role) {
      const mentorRole = await this.rolesService.getRoleByTitle('MENTOR');
      console.log(mentorRole, 'cherensha');
      if (!!mentorRole) {
        const mentor = await this.prismaService.user.findFirst({
          where: { role: { id: mentorRole.id } },
        });
        console.log('а где ментор', mentor)
        if (!mentor) return;
        await this.prismaService.user.update({
          where: { id: user.id },
          data: { mentorId: mentor.id },
        });
      }
    }

    return user;
  }

  async editPassword(newPasswordDto: ChangePasswordDto) {
    const user = await this.prismaService.user.update({
      where: {
        email: newPasswordDto.email,
      },
      data: {
        password: newPasswordDto.newPassword,
      },
    });
    const { password: pass, ...rest } = user;
    return rest;
  }

  async editUser(id: string, userData: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: +id },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.prismaService.user.update({
      where: { id: user.id },
      data: userData,
    });
  }

  async changeActivation(userId: string, isActive: boolean) {
    const user = await this.getById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.prismaService.user.update({
      where: { id: +userId },
      data: { isActive },
    });
  }

  async deleteById(id: string) {
    await this.prismaService.user.delete({
      where: {
        id: +id,
      },
    });
  }
}
