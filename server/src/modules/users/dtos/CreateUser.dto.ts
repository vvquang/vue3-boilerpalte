import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ERole } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  role: ERole;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
