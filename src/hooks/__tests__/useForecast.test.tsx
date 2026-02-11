import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useForecast } from "../useForecast";
import * as weatherApi from "@/services/weatherApi";
import { ForecastData } from "@/types/weather";

vi.mock("@/services/weatherApi");

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

  Wrapper.displayName = "TestWrapper";

  return Wrapper;
};

describe("useForecast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns undefined when lat/lon are null", () => {
    const { result } = renderHook(() => useForecast({ lat: null, lon: null }), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches forecast data when lat/lon are provided", async () => {
    const mockForecastData = {
      list: [
        {
          dt: 1704067200,
          dt_txt: "2024-01-01 00:00:00",
          main: {
            temp: 15,
            temp_min: 12,
            temp_max: 18,
            humidity: 70,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "clear sky",
              icon: "01d",
            },
          ],
          wind: {
            speed: 3.5,
          },
        },
      ],
    };

    vi.spyOn(weatherApi, "fetchForecast").mockResolvedValue(mockForecastData);

    const { result } = renderHook(
      () => useForecast({ lat: 51.5074, lon: -0.1278 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockForecastData);
  });

  it("handles errors correctly", async () => {
    vi.spyOn(weatherApi, "fetchForecast").mockRejectedValue(
      new Error("Failed to fetch"),
    );

    const { result } = renderHook(
      () => useForecast({ lat: 51.5074, lon: -0.1278 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it("uses metric unit by default", async () => {
    const fetchSpy = vi
      .spyOn(weatherApi, "fetchForecast")
      .mockResolvedValue({} as ForecastData);

    renderHook(() => useForecast({ lat: 51.5074, lon: -0.1278 }), {
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

  it("uses imperial unit when specified", async () => {
    const fetchSpy = vi
      .spyOn(weatherApi, "fetchForecast")
      .mockResolvedValue({} as ForecastData);

    renderHook(
      () => useForecast({ lat: 51.5074, lon: -0.1278, unit: "imperial" }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith({
        lat: 51.5074,
        lon: -0.1278,
        unit: "imperial",
      });
    });
  });
});
