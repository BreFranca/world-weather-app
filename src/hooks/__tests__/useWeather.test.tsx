import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useWeather } from '../useWeather';
import * as weatherApi from '@/services/weatherApi';
import type { WeatherData } from '@/types/weather';

vi.mock('@/services/weatherApi');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  
  return Wrapper;
};

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns undefined when lat/lon are null', () => {
    const { result } = renderHook(
      () => useWeather({ lat: null, lon: null }),
      { wrapper: createWrapper() },
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('fetches weather data when lat/lon are provided', async () => {
    const mockWeatherData: WeatherData = {
      name: 'London',
      sys: { country: 'GB' },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      main: {
        temp: 20,
        feels_like: 18,
        temp_min: 18,
        temp_max: 22,
        pressure: 1013,
        humidity: 65,
      },
      wind: {
        speed: 3.5,
      },
      visibility: 10000,
    };

    vi.spyOn(weatherApi, 'fetchWeather').mockResolvedValue(mockWeatherData);

    const { result } = renderHook(
      () => useWeather({ lat: 51.5074, lon: -0.1278 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockWeatherData);
  });

  it('handles errors correctly', async () => {
    vi.spyOn(weatherApi, 'fetchWeather').mockRejectedValue(
      new Error('Failed to fetch'),
    );

    const { result } = renderHook(
      () => useWeather({ lat: 51.5074, lon: -0.1278 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('uses metric unit by default', async () => {
    const fetchSpy = vi
      .spyOn(weatherApi, 'fetchWeather')
      .mockResolvedValue({} as WeatherData);

    renderHook(() => useWeather({ lat: 51.5074, lon: -0.1278 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith({
        lat: 51.5074,
        lon: -0.1278,
        unit: undefined,
      });
    });
  });

  it('uses imperial unit when specified', async () => {
    const fetchSpy = vi
      .spyOn(weatherApi, 'fetchWeather')
      .mockResolvedValue({} as WeatherData);

    renderHook(
      () => useWeather({ lat: 51.5074, lon: -0.1278, unit: 'imperial' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith({
        lat: 51.5074,
        lon: -0.1278,
        unit: 'imperial',
      });
    });
  });
});
