import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchRoasters, type RoasterFilters } from '@/lib/api/fetchRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';
import { Roaster } from '@/lib/graphql/types';
import { isNew } from '@/utils/isNew';

type RoastersQuery = NonNullable<GetRoastersQuery['roastersCollection']>;
type RoastersResponse = {
  edges: Array<{ node: Roaster }>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export function transformRoastersData(data: RoastersQuery): RoastersResponse {
  return {
    edges: data.edges.map((roaster) => ({
      node: {
        id: roaster.node.id,
        slug: roaster.node.slug ?? roaster.node.id,
        name: roaster.node.name,
        city: roaster.node.location_city || undefined,
        state: roaster.node.location_state || undefined,
        country: roaster.node.location_country || undefined,
        beanCount: roaster.node.bean_count || 0,
        created_at: roaster.node.created_at,
        is_published: roaster.node.is_published,
        likes:
          roaster.node.roaster_likesCollection?.edges.map((edge) => ({
            id: edge.node.id,
            user_id: edge.node.user_id || '',
          })) || [],
        isNew: isNew(roaster.node.created_at),
      },
    })),
    pageInfo: {
      hasNextPage: data.pageInfo.hasNextPage,
      endCursor: data.pageInfo.endCursor || null,
    },
  };
}

export function useRoasters(filters?: Omit<RoasterFilters, 'first' | 'after'>) {
  return useInfiniteQuery<RoastersResponse>({
    queryKey: ['roasters', filters],
    queryFn: async ({ pageParam }) => {
      const response = await fetchRoasters({
        ...filters,
        first: 30,
        after: pageParam as string | undefined,
      });
      return transformRoastersData(response.roastersCollection!);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return null;
      return lastPage.pageInfo.endCursor;
    },
  });
}
