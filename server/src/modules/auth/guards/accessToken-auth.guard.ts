import { AUTH_GUARD_TYPES } from '@/constants/authGuard';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard(
  AUTH_GUARD_TYPES.ACCESS_TOKEN,
) {}
