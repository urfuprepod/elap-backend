import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsString()
  @IsEmail()
  email: string;
}
