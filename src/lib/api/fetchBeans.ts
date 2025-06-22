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

export async function fetchBeans(
  filters?: BeanFilters
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
    includeUnpublished = false,
    orderBy,
  } = filters || {};

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
    }
  );

  if (!response.data.beansCollection) {
    return { beansCollection: null };
  }
  console.log(response.data);
  return response.data;
}
