import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';

@Injectable()
export class FaqService {
  constructor(private prismaService: PrismaService) {}

  async getAllFaqs() {
    const faqs = await this.prismaService.fAQ.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return faqs;
  }

  async createFaq(dto: CreateFaqDto) {
    const faq = await this.prismaService.fAQ.create({
      data: dto,
    });

    return faq;
  }

  async editFaq(id: string, dto: Partial<CreateFaqDto>) {
    const faq = await this.prismaService.fAQ.update({
      where: {id: +id},
      data: {...dto},
      
    });
    return faq;
  }

  async deleteFaq(id: string) {
    await this.prismaService.fAQ.delete({where: {id: +id}})
  }
}
