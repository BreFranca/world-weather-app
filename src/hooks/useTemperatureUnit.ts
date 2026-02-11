'use client';

import { useState } from 'react';
import { TemperatureUnit } from '@/types/weather';

export const useTemperatureUnit = () => {
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('temperatureUnit') as TemperatureUnit;
      return stored || 'metric';
    }
    return 'metric';
  });

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  return { unit, toggleUnit };
};
