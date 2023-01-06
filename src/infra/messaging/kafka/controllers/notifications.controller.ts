import { SendNotification } from '@app/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  recipientId: string;
  content: string;
  category: string;
}

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @EventPattern('send-notification')
  async handleSendNotifications(
    @Payload() { recipientId, category, content }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({ recipientId, category, content });
  }
}
