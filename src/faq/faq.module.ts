import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FaqController],
  providers: [FaqService, PrismaService],
})
export class FaqModule {}
