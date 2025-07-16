import { graphqlFetch } from '@/lib/graphql/client';
import {
  GetRecipesQuery,
  GetRecipesQueryVariables,
  RecipesFilter,
  RecipesOrderBy,
} from '@/lib/graphql/generated/graphql';
import { GetRecipesDocument } from '@/lib/graphql/generated/graphql';

export async function fetchRecipes({
  first = 30,
  after,
  orderBy,
  filter,
}: {
  first?: number;
  after?: string;
  orderBy?: RecipesOrderBy[];
  filter?: RecipesFilter;
} = {}) {
  // Generate cache tags based on context
  const cacheTags = ['recipes'];

  // Add specific tags for filtered queries
  if (filter?.title) cacheTags.push('recipes-search');
  if (filter?.user_id) cacheTags.push(`recipes-user-${filter.user_id.eq}`);

  // Add homepage tag for basic queries (likely homepage usage)
  if (!filter && !orderBy) {
    cacheTags.push('homepage');
  }

  const response = await graphqlFetch<
    GetRecipesQuery,
    GetRecipesQueryVariables
  >(GetRecipesDocument, {
    variables: {
      first,
      after,
      ...(orderBy && { orderBy }),
      ...(filter && { filter }),
    },
    cache: 'force-cache',
    tags: cacheTags,
  });

  if (!response.data.recipesCollection) {
    throw new Error('No recipes found');
  }

  return response.data.recipesCollection;
}
