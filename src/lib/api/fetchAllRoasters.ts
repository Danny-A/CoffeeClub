import { graphqlFetch } from "@/lib/graphql/client";
import {
  GetAllRoastersDocument,
  GetAllRoastersQuery,
  GetRoastersDocument,
  GetRoastersQuery,
  GetRoastersQueryVariables,
} from "@/lib/graphql/generated/graphql";

export async function fetchAllRoasters() {
  const response = await graphqlFetch<GetAllRoastersQuery>(
    GetAllRoastersDocument,
    {
      variables: {
        first: 1000,
      },
    },
  );

  if (!response.data.roastersCollection) {
    return [];
  }

  return response.data.roastersCollection.edges.map((edge) => ({
    id: edge.node.id,
    name: edge.node.name,
  }));
}

// New paginated fetcher for ComboBox
export async function fetchRoasterOptionsPage(
  { first = 30, after, search }: {
    first?: number;
    after?: string | null;
    search?: string;
  },
) {
  const response = await graphqlFetch<
    GetRoastersQuery,
    GetRoastersQueryVariables
  >(
    GetRoastersDocument,
    {
      variables: {
        filter: {
          ...(search && { name: { ilike: `%${search.toLowerCase()}%` } }),
          is_published: { eq: true },
        },
        first,
        after: after || undefined,
      },
    },
  );

  const collection = response.data.roastersCollection;
  return {
    edges: collection?.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
    })) || [],
    pageInfo: {
      hasNextPage: collection?.pageInfo?.hasNextPage ?? false,
      endCursor: collection?.pageInfo?.endCursor ?? null,
    },
  };
}
