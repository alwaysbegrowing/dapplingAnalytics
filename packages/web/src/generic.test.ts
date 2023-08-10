import { inject } from './generic';

describe('inject', () => {
  describe('in no mode', () => {
    it('should add the script tag correctly', () => {
      inject();

      const scripts = document.getElementsByTagName('script');
      expect(scripts).toHaveLength(1);

      const script = document.head.querySelector('script');

      if (!script) {
        throw new Error('Could not find script tag');
      }

      expect(script).toHaveAttribute('defer');
    });
  });
});
