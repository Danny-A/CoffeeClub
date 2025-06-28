import { useInfiniteQuery } from '@tanstack/react-query';

import { BeanFilters, fetchBeans } from '@/lib/api/fetchBeans';
import { GetBeansQuery } from '@/lib/graphql/generated/graphql';

export type BeansQuery = NonNullable<GetBeansQuery['beansCollection']>;

export function useBeans(filters?: Omit<BeanFilters, 'first' | 'after'>) {
  return useInfiniteQuery({
    queryKey: ['beans', filters],
    queryFn: async ({ pageParam }) => {
      const response = await fetchBeans({
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
