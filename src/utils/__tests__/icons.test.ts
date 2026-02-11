import { describe, it, expect } from 'vitest';
import { getIconUrl } from '../icons';

describe('icons', () => {
  describe('getIconUrl', () => {
    it('generates correct URL for 2x size', () => {
      const url = getIconUrl('01d', 2);
      expect(url).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });

    it('generates correct URL for 4x size', () => {
      const url = getIconUrl('10n', 4);
      expect(url).toBe('https://openweathermap.org/img/wn/10n@4x.png');
    });

    it('defaults to 2x when size not specified', () => {
      const url = getIconUrl('02d');
      expect(url).toBe('https://openweathermap.org/img/wn/02d@2x.png');
    });

    it('handles various weather icon codes', () => {
      expect(getIconUrl('01d')).toContain('01d');
      expect(getIconUrl('01n')).toContain('01n');
      expect(getIconUrl('09d')).toContain('09d');
      expect(getIconUrl('11d')).toContain('11d');
      expect(getIconUrl('13d')).toContain('13d');
    });
  });
});
