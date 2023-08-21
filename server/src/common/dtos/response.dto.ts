import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from './pagination-response.dto';

/**
 * Dto for the response
 */
export class ResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  result: {
    meta?: PaginationResponseDto;
    data: T;
  };

  @ApiProperty()
  error?: any;
}
