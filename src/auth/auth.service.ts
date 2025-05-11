import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userServiсe: UserService,
    private jwt: JwtService,
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN = 3; // время жизни токена в днях
  REFRESH_TOKEN_NAME = 'urfuToken';

  async register(dto: AuthDto) {
    const oldUser = await this.userServiсe.getByEmail(dto.email);
    if (oldUser) throw new BadRequestException('Email already in use');
    const { password, ...user } = await this.userServiсe.create(dto);

    const tokens = this.issueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userServiсe.getByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');
    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new NotFoundException('Invalid credentials');

    return user;
  }

  async getNewTokens(token: string) {
    const result = await this.jwt.verifyAsync<{ id: string }>(token);
    if (!result) throw new UnauthorizedException('Invalid token');

    // const { password, ...user } = await this.userServiсe.getById(result.id);
    // const tokens = this.issueTokens(user.id);

    // return { user, ...tokens };
  }

  private issueTokens(userId: number) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '3d',
    });

    return { accessToken };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true, // серверная куки
      domain: 'localhost',
      secure: true, // true в продакшне
      expires: expiresIn,
      sameSite: 'none', // в продакшне лучше ставить lax
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      secure: true,
      expires: new Date(0),
      sameSite: 'none',
    });
  }
}
