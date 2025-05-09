import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResetPasswordRequestsService } from './reset-password-requests.service';
import { ResetPasswordRequestDto } from './dto/create-request.dto';

@Controller('reset-password-requests')
export class ResetPasswordRequestsController {
  constructor(
    private readonly resetPasswordRequestsService: ResetPasswordRequestsService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('resetPassRequest')
  createResetPassRequest(dto: ResetPasswordRequestDto) {
    return this.resetPasswordRequestsService.createPasswordRequest(dto.email);
  }

  @Get('resetPassRequest/:id/validate')
  validateResetPassRequest(@Param('id') id: string) {
    return this.resetPasswordRequestsService.validatePasswordRequest(id);
  }
}
