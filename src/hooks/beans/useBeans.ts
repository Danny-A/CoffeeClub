import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/useDebounce";
import { BeanFilters, fetchBeans } from "@/lib/api/fetchBeans";
import { GetBeansQuery } from "@/lib/graphql/generated/graphql";

type BeansQuery = NonNullable<GetBeansQuery["beansCollection"]>;

export function useBeans(filters?: BeanFilters, initialData?: BeansQuery) {
  const debouncedFilters = useDebounce(filters, 300);

  return useQuery<BeansQuery>({
    queryKey: ["beans", debouncedFilters],
    queryFn: async () => {
      const response = await fetchBeans(debouncedFilters);

      return response.beansCollection!;
    },
    initialData: !debouncedFilters ? initialData : undefined,
  });
}
