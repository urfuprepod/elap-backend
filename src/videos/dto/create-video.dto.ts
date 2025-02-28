import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  videoPreviewImgUrl: string;

  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @IsNotEmpty()
  @IsString()
  videoDuration: string;
}
