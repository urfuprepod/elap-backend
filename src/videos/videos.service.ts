import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(private prismaService: PrismaService) {}

  async getAllVideos() {
    const videos = await this.prismaService.video.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return videos;
  }

  async createVideo(dto: CreateVideoDto) {
    let formattedVideo = dto.videoUrl.includes('preview')
      ? dto.videoUrl
      : dto.videoUrl.replace('view', 'preview');

    const video = await this.prismaService.video.create({
      data: { ...dto, videoUrl: formattedVideo },
    });
    return video;
  }

  async deleteById(id: string) {
    await this.prismaService.video.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
