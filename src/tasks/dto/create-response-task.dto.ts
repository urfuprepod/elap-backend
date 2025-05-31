import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResponseTaskDto {
  @IsString()
  @IsNotEmpty()
  responseText: string;

  @IsString()
  @IsNotEmpty()
  commentText: string;
}
