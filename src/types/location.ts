export interface Location {
  lat: number;
  lon: number;
  name?: string;
  country?: string;
}

export interface GeocodingResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
