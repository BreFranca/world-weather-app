import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocationSearch from '../LocationSearch';
import * as geocodingApi from '@/services/geocodingApi';

vi.mock('@/services/geocodingApi');

describe('LocationSearch', () => {
  const mockOnLocationSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input', () => {
    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    expect(input).toBeInTheDocument();
  });

  it('does not search with less than 2 characters', async () => {
    const searchSpy = vi.spyOn(geocodingApi, 'searchLocation');

    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'L' } });

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(searchSpy).not.toHaveBeenCalled();
  });

  it('displays search results', async () => {
    const mockResults = [
      {
        name: 'London',
        lat: 51.5074,
        lon: -0.1278,
        country: 'GB',
        state: 'England',
      },
      {
        name: 'Paris',
        lat: 48.8566,
        lon: 2.3522,
        country: 'FR',
        state: 'Île-de-France',
      },
    ];

    vi.spyOn(geocodingApi, 'searchLocation').mockResolvedValue(mockResults);

    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'city' } });

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('England, GB')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('Île-de-France, FR')).toBeInTheDocument();
    });
  });

  it('calls onLocationSelect when a result is clicked', async () => {
    const mockResults = [
      {
        name: 'London',
        lat: 51.5074,
        lon: -0.1278,
        country: 'GB',
        state: 'England',
      },
    ];

    vi.spyOn(geocodingApi, 'searchLocation').mockResolvedValue(mockResults);

    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'London' } });

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });

    const resultButton = screen.getByText('London').closest('button');
    fireEvent.click(resultButton!);

    expect(mockOnLocationSelect).toHaveBeenCalledWith(
      51.5074,
      -0.1278,
      'London',
    );
  });

  it('shows "no results" message when search returns empty', async () => {
    vi.spyOn(geocodingApi, 'searchLocation').mockResolvedValue([]);

    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'XYZ123' } });

    await waitFor(() => {
      expect(screen.getByText('No locations found')).toBeInTheDocument();
    });
  });

  it('does not search with less than 2 characters', async () => {
    const searchSpy = vi.spyOn(geocodingApi, 'searchLocation');

    render(<LocationSearch onLocationSelect={mockOnLocationSelect} />);

    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'L' } });

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(searchSpy).not.toHaveBeenCalled();
  });
});
