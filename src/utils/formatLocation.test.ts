import { describe, expect, it } from 'vitest';

import { formatLocation } from './formatLocation';

describe('formatLocation', () => {
  it('should format location with all fields', () => {
    const location = {
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
    };
    expect(formatLocation(location)).toBe(
      'San Francisco, California, United States'
    );
  });

  it('should format location with only city and country', () => {
    const location = {
      city: 'London',
      country: 'United Kingdom',
    };
    expect(formatLocation(location)).toBe('London, United Kingdom');
  });

  it('should format location with only state and country', () => {
    const location = {
      state: 'New South Wales',
      country: 'Australia',
    };
    expect(formatLocation(location)).toBe('New South Wales, Australia');
  });

  it('should handle null values', () => {
    const location = {
      city: null,
      state: 'California',
      country: 'United States',
    };
    expect(formatLocation(location)).toBe('California, United States');
  });

  it('should handle undefined values', () => {
    const location = {
      city: undefined,
      state: 'California',
      country: 'United States',
    };
    expect(formatLocation(location)).toBe('California, United States');
  });

  it('should handle empty strings', () => {
    const location = {
      city: '',
      state: 'California',
      country: 'United States',
    };
    expect(formatLocation(location)).toBe('California, United States');
  });

  it('should handle whitespace in values', () => {
    const location = {
      city: '  San Francisco  ',
      state: '  California  ',
      country: '  United States  ',
    };
    expect(formatLocation(location)).toBe(
      'San Francisco, California, United States'
    );
  });

  it('should return empty string for empty location object', () => {
    expect(formatLocation({})).toBe('');
  });

  it('should return empty string for all null values', () => {
    const location = {
      city: null,
      state: null,
      country: null,
    };
    expect(formatLocation(location)).toBe('');
  });

  it('should return empty string for all undefined values', () => {
    const location = {
      city: undefined,
      state: undefined,
      country: undefined,
    };
    expect(formatLocation(location)).toBe('');
  });
});
