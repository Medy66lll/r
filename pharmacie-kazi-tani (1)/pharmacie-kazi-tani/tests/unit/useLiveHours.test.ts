import { describe, it, expect } from 'vitest';

export function isRestaurantOpen(hourDecimal: number): boolean {
  // Service: 11:30 (11.5) to 00:30 (0.5 next day)
  return hourDecimal >= 11.5 || hourDecimal < 0.75;
}

describe('Live Operating Hours Logic (Algeria UTC+1)', () => {
  it('returns true during lunch service at 13:00', () => {
    expect(isRestaurantOpen(13.0)).toBe(true);
  });

  it('returns true during evening service at 21:30', () => {
    expect(isRestaurantOpen(21.5)).toBe(true);
  });

  it('returns true past midnight at 00:15', () => {
    expect(isRestaurantOpen(0.25)).toBe(true);
  });

  it('returns false during morning hours at 08:00', () => {
    expect(isRestaurantOpen(8.0)).toBe(false);
  });

  it('returns false at closing time 04:00', () => {
    expect(isRestaurantOpen(4.0)).toBe(false);
  });
});
