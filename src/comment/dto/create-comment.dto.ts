import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  

  @IsInt()
  @IsNotEmpty()
  taskId: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  files?: string[]
}
