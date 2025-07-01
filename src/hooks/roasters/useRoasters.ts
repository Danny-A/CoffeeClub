import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchRoasters, type RoasterFilters } from '@/lib/api/fetchRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';
import { Roasters } from '@/lib/graphql/types';

export function useRoasters(filters?: Omit<RoasterFilters, 'first' | 'after'>) {
  return useInfiniteQuery<Roasters>({
    queryKey: ['roasters', filters],
    queryFn: async ({ pageParam }) => {
      const response = await fetchRoasters({
        ...filters,
        first: 30,
        after: pageParam as string | undefined,
      });

      return response;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return null;
      return lastPage.pageInfo.endCursor;
    },
  });
}
