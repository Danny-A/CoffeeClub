import { graphqlFetch } from '../graphql/client';
import {
  GetHomepageDataDocument,
  GetHomepageDataQuery,
} from '../graphql/generated/graphql';

export async function fetchHomepageData(): Promise<GetHomepageDataQuery> {
  const response = await graphqlFetch<
    GetHomepageDataQuery,
    Record<string, never>
  >(GetHomepageDataDocument, {
    variables: {},
    cache: 'force-cache',
    tags: ['homepage', 'most-liked', 'dashboard-stats'],
  });

  if (!response.data) {
    return {
      topRatedBeans: null,
      mostReviewedBeans: null,
      mostLikedRoasters: null,
      mostLikedRecipes: null,
    };
  }

  return response.data;
}
