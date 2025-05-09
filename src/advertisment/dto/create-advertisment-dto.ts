import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdvertismentDto {
  @IsString()
  title: string;

  @IsString()
  text: string
}
