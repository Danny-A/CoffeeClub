import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBean } from "@/lib/api/updateBean";
import {
  Bean_Type,
  BeansUpdateInput,
  Roast_Level,
  Roast_Type,
} from "@/lib/graphql/generated/graphql";

export type UpdateBeanInput = {
  id: string;
  name?: string;
  roaster_id?: string;
  description?: string;
  image_url?: string;
  roast_type?: Roast_Type;
  process?: string;
  roast_level?: Roast_Level;
  bean_type?: Bean_Type;
  elevation_min?: number;
  elevation_max?: number;
  origin?: string;
  producer?: string;
  notes?: string;
  buy_urls?: string[];
  is_published?: boolean;
};

export function useUpdateBean() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateBeanInput) => {
      return updateBean(
        {
          id: input.id,
          name: input.name,
          description: input.description,
          image_url: input.image_url,
          roast_type: input.roast_type,
          process: input.process,
          roast_level: input.roast_level,
          bean_type: input.bean_type,
          elevation_min: input.elevation_min,
          elevation_max: input.elevation_max,
          origin: input.origin,
          producer: input.producer,
          notes: input.notes,
          buy_urls: input.buy_urls,
          is_published: input.is_published,
        } satisfies BeansUpdateInput,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beans"] });
    },
  });
}
