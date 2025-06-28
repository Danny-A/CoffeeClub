import { BeansQuery } from '@/hooks/beans/useBeans';
import { Beans } from '@/lib/graphql/types';

import { isNew } from './isNew';

export function transformBeansData(data: BeansQuery): Beans {
  return {
    beans: data.edges.map((bean) => ({
      id: bean.node.id,
      slug: bean.node.slug ?? bean.node.id,
      name: bean.node.name,
      origin: bean.node.origin || undefined,
      process: bean.node.process || undefined,
      roastLevel: bean.node.roast_level || undefined,
      roaster: bean.node.roasters
        ? {
            id: bean.node.roasters.id,
            name: bean.node.roasters.name || '',
            slug: bean.node.roasters.slug || '',
          }
        : undefined,
      createdAt: bean.node.created_at,
      updatedAt: bean.node.created_at,
      averageRating: bean.node.average_rating || 0,
      status: bean.node.status,
      reviewCount: bean.node.review_count || 0,
      likes:
        bean.node.bean_likesCollection?.edges.map((edge) => ({
          id: edge.node.id,
          user_id: edge.node.user_id,
        })) || [],
      isNew: isNew(bean.node.created_at),
    })),
    pageInfo: {
      hasNextPage: data.pageInfo.hasNextPage,
      endCursor: data.pageInfo.endCursor || null,
    },
  };
}
