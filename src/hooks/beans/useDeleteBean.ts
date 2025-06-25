import { useMutation, useQueryClient } from '@tanstack/react-query';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  DeleteBeanDocument,
  DeleteBeanMutation,
  DeleteBeanMutationVariables,
} from '@/lib/graphql/generated/graphql';

export function useDeleteBean() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await graphqlFetch<
        DeleteBeanMutation,
        DeleteBeanMutationVariables
      >(DeleteBeanDocument, {
        variables: { id },
      });
      return result.data?.deleteFrombeansCollection.records[0];
    },
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: ['bean', data.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['beans'] });
    },
  });
}
