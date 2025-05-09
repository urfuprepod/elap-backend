import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSectiontDto } from './dto/create-section.dto';
import { CreateSubsectiontDto } from './dto/create-subsection.dto';

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

  async editSubsection(subsectionId: string, sectionId: string, dto: Partial<CreateSectiontDto>) {
    console.log( +subsectionId, sectionId, 'ctrc')
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
}
