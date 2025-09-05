/**
 * Safely generates JSON-LD with XSS protection by replacing < with \u003c
 * as recommended by Next.js documentation
 */
export function generateJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Creates a JSON-LD script tag with proper XSS protection
 */
export function createJsonLdScript(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: generateJsonLd(data),
    },
  };
}
