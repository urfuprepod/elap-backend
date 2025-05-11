import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  controllers: [TasksController, ],
  providers: [TasksService, PrismaService],
  imports: [UsersModule, RolesModule, CommentModule]
})
export class TasksModule {
  
}
