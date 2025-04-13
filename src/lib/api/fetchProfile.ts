import { graphqlFetch } from "../graphql/client";
import { GetProfileQuery, ProfilesEdge } from "../graphql/generated/graphql";
import { GetProfileDocument } from "../graphql/generated/graphql";
import { Exact } from "../graphql/generated/graphql";
import { createClient } from "../supabase/server";

export async function fetchProfile(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) return null;

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
