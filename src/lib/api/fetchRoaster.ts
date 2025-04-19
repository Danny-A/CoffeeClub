import { graphqlFetch } from "../graphql/client";
import { GetRoasterQuery, RoastersFilter } from "../graphql/generated/graphql";
import { GetRoasterDocument } from "../graphql/generated/graphql";

export async function fetchRoaster(id: string) {
  const response = await graphqlFetch<
    GetRoasterQuery,
    { id: string; filter: RoastersFilter }
  >(GetRoasterDocument, {
    variables: {
      id,
      filter: {
        id: { eq: id },
        is_published: { eq: true },
      },
    },
  });

  const roaster = response.data.roastersCollection?.edges[0]?.node;

  if (!roaster) throw new Error("Roaster not found");

  return roaster;
}
