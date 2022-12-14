import { Content } from './content';

describe('Notification content', () => {
  describe('Content creation', () => {
    it('Should be able to create a notification content', () => {
      const content = new Content('new content');

      expect(content).toBeTruthy();
    });

    it('Should not be able to create a notification content with less than 5 characters', () => {
      expect(() => new Content('olá')).toThrow();
    });

    it('Should not be able to create a notification content with more than 240 characters', () => {
      expect(() => new Content('o'.repeat(241))).toThrow();
    });
  });
});
