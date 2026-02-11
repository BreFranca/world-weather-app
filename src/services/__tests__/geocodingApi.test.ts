import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchLocation, reverseGeocode } from '../geocodingApi';

global.fetch = vi.fn();

describe('geocodingApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('searchLocation', () => {
    it('fetches and returns location results', async () => {
      const mockResponse = [
        {
          name: 'London',
          lat: 51.5074,
          lon: -0.1278,
          country: 'GB',
          state: 'England',
        },
        {
          name: 'London',
          lat: 42.9834,
          lon: -81.233,
          country: 'CA',
          state: 'Ontario',
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchLocation('London');

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('geo/1.0/direct'),
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('q=London'),
      );
    });

    it('limits results to 5', async () => {
      const mockResponse = Array(10).fill({
        name: 'London',
        lat: 51.5074,
        lon: -0.1278,
        country: 'GB',
      });

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await searchLocation('London');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=5'),
      );
    });

    it('throws error when API call fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(searchLocation('InvalidCity')).rejects.toThrow(
        'Failed to search location',
      );
    });

    it('handles network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(
        new Error('Network error'),
      );

      await expect(searchLocation('London')).rejects.toThrow();
    });

    it('encodes query parameter correctly', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await searchLocation('São Paulo');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent('São Paulo')),
      );
    });

    it('returns empty array when no results found', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await searchLocation('XYZ123456789');

      expect(result).toEqual([]);
    });

    it('includes API key in request', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await searchLocation('London');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('appid='),
      );
    });
  });

  describe('reverseGeocode', () => {
    it('fetches and returns location from coordinates', async () => {
      const mockResponse = [
        {
          name: 'London',
          lat: 51.5074,
          lon: -0.1278,
          country: 'GB',
          state: 'England',
        },
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await reverseGeocode(51.5074, -0.1278);

      expect(result).toEqual(mockResponse[0]);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('geo/1.0/reverse'),
      );
    });

    it('includes lat and lon in request', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [{ name: 'Test' }],
      });

      await reverseGeocode(51.5074, -0.1278);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('lat=51.5074'),
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('lon=-0.1278'),
      );
    });

    it('throws error when API call fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(reverseGeocode(51.5074, -0.1278)).rejects.toThrow(
        'Failed to reverse geocode',
      );
    });

    it('limits results to 1', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => [{ name: 'Test' }],
      });

      await reverseGeocode(51.5074, -0.1278);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=1'),
      );
    });
  });
});
