import { ApiProperty } from '@nestjs/swagger';
import { makeNotification } from '@test/factories/notification.factory';
import { NotificationViewModel } from '../view-models/notification.view-model';

const exampleNotification = makeNotification();

export class GetNotificationsResponse {
  @ApiProperty({ example: [NotificationViewModel.toHttp(exampleNotification)] })
  notifications: {
    id: string;
    category: string;
    content: string;
    recipientId: string;
    readAt: Date;
    canceledAt: Date;
  }[];
}
