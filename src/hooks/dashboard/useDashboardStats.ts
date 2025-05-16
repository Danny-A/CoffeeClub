import { useQuery } from "@tanstack/react-query";

import { fetchDashboardStats } from "@/lib/api/admin/fetchDashboardStats";

type ItemType = "beans" | "roasters" | "locations";

type ItemWithRating = {
  node: {
    id: string;
    name: string;
  };
  averageRating: number;
  reviewCount: number;
};

export function useDashboardStats(type: ItemType) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const getTopItems = (): ItemWithRating[] => {
    if (!data) return [];
    switch (type) {
      case "beans":
        return (data.beansCollection?.edges ?? []).map((edge) => ({
          node: {
            id: edge.node.id,
            name: edge.node.name,
          },
          averageRating: edge.node.average_rating ?? 0,
          reviewCount: edge.node.review_count ?? 0,
        }));
      case "roasters":
        return (data.roastersCollection?.edges ?? []).map((edge) => ({
          node: {
            id: edge.node.id,
            name: edge.node.name,
          },
          averageRating: edge.node.average_rating ?? 0,
          reviewCount: edge.node.review_count ?? 0,
        }));
      case "locations":
        return (data.locationsCollection?.edges ?? []).map((edge) => ({
          node: {
            id: edge.node.id,
            name: edge.node.name,
          },
          averageRating: edge.node.average_rating ?? 0,
          reviewCount: edge.node.review_count ?? 0,
        }));
      default:
        return [];
    }
  };

  return {
    items: getTopItems(),
    data: data?.dashboard_statsCollection?.edges[0]?.node,
    isLoading,
  };
}
