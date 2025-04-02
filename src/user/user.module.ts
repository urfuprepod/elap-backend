import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [RolesModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, RolesService],
  exports: [UserService]
})
export class UserModule {}
