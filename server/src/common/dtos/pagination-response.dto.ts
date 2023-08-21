import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 0 })
  from: number;

  @ApiProperty({ example: 1 })
  lastPage: number;

  @ApiProperty({ example: 5 })
  perPage: number;

  @ApiProperty({ example: 9 })
  to: number;

  @ApiProperty({ example: 2 })
  total: number;
}
