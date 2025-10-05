import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';

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
}
