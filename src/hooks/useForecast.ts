"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "@/services/weatherApi";
import { ForecastData, WeatherParams } from "@/types/weather";

export const useForecast = ({ lat, lon, unit }: WeatherParams) => {
  return useQuery<ForecastData>({
    queryKey: ["forecast", lat, lon, unit],
    queryFn: () => fetchForecast({ lat, lon, unit }),
    enabled: lat !== null && lon !== null,
  });
};
