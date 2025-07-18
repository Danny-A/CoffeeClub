import { DocumentNode } from 'graphql';

import { createClient } from '@/lib/supabase/client';

import { TypedDocumentString } from './generated/graphql';

type FetchOptions<TVariables = Record<string, unknown>> = {
  tags?: string[];
  variables?: TVariables;
  // Add option to control caching behavior
  cache?: RequestCache;
};

interface GraphQLResponse<TData> {
  data: TData;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
}

interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
  extensions?: Record<string, unknown>;
}

export const graphqlFetch = async <TData, TVariables = Record<string, unknown>>(
  query: DocumentNode | TypedDocumentString<TData, TVariables>,
  options: FetchOptions<TVariables> = {}
): Promise<{ data: TData }> => {
  const { tags = [], variables, cache = 'force-cache' } = options;
  const supabase = createClient();

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  // Add the auth token if we have a session
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      // Cache Strategy:
      // - 'force-cache': Cache indefinitely until manually revalidated
      // - 'no-store': Don't cache (for real-time data)
      // - 'no-cache': Cache but revalidate on every request
      cache,
      next: {
        // Tags allow selective cache invalidation
        // Example: ['beans', 'bean-123'] allows invalidating all beans or specific bean
        tags,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const result = (await response.json()) as GraphQLResponse<TData>;

  if (result.errors) {
    const errorMessage = result.errors
      .map(
        (e: GraphQLError) =>
          `${e.message} ${
            e.locations
              ? `at line ${e.locations[0]?.line}, column ${
                  e.locations[0]?.column
                }`
              : ''
          }`
      )
      .join('\n');
    console.error(`GraphQL Error(s): \n${errorMessage}`);

    throw new Error(`GraphQL request failed: ${result.errors[0].message}`);
  }

  return result;
};
