import { transformRoastersData } from '@/utils/transformRoastersData';

import { graphqlFetch } from '../graphql/client';
import {
  BooleanFilter,
  GetRoastersDocument,
  GetRoastersQuery,
  GetRoastersQueryVariables,
  RoastersFilter,
  StringFilter,
} from '../graphql/generated/graphql';

export type RoasterFilters = {
  search?: string;
  city?: string;
  state?: string;
  country?: string;
  first?: number;
  after?: string;
  includeUnpublished?: boolean;
  orderBy?: any;
};

export async function fetchRoasters(filters?: RoasterFilters) {
  const {
    search,
    city,
    state,
    country,
    first = 30,
    after,
    includeUnpublished = false,
    orderBy,
  } = filters || {};

  const response = await graphqlFetch<
    GetRoastersQuery,
    GetRoastersQueryVariables
  >(GetRoastersDocument, {
    variables: {
      filter: {
        ...(search && {
          name: { ilike: `%${search.toLowerCase()}%` } as StringFilter,
        }),
        ...(city && { location_city: { eq: city } as StringFilter }),
        ...(state && { location_state: { eq: state } as StringFilter }),
        ...(country && { location_country: { eq: country } as StringFilter }),
        ...(!includeUnpublished && {
          is_published: { eq: true } as BooleanFilter,
        }),
      } as RoastersFilter,
      first,
      after,
      ...(orderBy && { orderBy }),
    },
  });

  if (!response.data.roastersCollection) {
    return {
      roasters: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  return transformRoastersData(response.data);
}
