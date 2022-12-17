import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found.error';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification ?? null;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      ({ id }) => notification.id === id,
    );

    if (notificationIndex < 0) throw new NotificationNotFound();

    this.notifications[notificationIndex] = notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
