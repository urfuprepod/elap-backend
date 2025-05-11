import { Controller, Get, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@CurrentUser('id') userId: number) {
    return this.tasksService.getAllTasks(userId);
    
  }
}
