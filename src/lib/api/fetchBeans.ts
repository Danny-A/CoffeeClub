import { transformBeansData } from '@/utils/transformBeansData';

import { graphqlFetch } from '../graphql/client';
import {
  Bean_Status,
  BeansOrderBy,
  BigFloatFilter,
  BooleanFilter,
  FilterIs,
  GetBeansDocument,
  GetBeansQuery,
  GetBeansQueryVariables,
  Roast_Level,
  StringFilter,
} from '../graphql/generated/graphql';
import { Beans } from '../graphql/types';

export type BeanFilters = {
  search?: string;
  origin?: string;
  process?: string;
  roastLevel?: string;
  minRating?: number;
  maxRating?: number;
  first?: number;
  after?: string;
  includeUnpublished?: boolean;
  orderBy?: BeansOrderBy[];
};

export async function fetchBeans(filters?: BeanFilters): Promise<Beans> {
  const {
    search,
    origin,
    process,
    roastLevel,
    minRating,
    maxRating,
    first = 30,
    after,
    includeUnpublished = false,
    orderBy,
  } = filters || {};

  // Generate specific cache tags based on filters
  const cacheTags = ['beans'];

  // Add more specific tags for better cache invalidation
  if (origin) cacheTags.push(`beans-origin-${origin}`);
  if (process) cacheTags.push(`beans-process-${process}`);
  if (roastLevel) cacheTags.push(`beans-roast-${roastLevel}`);
  if (includeUnpublished) cacheTags.push('beans-admin'); // Admin view includes unpublished
  if (minRating || maxRating) cacheTags.push('beans-rated');

  // Add homepage tag for homepage queries
  if (
    !search &&
    !origin &&
    !process &&
    !roastLevel &&
    !minRating &&
    !maxRating
  ) {
    cacheTags.push('homepage');
  }

  const response = await graphqlFetch<GetBeansQuery, GetBeansQueryVariables>(
    GetBeansDocument,
    {
      variables: {
        filter: {
          ...(search && {
            name: { ilike: `%${search.toLowerCase()}%` } as StringFilter,
          }),
          ...(origin && { origin: { eq: origin } as StringFilter }),
          ...(process && { process: { eq: process } as StringFilter }),
          ...(roastLevel && { roast_level: { eq: roastLevel as Roast_Level } }),
          ...(!includeUnpublished && {
            status: { eq: Bean_Status.Published },
          }),
          ...((minRating !== undefined || maxRating !== undefined) && {
            and: [
              { average_rating: { is: FilterIs.NotNull } },
              {
                average_rating: {
                  ...(minRating !== undefined && { gte: minRating }),
                  ...(maxRating !== undefined && { lte: maxRating }),
                } as BigFloatFilter,
              },
            ],
          }),
        },
        first,
        after,
        ...(orderBy && { orderBy }),
      },
      tags: cacheTags,
    }
  );

  if (!response.data.beansCollection) {
    return {
      beans: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  return transformBeansData(response.data.beansCollection);
}
