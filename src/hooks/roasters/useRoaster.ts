import { useQuery } from '@tanstack/react-query';

import { fetchRoaster } from '@/lib/api/fetchRoaster';
import { GetRoasterQuery } from '@/lib/graphql/generated/graphql';
import { Roaster } from '@/lib/graphql/types';
import { isNew } from '@/utils/isNew';

type RoasterNode = NonNullable<
  GetRoasterQuery['roastersCollection']
>['edges'][0]['node'];

function transformRoasterData(roaster: RoasterNode): Roaster {
  return {
    id: roaster.id,
    slug: roaster.slug ?? roaster.id,
    name: roaster.name,
    city: roaster.location_city || undefined,
    state: roaster.location_state || undefined,
    country: roaster.location_country || undefined,
    url: roaster.url || undefined,
    instagram: roaster.instagram || undefined,
    created_at: roaster.created_at,
    is_published: roaster.is_published,
    likes:
      roaster.roaster_likesCollection?.edges.map((edge) => ({
        id: edge.node.id,
        user_id: edge.node.user_id || '',
      })) || [],
    isNew: isNew(roaster.created_at),
  };
}

export function useRoaster(id: string) {
  return useQuery<Roaster>({
    queryKey: ['roaster', id],
    queryFn: async () => {
      const response = await fetchRoaster(id);
      return transformRoasterData(response);
    },
    enabled: !!id,
  });
}
