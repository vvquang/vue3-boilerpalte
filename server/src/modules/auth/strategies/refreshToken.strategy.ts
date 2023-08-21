import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@/modules/users/interfaces/user.interface';
import { AUTH_GUARD_TYPES } from '@/constants/authGuard';

interface JwtPayload {
  user: IUser;
  iat: number;
  exp: number;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  AUTH_GUARD_TYPES.REFRESH_TOKEN,
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    const user = payload.user;
    if (!user) {
      throw new NotFoundException('Refresh token is expired!');
    }

    return user;
  }
}
