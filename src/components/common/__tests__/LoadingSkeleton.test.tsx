import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LoadingSkeleton from '../LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders loading skeleton structure', () => {
    const { container } = render(<LoadingSkeleton />);

    const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders card container', () => {
    const { container } = render(<LoadingSkeleton />);

    const card = container.querySelector('[class*="shadow-lg"]');
    expect(card).toBeInTheDocument();
  });

  it('renders 4 metric cards', () => {
    const { container } = render(<LoadingSkeleton />);

    const metricCards = container.querySelectorAll('[class*="bg-muted/50"]');
    expect(metricCards.length).toBe(4);
  });
});
