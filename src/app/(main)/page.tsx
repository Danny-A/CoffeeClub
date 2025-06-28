import { BeanCard } from '@/components/features/BeanCard';
import { CuratedSection } from '@/components/features/Curated';
import { RecipeCard } from '@/components/features/RecipeCard';
import { RoasterCard } from '@/components/features/RoasterCard';
import { Heading } from '@/components/ui/Heading';
import { fetchHomepageData } from '@/lib/api/fetchHomepageData';
import { Bean, Roaster } from '@/lib/graphql/types';

export default async function HomePage() {
  const homepageData = await fetchHomepageData();

  // Transform beans data
  const topRatedBeans: Bean[] =
    homepageData.topRatedBeans?.edges.map((edge) => ({
      id: edge.node.id,
      slug: edge.node.slug ?? undefined,
      name: edge.node.name,
      origin: edge.node.origin ?? undefined,
      process: edge.node.process ?? undefined,
      roastLevel: edge.node.roast_level ?? undefined,
      roaster: edge.node.roasters
        ? {
            id: edge.node.roasters.id,
            slug: edge.node.roasters.slug ?? edge.node.roasters.id,
            name: edge.node.roasters.name,
          }
        : undefined,
      createdAt: edge.node.created_at ?? undefined,
      averageRating: edge.node.average_rating ?? 0,
      status: edge.node.status,
      reviewCount: edge.node.review_count ?? 0,
      likes:
        edge.node.bean_likesCollection?.edges.map((like) => ({
          id: like.node.id,
          user_id: like.node.user_id ?? '',
        })) ?? [],
    })) ?? [];

  const mostReviewedBeans: Bean[] =
    homepageData.mostReviewedBeans?.edges.map((edge) => ({
      id: edge.node.id,
      slug: edge.node.slug ?? undefined,
      name: edge.node.name,
      origin: edge.node.origin ?? undefined,
      process: edge.node.process ?? undefined,
      roastLevel: edge.node.roast_level ?? undefined,
      roaster: edge.node.roasters
        ? {
            id: edge.node.roasters.id,
            slug: edge.node.roasters.slug ?? edge.node.roasters.id,
            name: edge.node.roasters.name,
          }
        : undefined,
      createdAt: edge.node.created_at ?? undefined,
      averageRating: edge.node.average_rating ?? 0,
      status: edge.node.status,
      reviewCount: edge.node.review_count ?? 0,
      likes:
        edge.node.bean_likesCollection?.edges.map((like) => ({
          id: like.node.id,
          user_id: like.node.user_id ?? '',
        })) ?? [],
    })) ?? [];

  // Transform roasters data
  const mostLikedRoasters: Roaster[] =
    homepageData.mostLikedRoasters?.edges.map((edge) => ({
      id: edge.node.id,
      slug: edge.node.slug ?? undefined,
      name: edge.node.name,
      city: edge.node.location_city ?? undefined,
      state: edge.node.location_state ?? undefined,
      country: edge.node.location_country ?? undefined,
      profile_image_url: edge.node.profile_image_url ?? undefined,
      logo_url: edge.node.logo_url ?? undefined,
      beanCount: edge.node.bean_count ?? 0,
      created_at: edge.node.created_at ?? undefined,
      is_published: edge.node.is_published,
      likes:
        edge.node.roaster_likesCollection?.edges.map((like) => ({
          id: like.node.id,
          user_id: like.node.user_id ?? '',
        })) ?? [],
    })) ?? [];

  // Transform recipes data
  const mostLikedRecipes =
    homepageData.mostLikedRecipes?.edges.map((edge) => edge.node) ?? [];

  // Transform curated items data
  const curatedItems =
    homepageData.curatedHomepageItems?.edges.map((edge) => ({
      id: edge.node.id,
      nodeId: edge.node.nodeId,
      section: edge.node.section,
      display_order: edge.node.display_order,
      custom_title: edge.node.custom_title,
      published: edge.node.published,
      created_at: edge.node.created_at,
      updated_at: edge.node.updated_at,
      bean_id: edge.node.bean_id,
      recipe_id: edge.node.recipe_id,
      roaster_id: edge.node.roaster_id,
      location_id: edge.node.location_id,
      beans: edge.node.beans
        ? {
            ...edge.node.beans,
            slug: edge.node.beans.slug ?? edge.node.beans.id,
          }
        : null,
      recipes: edge.node.recipes
        ? {
            ...edge.node.recipes,
            slug: edge.node.recipes.slug ?? edge.node.recipes.id,
          }
        : null,
      roasters: edge.node.roasters
        ? {
            ...edge.node.roasters,
            slug: edge.node.roasters.slug ?? edge.node.roasters.id,
          }
        : null,
      locations: edge.node.locations
        ? {
            ...edge.node.locations,
            slug: edge.node.locations.slug ?? edge.node.locations.id,
          }
        : null,
    })) ?? [];

  return (
    <div className="space-y-12">
      <div>
        <Heading level="h1">Welcome to Latest Grind</Heading>
        <Heading level="h2" muted className="mt-2">
          Discover and share your favorite coffee beans
        </Heading>
      </div>

      <CuratedSection items={curatedItems} />

      {topRatedBeans.length > 0 && (
        <section>
          <Heading level="h3" className="mb-4">
            Top Rated Beans
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topRatedBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} user={null} />
            ))}
          </div>
        </section>
      )}

      {mostReviewedBeans.length > 0 && (
        <section>
          <Heading level="h3" className="mb-4">
            Popular Beans
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mostReviewedBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} user={null} />
            ))}
          </div>
        </section>
      )}

      {mostLikedRoasters.length > 0 && (
        <section>
          <Heading level="h3" className="mb-4">
            Popular Roasters
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mostLikedRoasters.map((roaster) => (
              <RoasterCard key={roaster.id} roaster={roaster} user={null} />
            ))}
          </div>
        </section>
      )}

      {mostLikedRecipes.length > 0 && (
        <section>
          <Heading level="h3" className="mb-4">
            Most Liked Recipes
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mostLikedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} user={null} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
