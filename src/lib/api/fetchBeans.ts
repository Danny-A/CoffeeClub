import { graphqlFetch } from "../graphql/client";
import {
  BeansFilter,
  BigFloatFilter,
  Exact,
  FilterIs,
  GetBeansDocument,
  GetBeansQuery,
  Roast_Level,
  StringFilter,
} from "../graphql/generated/graphql";

export type BeanFilters = {
  search?: string;
  origin?: string;
  process?: string;
  roastLevel?: string;
  minRating?: number;
  maxRating?: number;
  first?: number;
  after?: string;
};

export async function fetchBeans(
  filters?: BeanFilters,
): Promise<GetBeansQuery> {
  const {
    search,
    origin,
    process,
    roastLevel,
    minRating,
    maxRating,
    first = 30,
    after,
  } = filters || {};

  const response = await graphqlFetch<
    GetBeansQuery,
    Exact<{
      filter?: BeansFilter;
      first?: number;
      after?: string;
    }>
  >(
    GetBeansDocument,
    {
      variables: {
        filter: {
          ...(search &&
            { name: { ilike: `%${search.toLowerCase()}%` } as StringFilter }),
          ...(origin && { origin: { eq: origin } as StringFilter }),
          ...(process && { process: { eq: process } as StringFilter }),
          ...(roastLevel && { roast_level: { eq: roastLevel as Roast_Level } }),
          is_published: { eq: true },
          ...(minRating !== undefined || maxRating !== undefined) && {
            and: [
              { average_rating: { is: FilterIs.NotNull } },
              {
                average_rating: {
                  ...(minRating !== undefined && { gte: minRating.toString() }),
                  ...(maxRating !== undefined && { lte: maxRating.toString() }),
                } as BigFloatFilter,
              },
            ],
          },
        },
        first,
        after,
      },
    },
  );

  if (!response.data.beansCollection) {
    return { beansCollection: null };
  }

  return response.data;
}
