import { useInfiniteQuery } from "@tanstack/react-query";

import { BeanFilters, fetchBeans } from "@/lib/api/fetchBeans";
import { GetBeansQuery } from "@/lib/graphql/generated/graphql";
import { Bean } from "@/lib/graphql/types";

type BeansQuery = NonNullable<GetBeansQuery["beansCollection"]>;
type BeansResponse = {
  edges: Array<{ node: Bean }>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

function transformBeansData(data: BeansQuery): BeansResponse {
  return {
    edges: data.edges.map((bean) => ({
      ...bean,
      node: {
        id: bean.node.id,
        name: bean.node.name,
        origin: bean.node.origin || "",
        process: bean.node.process || "",
        roastLevel: bean.node.roast_level || "",
        notes: bean.node.notes || "",
        roaster: {
          id: bean.node.roasters?.id,
          name: bean.node.roasters?.name || "",
        },
        createdAt: bean.node.created_at,
        updatedAt: bean.node.created_at,
        averageRating: bean.node.average_rating || 0,
        is_published: bean.node.is_published,
        reviews: bean.node.bean_reviewsCollection?.edges.map((edge) => ({
          id: edge.node.id,
          rating: edge.node.rating || 0,
        })),
        likes: bean.node.bean_likesCollection?.edges.map((edge) => ({
          id: edge.node.id,
          user_id: edge.node.user_id,
        })),
      },
    })),
    pageInfo: {
      hasNextPage: data.pageInfo.hasNextPage,
      endCursor: data.pageInfo.endCursor || null,
    },
  };
}

export function useBeans(
  filters?: Omit<BeanFilters, "first" | "after">,
) {
  return useInfiniteQuery<BeansResponse>({
    queryKey: ["beans", filters],
    queryFn: async ({ pageParam }) => {
      const response = await fetchBeans({
        ...filters,
        first: 30,
        after: pageParam as string | undefined,
      });
      return transformBeansData(response.beansCollection!);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return null;
      return lastPage.pageInfo.endCursor;
    },
  });
}
