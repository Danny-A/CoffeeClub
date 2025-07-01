import { useQuery } from '@tanstack/react-query';

import { fetchRoaster } from '@/lib/api/fetchRoaster';
import { Roaster } from '@/lib/graphql/types';

export function useRoaster(id: string) {
  return useQuery<Roaster>({
    queryKey: ['roaster', id],
    queryFn: async () => {
      const response = await fetchRoaster(id);

      return response;
    },
    enabled: !!id,
  });
}
