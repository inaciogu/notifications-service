import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly getRecipientNotifications: GetRecipientNotifications,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }

  @Get('count/from/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });

    return { count };
  }

  @Get('from/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ id });
  }
}
