import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchRecipes } from "@/lib/api/fetchRecipes";

export function useRecipes() {
  return useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: async ({ pageParam }) =>
      fetchRecipes({ first: 30, after: pageParam as string | undefined }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return null;
      return lastPage.pageInfo.endCursor;
    },
  });
}
