"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TemperatureUnit } from "@/types/weather";

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export default function TemperatureToggle({
  unit,
  onToggle,
}: TemperatureToggleProps) {
  return (
    <Button onClick={onToggle} variant="outline" className="gap-2">
      <span className="text-sm font-medium">Unit:</span>
      <Badge variant="secondary">{unit === "metric" ? "°C" : "°F"}</Badge>
    </Button>
  );
}
