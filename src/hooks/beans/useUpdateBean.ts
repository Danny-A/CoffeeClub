import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateBean } from '@/lib/api/updateBean';
import {
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from '@/lib/graphql/generated/graphql';

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
      return updateBean(input);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bean', data.id] });
      queryClient.invalidateQueries({ queryKey: ['beans'] });
    },
  });
}
