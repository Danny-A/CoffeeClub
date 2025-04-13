import { graphqlFetch } from "../graphql/client";
import { GetBeanQuery } from "../graphql/generated/graphql";
import { GetBeanDocument } from "../graphql/generated/graphql";

export async function fetchBean(id: string) {
  const response = await graphqlFetch<GetBeanQuery, { id: string }>(
    GetBeanDocument,
    {
      variables: { id },
    },
  );

  if (!response.data.beansCollection?.edges[0]?.node) {
    throw new Error("Bean not found");
  }

  return response.data.beansCollection?.edges[0]?.node;
}
