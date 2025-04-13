import { useQuery } from "@tanstack/react-query";

import { fetchBean } from "@/lib/api/fetchBean";
import { GetBeanQuery } from "@/lib/graphql/generated/graphql";

type Bean = NonNullable<GetBeanQuery["beansCollection"]>["edges"][0]["node"];

export function useBean(id: string) {
  return useQuery<Bean>({
    queryKey: ["bean", id],
    queryFn: async () => {
      const response = await fetchBean(id);

      return response;
    },
    enabled: !!id,
  });
}
