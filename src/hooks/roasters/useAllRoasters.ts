import { useQuery } from "@tanstack/react-query";

import { fetchAllRoasters } from "@/lib/api/fetchAllRoasters";

type RoasterOption = {
  id: string;
  name: string;
};

export function useAllRoasters() {
  return useQuery<RoasterOption[]>({
    queryKey: ["allRoasters"],
    queryFn: fetchAllRoasters,
  });
}
