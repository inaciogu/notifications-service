import { makeNotification } from '@test/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count notification', () => {
  it('Should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = makeNotification({ recipientId: 'recipient1' });

    const notification2 = makeNotification({ recipientId: 'recipient1' });

    const notification3 = makeNotification({ recipientId: 'recipient2' });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
