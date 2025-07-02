import { transformBeanData } from '@/utils/transformBeanData';

import { graphqlFetch } from '../graphql/client';
import {
  Bean_Status,
  GetBeanQuery,
  GetBeanQueryVariables,
} from '../graphql/generated/graphql';
import { GetBeanDocument } from '../graphql/generated/graphql';

export type BeanResponse = NonNullable<
  GetBeanQuery['beansCollection']
>['edges'][0]['node'];

export async function fetchBean(id: string, includeUnpublished = false) {
  const response = await graphqlFetch<GetBeanQuery, GetBeanQueryVariables>(
    GetBeanDocument,
    {
      variables: {
        id,
        filter: {
          id: { eq: id },
          status: includeUnpublished
            ? undefined
            : { eq: Bean_Status.Published },
        },
      },
    }
  );

  if (!response.data.beansCollection?.edges[0]?.node) {
    throw new Error('Bean not found');
  }

  const bean = transformBeanData(response.data.beansCollection?.edges[0]?.node);

  return bean;
}
