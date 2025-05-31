import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  // @IsString()
  // @IsNotEmpty()
  // type: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
