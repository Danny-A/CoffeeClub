import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/profile',
        '/beans/new',
        '/recipes/new',
        '/roasters/new',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://latestgrind.com'}/sitemap.xml`,
  };
}
