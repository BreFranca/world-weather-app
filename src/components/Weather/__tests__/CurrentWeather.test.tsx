import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../CurrentWeather';
import { WeatherData } from '@/types/weather';

const mockWeatherData: WeatherData = {
  name: 'London',
  sys: { country: 'GB' },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 18,
    temp_max: 22,
    pressure: 1013,
    humidity: 65,
  },
  wind: {
    speed: 3.5,
  },
  visibility: 10000,
};

describe('CurrentWeather', () => {
  it('renders weather data correctly', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('GB')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('displays humidity information', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('displays wind speed in metric units', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
  });

  it('displays wind speed in imperial units', () => {
    render(<CurrentWeather data={mockWeatherData} unit="imperial" />);

    expect(screen.getByText('3.5 mph')).toBeInTheDocument();
  });

  it('displays pressure information', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  });

  it('displays visibility information', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText('10.0 km')).toBeInTheDocument();
  });

  it('displays temperature range', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText(/High: 22°C/)).toBeInTheDocument();
    expect(screen.getByText(/Low: 18°C/)).toBeInTheDocument();
  });

  it('displays feels like temperature', () => {
    render(<CurrentWeather data={mockWeatherData} unit="metric" />);

    expect(screen.getByText(/Feels like: 18°C/)).toBeInTheDocument();
  });

  it('converts temperature to fahrenheit', () => {
    const imperialData = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: 68,
        feels_like: 64,
        temp_min: 64,
        temp_max: 72,
      },
    };

    render(<CurrentWeather data={imperialData} unit="imperial" />);

    expect(screen.getByText('68°F')).toBeInTheDocument();
  });
});
