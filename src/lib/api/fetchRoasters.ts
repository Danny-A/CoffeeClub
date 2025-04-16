import { graphqlFetch } from "@/lib/graphql/client";
import {
  GetRoastersDocument,
  GetRoastersQuery,
  GetRoastersQueryVariables,
} from "@/lib/graphql/generated/graphql";

export type RoasterFilters = {
  search?: string;
  country?: string;
  first?: number;
  after?: string;
};

export async function fetchRoasters(
  filters?: RoasterFilters,
): Promise<GetRoastersQuery> {
  const response = await graphqlFetch<
    GetRoastersQuery,
    GetRoastersQueryVariables
  >(
    GetRoastersDocument,
    {
      variables: {
        first: filters?.first,
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

  let roasters = response.data.roastersCollection;

  if (filters) {
    roasters = {
      ...roasters,
      edges: roasters.edges.filter((roaster) => {
        const matchesSearch = !filters.search ||
          roaster.node.name.toLowerCase().includes(
            filters.search.toLowerCase(),
          ) ||
          roaster.node.location_city
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          roaster.node.location_state
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          roaster.node.location_country
            ?.toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesCountry = !filters.country ||
          roaster.node.location_country === filters.country;

        return matchesSearch && matchesCountry;
      }),
    };
  }

  return { roastersCollection: roasters };
}
