import { graphqlFetch } from "@/lib/graphql/client";
import { BeansUpdateInput } from "@/lib/graphql/generated/graphql";
import { UpdateBeanDocument } from "@/lib/graphql/generated/graphql";
import { UpdateBeanMutationVariables } from "@/lib/graphql/generated/graphql";
import { UpdateBeanMutation } from "@/lib/graphql/generated/graphql";

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
      is_published: input.is_published,
      updated_at: new Date().toISOString(),
    },
  };

  const response = await graphqlFetch<
    UpdateBeanMutation,
    UpdateBeanMutationVariables
  >(UpdateBeanDocument, {
    variables,
  });

  if (!response.data?.updatebeansCollection?.records[0]) {
    console.error("No data returned:", response);
    throw new Error("Failed to update bean: No data returned");
  }

  return response.data.updatebeansCollection.records[0];
}
