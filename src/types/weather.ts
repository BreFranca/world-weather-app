export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

export type TemperatureUnit = "metric" | "imperial";

export interface WeatherParams {
  lat: number | null;
  lon: number | null;
  unit?: TemperatureUnit;
}
