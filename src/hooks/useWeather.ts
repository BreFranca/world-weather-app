"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/services/weatherApi";
import { WeatherData, WeatherParams } from "@/types/weather";

export const useWeather = ({ lat, lon, unit }: WeatherParams) => {
  return useQuery<WeatherData>({
    queryKey: ["weather", lat, lon, unit],
    queryFn: () => fetchWeather({ lat, lon, unit }),
    enabled: lat !== null && lon !== null,
  });
};
