// Utility to extract the id from a slug string (e.g., 'blue-bottle-1a2b3c4d' => '1a2b3c4d')
export function extractIdFromSlug(slug?: string | null): string | null {
  if (!slug || typeof slug !== "string") return null;
  // Match a UUID at the end of the string
  const match = slug.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  );
  return match ? match[0] : null;
}
