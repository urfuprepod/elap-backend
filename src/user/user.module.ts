import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [RolesModule]
})
export class UserModule {}
