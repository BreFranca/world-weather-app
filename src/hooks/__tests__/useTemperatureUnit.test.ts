import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTemperatureUnit } from '../useTemperatureUnit';

describe('useTemperatureUnit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to metric unit', () => {
    const { result } = renderHook(() => useTemperatureUnit());
    expect(result.current.unit).toBe('metric');
  });

  it('loads saved unit from localStorage', () => {
    localStorage.setItem('temperatureUnit', 'imperial');
    const { result } = renderHook(() => useTemperatureUnit());
    expect(result.current.unit).toBe('imperial');
  });

  it('toggles between metric and imperial', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    expect(result.current.unit).toBe('metric');

    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.unit).toBe('imperial');

    act(() => {
      result.current.toggleUnit();
    });

    expect(result.current.unit).toBe('metric');
  });

  it('persists unit to localStorage on toggle', () => {
    const { result } = renderHook(() => useTemperatureUnit());

    act(() => {
      result.current.toggleUnit();
    });

    expect(localStorage.getItem('temperatureUnit')).toBe('imperial');

    act(() => {
      result.current.toggleUnit();
    });

    expect(localStorage.getItem('temperatureUnit')).toBe('metric');
  });

  it('handles invalid localStorage values', () => {
    localStorage.setItem('temperatureUnit', 'invalid');
    const { result } = renderHook(() => useTemperatureUnit());
    expect(result.current.unit).toBe('metric');
  });
});
