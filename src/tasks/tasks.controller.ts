import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateResponseTaskDto } from './dto/create-response-task.dto';
import { ReworkStatusDto } from './dto/rework-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(@CurrentUser('id') userId: number) {
    return this.tasksService.getAllTasks(userId);
  }

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('taskFiles', 1, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const now = new Date();
          const datePath = `${now.getFullYear()}-${(now.getMonth() + 1)
            .toString()
            .padStart(
              2,
              '0',
            )}-${now.getDate().toString().padStart(2, '0')}/${now
            .getHours()
            .toString()
            .padStart(2, '0')}`;
          const fullPath = `./static/tasks/${datePath}`;

          const fs = require('fs');
          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
          }

          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = decodeURIComponent(escape(file.originalname));
          cb(null, originalName);
        },
      }),
    }),
  )
  createTask(
    @Body() dto: CreateTaskDto,
    @CurrentUser('id') userId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.tasksService.createTask(dto, userId, files);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @HttpCode(200)
  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('taskFiles', 4, {
      storage: diskStorage({
        destination: './static/tasks',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  editTask(
    @Param('id') id: string,
    @Body() dto: CreateTaskDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.tasksService.editTask(id, dto, files);
  }

  @HttpCode(200)
  @Post(':id/response')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FilesInterceptor('responseFiles', 4, {
      storage: diskStorage({
        destination: './static/tasks',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  createResponse(
    @Param('id') id: string,
    @Body() dto: CreateResponseTaskDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.tasksService.addResponseTask(id, dto, files);
  }

  @HttpCode(200)
  @Post(':id/rework')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FilesInterceptor('commentFiles', 4, {
      storage: diskStorage({
        destination: './static/tasks',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  setRework(
    @Param('id') id: string,
    @Body() dto: ReworkStatusDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.tasksService.setTaskStatusRework(id, dto, files);
  }

  @HttpCode(200)
  @Post(':id/complete')
  @UseInterceptors(
    FilesInterceptor('commentFiles', 4, {
      storage: diskStorage({
        destination: './static/tasks',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  setComplete(
    @Param('id') id: string,
    @Body() dto: ReworkStatusDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.tasksService.setTaskStatusComplete(id, dto, files);
  }
}
