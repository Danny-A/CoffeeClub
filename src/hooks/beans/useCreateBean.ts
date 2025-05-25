import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { graphqlFetch } from "@/lib/graphql/client";
import {
  Bean_Type,
  BeansInsertInput,
  CreateBeanDocument,
  CreateBeanMutation,
  CreateBeanMutationVariables,
  Roast_Level,
  Roast_Type,
} from "@/lib/graphql/generated/graphql";
import { generateSlug } from "@/utils/slug";

export type CreateBeanInput = {
  name: string;
  roaster_id: string;
  description?: string;
  image_url?: string;
  roast_type?: Roast_Type;
  process?: string;
  roast_level?: Roast_Level;
  bean_type?: Bean_Type;
  elevation_min?: number;
  elevation_max?: number;
  origin?: string;
  producer?: string;
  notes?: string;
  buy_urls?: string[];
  is_published?: boolean;
};

export function useCreateBean() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateBeanInput) => {
      const id = uuidv4();
      const slug = generateSlug(input.name, id);

      const response = await graphqlFetch<
        CreateBeanMutation,
        CreateBeanMutationVariables
      >(CreateBeanDocument, {
        variables: {
          input: {
            id,
            name: input.name,
            roaster_id: input.roaster_id,
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
            slug,
          } satisfies BeansInsertInput,
        },
      });

      if (!response.data?.insertIntobeansCollection?.records[0]) {
        throw new Error("Failed to create bean");
      }

      return response.data.insertIntobeansCollection.records[0];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bean", data.id] });
      queryClient.invalidateQueries({ queryKey: ["beans"] });
    },
  });
}
