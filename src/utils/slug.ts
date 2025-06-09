// Utility to extract the id from a slug string (e.g., 'blue-bottle-1a2b3c4d' => '1a2b3c4d')
export function extractIdFromSlug(slug: string): string {
  // Match a UUID at the end of the string
  const match = slug.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );

  return match ? match[0] : '00000000-0000-0000-0000-000000000000';
}

export function generateSlug(name: string, id: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') +
    '-' +
    id
  );
}
