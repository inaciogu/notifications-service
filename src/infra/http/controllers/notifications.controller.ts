import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationResponse } from '../dtos/create-notification-response';
import { GetNotificationsResponse } from '../dtos/get-notifications-response';
import { CountNotificationsResponse } from '../dtos/count-notifications-response';

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
  @ApiOperation({ summary: 'Send a notification' })
  @ApiResponse({
    type: NotificationResponse,
    status: 201,
    description: 'Notification sent',
  })
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
  @ApiOperation({
    summary: 'Count notifications from recipient through their id',
  })
  @ApiResponse({
    status: 200,
    description: 'Number of recipient notifications',
    type: CountNotificationsResponse,
  })
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });

    return { count };
  }

  @Get('from/:id')
  @ApiOperation({
    summary: 'Get notifications from recipient through their id',
  })
  @ApiResponse({
    status: 200,
    description: 'List of reicpient notifications',
    type: GetNotificationsResponse,
  })
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ id });
  }

  @Patch(':id/unread')
  @ApiOperation({ summary: 'Mark a notification as unread' })
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ id });
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a notification' })
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ id });
  }
}
