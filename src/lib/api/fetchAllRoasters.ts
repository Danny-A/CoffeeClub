import { graphqlFetch } from "@/lib/graphql/client";
import {
  GetRoastersDocument,
  GetRoastersQuery,
} from "@/lib/graphql/generated/graphql";

export async function fetchAllRoasters() {
  const response = await graphqlFetch<GetRoastersQuery>(GetRoastersDocument, {
    variables: {
      filter: {
        is_published: { eq: true },
      },
      first: 1000,
    },
  });

  if (!response.data.roastersCollection) {
    return [];
  }

  return response.data.roastersCollection.edges.map((edge) => ({
    id: edge.node.id,
    name: edge.node.name,
  }));
}
