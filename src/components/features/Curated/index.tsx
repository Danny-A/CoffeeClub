'use client';

import { BeanCard } from '@/components/features/BeanCard';
import { RecipeCard } from '@/components/features/RecipeCard';
import { RoasterCard } from '@/components/features/RoasterCard';
import { Bean, Roaster } from '@/lib/graphql/types';

type CuratedItem = {
  id: string;
  nodeId: string;
  section: string;
  display_order: number;
  custom_title?: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  bean_id?: string | null;
  recipe_id?: string | null;
  roaster_id?: string | null;
  location_id?: string | null;
  beans?: {
    id: string;
    slug?: string;
    name: string;
    average_rating?: number | null;
    review_count?: number | null;
    status: string;
    origin?: string | null;
    roasters?: {
      id: string;
      name: string;
    } | null;
  } | null;
  recipes?: {
    id: string;
    slug?: string;
    title?: string | null;
    description?: string | null;
    image_url?: string | null;
    is_public?: boolean | null;
    likes_count?: number | null;
  } | null;
  roasters?: {
    id: string;
    slug?: string;
    name: string;
    bean_count?: number | null;
    is_published: boolean;
    location_city?: string | null;
    location_state?: string | null;
    location_country?: string | null;
    created_at?: string | null;
    beanCount?: number | null;
    roaster_likesCollection?: {
      edges: Array<{
        node: {
          id: string;
          user_id?: string | null;
        };
      }>;
    } | null;
  } | null;
  locations?: {
    id: string;
    slug?: string;
    name: string;
  } | null;
};

type CuratedSectionProps = {
  items?: CuratedItem[];
};

export function CuratedSection({ items }: CuratedSectionProps) {
  if (!items?.length) return null;

  // Group published items by section/custom_title
  const sections = items
    .filter((item) => item.published)
    .reduce(
      (acc, item) => {
        const key = item.custom_title || item.section || 'Curated Picks';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, CuratedItem[]>
    );

  return (
    <section className="my-12">
      {Object.entries(sections).map(([section, group]) => (
        <div key={section} className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{section}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {group.map((item) => {
              if (item.beans) {
                return (
                  <BeanCard
                    key={item.id}
                    bean={item.beans as Bean}
                    user={null}
                  />
                );
              }
              if (item.recipes) {
                return (
                  <RecipeCard key={item.id} recipe={item.recipes} user={null} />
                );
              }
              if (item.roasters) {
                const { roaster_likesCollection, ...rest } = item.roasters;
                const likes =
                  roaster_likesCollection?.edges
                    .map((edge) => edge.node)
                    .filter(
                      (like): like is { id: string; user_id: string } =>
                        !!like.user_id
                    ) ?? [];
                return (
                  <RoasterCard
                    key={item.id}
                    roaster={{
                      ...(rest as Roaster),
                      likes,
                    }}
                    user={null}
                  />
                );
              }
              // if (item.locations) {
              //   return <LocationCard key={item.id} {...item.locations} />;
              // }
              return null;
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
