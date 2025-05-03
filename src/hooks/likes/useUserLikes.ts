import { useQuery } from "@tanstack/react-query";

import { fetchLikes } from "@/lib/api/fetchLikes";

export type LikeType = "bean" | "roaster" | "location";

export function useUserLikes(userId: string, type?: LikeType) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["user-likes", userId, type],
    queryFn: async () => {
      const response = await fetchLikes(userId);
      return response;
    },
    enabled: !!userId,
  });

  if (!data) {
    return {
      likes: undefined,
      isLoading,
      error,
      isFetching,
    };
  }

  const beanLikes = data?.bean_likesCollection?.edges.map((edge) => ({
    id: edge.node.id,
    createdAt: edge.node.created_at,
    type: "bean" as const,
    item: edge.node.beans!,
  }));

  const roasterLikes = data?.roaster_likesCollection?.edges.map((edge) => ({
    id: edge.node.id,
    createdAt: edge.node.created_at,
    type: "roaster" as const,
    item: edge.node.roasters!,
  }));

  const locationLikes = data?.location_likesCollection?.edges.map((edge) => ({
    id: edge.node.id,
    createdAt: edge.node.created_at,
    type: "location" as const,
    item: edge.node.locations!,
  }));

  const allLikes = [
    ...(beanLikes || []),
    ...(roasterLikes || []),
    ...(locationLikes || []),
  ].sort((a, b) => {
    return new Date(b.createdAt!) > new Date(a.createdAt!) ? 1 : -1;
  });

  const filteredLikes = type
    ? allLikes.filter((like) => like.type === type)
    : allLikes;

  return {
    likes: filteredLikes,
    isLoading,
    error,
    isFetching,
    data,
  };
}
