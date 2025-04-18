import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchRoasters, type RoasterFilters } from "@/lib/api/fetchRoasters";
import { GetRoastersQuery } from "@/lib/graphql/generated/graphql";
import { Roaster } from "@/lib/graphql/types";

type RoastersResponse = {
  edges: {
    node: Roaster;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

function transformRoastersData(
  data: NonNullable<GetRoastersQuery["roastersCollection"]>,
): RoastersResponse {
  return {
    edges: data.edges.map((roaster) => ({
      node: {
        id: roaster.node.id,
        name: roaster.node.name,
        city: roaster.node.location_city || undefined,
        state: roaster.node.location_state || undefined,
        country: roaster.node.location_country || undefined,
        url: roaster.node.url || undefined,
        instagram: roaster.node.instagram || undefined,
        beanCount: roaster.node.beansCollection?.edges.length || 0,
        created_at: roaster.node.created_at,
        likes: roaster.node.roaster_likesCollection?.edges.map((edge) => ({
          id: edge.node.id,
          user_id: edge.node.user_id || "",
        })) || [],
      },
    })),
    pageInfo: {
      hasNextPage: data.pageInfo.hasNextPage,
      endCursor: data.pageInfo.endCursor || null,
    },
  };
}

export function useRoasters(
  filters?: Omit<RoasterFilters, "first" | "after">,
  initialData?: NonNullable<GetRoastersQuery["roastersCollection"]>,
) {
  return useInfiniteQuery<RoastersResponse>({
    queryKey: ["roasters", filters],
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
    initialData: !filters && initialData
      ? {
        pages: [transformRoastersData(initialData)],
        pageParams: [null],
      }
      : undefined,
  });
}
