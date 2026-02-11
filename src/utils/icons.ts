/**
 * Utility function to get the URL for weather icons from OpenWeatherMap.
 *
 * @param iconCode - The icon code provided by the OpenWeatherMap API.
 * @param size - The size of the icon (1 for 1x, 2 for 2x). Default is 2.
 * @returns The URL to the weather icon image.
 */
export const getIconUrl = (iconCode: string, size: number = 2) => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}x.png`;
};
