import { TemperatureUnit } from "@/types/weather";

/**
 * Utility functions for temperature conversion and display.
 *
 * @param celsius - Temperature in Celsius to convert to Fahrenheit.
 * @returns The converted temperature in Fahrenheit, rounded to the nearest whole number.
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Utility function to convert Fahrenheit to Celsius.
 *
 * @param fahrenheit - Temperature in Fahrenheit to convert to Celsius.
 * @returns The converted temperature in Celsius, rounded to the nearest whole number.
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

/**
 * Utility function to get a formatted temperature display string based on the unit.
 *
 * @param temp - The temperature value to display.
 * @param unit - The unit of the temperature, either "metric" for Celsius or "imperial" for Fahrenheit.
 * @returns A formatted string representing the temperature with the appropriate unit symbol.
 */
export const getTemperatureDisplay = (
  temp: number,
  unit: TemperatureUnit,
): string => {
  return `${Math.round(temp)}°${unit === "metric" ? "C" : "F"}`;
};
