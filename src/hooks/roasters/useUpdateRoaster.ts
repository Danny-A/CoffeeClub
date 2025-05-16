import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRoaster } from "@/lib/api/roasters/updateRoaster";
import { RoastersUpdateInput } from "@/lib/graphql/generated/graphql";

export function useUpdateRoaster() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RoastersUpdateInput) => {
      return updateRoaster(input);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["roasters"] });
      queryClient.invalidateQueries({ queryKey: ["roaster", data.id] });
    },
    onError: (error) => {
      console.error("Error updating roaster:", error);
    },
  });
}
