import { revalidateBean, revalidateHomepage } from '@/lib/utils/revalidation';

import { graphqlFetch } from '../graphql/client';
import { BeansUpdateInput } from '../graphql/generated/graphql';
import { UpdateBeanDocument } from '../graphql/generated/graphql';
import { UpdateBeanMutationVariables } from '../graphql/generated/graphql';
import { UpdateBeanMutation } from '../graphql/generated/graphql';

export async function updateBean(input: BeansUpdateInput) {
  const variables: UpdateBeanMutationVariables = {
    id: input.id!,
    set: {
      name: input.name,
      description: input.description,
      image_url: input.image_url,
      roast_type: input.roast_type,
      process: input.process,
      roast_level: input.roast_level,
      bean_type: input.bean_type,
      elevation_min: input.elevation_min,
      elevation_max: input.elevation_max,
      origin: input.origin,
      producer: input.producer,
      notes: input.notes,
      buy_urls: input.buy_urls,
      status: input.status,
      updated_at: new Date().toISOString(),
    },
  };

  const response = await graphqlFetch<
    UpdateBeanMutation,
    UpdateBeanMutationVariables
  >(UpdateBeanDocument, {
    variables,
    // Use no-cache for mutations to ensure fresh data
    cache: 'no-store',
  });

  if (!response.data?.updatebeansCollection?.records[0]) {
    console.error('No data returned:', response);
    throw new Error('Failed to update bean: No data returned');
  }

  const updatedBean = response.data.updatebeansCollection.records[0];

  // Invalidate relevant caches after successful update
  await revalidateBean(updatedBean.id);
  await revalidateHomepage();

  return updatedBean;
}
