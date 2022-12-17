import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('Should be able to create a new notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'nova notificação',
      recipientId: 'testid',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationsRepository.notifications[0]);
  });
});
