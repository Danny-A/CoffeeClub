import { Bean, Roaster } from '@/lib/graphql/types';

interface PostalAddress {
  '@type': 'PostalAddress';
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
}

interface ImageObject {
  '@type': 'ImageObject';
  url: string;
}

interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: string;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

interface OrganizationJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  '@id': string;
  name: string;
  url: string;
  description?: string;
  sameAs?: string[];
  logo?: ImageObject;
  image?: ImageObject;
  address?: PostalAddress;
  aggregateRating?: AggregateRating;
}

interface PropertyValue {
  '@type': 'PropertyValue';
  name: string;
  value: string;
}

interface Offer {
  '@type': 'Offer';
  url: string;
  availability: string;
  priceValidUntil: string;
}

interface ProductJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Product';
  '@id': string;
  name: string;
  url: string;
  category: string;
  description?: string;
  image?: ImageObject;
  brand?: { '@type': 'Organization'; name: string; url: string };
  manufacturer?: { '@type': 'Organization'; name: string };
  additionalProperty?: PropertyValue[];
  aggregateRating?: AggregateRating;
  offers?: Offer[];
}

/**
 * Generate JSON-LD structured data for a roaster using Organization schema
 * @see https://schema.org/Organization
 */
export function generateRoasterJsonLd(roaster: Roaster): OrganizationJsonLd {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://latestgrind.com';

  const address: Partial<PostalAddress> = {};
  if (roaster.city || roaster.state || roaster.country) {
    address['@type'] = 'PostalAddress';
    if (roaster.city) address.addressLocality = roaster.city;
    if (roaster.state) address.addressRegion = roaster.state;
    if (roaster.country) address.addressCountry = roaster.country;
  }

  const jsonLd: OrganizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/roasters/${roaster.slug || roaster.id}`,
    name: roaster.name,
    url: `${baseUrl}/roasters/${roaster.slug || roaster.id}`,
  };

  // Add optional fields
  if (roaster.description) {
    jsonLd.description = roaster.description;
  }

  if (roaster.url) {
    jsonLd.sameAs = [roaster.url];
  }

  if (roaster.instagram) {
    const instagramUrl = `https://instagram.com/${roaster.instagram.replace('@', '')}`;
    if (jsonLd.sameAs) {
      jsonLd.sameAs.push(instagramUrl);
    } else {
      jsonLd.sameAs = [instagramUrl];
    }
  }

  if (roaster.logoUrl) {
    jsonLd.logo = {
      '@type': 'ImageObject',
      url: roaster.logoUrl,
    };
  }

  if (roaster.profileImageUrl) {
    jsonLd.image = {
      '@type': 'ImageObject',
      url: roaster.profileImageUrl,
    };
  }

  if (Object.keys(address).length > 1) {
    jsonLd.address = address as PostalAddress;
  }

  // Add aggregate rating if available
  if (roaster.beans && roaster.beans.length > 0) {
    const ratingsData = roaster.beans
      .filter((bean) => bean.averageRating && bean.reviews?.length)
      .map((bean) => ({
        rating: bean.averageRating!,
        count: bean.reviews?.length || 0,
      }));

    if (ratingsData.length > 0) {
      const totalRating = ratingsData.reduce(
        (sum, item) => sum + item.rating * item.count,
        0
      );
      const totalCount = ratingsData.reduce((sum, item) => sum + item.count, 0);

      if (totalCount > 0) {
        jsonLd.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: (totalRating / totalCount).toFixed(2),
          reviewCount: totalCount,
          bestRating: 5,
          worstRating: 1,
        };
      }
    }
  }

  return jsonLd;
}

/**
 * Generate JSON-LD structured data for a coffee bean using Product schema
 * @see https://schema.org/Product
 */
export function generateBeanJsonLd(bean: Bean): ProductJsonLd {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://latestgrind.com';

  const jsonLd: ProductJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/beans/${bean.slug || bean.id}`,
    name: bean.name,
    url: `${baseUrl}/beans/${bean.slug || bean.id}`,
    category: 'Coffee Bean',
  };

  // Add description
  if (bean.description) {
    jsonLd.description = bean.description;
  } else if (bean.notes) {
    jsonLd.description = `Coffee bean with tasting notes: ${bean.notes}`;
  } else {
    jsonLd.description = `${bean.name} coffee bean from ${bean.roaster?.name || 'specialty roaster'}`;
  }

  // Add image
  if (bean.imageUrl) {
    jsonLd.image = {
      '@type': 'ImageObject',
      url: bean.imageUrl,
    };
  }

  // Add brand (roaster)
  if (bean.roaster) {
    jsonLd.brand = {
      '@type': 'Organization',
      name: bean.roaster.name,
      url: `${baseUrl}/roasters/${bean.roaster.slug || bean.roaster.id}`,
    };
  }

  // Add manufacturer (same as brand for coffee)
  if (bean.roaster) {
    jsonLd.manufacturer = {
      '@type': 'Organization',
      name: bean.roaster.name,
    };
  }

  // Add additional product details as additionalProperty
  const additionalProperties = [];

  if (bean.origin) {
    additionalProperties.push({
      '@type': 'PropertyValue' as const,
      name: 'Origin',
      value: bean.origin,
    });
  }

  if (bean.process) {
    additionalProperties.push({
      '@type': 'PropertyValue' as const,
      name: 'Process',
      value: bean.process,
    });
  }

  if (bean.roastLevel) {
    additionalProperties.push({
      '@type': 'PropertyValue' as const,
      name: 'Roast Level',
      value: bean.roastLevel,
    });
  }

  if (bean.producer) {
    additionalProperties.push({
      '@type': 'PropertyValue' as const,
      name: 'Producer',
      value: bean.producer,
    });
  }

  if (bean.elevationMin) {
    const elevation = bean.elevationMax
      ? `${bean.elevationMin}-${bean.elevationMax} masl`
      : `${bean.elevationMin} masl`;
    additionalProperties.push({
      '@type': 'PropertyValue' as const,
      name: 'Elevation',
      value: elevation,
    });
  }

  if (additionalProperties.length > 0) {
    jsonLd.additionalProperty = additionalProperties;
  }

  // Add aggregate rating
  if (bean.averageRating && bean.reviewCount && bean.reviewCount > 0) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: bean.averageRating.toFixed(2),
      reviewCount: bean.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add offers (purchase links)
  if (bean.buyUrls && bean.buyUrls.length > 0) {
    jsonLd.offers = bean.buyUrls.map((url) => ({
      '@type': 'Offer',
      url: url,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // 30 days from now
    }));
  }

  return jsonLd;
}

/**
 * Safely stringify JSON-LD data with XSS protection
 * Replaces < characters to prevent script injection
 */
export function safeJsonLdStringify(
  jsonLd: OrganizationJsonLd | ProductJsonLd
): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}
