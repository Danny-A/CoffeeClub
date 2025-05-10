import { graphqlFetch } from "../graphql/client";
import { GetCuratedHomepageItemsDocument } from "../graphql/generated/graphql";

export async function fetchCuratedHomepageItems() {
  const response = await graphqlFetch(
    GetCuratedHomepageItemsDocument,
  );
  return response.data.homepage_curated_itemsCollection?.edges.map((edge) =>
    edge.node
  ) ?? [];
}
