import { Roaster } from '@/lib/graphql/types';

import { HOST } from './constants';

export function generateRoasterBreadcrumbStructuredData(roaster: Roaster) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: HOST,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Roasters',
        item: `${HOST}/roasters`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: roaster.name,
        item: `${HOST}/roasters/${roaster.slug || roaster.id}`,
      },
    ],
  };
}

export function generateRoasterDescription(roaster: Roaster): string {
  const location = [roaster.city, roaster.state, roaster.country]
    .filter(Boolean)
    .join(', ');

  const beanCount = roaster.beanCount || roaster.beans?.length || 0;
  const reviewCount = roaster.reviewCount || 0;

  const beanText =
    beanCount > 0
      ? `Featuring ${beanCount} coffee bean${beanCount === 1 ? '' : 's'}.`
      : 'Explore their coffee offerings.';

  const reviewText =
    reviewCount > 0
      ? `Rated from ${reviewCount} review${reviewCount === 1 ? '' : 's'}.`
      : '';

  const description = roaster.description
    ? `${roaster.description.substring(0, 120)}${roaster.description.length > 120 ? '...' : ''}`
    : '';

  return [
    `${roaster.name}${location ? ` - Coffee roaster based in ${location}` : ' - Specialty coffee roaster'}.`,
    description,
    beanText,
    reviewText,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function generateRoasterKeywords(roaster: Roaster): string {
  return [
    roaster.name,
    'coffee roaster',
    'specialty coffee',
    'coffee beans',
    'artisan coffee',
    roaster.city,
    roaster.state,
    roaster.country,
    'coffee reviews',
    'third wave coffee',
  ]
    .filter(Boolean)
    .join(', ');
}

export function generateBrandStructuredData(roaster: Roaster) {
  // Calculate aggregate rating from beans if available
  let aggregateRating;
  if (roaster.beans && roaster.beans.length > 0) {
    const beansWithRatings = roaster.beans.filter(
      (bean) => bean.averageRating && bean.reviews && bean.reviews.length > 0
    );

    if (beansWithRatings.length > 0) {
      const totalRating = beansWithRatings.reduce(
        (sum, bean) =>
          sum + (bean.averageRating || 0) * (bean.reviews?.length || 0),
        0
      );
      const totalReviews = beansWithRatings.reduce(
        (sum, bean) => sum + (bean.reviews?.length || 0),
        0
      );

      if (totalReviews > 0) {
        aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: (totalRating / totalReviews).toFixed(2),
          reviewCount: totalReviews,
          bestRating: 5,
          worstRating: 1,
        };
      }
    }
  }

  const brandData = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: roaster.name,
    description: roaster.description || generateRoasterDescription(roaster),
    url: `${HOST}/roasters/${roaster.slug || roaster.id}`,
    ...(roaster.logoUrl && {
      logo: {
        '@type': 'ImageObject',
        url: roaster.logoUrl,
      },
    }),
    ...(aggregateRating && { aggregateRating }),
    ...(roaster.description && { slogan: roaster.description }),
  };

  // Add sameAs links if available
  const sameAsLinks = [];
  if (roaster.url) {
    sameAsLinks.push(roaster.url);
  }
  if (roaster.instagram) {
    const instagramUrl = roaster.instagram.startsWith('@')
      ? `https://instagram.com/${roaster.instagram.slice(1)}`
      : `https://instagram.com/${roaster.instagram}`;
    sameAsLinks.push(instagramUrl);
  }

  if (sameAsLinks.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (brandData as any).sameAs = sameAsLinks;
  }

  return brandData;
}

export function generateRoasterStructuredData(roaster: Roaster) {
  return [
    generateRoasterBreadcrumbStructuredData(roaster),
    generateBrandStructuredData(roaster),
  ];
}

export function generateRoasterOpenGraph(roaster: Roaster) {
  const location = [roaster.city, roaster.state, roaster.country]
    .filter(Boolean)
    .join(', ');

  return {
    title: `${roaster.name}${location ? ` - ${location}` : ''} - Coffee Roaster`,
    description: generateRoasterDescription(roaster),
    url: `${HOST}/roasters/${roaster.slug || roaster.id}`,
    siteName: 'Latest Grind',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url:
          roaster.profileImageUrl ||
          roaster.logoUrl ||
          '/default-roaster-image.jpg',
        width: 1200,
        height: 630,
        alt: `${roaster.name} coffee roaster`,
      },
    ],
    ...(roaster.createdAt && {
      publishedTime: roaster.createdAt,
    }),
  };
}

export function generateRoasterMetadata(roaster: Roaster | null) {
  if (!roaster) {
    return {
      title: 'Roaster Not Found - Latest Grind',
      description: "The coffee roaster you're looking for doesn't exist.",
    };
  }

  const location = [roaster.city, roaster.state, roaster.country]
    .filter(Boolean)
    .join(', ');

  return {
    title: `${roaster.name}${location ? ` - ${location}` : ''} - Latest Grind`,
    description: generateRoasterDescription(roaster),
    keywords: generateRoasterKeywords(roaster),
    openGraph: generateRoasterOpenGraph(roaster),
    alternates: {
      canonical: `${HOST}/roasters/${roaster.slug || roaster.id}`,
    },
    other: {
      'application/ld+json': JSON.stringify(
        generateRoasterStructuredData(roaster)
      ),
    },
  };
}
