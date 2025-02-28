import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsUrfuEmail } from "src/validators/urfu-email.validator";

export class AuthDto {
    @IsNotEmpty({message: 'Email не может быть пустым'})
    @IsEmail()
    @IsUrfuEmail()
    email: string;
   
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Пароль не должен быть меньше 6 символов'})
    password: string;

    @IsNotEmpty({message: 'Фамилия не может быть пустой строкой'})
    @IsString()
    lastName: string;

    @IsNotEmpty({message: 'Имя не может быть пустой строкой'})
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    patronymic?: string;

    @IsOptional()
    @IsString()
    groupName?: string;

    @IsOptional()
    @IsString()
    mentorRole?: string;

    
}