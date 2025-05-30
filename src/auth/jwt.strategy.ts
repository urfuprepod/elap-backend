import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        // ExtractJwt.fromAuthHeaderAsBearerToken(), // опционально, если хотите поддержать и заголовок
      ]),
      // ignoreExpiration: true,
      secretOrKey: 'UrfuElap38',
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    const cookieName = 'urfuToken';

    console.log('чмо', req)
    if (
      req.cookies &&
      cookieName in req.cookies &&
      req.cookies[cookieName].length > 0
    ) {
      return req.cookies[cookieName];
    }
    return null;
  }

  async validate({ id }: { id: string }) {
    return this.userService.getById(id);
  }
} // стратегия, как будет происходить валидация токена
