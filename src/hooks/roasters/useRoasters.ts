import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/useDebounce";
import { fetchRoasters, RoasterFilters } from "@/lib/api/fetchRoasters";
import { GetRoastersQuery } from "@/lib/graphql/generated/graphql";

type RoastersQuery = NonNullable<GetRoastersQuery["roastersCollection"]>;

export function useRoasters(
  filters?: RoasterFilters,
  initialData?: RoastersQuery,
) {
  const debouncedFilters = useDebounce(filters, 300);

  return useQuery<RoastersQuery>({
    queryKey: ["roasters", debouncedFilters],
    queryFn: async () => {
      const response = await fetchRoasters(filters);
      return response.roastersCollection!;
    },
    initialData: !filters ? initialData : undefined,
  });
}
