import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';

import { RecipeFeed } from '@/components/features/RecipeFeed';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchRecipes } from '@/lib/api/recipes/fetchRecipes';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Recipes - Coffee Club',
  description: 'Explore a collection of public coffee recipes',
  openGraph: {
    title: 'Recipes - Coffee Club',
    description: 'Explore a collection of public coffee recipes',
  },
};

export default async function RecipesPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: async () => fetchRecipes(),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h2">Coffee Recipes</Heading>
            <Heading level="h4" as="h2" muted className="mt-2">
              Explore the collection of coffee recipes
            </Heading>
          </div>
          {user && (
            <Button asChild>
              <Link href="/recipes/new">Add New Recipe</Link>
            </Button>
          )}
        </div>
        <RecipeFeed />
      </div>
    </HydrationBoundary>
  );
}
