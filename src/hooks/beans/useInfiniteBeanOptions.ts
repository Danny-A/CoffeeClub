import { useInfiniteQuery } from '@tanstack/react-query';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  GetBeanOptionsDocument,
  GetBeanOptionsQuery,
  GetBeanOptionsQueryVariables,
} from '@/lib/graphql/generated/graphql';

export function useInfiniteBeanOptions(search: string) {
  return useInfiniteQuery({
    queryKey: ['bean-options', search],
    queryFn: async ({ pageParam }) => {
      const response = await graphqlFetch<
        GetBeanOptionsQuery,
        GetBeanOptionsQueryVariables
      >(GetBeanOptionsDocument, {
        variables: {
          search: search ? `%${search}%` : undefined,
          first: 30,
          after: pageParam as string | undefined,
        },
      });
      return response.data?.beansCollection;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pageInfo.hasNextPage) return null;
      return lastPage.pageInfo.endCursor;
    },
  });
}
