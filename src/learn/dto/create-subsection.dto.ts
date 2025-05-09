import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateSubsectiontDto {
  @IsString()
  text: string;
}
