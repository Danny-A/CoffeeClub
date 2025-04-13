import { graphqlFetch } from "../graphql/client";
import { GetBeansDocument } from "../graphql/generated/graphql";
import { Exact } from "../graphql/generated/graphql";
import { GetBeansQuery } from "../graphql/generated/graphql";

export type BeanFilters = {
  search?: string;
  origin?: string;
  process?: string;
  roastLevel?: string;
};

export async function fetchBeans(
  filters?: BeanFilters,
): Promise<GetBeansQuery> {
  const response = await graphqlFetch<
    GetBeansQuery,
    Exact<{ [key: string]: never }>
  >(
    GetBeansDocument,
  );

  if (!response.data.beansCollection) {
    return { beansCollection: { edges: [] } };
  }

  let beans = response.data.beansCollection.edges;

  if (filters) {
    beans = beans.filter((bean) => {
      const matchesSearch = !filters.search ||
        bean.node.name.toLowerCase().includes(
          filters.search.toLowerCase(),
        ) ||
        bean.node.origin?.toLowerCase().includes(
          filters.search.toLowerCase(),
        ) ||
        bean.node.roasters?.id[0]?.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesOrigin = !filters.origin ||
        bean.node.origin === filters.origin;
      const matchesProcess = !filters.process ||
        bean.node.process === filters.process;
      const matchesRoastLevel = !filters.roastLevel ||
        bean.node.roast_level === filters.roastLevel;

      return (
        matchesSearch &&
        matchesOrigin &&
        matchesProcess &&
        matchesRoastLevel
      );
    });
  }

  return { beansCollection: { edges: beans } };
}
