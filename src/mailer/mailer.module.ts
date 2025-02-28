import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const MailModule = MailerModule.forRoot({
  transport: {
    host: 'smtp.yandex.ru', // Хост SMTP сервера
    port: 465, // Порт SMTP сервера
    secure: true, // Использовать SSL/TLS
    auth: {
      user: 'elaptestsite@yandex.ru', // Ваш email
      pass: '228asdfghjkl228', // Пароль от почты или App Password
    },
  },
  defaults: {
    from: 'no-reply@elap.site', // Отправитель по умолчанию
  },
  template: {
    dir: join(process.cwd(), 'src/templates'), // Путь к папке с шаблонами
    adapter: new HandlebarsAdapter(), // Используем Handlebars для шаблонов
    options: {
      strict: true,
    },
  },
});
