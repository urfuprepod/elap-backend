import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
  imports: [UserModule]
})
export class MessagesModule {}
