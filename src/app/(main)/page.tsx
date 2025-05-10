import { BeanCard } from '@/components/features/BeanCard';
import { CuratedSection } from '@/components/features/Curated';
import { RecipeCard } from '@/components/features/RecipeCard';
import { Heading } from '@/components/ui/Heading';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { fetchRecipes } from '@/lib/api/fetchRecipes';
import { OrderByDirection, Beans } from '@/lib/graphql/generated/graphql';
import { Bean } from '@/lib/graphql/types';

function mapGraphQLBeanToBean(bean: Beans): Bean {
  return {
    id: bean.id,
    name: bean.name,
    roaster: bean.roasters
      ? { id: bean.roasters.id, name: bean.roasters.name }
      : undefined,
    origin: bean.origin ?? '',
    process: bean.process ?? undefined,
    roastLevel: bean.roast_level ?? undefined,
    notes: bean.notes ?? undefined,
    createdAt: bean.created_at ?? undefined,
    updatedAt: bean.updated_at ?? undefined,
    averageRating: bean.average_rating ?? undefined,
    is_published: bean.is_published ?? undefined,
    reviewCount: bean.review_count ?? undefined,
  };
}

export default async function HomePage() {
  const topRatedBeansData = await fetchBeans({
    first: 10,
    orderBy: [
      { average_rating: OrderByDirection.DescNullsLast },
      { review_count: OrderByDirection.DescNullsLast },
    ],
    minRating: 0.1,
  });

  const topRatedBeans =
    topRatedBeansData.beansCollection?.edges.map((edge) =>
      mapGraphQLBeanToBean(edge.node as Beans)
    ) ?? [];

  const mostReviewedBeansData = await fetchBeans({
    first: 10,
    orderBy: [
      { review_count: OrderByDirection.DescNullsLast },
      { average_rating: OrderByDirection.DescNullsLast },
    ],
    minRating: 0.1,
  });
  const mostReviewedBeans =
    mostReviewedBeansData.beansCollection?.edges.map((edge) =>
      mapGraphQLBeanToBean(edge.node as Beans)
    ) ?? [];

  const mostLikedRecipesData = await fetchRecipes({
    first: 10,
    orderBy: [{ likes_count: OrderByDirection.DescNullsLast }],
  });

  const mostLikedRecipes = mostLikedRecipesData.edges.map((edge) => edge.node);

  return (
    <div className="space-y-12">
      <div>
        <Heading level="h1">Welcome to Daily Bean</Heading>
        <Heading level="h2" muted className="mt-2">
          Discover and share your favorite coffee beans
        </Heading>
      </div>

      <CuratedSection />

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

      <section>
        <Heading level="h3" className="mb-4">
          Most Reviewed Beans
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mostReviewedBeans.map((bean) => (
            <BeanCard key={bean.id} bean={bean} user={null} />
          ))}
        </div>
      </section>

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
    </div>
  );
}
