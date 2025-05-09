import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getAllVideos() {
    return this.videosService.getAllVideos();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createVideo(@Body() dto: CreateVideoDto) {
    return this.videosService.createVideo(dto);
  }

  @Put(':id')
  editVideo(@Param('id') id: string, @Body() dto: Partial<CreateVideoDto>) {
    return this.videosService.editVideo(id, dto);
  }

  @Delete(':id')
  deleteVideo(@Param('id') id: string) {
    return this.videosService.deleteById(id)
  }
}
