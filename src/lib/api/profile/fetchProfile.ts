import { graphqlFetch } from "@/lib/graphql/client";
import { GetProfileQuery, ProfilesEdge } from "@/lib/graphql/generated/graphql";
import { GetProfileDocument } from "@/lib/graphql/generated/graphql";
import { Exact } from "@/lib/graphql/generated/graphql";

export async function fetchProfile(id: string) {
  if (!id) return null;

  const response = await graphqlFetch<
    GetProfileQuery,
    Exact<{ id: string }>
  >(GetProfileDocument, {
    variables: { id },
  });

  return response.data.profilesCollection?.edges[0]?.node as
    | ProfilesEdge["node"]
    | null;
}
