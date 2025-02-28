import { Module } from '@nestjs/common';
import { ResetPasswordRequestsService } from './reset-password-requests.service';
import { ResetPasswordRequestsController } from './reset-password-requests.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ResetPasswordRequestsController],
  providers: [ResetPasswordRequestsService, PrismaService],
  imports: [UserModule]
})
export class ResetPasswordRequestsModule {}
