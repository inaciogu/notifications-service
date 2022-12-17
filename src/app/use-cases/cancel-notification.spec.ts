import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found.error';

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'test',
      content: new Content('solicitação de amizade'),
      recipientId: 'test-id',
    });

    await notificationsRepository.create(notification);

    await sendNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not to be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new CancelNotification(notificationsRepository);

    expect(() => sendNotification.execute({ id: 'fake-id' })).rejects.toThrow(
      NotificationNotFound,
    );
  });
});
