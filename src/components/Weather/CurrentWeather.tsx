import Image from "next/image";
import { TemperatureUnit, WeatherData } from "@/types/weather";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { getTemperatureDisplay } from "@/utils/temperatureConversion";
import { Cloud, Droplets, Eye, Wind } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getIconUrl } from "@/utils/icons";

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const iconUrl = getIconUrl(data.weather[0].icon, 4);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <Badge variant="secondary" className="mt-2">
              {data.sys.country}
            </Badge>
          </div>
          <Image
            src={iconUrl}
            alt={data.weather[0].description}
            width={96}
            height={96}
            unoptimized
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-6xl font-bold">
            {getTemperatureDisplay(data.main.temp, unit)}
          </p>
          <p className="text-xl text-muted-foreground mt-2">
            {capitalizeFirstLetter(data.weather[0].description)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-lg font-semibold">{data.main.humidity}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-lg font-semibold">
                  {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <Cloud className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pressure</p>
                <p className="text-lg font-semibold">
                  {data.main.pressure} hPa
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="text-lg font-semibold">
                  {(data.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Feels like: {getTemperatureDisplay(data.main.feels_like, unit)}
            </span>
            <span>
              High: {getTemperatureDisplay(data.main.temp_max, unit)} / Low:{" "}
              {getTemperatureDisplay(data.main.temp_min, unit)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
