"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWeather } from "@/hooks/useWeather";
import { useForecast } from "@/hooks/useForecast";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import CurrentWeather from "@/components/Weather/CurrentWeather";
import ForecastCard from "@/components/Weather/ForecastCard";
import LocationSearch from "@/components/Search/LocationSearch";
import TemperatureToggle from "@/components/Layout/TemperatureToggle";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Cloud } from "lucide-react";

const WeatherMap = dynamic(() => import("@/components/Map/WeatherMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const { unit, toggleUnit } = useTemperatureUnit();

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeather({
    lat: location?.lat ?? null,
    lon: location?.lon ?? null,
    unit,
  });

  const {
    data: forecastData,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecast({
    lat: location?.lat ?? null,
    lon: location?.lon ?? null,
    unit,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({ lat: 51.505, lon: -0.09 });
        },
      );
    }
  }, []);

  const handleLocationSelect = (lat: number, lon: number) => {
    setLocation({ lat, lon });
    setMapCenter([lat, lon]);
  };

  const handleRetry = () => {
    refetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                World Weather
              </h1>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none sm:w-80">
                <LocationSearch onLocationSelect={handleLocationSelect} />
              </div>
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="h-[400px] lg:h-[500px]">
            <WeatherMap
              center={mapCenter}
              selectedLocation={location}
              onLocationSelect={handleLocationSelect}
              mapCenter={mapCenter}
            />
          </div>

          <div>
            {weatherLoading && <LoadingSkeleton />}
            {weatherError && (
              <ErrorMessage
                message="Failed to load weather data. Please try again."
                onRetry={handleRetry}
              />
            )}
            {weatherData && <CurrentWeather data={weatherData} unit={unit} />}
            {!location && !weatherLoading && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Select a Location
                </h3>
                <p className="text-gray-600">
                  Click on the map or search for a location to see weather
                  information
                </p>
              </div>
            )}
          </div>
        </div>

        {forecastData && !forecastLoading && (
          <div className="mt-8">
            <ForecastCard data={forecastData} unit={unit} />
          </div>
        )}

        {forecastLoading && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {forecastError && (
          <div className="mt-8">
            <ErrorMessage message="Failed to load forecast data." />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Weather data provided by{" "}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              OpenWeatherMap
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
