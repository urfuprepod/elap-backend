import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUrfuEmail } from 'src/validators/urfu-email.validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @IsEmail()
  @IsUrfuEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Пароль не должен быть меньше 6 символов' })
  password?: string;

  @IsOptional()
  @IsString()
  mentorRole?: string;
}
