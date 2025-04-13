import { graphqlFetch } from "@/lib/graphql/client";
import {
  Exact,
  GetRoastersDocument,
  GetRoastersQuery,
} from "@/lib/graphql/generated/graphql";

export type RoasterFilters = {
  search?: string;
  country?: string;
};

export async function fetchRoasters(
  filters?: RoasterFilters,
): Promise<GetRoastersQuery> {
  const response = await graphqlFetch<
    GetRoastersQuery,
    Exact<{ [key: string]: never }>
  >(GetRoastersDocument);

  if (!response.data.roastersCollection) {
    return { roastersCollection: { edges: [] } };
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
