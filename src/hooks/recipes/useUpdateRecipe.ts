import { useMutation, useQueryClient } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/client";
import {
  UpdateRecipeDocument,
  UpdateRecipeMutation,
  UpdateRecipeMutationVariables,
} from "@/lib/graphql/generated/graphql";

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: UpdateRecipeMutationVariables["set"] & { id: string },
    ) => {
      const { id, ...fields } = input;
      const res = await graphqlFetch<
        UpdateRecipeMutation,
        UpdateRecipeMutationVariables
      >(
        UpdateRecipeDocument,
        {
          variables: {
            id,
            set: fields,
          },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
