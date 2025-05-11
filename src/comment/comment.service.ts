import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async getCommentsByTaskId(taskId: string) {
    const comments = await this.prismaService.comment.findMany({
      where: { taskId: +taskId },
    });
    return comments;
  }

  async deleteComment(id: string) {
    await this.prismaService.comment.delete({ where: { id: +id } });
  }

  async createCommment(dto: CreateCommentDto, maintainerUserType: string) {
    const comment = await this.prismaService.comment.create({
      data: {
        taskId: dto.taskId,
        message: dto.message,
        maintainerUserType: maintainerUserType,
        files: dto.files
        // Task: {connect: {id: dto.t}}
      },
    });

    return comment;
  }

  async editComment(dto: Partial<CreateCommentDto>, id: string) {
    const comment = await this.prismaService.comment.update({
      where: { id: +id },
      data: { ...dto },
    });
    return comment;
  }
}
