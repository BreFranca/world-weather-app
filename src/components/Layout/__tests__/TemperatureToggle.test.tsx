import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TemperatureToggle from '../TemperatureToggle';

describe('TemperatureToggle', () => {
  it('renders with metric unit', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="metric" onToggle={mockOnToggle} />);

    expect(screen.getByText('Unit:')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('renders with imperial unit', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="imperial" onToggle={mockOnToggle} />);

    expect(screen.getByText('°F')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const mockOnToggle = vi.fn();
    render(<TemperatureToggle unit="metric" onToggle={mockOnToggle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('toggles between Celsius and Fahrenheit', () => {
    const mockOnToggle = vi.fn();
    const { rerender } = render(
      <TemperatureToggle unit="metric" onToggle={mockOnToggle} />,
    );

    expect(screen.getByText('°C')).toBeInTheDocument();

    rerender(<TemperatureToggle unit="imperial" onToggle={mockOnToggle} />);

    expect(screen.getByText('°F')).toBeInTheDocument();
  });
});
