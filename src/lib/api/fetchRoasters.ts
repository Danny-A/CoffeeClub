import { graphqlFetch } from "@/lib/graphql/client";
import {
  BooleanFilter,
  GetRoastersDocument,
  GetRoastersQuery,
  RoastersFilter,
  StringFilter,
} from "@/lib/graphql/generated/graphql";

export type RoasterFilters = {
  search?: string;
  country?: string;
  first?: number;
  after?: string;
  isPublished?: boolean;
};

export async function fetchRoasters(
  filters?: RoasterFilters,
): Promise<GetRoastersQuery> {
  const response = await graphqlFetch<GetRoastersQuery>(
    GetRoastersDocument,
    {
      variables: {
        filter: {
          is_published: { eq: true } as BooleanFilter,
          ...(filters?.search && {
            or: [
              {
                name: {
                  ilike: `%${filters.search.toLowerCase()}%`,
                } as StringFilter,
              },
              {
                location_city: {
                  ilike: `%${filters.search.toLowerCase()}%`,
                } as StringFilter,
              },
              {
                location_state: {
                  ilike: `%${filters.search.toLowerCase()}%`,
                } as StringFilter,
              },
              {
                location_country: {
                  ilike: `%${filters.search.toLowerCase()}%`,
                } as StringFilter,
              },
            ],
          }),
          ...(filters?.country && {
            location_country: { eq: filters.country } as StringFilter,
          }),
        } as RoastersFilter,
        first: filters?.first ?? 30,
        after: filters?.after,
      },
    },
  );

  if (!response.data.roastersCollection) {
    return {
      roastersCollection: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      },
    };
  }

  return response.data;
}
