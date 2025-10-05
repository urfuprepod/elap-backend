import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const response = context.switchToHttp().getResponse<Response>();

    // Если ошибка аутентификации - очищаем куку
    if (err || !user) {
      this.clearAuthCookie(response);
      throw err || new UnauthorizedException();
    }

    return user;
  }

  private clearAuthCookie(response: Response) {
    response.cookie('urfuToken', '', {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      expires: new Date(0),
      sameSite: 'none',
    });
  }
}
