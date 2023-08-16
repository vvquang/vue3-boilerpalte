import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}
