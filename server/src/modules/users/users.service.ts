import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from '@/modules/auth/auth.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { IUser, IUserToken } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userRepositoryModel: Model<IUser>,
    private authService: AuthService,
  ) {}

  create(createdUserDto: CreateUserDto): Observable<IUser> {
    return this.mailExists(createdUserDto.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(createdUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;

              const newUser = new this.userRepositoryModel(createdUserDto);

              return from(newUser.save()).pipe(
                map((savedUser: IUser) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LoginUserDto): Observable<IUserToken> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: IUser) => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return this.validatePassword(loginUserDto.password, user.password).pipe(
          switchMap((passwordsMatches: boolean) => {
            if (passwordsMatches) {
              return this.findById(user.id).pipe(
                switchMap((user: IUser) =>
                  this.authService.generateTokens(user),
                ),
              );
            }

            throw new HttpException(
              'Login was not Successfully',
              HttpStatus.UNAUTHORIZED,
            );
          }),
        );
      }),
    );
  }

  refreshToken(user: IUser): Observable<any> {
    return this.findById(user['_id']).pipe(
      switchMap((user: IUser) => this.authService.generateTokens(user)),
    );
  }

  findAll(): Observable<IUser[]> {
    return from(this.userRepositoryModel.find().exec());
  }

  findById(id: string): Observable<IUser> {
    return from(this.userRepositoryModel.findOne({ _id: id }));
  }

  private findUserByEmail(email: string): Observable<IUser> {
    return from(
      this.userRepositoryModel.findOne({ email }).select('+password'),
    );
  }

  private validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.userRepositoryModel.findOne({ email })).pipe(
      map((user: IUser) => !!user),
    );
  }

  // async update(id: string, updateUserDto: IUser): Promise<IUser> {
  //   return this.userRepositoryModel
  //     .findByIdAndUpdate(id, updateUserDto, { new: true })
  //     .exec();
  // }

  // async remove(id: string): Promise<any> {
  //   return this.userRepositoryModel.findByIdAndDelete(id).exec();
  // }
}
