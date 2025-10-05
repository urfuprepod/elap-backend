import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private rolesService: RolesService,
  ) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        mentor: true,
      },
    });
    return user;
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(dto: AuthDto, role?: string) {
    const password = await hash(dto.password);
    const roleModel = await this.rolesService.getRoleByTitle(role || 'USER');
    const login = dto?.login || dto.email.split('@')[0];
    console.log(login, 'jioa')
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password,
        login: 'dolboeb',
        role: {
          connect: {
            id: roleModel.id,
          },
        },
      },
    });

    console.log(role, 'оауоауоау');
    if (!role) {
      const mentorRole = await this.rolesService.getRoleByTitle('MENTOR');
      console.log(mentorRole, 'cherensha');
      if (!!mentorRole) {
        const mentor = await this.prisma.user.findFirst({
          where: { role: { id: mentorRole.id } },
        });
        if (!mentor) return;
        this.prisma.user.update({
          where: { id: user.id },
          data: { mentorId: mentor.id },
        });
      }
    }

    return user;
  }

  async deleteById(id: string) {
    await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async changePassword(dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    const hashedPassword = await hash(dto.newPassword);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  async editUser(id: string, userData: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: +id } });
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.user.update({ where: { id: user.id }, data: userData });
  }

  async findAllMentors() {
    console.log('работаем наж этим');
    const users = await this.prisma.user.findMany({
      where: { role: { title: 'MENTOR' } },
    });
    console.log(users, 'педики');
    return users;
  }

  async findAllStudents() {
    const users = await this.prisma.user.findMany({
      where: { role: { title: 'USER' } },
    });
    return users;
  }

  async findAllUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findAllAdmins() {
    const users = await this.prisma.user.findMany({
      where: { role: { title: 'ADMIN' } },
    });
    return users;
  }

async editPassword(userId: number, password: string) {
  const user = await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password,
    },
  });
  const { password: pass, ...rest } = user;
  return rest;
}

  async changeActivation(userId: string, isActive: boolean) {
    const user = await this.getById(userId);
    throw new NotFoundException('User not found');
    // if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: +userId },
      data: { isActive },
    });
  }
}
