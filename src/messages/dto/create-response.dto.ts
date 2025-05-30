import { IsArray, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  repsponse: string;

  @IsArray()
  responseFiles?: string[];
}
