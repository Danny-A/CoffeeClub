import { graphqlFetch } from "../graphql/client";
import {
  BeansFilter,
  Exact,
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
  first?: number;
  after?: string;
};

export async function fetchBeans(
  filters?: BeanFilters,
): Promise<GetBeansQuery> {
  const { search, origin, process, roastLevel, first = 30, after } = filters ||
    {};

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
            { name: { contains: search.toLowerCase() } as StringFilter }),
          ...(origin && { origin: { eq: origin } as StringFilter }),
          ...(process && { process: { eq: process } as StringFilter }),
          ...(roastLevel && { roast_level: { eq: roastLevel as Roast_Level } }),
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
