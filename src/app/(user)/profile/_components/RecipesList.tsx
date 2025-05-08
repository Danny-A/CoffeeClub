'use client';

import { CoffeeIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { useRecipes } from '@/hooks/recipes/useRecipes';

export const RecipesList = () => {
  const {
    data: recipes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    error,
  } = useRecipes();
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading recipes"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const recipeList = recipes?.pages.flatMap((page) => page.edges) ?? [];

  if (!recipeList.length) {
    return (
      <EmptyState
        icon={<CoffeeIcon className="w-12 h-12 text-gray-400" />}
        title="No recipes yet"
        description="Create your first coffee recipe to get started!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipeList.map((recipe, index) => (
        <Link
          href={`/profile/recipes/${recipe.node.id}`}
          key={recipe.node.id}
          ref={index === recipeList.length - 1 ? ref : undefined}
        >
          <Card>
            <CardHeader>
              <Heading level="h3">{recipe.node.title}</Heading>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Text>{recipe.node.description}</Text>
                <div className="flex items-center justify-between text-sm">
                  <Text variant="small">
                    {recipe.node.brew_method?.toLowerCase().replace('_', ' ')}
                  </Text>
                  <Text variant="small" className="text-gray-500">
                    {recipe.node.is_public ? 'Public' : 'Private'}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4 col-span-full">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
};
