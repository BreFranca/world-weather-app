/**
 * Converts a UNIX timestamp to a human-readable date format (e.g., "Mon, Jan 1").
 *
 * @param timestamp - The UNIX timestamp in seconds.
 * @returns A string representing the formatted date.
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * Converts temperature from Kelvin to Celsius and formats it as a string.
 *
 * @param tempKelvin - The temperature in Kelvin.
 * @returns A string representing the temperature in Celsius, rounded to the nearest whole number, followed by "°C".
 */
export const formatTemperature = (tempKelvin: number): string => {
  const tempCelsius = tempKelvin - 273.15;
  return `${Math.round(tempCelsius)}°C`;
};

/**
 * Converts a UNIX timestamp to a human-readable time format (e.g., "2:30 PM").
 *
 * @param timestamp - The UNIX timestamp in seconds.
 * @returns A string representing the formatted time.
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Capitalizes the first letter of a given string.
 *
 * @param str - The input string to be formatted.
 * @returns A new string with the first letter capitalized and the rest unchanged.
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
