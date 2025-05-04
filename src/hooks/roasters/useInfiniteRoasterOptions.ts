import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchRoasterOptionsPage } from "@/lib/api/fetchAllRoasters";

type RoasterOption = {
  id: string;
  name: string;
};

type RoasterOptionsPage = {
  edges: RoasterOption[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export function useInfiniteRoasterOptions(search?: string) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<RoasterOptionsPage, Error>({
    queryKey: ["roaster-options", search],
    queryFn: ({ pageParam }) =>
      fetchRoasterOptionsPage({
        after: pageParam as string | undefined,
        search,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialPageParam: undefined,
  });

  const options: RoasterOption[] = data
    ? data.pages.flatMap((page) => page.edges)
    : [];

  return {
    options,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
