import { graphqlFetch } from "@/lib/graphql/client";
import {
  GetRecipesQuery,
  GetRecipesQueryVariables,
} from "@/lib/graphql/generated/graphql";
import { GetRecipesDocument } from "@/lib/graphql/generated/graphql";

export async function fetchRecipes(
  { first = 30, after }: { first?: number; after?: string } = {},
) {
  const response = await graphqlFetch<
    GetRecipesQuery,
    GetRecipesQueryVariables
  >(
    GetRecipesDocument,
    {
      variables: { first, after },
    },
  );

  if (!response.data.recipesCollection) {
    throw new Error("No recipes found");
  }

  return response.data.recipesCollection;
}
