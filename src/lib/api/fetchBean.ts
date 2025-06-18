import { graphqlFetch } from '../graphql/client';
import {
  GetBeanQuery,
  GetBeanQueryVariables,
} from '../graphql/generated/graphql';
import { GetBeanDocument } from '../graphql/generated/graphql';

export async function fetchBean(id: string) {
  const response = await graphqlFetch<GetBeanQuery, GetBeanQueryVariables>(
    GetBeanDocument,
    {
      variables: {
        id,
        filter: {
          id: { eq: id },
          is_published: { eq: true },
        },
      },
    }
  );

  if (!response.data.beansCollection?.edges[0]?.node) {
    throw new Error('Bean not found');
  }

  return response.data.beansCollection?.edges[0]?.node;
}
