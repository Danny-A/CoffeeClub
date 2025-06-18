import { revalidateTag } from 'next/cache';

import { graphqlFetch } from '../graphql/client';
import { RoastersUpdateInput } from '../graphql/generated/graphql';
import { UpdateRoasterDocument } from '../graphql/generated/graphql';
import { UpdateRoasterMutationVariables } from '../graphql/generated/graphql';
import { UpdateRoasterMutation } from '../graphql/generated/graphql';

export async function updateRoaster(input: RoastersUpdateInput) {
  const variables: UpdateRoasterMutationVariables = {
    id: input.id!,
    set: {
      name: input.name,
      description: input.description,
      location_country: input.location_country,
      location_city: input.location_city,
      location_state: input.location_state,
      url: input.url,
      instagram: input.instagram,
      profile_image_url: input.profile_image_url,
      logo_url: input.logo_url,
      is_published: input.is_published,
      updated_at: new Date().toISOString(),
    },
  };

  const response = await graphqlFetch<
    UpdateRoasterMutation,
    UpdateRoasterMutationVariables
  >(UpdateRoasterDocument, {
    variables,
  });

  if (!response.data?.updateroastersCollection?.records[0]) {
    console.error('No data returned:', response);
    throw new Error('Failed to update roaster: No data returned');
  }

  revalidateTag(`roaster-${input.id}`);
  revalidateTag('roasters');

  return response.data.updateroastersCollection.records[0];
}
