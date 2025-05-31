import { IsArray, IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  repsponse: string;

  @IsString()
  messageId: string
}
