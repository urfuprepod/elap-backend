import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateResponseDto } from './dto/create-response.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getMessages(@CurrentUser('id') userId: string) {
    return this.messagesService.getAllMessagesByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('questionFiles', 1, {
      storage: diskStorage({
        destination: './static/messages',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @Post('/')
  @UsePipes(new ValidationPipe())
  createMessage(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateMessageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.messagesService.createMessage(userId, dto, files);
  }

  @Post('/update/:id')
  changeMessageStatus(@Param('id') id: string) {
    return this.messagesService.changeMessageStatus(id);
  }

  @HttpCode(201)
  @UseInterceptors(
    FilesInterceptor('responseFiles', 1, {
      storage: diskStorage({
        destination: './static/messages',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @Post('/response')
  addResponseToMessage(
    @Body() dto: CreateResponseDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.messagesService.createResponseForMessage(dto, files);
  }
}
