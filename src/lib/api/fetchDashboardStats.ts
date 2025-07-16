import { graphqlFetch } from '@/lib/graphql/client';
import {
  Exact,
  GetDashboardStatsDocument,
  GetDashboardStatsQuery,
} from '@/lib/graphql/generated/graphql';

export async function fetchDashboardStats() {
  const response = await graphqlFetch<
    GetDashboardStatsQuery,
    Exact<{ [key: string]: never }>
  >(GetDashboardStatsDocument, {
    variables: {},
    cache: 'no-cache', // Stats change frequently, revalidate on every request
    tags: ['dashboard-stats'],
  });

  return response.data;
}
