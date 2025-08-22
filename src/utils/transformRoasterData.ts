import { RoasterResponse } from '@/lib/api/fetchRoaster';
import { Roaster } from '@/lib/graphql/types';

import { isNew } from './isNew';

export function transformRoasterData(roaster: RoasterResponse): Roaster {
  return {
    id: roaster.id,
    slug: roaster.slug ?? roaster.id,
    name: roaster.name,
    description: roaster.description || undefined,
    city: roaster.location_city || undefined,
    state: roaster.location_state || undefined,
    country: roaster.location_country || undefined,
    url: roaster.url || undefined,
    instagram: roaster.instagram || undefined,
    createdAt: roaster.created_at,
    isPublished: roaster.is_published,
    profileImageUrl: roaster.profile_image_url || undefined,
    logoUrl: roaster.logo_url || undefined,
    claimedBy: roaster.claimed_by || undefined,
    likes:
      roaster.roaster_likesCollection?.edges.map((edge) => ({
        id: edge.node.id,
        userId: edge.node.user_id || '',
      })) || [],
    beans:
      roaster.beansCollection?.edges.map((edge) => ({
        id: edge.node.id,
        slug: edge.node.slug ?? edge.node.id,
        name: edge.node.name,
        origin: edge.node.origin || undefined,
        process: edge.node.process || undefined,
        roastLevel: edge.node.roast_level || undefined,
        averageRating: edge.node.average_rating || undefined,
        createdAt: edge.node.created_at,
        status: edge.node.status,
        likes:
          edge.node.bean_likesCollection?.edges.map((edge) => ({
            id: edge.node.id,
            userId: edge.node.user_id || '',
          })) || [],
        reviews:
          edge.node.bean_reviewsCollection?.edges.map((edge) => ({
            id: edge.node.id,
            rating: edge.node.rating,
          })) || [],
      })) || [],
    isNew: isNew(roaster.created_at),
  };
}
