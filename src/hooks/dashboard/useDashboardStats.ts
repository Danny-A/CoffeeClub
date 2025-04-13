import { useQuery } from "@tanstack/react-query";

import { fetchDashboardStats } from "@/lib/api/fetchDashboardStats";

type ItemType = "beans" | "roasters" | "locations";

type ItemWithRating = {
  node: {
    id: string;
    name: string;
  };
  averageRating: number;
};

function calculateAverageRating(
  reviews:
    | { edges: Array<{ node: { rating?: number | null } }> }
    | null
    | undefined,
) {
  if (!reviews?.edges.length) return 0;

  const validRatings = reviews.edges
    .map((edge) => edge.node.rating)
    .filter((rating): rating is number =>
      rating !== null && rating !== undefined
    );

  if (!validRatings.length) return 0;

  return validRatings.reduce((sum, rating) => sum + rating, 0) /
    validRatings.length;
}

export function useDashboardStats(type: ItemType) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const getTopItems = (): ItemWithRating[] => {
    if (!data?.data) return [];

    switch (type) {
      case "beans":
        return (data.data.beansCollection?.edges ?? [])
          .map((edge) => ({
            node: {
              id: edge.node.id,
              name: edge.node.name,
            },
            averageRating: calculateAverageRating(
              edge.node.bean_reviewsCollection,
            ),
          }))
          .filter((item) => item.averageRating > 0)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5);
      case "roasters":
        return (data.data.roastersCollection?.edges ?? [])
          .map((edge) => ({
            node: {
              id: edge.node.id,
              name: edge.node.name,
            },
            averageRating: calculateAverageRating(
              edge.node.roaster_reviewsCollection,
            ),
          }))
          .filter((item) => item.averageRating > 0)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5);
      case "locations":
        return (data.data.locationsCollection?.edges ?? [])
          .map((edge) => ({
            node: {
              id: edge.node.id,
              name: edge.node.name,
            },
            averageRating: calculateAverageRating(
              edge.node.location_reviewsCollection,
            ),
          }))
          .filter((item) => item.averageRating > 0)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5);
      default:
        return [];
    }
  };

  return {
    items: getTopItems(),
    data: data?.data,
    isLoading,
  };
}
