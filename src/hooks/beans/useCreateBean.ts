import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  Bean_Status,
  Bean_Type,
  BeansInsertInput,
  CreateBeanDocument,
  CreateBeanMutation,
  CreateBeanMutationVariables,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';
import { generateSlug } from '@/utils/slug';

export type CreateBeanInput = {
  name: string;
  roasterId: string;
  description?: string;
  imageUrl?: string;
  roast_type?: Roast_Type;
  process?: string;
  roastLevel?: Roast_Level;
  beanType?: Bean_Type;
  elevationMin?: number;
  elevationMax?: number;
  origin?: string;
  producer?: string;
  notes?: string;
  buyUrls?: string[];
  status?: Bean_Status;
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
            roaster_id: input.roasterId,
            description: input.description,
            image_url: input.imageUrl,
            roast_type: input.roast_type,
            process: input.process,
            roast_level: input.roastLevel,
            bean_type: input.beanType,
            elevation_min: input.elevationMin,
            elevation_max: input.elevationMax,
            origin: input.origin,
            producer: input.producer,
            notes: input.notes,
            buy_urls: input.buyUrls,
            status: input.status,
            slug,
          } satisfies BeansInsertInput,
        },
      });

      if (!response.data?.insertIntobeansCollection?.records[0]) {
        throw new Error('Failed to create bean');
      }

      return response.data.insertIntobeansCollection.records[0];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bean', data.id] });
      queryClient.invalidateQueries({ queryKey: ['beans'] });
    },
  });
}
