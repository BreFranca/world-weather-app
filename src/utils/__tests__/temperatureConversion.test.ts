import { describe, it, expect } from 'vitest';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  getTemperatureDisplay,
} from '../temperatureConversion';

describe('temperatureConversion', () => {
  describe('celsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it('converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    it('converts negative temperatures', () => {
      expect(celsiusToFahrenheit(-40)).toBe(-40);
    });

    it('rounds to nearest integer', () => {
      expect(celsiusToFahrenheit(20.6)).toBe(69);
    });
  });

  describe('fahrenheitToCelsius', () => {
    it('converts 32°F to 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
    });

    it('converts 212°F to 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBe(100);
    });

    it('converts negative temperatures', () => {
      expect(fahrenheitToCelsius(-40)).toBe(-40);
    });

    it('rounds to nearest integer', () => {
      expect(fahrenheitToCelsius(70)).toBe(21);
    });
  });

  describe('getTemperatureDisplay', () => {
    it('formats metric temperature with °C', () => {
      expect(getTemperatureDisplay(25.7, 'metric')).toBe('26°C');
    });

    it('formats imperial temperature with °F', () => {
      expect(getTemperatureDisplay(77.3, 'imperial')).toBe('77°F');
    });

    it('rounds temperature values', () => {
      expect(getTemperatureDisplay(20.4, 'metric')).toBe('20°C');
      expect(getTemperatureDisplay(20.6, 'metric')).toBe('21°C');
    });

    it('handles negative temperatures', () => {
      expect(getTemperatureDisplay(-5, 'metric')).toBe('-5°C');
    });

    it('handles zero temperature', () => {
      expect(getTemperatureDisplay(0, 'metric')).toBe('0°C');
    });
  });
});
