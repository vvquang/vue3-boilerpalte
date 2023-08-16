import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccessTokenGuard } from '@/modules/auth/guards/accessToken-auth.guard';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { IUser, IUserToken } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { RefreshTokenDto } from './dtos/RefreshToken.dto';
import { RefreshTokenGuard } from '../auth/guards/refreshToken-auth.guard';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('user')
  create(@Body() createdUserDto: CreateUserDto): Observable<IUser> {
    return this.userService.create(createdUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('user')
  findUser(id: string): Observable<IUser> {
    return this.userService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('users')
  findAll(): Observable<IUser[]> {
    return this.userService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('auth/me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('auth/login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<object> {
    return this.userService.login(loginUserDto).pipe(
      map((tokens: IUserToken) => {
        return {
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
        };
      }),
    );
  }

  // @UseGuards(AccessTokenGuard)
  // @Get('auth/logout')
  // logout(@Request() req: any) {
  //   this.authService.logout(req.user);
  // }

  @UseGuards(RefreshTokenGuard)
  @Post('auth/refresh-token')
  @HttpCode(200)
  refreshToken(@Request() req: any): any {
    const user = req.user;
    return this.userService.refreshToken(user);
  }
}
