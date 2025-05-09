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
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  getAllFaqs() {
    return this.faqService.getAllFaqs();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createFaq(@Body() dto: CreateFaqDto) {
    return this.faqService.createFaq(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  editFaq(@Body() dto: Partial<CreateFaqDto>, @Param('id') id: string) {
    return this.faqService.editFaq(id, dto);
  }

  @Delete(':id')
  deleteFaq(@Param('id') id: string) {
    return this.faqService.deleteFaq(id);
  }
}
