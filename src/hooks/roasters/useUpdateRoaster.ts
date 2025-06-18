import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateRoaster } from '@/lib/api/updateRoaster';
import { RoastersUpdateInput } from '@/lib/graphql/generated/graphql';

export function useUpdateRoaster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RoastersUpdateInput) => {
      return updateRoaster(input);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roaster', data.id] });
      queryClient.invalidateQueries({ queryKey: ['roasters'] });
    },
    onError: (error) => {
      console.error('Error updating roaster:', error);
    },
  });
}
