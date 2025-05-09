import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { CreateAdvertismentDto } from './dto/create-advertisment-dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('advertisements')
export class AdvertismentController {
  constructor(private readonly advertismentService: AdvertismentService) {}

  @Get()
  getAllAdvertisments() {
    return this.advertismentService.getAllAdvertisments();
  }

  @Get('last')
  getLastAdvertisments() {
    return this.advertismentService.getLastAdvertisments();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: './static/advertisments',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  createAdvertisment(
    @Body() dto: CreateAdvertismentDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertismentService.createAdvertisment(dto, files);
  }

  @Delete(':id')
  deleteAdvertisment(@Param('id') id: string) {
    return this.advertismentService.deleteAdvertisment(id);
  }

  @UseInterceptors(
    FilesInterceptor('files', 1, {
      storage: diskStorage({
        destination: './static/advertisments',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @Put(':id')
  updateAdvertisment(
    @Param('id') id: string,
    @Body() dto: Partial<CreateAdvertismentDto>,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.advertismentService.updateAdvertisment(id, dto, files);
  }
}
