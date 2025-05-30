import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessagesService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getAllMessagesByUserId(userId: string, isMentor = false) {
    const messages = await this.prismaService.message.findMany({
      where: isMentor ? { mentorId: +userId } : { studentId: +userId },
      orderBy: { createdAt: 'desc' },
    });
    return messages;
  }

  async createMessage(userId: string, dto: CreateMessageDto) {
    const current = await this.userService.getById(userId);
    if (!current) throw new NotFoundException('Пользователь не найден');

    const mentorId = current.mentorId;

    const comment = await this.prismaService.message.create({
      data: {
        studentId: +userId,
        theme: dto.theme,
        mentorId,
        status: 'Создан',
        question: dto.question,
        response: '',
        responseFiles: [],
        questionFiles: dto.questionFiles ?? [],
      },
    });

    return comment;
  }

  async createResponseForMessage(messageId: string, dto: CreateResponseDto) {
    await this.prismaService.message.update({
      where: { id: +messageId },
      data: { ...dto, status: 'Ответ готов' },
    });
  }

  async changeMessageStatus(messageId: string) {
    await this.prismaService.message.update({
      where: { id: +messageId },
      data: { status: 'В работе' },
    });
  }
}
