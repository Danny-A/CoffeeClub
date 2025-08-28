import { Bean } from '@/lib/graphql/types';

import { HOST } from './constants';

export function generateBreadcrumbStructuredData(bean: Bean) {
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
        name: 'Beans',
        item: `${HOST}/beans`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: bean.name,
        item: `${HOST}/beans/${bean.slug || bean.id}`,
      },
    ],
  };
}
export function generateBeanDescription(bean: Bean): string {
  const roasterName = bean.roaster?.name || 'Unknown Roaster';
  const averageRating = bean.averageRating || 0;
  const reviewCount = bean.reviewCount || 0;
  const origin = bean.origin || 'Unknown Origin';
  const roastLevel = bean.roastLevel || 'Unknown';
  const process = bean.process || 'Unknown Process';

  const ratingText =
    averageRating > 0
      ? `Rated ${averageRating.toFixed(1)}/5 from ${reviewCount} reviews.`
      : 'No reviews yet.';

  const tastingNotes = bean.notes
    ? `Tasting notes: ${bean.notes.substring(0, 100)}${bean.notes.length > 100 ? '...' : ''}`
    : '';

  return `${bean.name} by ${roasterName} - ${origin} coffee with ${process} processing and ${roastLevel.toLowerCase()} roast. ${ratingText} ${tastingNotes}`.trim();
}

export function generateBeanKeywords(bean: Bean): string {
  return [
    bean.name,
    bean.roaster?.name,
    'coffee',
    'coffee beans',
    bean.origin,
    bean.roastLevel,
    bean.process,
    'specialty coffee',
    'coffee reviews',
  ]
    .filter(Boolean)
    .join(', ');
}

export function generateProductStructuredData(bean: Bean) {
  const roasterName = bean.roaster?.name || 'Unknown Roaster';
  const averageRating = bean.averageRating || 0;
  const reviewCount = bean.reviewCount || 0;
  const origin = bean.origin || 'Unknown Origin';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bean.name,
    description: bean.notes || `${bean.name} coffee from ${origin}`,
    brand: {
      '@type': 'Brand',
      name: roasterName,
    },
    category: 'Coffee Bean',
    image: bean.imageUrl,
    ...(averageRating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        reviewCount: reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(bean.origin && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Origin',
          value: bean.origin,
        },
        {
          '@type': 'PropertyValue',
          name: 'Roast Level',
          value: bean.roastLevel,
        },
        {
          '@type': 'PropertyValue',
          name: 'Process',
          value: bean.process,
        },
        ...(bean.producer
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Producer',
                value: bean.producer,
              },
            ]
          : []),
        ...(bean.elevationMin
          ? [
              {
                '@type': 'PropertyValue',
                name: 'Elevation',
                value: `${bean.elevationMin}${bean.elevationMax ? `-${bean.elevationMax}` : ''} masl`,
              },
            ]
          : []),
      ],
    }),
  };
}

export function generateBeanStructuredData(bean: Bean) {
  return [
    generateBreadcrumbStructuredData(bean),
    generateProductStructuredData(bean),
  ];
}

export function generateBeanOpenGraph(bean: Bean) {
  const roasterName = bean.roaster?.name || 'Unknown Roaster';

  return {
    title: `${bean.name} by ${roasterName}`,
    description: generateBeanDescription(bean),
    url: `${HOST}/beans/${bean.slug || bean.id}`,
    siteName: 'Latest Grind',
    locale: 'en_US',
    images: [
      {
        url: bean.imageUrl || '/default-bean-image.jpg',
        width: 1200,
        height: 630,
        alt: `${bean.name} coffee bean`,
      },
    ],
    ...(bean.createdAt && {
      publishedTime: bean.createdAt,
    }),
  };
}

export function generateBeanMetadata(bean: Bean | null) {
  if (!bean) {
    return {
      title: 'Bean Not Found - Latest Grind',
      description: "The bean you're looking for doesn't exist.",
    };
  }

  const roasterName = bean.roaster?.name || 'Unknown Roaster';

  return {
    title: `${bean.name} by ${roasterName} - Latest Grind`,
    description: generateBeanDescription(bean),
    keywords: generateBeanKeywords(bean),
    openGraph: generateBeanOpenGraph(bean),
    alternates: {
      canonical: `${HOST}/beans/${bean.slug || bean.id}`,
    },
    other: {
      'application/ld+json': JSON.stringify(generateBeanStructuredData(bean)),
    },
  };
}
