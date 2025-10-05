import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mail.urfu.ru', // Хост SMTP сервера
        port: 25, // Порт SMTP сервера
        secure: false, // Используем SSL/TLS
        requireTLS: true,
        tls: {
          rejectUnauthorized: false, // Игнорируем ошибку самоподписанного сертификата
        },
        auth: {
          user: 'elap-urgi@urfu.ru', // Ваш email
          pass: 'POI098poi', // Пароль от почты или App Password
        },
      },
      defaults: {
        from: 'no-reply<elap-urgi@urfu.ru>', // Отправитель по умолчанию
      },
      template: {
        dir: join(process.cwd(), 'src/templates'), // Путь к папке с шаблонами
        adapter: new HandlebarsAdapter(), // Используем Handlebars для шаблонов
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
