import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  CreateRecipeDocument,
  CreateRecipeMutation,
  CreateRecipeMutationVariables,
  RecipesInsertInput,
} from '@/lib/graphql/generated/graphql';
import { generateSlug } from '@/utils/slug';

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RecipesInsertInput) => {
      const id = uuidv4();
      const slug = generateSlug(input.title ?? 'recipe', id);

      const response = await graphqlFetch<
        CreateRecipeMutation,
        CreateRecipeMutationVariables
      >(CreateRecipeDocument, {
        variables: { input: { ...input, id, slug } },
      });

      const record = response.data?.insertIntorecipesCollection?.records?.[0];

      if (!record) throw new Error('Failed to create recipe');

      return record;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipe', data.id] });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}
