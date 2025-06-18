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
    tags: ['recipes'],
  });

  if (!response.data.recipesCollection) {
    throw new Error('No recipes found');
  }

  return response.data.recipesCollection;
}
