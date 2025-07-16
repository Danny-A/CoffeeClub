import { graphqlFetch } from '../graphql/client';
import { GetProfileQuery, ProfilesEdge } from '../graphql/generated/graphql';
import { GetProfileDocument } from '../graphql/generated/graphql';
import { Exact } from '../graphql/generated/graphql';

export async function fetchProfile(id: string) {
  if (!id) return null;

  const response = await graphqlFetch<GetProfileQuery, Exact<{ id: string }>>(
    GetProfileDocument,
    {
      variables: { id },
      cache: 'force-cache',
      tags: [`profile-${id}`, 'profiles'],
    }
  );

  return response.data.profilesCollection?.edges[0]?.node as
    | ProfilesEdge['node']
    | null;
}
