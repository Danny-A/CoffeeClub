import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchRecipes } from '@/lib/api/recipes/fetchRecipes';

import { RecipesList } from '../_components/RecipesList';

export default async function RecipesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <Heading level="h1">Coffee Recipes</Heading>
          <Text variant="description">
            Discover and share your coffee brewing recipes
          </Text>
        </div>

        <RecipesList />
      </div>
    </HydrationBoundary>
  );
}
