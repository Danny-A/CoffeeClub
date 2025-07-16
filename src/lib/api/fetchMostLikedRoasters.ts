import { graphqlFetch } from '@/lib/graphql/client';
import {
  GetMostLikedRoastersDocument,
  GetMostLikedRoastersQuery,
  GetMostLikedRoastersQueryVariables,
} from '@/lib/graphql/generated/graphql';

export async function fetchMostLikedRoasters(
  first: number = 10
): Promise<GetMostLikedRoastersQuery> {
  const response = await graphqlFetch<
    GetMostLikedRoastersQuery,
    GetMostLikedRoastersQueryVariables
  >(GetMostLikedRoastersDocument, {
    variables: {
      first,
    },
    cache: 'force-cache',
    tags: ['most-liked', 'roasters', 'homepage'],
  });

  if (!response.data.roastersCollection) {
    return { roastersCollection: null };
  }

  return response.data;
}
