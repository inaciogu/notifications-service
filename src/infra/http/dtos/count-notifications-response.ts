import { ApiProperty } from '@nestjs/swagger';

export class CountNotificationsResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
