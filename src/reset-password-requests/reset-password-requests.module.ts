import { Module } from '@nestjs/common';
import { ResetPasswordRequestsService } from './reset-password-requests.service';
import { ResetPasswordRequestsController } from './reset-password-requests.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ResetPasswordRequestsController],
  providers: [ResetPasswordRequestsService, PrismaService, UserService],
  imports: [UserModule]
})
export class ResetPasswordRequestsModule {}
