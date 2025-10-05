import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Пароль не должен быть меньше 6 символов' })
  @IsOptional()
  newPassword?: string;
}
