import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSectiontDto } from './dto/create-section.dto';
import { CreateSubsectiontDto } from './dto/create-subsection.dto';
import { ISubsectionData } from './dto/create-subsection-content.dto';
import { Exception } from 'handlebars';

@Injectable()
export class LearnService {
  constructor(private prismaService: PrismaService) {}

  async getAllSections(withSubsection?: boolean) {
    const sections = await this.prismaService.section.findMany({
      include: { subsections: !!withSubsection },
    });
    return sections;
  }

  async createSection(dto: CreateSectiontDto) {
    return await this.prismaService.section.create({ data: dto });
  }

  async editSection(id: string, dto: Partial<CreateSectiontDto>) {
    await this.prismaService.section.update({
      where: { id: +id },
      data: {
        ...dto,
      },
    });
  }

  async deleteSection(id: string) {
    await this.prismaService.section.delete({ where: { id: +id } });
  }

  async getAllSubsectionsBySectionId(id: string) {
    const subsections = await this.prismaService.subsection.findMany({
      where: { sectionId: +id },
    });
    return subsections;
  }

  async createSubsectionBySectionId(
    sectionId: string,
    dto: CreateSubsectiontDto,
  ) {
    const subsection = await this.prismaService.subsection.create({
      data: { text: dto.text, section: { connect: { id: +sectionId } } },
    });
    return subsection;
  }

  async editSubsection(
    subsectionId: string,
    sectionId: string,
    dto: Partial<CreateSectiontDto>,
  ) {
    console.log(+subsectionId, sectionId, 'ctrc');
    const subsection = await this.prismaService.subsection.update({
      where: { id: +subsectionId, sectionId: +sectionId },
      data: {
        ...dto,
      },
    });

    return subsection;
  }

  async deleteSubsection(sectionId: string, subsectionId: string) {
    await this.prismaService.subsection.delete({
      where: { id: +subsectionId, sectionId: +sectionId },
    });
  }

  async getAllSubsectionContent(sectionId: string, subsectionId: string) {
    const contents = await this.prismaService.subsectionContent.findMany({
      where: {
        subsection: {
          id: +subsectionId,
          sectionId: +sectionId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    return contents;
  }

  async createSubsectionContent(subsectionId: string, dto: ISubsectionData[]) {
    const obj = dto?.[0];
    if (!obj) throw new BadRequestException('Неправильно');
    const data: any = {};
    if ('url' in obj.data) {
      data.url = obj.data.url;
    }
    if ('videoUrl' in obj.data) {
      data.url = obj.data.videoUrl;
      data.title = obj.data.title;
      data.videoPreviewImgUrl = obj.data.videoPreviewImgUrl;
      data.videoDuration = obj.data.videoDuration;
      data.videoUrl = obj.data.videoUrl;
    }
    if ('data' in obj.data) {
      data.data = obj.data.data;
    }
    const subsectionContent = await this.prismaService.subsectionContent.create(
      {
        data: {
          subsection_id: +subsectionId,
          data: JSON.stringify(data),
          type: obj.type,
        },
      },
    );

    return subsectionContent;
  }

  async deleteSubsectionContent(
    id: string,
    sectionId: string,
    subsectionId: string,
  ) {
    await this.prismaService.subsectionContent.delete({
      where: {
        id: +id,
        subsection: { sectionId: +sectionId, id: +subsectionId },
      },
    });
  }

  async editSubsectionContent(
    sectionId: string,
    subsectionId: string,
    id: string,
    dto: ISubsectionData,
  ) {
    const obj = dto;
    if (!obj) throw new BadRequestException('Неправильно');
    const data: any = {};
    if ('url' in obj.data) {
      data.url = obj.data.url;
    }
    if ('videoUrl' in obj.data) {
      data.url = obj.data.videoUrl;
      data.title = obj.data.title;
      data.videoPreviewImgUrl = obj.data.videoPreviewImgUrl;
      data.videoDuration = obj.data.videoDuration;
      data.videoUrl = obj.data.videoUrl;
    }
    if ('data' in obj.data) {
      data.data = obj.data.data;
    }
    const content = await this.prismaService.subsectionContent.update({
      where: {
        id: +id,
        subsection: { sectionId: +sectionId, id: +subsectionId },
      },
      data: { type: obj.type, data: JSON.stringify(data) },
    });

    return content;
  }
}
