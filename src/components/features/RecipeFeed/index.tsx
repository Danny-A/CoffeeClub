'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRecipes } from '@/hooks/recipes/useRecipes';

import { RecipeCard } from '../RecipeCard';

export const RecipeFeed = () => {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRecipes();

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <EmptyState
        title="Error loading recipes"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const recipeList = data?.pages.flatMap((page) => page.edges) ?? [];

  if (!isLoading && !recipeList.length) {
    return (
      <EmptyState
        title="No recipes found"
        description="Be the first to add a recipe!"
      />
    );
  }

  return (
    <CardGrid isLoading={isLoading}>
      {recipeList.map((recipeEdge, index) => (
        <div
          key={recipeEdge.node.id}
          ref={index === recipeList.length - 1 ? ref : undefined}
        >
          <RecipeCard recipe={recipeEdge.node} user={user} />
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </CardGrid>
  );
};

export default RecipeFeed;
