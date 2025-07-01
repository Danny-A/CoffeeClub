'use client';

import { BeanCard } from '@/components/features/BeanCard';
import { RecipeCard } from '@/components/features/RecipeCard';
import { RoasterCard } from '@/components/features/RoasterCard';
import { Bean, Roaster, RoasterCardType } from '@/lib/graphql/types';

type CuratedItem = {
  id: string;
  nodeId: string;
  section: string;
  displayOrder: number;
  customTitle?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  beanId?: string | null;
  recipeId?: string | null;
  roasterId?: string | null;
  locationId?: string | null;
  beans?: {
    id: string;
    slug?: string;
    name: string;
    averageRating?: number | null;
    reviewCount?: number | null;
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
    imageUrl?: string | null;
    isPublic?: boolean | null;
    likesCount?: number | null;
  } | null;
  roasters?: RoasterCardType | null;
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
        const key = item.customTitle || item.section || 'Curated Picks';
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
                const { likes, ...rest } = item.roasters;
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
