import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  describe('Notification creation', () => {
    it('Should be able to create a notification', () => {
      const notification = new Notification({
        category: 'social',
        recipientId: 'testId',
        content: new Content('example content'),
      });

      expect(notification).toBeTruthy();
    });
  });
});
