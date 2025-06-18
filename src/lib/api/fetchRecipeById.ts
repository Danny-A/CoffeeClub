import { graphqlFetch } from '@/lib/graphql/client';
import {
  GetRecipeByIdDocument,
  GetRecipeByIdQuery,
  GetRecipeByIdQueryVariables,
} from '@/lib/graphql/generated/graphql';

export async function fetchRecipeById(id: string) {
  const response = await graphqlFetch<
    GetRecipeByIdQuery,
    GetRecipeByIdQueryVariables
  >(GetRecipeByIdDocument, {
    variables: { id },
    tags: [`recipe-${id}`],
  });
  return response.data?.recipesCollection?.edges[0]?.node ?? null;
}
