import { useInfiniteQuery } from '@tanstack/react-query';

import { graphqlFetch } from '@/lib/graphql/client';
import {
  Bean_Status,
  GetBeansQuery,
  GetBeansQueryVariables,
} from '@/lib/graphql/generated/graphql';
import { GetBeansDocument } from '@/lib/graphql/generated/graphql';

export function useBeansByStatus(status: Bean_Status) {
  return useInfiniteQuery<GetBeansQuery, Error>({
    queryKey: ['beans', 'status', status],
    queryFn: async ({ pageParam }) => {
      const result = await graphqlFetch<GetBeansQuery, GetBeansQueryVariables>(
        GetBeansDocument,
        {
          variables: {
            filter: { status: { eq: status } },
            first: 20,
            after: pageParam,
          },
        }
      );
      return result.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.beansCollection?.pageInfo.hasNextPage
        ? lastPage.beansCollection.pageInfo.endCursor
        : undefined;
    },
  });
}
