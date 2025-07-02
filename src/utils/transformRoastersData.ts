import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';
import { Roasters } from '@/lib/graphql/types';

import { isNew } from './isNew';

export function transformRoastersData(data: GetRoastersQuery): Roasters {
  return {
    roasters:
      data.roastersCollection?.edges.map((roaster) => ({
        id: roaster.node.id,
        slug: roaster.node.slug ?? roaster.node.id,
        name: roaster.node.name,
        profileImageUrl: roaster.node.profile_image_url || undefined,
        logoUrl: roaster.node.logo_url || undefined,
        city: roaster.node.location_city || undefined,
        state: roaster.node.location_state || undefined,
        country: roaster.node.location_country || undefined,
        claimedBy: roaster.node.claimed_by || undefined,
        beanCount: roaster.node.bean_count || 0,
        createdAt: roaster.node.created_at,
        isPublished: roaster.node.is_published,
        likes:
          roaster.node.roaster_likesCollection?.edges.map((edge) => ({
            id: edge.node.id,
            userId: edge.node.user_id || '',
          })) || [],
        isNew: isNew(roaster.node.created_at),
      })) || [],
    pageInfo: {
      hasNextPage: data.roastersCollection?.pageInfo.hasNextPage ?? false,
      endCursor: data.roastersCollection?.pageInfo.endCursor ?? null,
    },
  };
}
