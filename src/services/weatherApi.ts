import { WeatherParams } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL =
  process.env.NEXT_PUBLIC_OPENWEATHER_API_URL ||
  "https://api.openweathermap.org/data/2.5";

type WeatherEndpoint = "weather" | "forecast";

const fetchWeatherData = async (
  endpoint: WeatherEndpoint,
  { lat, lon, unit }: WeatherParams,
) => {
  const response = await fetch(
    `${BASE_URL}/${endpoint}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint} data`);
  }

  return response.json();
};

export const fetchWeather = ({ lat, lon, unit = "metric" }: WeatherParams) =>
  fetchWeatherData("weather", { lat, lon, unit });

export const fetchForecast = ({ lat, lon, unit = "metric" }: WeatherParams) =>
  fetchWeatherData("forecast", { lat, lon, unit });
