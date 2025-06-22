import { useMutation, useQueryClient } from '@tanstack/react-query';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  UpdateBeanStatusDocument,
  Bean_Status,
} from '@/lib/graphql/generated/graphql';

interface UpdateBeanStatusParams {
  id: string;
  status: Bean_Status;
}

export function useUpdateBeanStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateBeanStatusParams) => {
      const result = await graphqlFetch(UpdateBeanStatusDocument, {
        variables: { id, status },
      });
      return result.data?.updatebeansCollection;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['beans'] });
      queryClient.invalidateQueries({
        queryKey: ['bean', data?.records[0]?.id],
      });
    },
  });
}
