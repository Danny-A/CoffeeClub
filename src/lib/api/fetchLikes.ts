import { graphqlFetch } from '../graphql/client';
import { GetUserLikesQuery } from '../graphql/generated/graphql';
import { GetUserLikesQueryVariables } from '../graphql/generated/graphql';
import { GetUserLikesDocument } from '../graphql/generated/graphql';

export async function fetchLikes(userId: string) {
  const response = await graphqlFetch<
    GetUserLikesQuery,
    GetUserLikesQueryVariables
  >(GetUserLikesDocument, {
    variables: {
      userId,
      first: 100, // We can adjust this based on pagination needs
    },
  });

  return response.data;
}
