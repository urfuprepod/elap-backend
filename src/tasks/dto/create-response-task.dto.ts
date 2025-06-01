import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResponseTaskDto {
  @IsString()
  @IsOptional()
  responseText: string;

  @IsString()
  @IsOptional()
  commentText?: string;
}
