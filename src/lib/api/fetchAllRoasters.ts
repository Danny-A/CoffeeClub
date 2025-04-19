import { graphqlFetch } from "@/lib/graphql/client";
import {
  GetAllRoastersDocument,
  GetAllRoastersQuery,
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
