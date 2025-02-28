import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
    constructor(private readonly mailerService: MailerService) {

    }

    async sendWelcomeEmail(email: string, password: string) {
        await this.mailerService.sendMail({
          to: email, // Получатель
          subject: 'Регистрация на сайте проекта «ЭЛАП»', // Тема письма
          template: 'self-register-success', // Имя шаблона (файл welcome.hbs в папке templates)
          context: {
            // Данные для шаблона
            password,
            email
          },
        });
      }
}
