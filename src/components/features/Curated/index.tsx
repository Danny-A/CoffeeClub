'use client';

import { BeanCard } from '@/components/features/BeanCard';
import { RecipeCard } from '@/components/features/RecipeCard';
import { RoasterCard } from '@/components/features/RoasterCard';
import { useCuratedHomepageItems } from '@/hooks/dashboard/useCuratedHomepageItems';
// import { LocationCard } from '@/components/features/LocationCard'; // TODO if exists

export function CuratedSection() {
  const { items, isLoading } = useCuratedHomepageItems();

  if (isLoading) return <div>Loading curated picks...</div>;
  if (!items?.length) return null;

  // Group published items by section/custom_title
  const sections = (items || [])
    .filter((item) => item.published)
    .reduce(
      (acc, item) => {
        const key = item.custom_title || item.section || 'Curated Picks';
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<string, typeof items>
    );

  return (
    <section className="my-12">
      {Object.entries(sections).map(([section, group]) => (
        <div key={section} className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{section}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {group.map((item) => {
              if (item.beans) {
                return <BeanCard key={item.id} bean={item.beans} user={null} />;
              }
              if (item.recipes) {
                return (
                  <RecipeCard key={item.id} recipe={item.recipes} user={null} />
                );
              }
              if (item.roasters) {
                const {
                  roaster_likesCollection,
                  beanCount,
                  created_at,
                  ...rest
                } = item.roasters;
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
                      ...rest,
                      beanCount: beanCount ?? 0,
                      created_at: created_at ?? '',
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
