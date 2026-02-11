import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from '../formatters';

describe('formatters', () => {
  describe('capitalizeFirstLetter', () => {
    it('capitalizes first letter of lowercase string', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    });

    it('handles already capitalized strings', () => {
      expect(capitalizeFirstLetter('Hello world')).toBe('Hello world');
    });

    it('handles single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });

    it('handles empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('handles strings with special characters', () => {
      expect(capitalizeFirstLetter('clear sky')).toBe('Clear sky');
    });

    it('preserves rest of the string case', () => {
      expect(capitalizeFirstLetter('hELLO wORLD')).toBe('HELLO wORLD');
    });
  });
});
