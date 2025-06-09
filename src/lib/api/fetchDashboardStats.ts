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
  >(GetDashboardStatsDocument);

  return response.data;
}
