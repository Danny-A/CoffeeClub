import { extractIdFromSlug, generateSlug } from './slug';

describe('extractIdFromSlug', () => {
  it('should extract a valid UUID from a slug', () => {
    const slug = 'blue-bottle-123e4567-e89b-12d3-a456-426614174000';
    expect(extractIdFromSlug(slug)).toBe(
      '123e4567-e89b-12d3-a456-426614174000'
    );
  });

  it('should return the default UUID if no UUID is present', () => {
    const slug = 'blue-bottle';
    expect(extractIdFromSlug(slug)).toBe(
      '00000000-0000-0000-0000-000000000000'
    );
  });

  it('should extract the last UUID if multiple are present', () => {
    const slug =
      'foo-123e4567-e89b-12d3-a456-426614174000-bar-987e6543-e21b-32d3-b456-426614174999';
    expect(extractIdFromSlug(slug)).toBe(
      '987e6543-e21b-32d3-b456-426614174999'
    );
  });
});

describe('generateSlug', () => {
  it('should generate a slug from name and id', () => {
    const name = 'Blue Bottle! Coffee';
    const id = '123e4567-e89b-12d3-a456-426614174000';
    expect(generateSlug(name, id)).toBe(
      'blue-bottle-coffee-123e4567-e89b-12d3-a456-426614174000'
    );
  });

  it('should trim leading and trailing dashes', () => {
    const name = '---Blue Bottle---';
    const id = '123e4567-e89b-12d3-a456-426614174000';
    expect(generateSlug(name, id)).toBe(
      'blue-bottle-123e4567-e89b-12d3-a456-426614174000'
    );
  });

  it('should handle names with only special characters', () => {
    const name = '!!!';
    const id = '123e4567-e89b-12d3-a456-426614174000';
    expect(generateSlug(name, id)).toBe(
      '-123e4567-e89b-12d3-a456-426614174000'
    );
  });

  it('should handle empty name', () => {
    const name = '';
    const id = '123e4567-e89b-12d3-a456-426614174000';
    expect(generateSlug(name, id)).toBe(
      '-123e4567-e89b-12d3-a456-426614174000'
    );
  });
});
