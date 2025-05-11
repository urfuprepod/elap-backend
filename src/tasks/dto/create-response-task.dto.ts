import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResponseTaskDto {
  @IsString()
  @IsNotEmpty()
  reponseText: string;

  @IsString()
  @IsNotEmpty()
  commentText: string;
}
