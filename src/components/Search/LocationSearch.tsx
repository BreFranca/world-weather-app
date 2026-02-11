"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { searchLocation } from "@/services/geocodingApi";
import { GeocodingResult } from "@/types/location";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
}

export default function LocationSearch({
  onLocationSelect,
}: LocationSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const debounce = (func: (value: string) => Promise<void>, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(value), delay);
    };
  };

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchLocation(searchQuery);
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelectLocation = (result: GeocodingResult) => {
    onLocationSelect(result.lat, result.lon, result.name);
    setQuery(`${result.name}, ${result.country}`);
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder="Search for a location..."
          className="pl-10 pr-10"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 animate-spin" />
        )}
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute z-50 w-full mt-2 max-h-64 overflow-y-auto">
          <div className="p-1">
            {results.map((result, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleSelectLocation(result)}
                className="w-full justify-start h-auto py-3 px-3"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mr-2" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium truncate">{result.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {result.state && `${result.state}, `}
                    {result.country}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {showResults &&
        query.length >= 2 &&
        !isSearching &&
        results.length === 0 && (
          <Card className="absolute z-50 w-full mt-2 p-4">
            <p className="text-muted-foreground text-center text-sm">
              No locations found
            </p>
          </Card>
        )}
    </div>
  );
}
