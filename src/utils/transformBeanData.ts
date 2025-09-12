import { BeanResponse } from '@/lib/api/fetchBean';
import { Bean_Type } from '@/lib/graphql/generated/graphql';
import { Bean } from '@/lib/graphql/types';

export function transformBeanData(data: BeanResponse): Bean {
  return {
    id: data.id,
    slug: data.slug ?? undefined,
    name: data.name,
    description: data.description ?? undefined,
    imageUrl: data.image_url ?? undefined,
    roastType: data.roast_type ?? undefined,
    process: data.process ?? undefined,
    roastLevel: data.roast_level ?? undefined,
    beanType: (data.bean_type?.replace('_', ' ') as Bean_Type) ?? undefined,
    elevationMin: data.elevation_min ?? undefined,
    elevationMax: data.elevation_max ?? undefined,
    origin: data.origin,
    producer: data.producer ?? undefined,
    notes: data.notes ?? undefined,
    buyUrls:
      data.buy_urls?.filter((url): url is string => url !== null) ?? undefined,
    status: data.status,
    averageRating: data.average_rating ?? undefined,
    reviewCount: data.review_count ?? undefined,
    roaster: data.roasters
      ? {
          id: data.roasters.id,
          slug: data.roasters.slug ?? '',
          name: data.roasters.name ?? '',
        }
      : undefined,
    varieties: data.bean_varietiesCollection?.edges
      .map((edge) => ({
        id: edge.node?.varieties?.id,
        name: edge.node?.varieties?.name,
      }))
      .filter(
        (item): item is { id: string; name: string } =>
          item.id !== undefined && item.name !== undefined
      ),
    tags: data.bean_tagsCollection?.edges
      .map((edge) => ({
        id: edge.node?.tags?.id,
        name: edge.node?.tags?.name,
      }))
      .filter(
        (item): item is { id: string; name: string } =>
          item.id !== undefined && item.name !== undefined
      ),
    reviews: data.bean_reviewsCollection?.edges.map((edge) => ({
      id: edge.node.id,
      rating: edge.node.rating,
      content: edge.node.content ?? undefined,
      coffeeType: edge.node.coffee_type ?? undefined,
      profile: edge.node?.profiles
        ? {
            id: edge.node.profiles.id,
            username: edge.node.profiles.username ?? '',
            displayName: edge.node.profiles.display_name ?? undefined,
            profileImageUrl: edge.node.profiles.profile_image_url ?? undefined,
          }
        : undefined,
      createdAt: edge.node.created_at,
    })),
    createdAt: data.created_at,
  };
}
