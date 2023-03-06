import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @ApiProperty({ description: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;
}
