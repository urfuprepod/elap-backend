import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(dto: AuthDto) {
    await this.mailerService.sendMail({
      to: dto.email, // Получатель
      subject: 'Регистрация на сайте проекта «ЭЛАП»', // Тема письма,
      template: 'self-register-success', // Имя шаблона (файл welcome.hbs в папке templates)
      context: {
        // Данные для шаблона
        password: dto.password,
        email: dto.email,
      },
    });
  }

  async sendPassword(dto: ChangePasswordDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Смена пароля в системе «ЭЛАП»',
      template: 'change-pass',
      context: {
        password: dto.newPassword,
        email: dto.email
      }
    })
  }
}
