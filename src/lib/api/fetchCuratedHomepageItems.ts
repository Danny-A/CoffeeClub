import { graphqlFetch } from '../graphql/client';
import { GetCuratedHomepageItemsDocument } from '../graphql/generated/graphql';

export async function fetchCuratedHomepageItems() {
  const response = await graphqlFetch(GetCuratedHomepageItemsDocument);
  return (
    response.data.homepage_curated_itemsCollection?.edges.map((edge) => {
      const node = { ...edge.node };
      if (node.beans) {
        node.beans = {
          ...node.beans,
          slug: node.beans.slug ?? node.beans.id,
        };
      }
      if (node.roasters) {
        node.roasters = {
          ...node.roasters,
          slug: node.roasters.slug ?? node.roasters.id,
        };
      }
      if (node.locations) {
        node.locations = {
          ...node.locations,
          slug: node.locations.slug ?? node.locations.id,
        };
      }
      return node;
    }) ?? []
  );
}
