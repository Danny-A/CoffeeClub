import { useQuery } from "@tanstack/react-query";

import { fetchRoaster } from "@/lib/api/fetchRoaster";
import { GetRoasterQuery } from "@/lib/graphql/generated/graphql";

type Roaster = NonNullable<
  GetRoasterQuery["roastersCollection"]
>["edges"][0]["node"];

export function useRoaster(id: string) {
  return useQuery<Roaster>({
    queryKey: ["roaster", id],
    queryFn: async () => {
      const response = await fetchRoaster(id);

      return response;
    },
    enabled: !!id,
  });
}
