const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

/**
 * Searches for locations matching a query string.
 * @param query - The search query (e.g., city name).
 * @param limit - The maximum number of results to return (default is 5).
 * @returns A promise that resolves to an array of location data.
 *
 * @throws An error if the API request fails.
 */
export const searchLocation = async (query: string, limit: number = 5) => {
  const response = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search location");
  }

  return response.json();
};

/**
 * Reverse geocodes a latitude and longitude to get the corresponding location name.
 *
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to the location data.
 *
 * @throws An error if the API request fails.
 */
export const reverseGeocode = async (lat: number, lon: number) => {
  const response = await fetch(
    `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to reverse geocode");
  }

  const data = await response.json();
  return data[0];
};
