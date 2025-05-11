import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ReworkStatusDto {
 
  @IsString()
  @IsNotEmpty()
  commentText: string;
}
