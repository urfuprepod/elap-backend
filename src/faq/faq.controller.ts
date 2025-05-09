import { Controller, Get } from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  getAllFaqs() {
    return this.faqService.getAllFaqs();
  }
}
