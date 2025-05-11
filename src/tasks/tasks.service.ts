import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateResponseTaskDto } from './dto/create-response-task.dto';
import { CommentService } from 'src/comment/comment.service';
import { ReworkStatusDto } from './dto/rework-status.dto';

@Injectable()
export class TasksService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private roleService: RolesService,
    private commentService: CommentService,
  ) {}

  async getAllTasks(userId?: number) {
    console.log(String(userId) ?? '10000')
    const user = await this.usersService.getById(userId ? String(userId) : '10000');
    const role = user
      ? await this.roleService.getRoleById(user.roleId)
      : await this.roleService.getRoleByTitle('USER');
    const title = role.title;
    const tasks = await this.prismaService.task.findMany({
      where: user
        ? title === 'MENTOR'
          ? { mentorId: user.id }
          : { userId: user.id }
        : undefined,
    });

    return tasks;
  }

  async createTask(dto: CreateTaskDto, userId: string, files: any[]) {
    await this.prismaService.task.create({
      data: {
        type: dto.type,
        userId: dto.studentId,
        text: dto.text,
        status: 'created',
        mentorId: +userId,
        files: files.map((el: any) => el.filename),
      },
    });
  }

  async deleteTask(id: string) {
    await this.prismaService.task.delete({ where: { id: +id } });
  }

  async addResponseTask(id: string, dto: CreateResponseTaskDto, files?: any[]) {
    const task = await this.prismaService.task.findFirst({
      where: { id: +id },
    });
    if (!task) throw new NotFoundException('Неправильно');
    const comment = await this.commentService.createCommment(
      { taskId: task.id, message: dto.commentText },
      'user',
    );
    const fileNames = (files ?? []).map((el: any) => el.filename);
    const edited = await this.prismaService.task.update({
      where: { id: task.id },
      data: {
        responseText: dto.reponseText,
        files: fileNames,
      },
    });

    return edited;
  }

  async editTask(id: string, dto: Partial<CreateTaskDto>, files?: any[]) {
    const current = await this.prismaService.task.findUnique({
      where: { id: +id },
    });
    if (!current) throw new NotFoundException('Bad Request');
    const filenames = (files ?? []).map((el: any) => el.filename);
    await this.prismaService.task.update({
      where: { id: current.id },
      data: {
        ...dto,
        files: filenames,
      },
    });
  }

  async setTaskStatusRework(taksId: string, dto: ReworkStatusDto, files?: any) {
    const current = await this.prismaService.task.findUnique({
      where: { id: +taksId },
    });
    if (!current) throw new NotFoundException('Bad Request');
    const filenames = (files ?? []).map((el: any) => el.filename);
    const comment = await this.commentService.createCommment(
      { taskId: current.id, files: filenames, message: dto.commentText },
      'mentor',
    );
    await this.prismaService.task.update({
      where: { id: current.id },
      data: {
        status: 'rework',
      },
    });
  }

  async setTaskStatusComplete(
    taksId: string,
    dto: ReworkStatusDto,
    files?: any,
  ) {
    const current = await this.prismaService.task.findUnique({
      where: { id: +taksId },
    });
    if (!current) throw new NotFoundException('Bad Request');
    const filenames = (files ?? []).map((el: any) => el.filename);
    const comment = await this.commentService.createCommment(
      { taskId: current.id, message: dto.commentText, files: filenames },
      'mentor',
    );
    await this.prismaService.task.update({
      where: { id: current.id },
      data: {
        status: 'rework',
      },
    });
  }
}
