import { makeNotification } from '@test/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('Should be able to list recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = makeNotification({ recipientId: 'recipient1' });

    const notification2 = makeNotification({ recipientId: 'recipient1' });

    const notification3 = makeNotification({ recipientId: 'recipient2' });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
      ]),
    );
  });
});
