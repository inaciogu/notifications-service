import { ApiProperty } from '@nestjs/swagger';
import { makeNotification } from '@test/factories/notification.factory';
import { NotificationViewModel } from '../view-models/notification.view-model';

const exampleNotification = makeNotification();

export class NotificationResponse {
  @ApiProperty({
    example: NotificationViewModel.toHttp(exampleNotification),
  })
  notification: {
    id: string;
    category: string;
    content: string;
    recipientId: string;
    readAt: Date;
    canceledAt: Date;
  };
}
