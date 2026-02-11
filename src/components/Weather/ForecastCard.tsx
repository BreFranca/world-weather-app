"use client";

import Image from "next/image";
import { ForecastData, TemperatureUnit } from "@/types/weather";
import { formatDate } from "@/utils/formatters";
import { getTemperatureDisplay } from "@/utils/temperatureConversion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { getIconUrl } from "@/utils/icons";

interface ForecastCardProps {
  data: ForecastData;
  unit: TemperatureUnit;
}

export default function ForecastCard({ data, unit }: ForecastCardProps) {
  const dailyForecasts = useMemo(
    () =>
      data.list.reduce(
        (acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!acc[date] || item.dt_txt.includes("12:00:00")) {
            acc[date] = item;
          }
          return acc;
        },
        {} as Record<string, (typeof data.list)[0]>,
      ),
    [data.list],
  );

  const forecasts = useMemo(
    () => Object.values(dailyForecasts).slice(0, 5),
    [dailyForecasts],
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecasts.map((forecast, index) => {
            const iconUrl = getIconUrl(forecast.weather[0].icon);

            return (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow border-primary/20"
              >
                <CardContent className="flex flex-col items-center p-4 space-y-2">
                  <Badge variant="outline" className="font-semibold">
                    {formatDate(forecast.dt)}
                  </Badge>
                  <Image
                    src={iconUrl}
                    alt={forecast.weather[0].description}
                    width={64}
                    height={64}
                    unoptimized
                  />
                  <p className="text-xs text-muted-foreground text-center capitalize">
                    {forecast.weather[0].description}
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-2xl font-bold">
                      {getTemperatureDisplay(forecast.main.temp, unit)}
                    </p>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span>H: {Math.round(forecast.main.temp_max)}°</span>
                      <span>L: {Math.round(forecast.main.temp_min)}°</span>
                    </div>
                  </div>
                  <div className="w-full pt-2 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>💧 {forecast.main.humidity}%</span>
                      <span>
                        💨 {Math.round(forecast.wind.speed)}{" "}
                        {unit === "metric" ? "m/s" : "mph"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
