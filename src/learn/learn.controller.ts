import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LearnService } from './learn.service';
import { CreateSectiontDto } from './dto/create-section.dto';
import { CreateSubsectiontDto } from './dto/create-subsection.dto';

@Controller('learn')
export class LearnController {
  constructor(private readonly learnService: LearnService) {}

  @Get()
  getAllSections() {
    return this.learnService.getAllSections();
  }

  @Get('tree')
  getLearnTree() {
    return this.learnService.getAllSections(true);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createSection(@Body() dto: CreateSectiontDto) {
    return this.learnService.createSection(dto);
  }

  @Post(':id')
  createSubsection(@Body() dto: CreateSubsectiontDto, @Param('id') id: string) {
    return this.learnService.createSubsectionBySectionId(id, dto);
  }

  @Put(':sectionId/:id')
  @UsePipes(new ValidationPipe())
  editSubsection(
    @Param('id') id: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: Partial<CreateSubsectiontDto>,
  ) {
    return this.learnService.editSubsection(id, sectionId, dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  editSection(
    @Param('id') id: string,
    @Body() dto: Partial<CreateSectiontDto>,
  ) {
    return this.learnService.editSection(id, dto);
  }

  @Get(':id')
  getSubsections(@Param('id') id: string) {
    return this.learnService.getAllSubsectionsBySectionId(id);
  }

  @Delete(':id')
  deleteSection(@Param('id') id: string) {
    return this.learnService.deleteSection(id);
  }

  @Delete(':sectionId/:id')
  deleteSubsection(@Param('id') id: string, @Param('sectionId') sectionId) {
    return this.learnService.deleteSubsection(sectionId, id);
  }
}
