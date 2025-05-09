import { Module } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AdvertismentController],
  providers: [AdvertismentService, PrismaService],
})
export class AdvertismentModule {}
