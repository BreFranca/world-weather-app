import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeather, fetchForecast } from '../weatherApi';

global.fetch = vi.fn();

describe('weatherApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchWeather', () => {
    it('fetches weather data successfully', async () => {
      const mockData = {
        name: 'London',
        sys: { country: 'GB' },
        main: { temp: 15 },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchWeather({ lat: 51.5074, lon: -0.1278 });
      expect(result).toEqual(mockData);
    });

    it('uses default metric unit', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchWeather({ lat: 51.5074, lon: -0.1278 });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('units=metric')
      );
    });

    it('uses imperial unit when specified', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchWeather({ lat: 51.5074, lon: -0.1278, unit: 'imperial' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('units=imperial')
      );
    });

    it('throws error when fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        fetchWeather({ lat: 51.5074, lon: -0.1278 })
      ).rejects.toThrow('Failed to fetch weather data');
    });
  });

  describe('fetchForecast', () => {
    it('fetches forecast data successfully', async () => {
      const mockData = {
        list: [{ dt: 1234567890, main: { temp: 20 } }],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchForecast({ lat: 51.5074, lon: -0.1278 });
      expect(result).toEqual(mockData);
    });

    it('throws error when fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        fetchForecast({ lat: 51.5074, lon: -0.1278 })
      ).rejects.toThrow('Failed to fetch forecast data');
    });
  });
});
