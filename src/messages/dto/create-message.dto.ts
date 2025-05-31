import { IsArray, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  question: string;

  @IsString()
  theme: string;

 
}
