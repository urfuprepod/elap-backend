import { Body, Controller, Get } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { join } from 'path';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('emails2')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get('create')
  async profile(@Body() dto: AuthDto) {
    console.log(join(process.cwd(), 'src/templates'));

    return this.emailsService.sendWelcomeEmail(dto);
  }
}
