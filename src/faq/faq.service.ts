import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FaqService {
  constructor(private prismaService: PrismaService) {}

  async getAllFaqs() {
    const faqs = await this.prismaService.fAQ.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return faqs;
  }
}
