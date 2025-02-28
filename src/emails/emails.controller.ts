import { Controller, Get } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { join } from 'path';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  async profile() {
    console.log(join(process.cwd(), 'src/templates'));
    // return null;
    return this.emailsService.sendWelcomeEmail(
      'yzakh@ya.ru',
      'пароль',
    );
  }
}
