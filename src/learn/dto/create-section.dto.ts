import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateSectiontDto {
  @IsString()
  text: string;
}
