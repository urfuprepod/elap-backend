import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdvertismentDto } from './dto/create-advertisment-dto';

@Injectable()
export class AdvertismentService {
  constructor(private prismaService: PrismaService) {}

  async getAllAdvertisments() {
    const advertisements = await this.prismaService.advertisement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return advertisements;
  }

  async getLastAdvertisments() {
    const advertisements = await this.prismaService.advertisement.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    return advertisements;
  }

  async createAdvertisment(dto: CreateAdvertismentDto, files: any) {
    await this.prismaService.advertisement.create({
      data: {
        title: dto.title,
        text: dto.text,
        files: files.map((el: any) => el.originalname),
      },
    });
  }

  async deleteAdvertisment(id: string) {
    await this.prismaService.advertisement.delete({
      where: {
        id: +id,
      },
    });
  }

  async updateAdvertisment(
    id: string,
    dto: Partial<CreateAdvertismentDto>,
    files: any,
  ) {
    const current = await this.prismaService.advertisement.findFirst({
      where: { id: +id },
    });
    if (!current) {
      throw new BadRequestException('Объявления не существует');
    }

    await this.prismaService.advertisement.update({
      where: { id: current.id },
      data: {
        title: dto?.title || current?.title,
        text: dto?.text || current?.text,
        files: files?.length ? files.map((el: any) => el.filename) : [],
      },
    });
  }
}
