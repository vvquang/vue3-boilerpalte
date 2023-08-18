import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

import { IUser, IUserToken } from '@/modules/users/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(user: IUser): Observable<IUserToken> {
    return from(
      Promise.all([
        this.jwtService.signAsync(
          { user },
          {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>(
              'JWT_ACCESS_SECRET_EXPIRES',
            ),
          },
        ),

        this.jwtService.signAsync(
          { user },
          {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>(
              'JWT_REFRESH_SECRET_EXPIRES',
            ),
          },
        ),
      ]).then((tokens) => ({
        accessToken: tokens[0],
        refreshToken: tokens[1],
      })),
    );
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }
}
