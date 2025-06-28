import { useQuery } from '@tanstack/react-query';

import { fetchBean } from '@/lib/api/fetchBean';
import { Bean } from '@/lib/graphql/types';

export function useBean(id: string, includeUnpublished = false) {
  return useQuery<Bean>({
    queryKey: ['bean', id],
    queryFn: async () => {
      const response = await fetchBean(id, includeUnpublished);

      return response;
    },
    enabled: !!id,
  });
}
