import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesModule } from 'src/roles/roles.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [RolesModule, EmailsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
