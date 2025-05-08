import { useMutation, useQueryClient } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/client";
import {
  CreateRecipeDocument,
  CreateRecipeMutation,
  CreateRecipeMutationVariables,
  RecipesInsertInput,
} from "@/lib/graphql/generated/graphql";

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RecipesInsertInput) => {
      const response = await graphqlFetch<
        CreateRecipeMutation,
        CreateRecipeMutationVariables
      >(CreateRecipeDocument, {
        variables: { input },
      });

      const record = response.data?.insertIntorecipesCollection?.records?.[0];

      if (!record) throw new Error("Failed to create recipe");

      return record;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["recipe", data.id] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
