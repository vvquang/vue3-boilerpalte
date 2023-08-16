import { AUTH_GUARD_TYPES } from '@/constants/authGuard';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  AUTH_GUARD_TYPES.REFRESH_TOKEN,
) {
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new BadRequestException('Bad refresh token');
    }
    return user;
  }
}
