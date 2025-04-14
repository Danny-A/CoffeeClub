'use client';

import { useState } from 'react';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { useBeans } from '@/hooks/beans/useBeans';
import { GetBeansQuery } from '@/lib/graphql/generated/graphql';
import { Bean } from '@/lib/graphql/types';

import { BeanCard } from '../BeanCard';
import { BeanFilter } from '../BeanFilter';

export const BeanFeed = ({ beans }: { beans: GetBeansQuery }) => {
  const [filters, setFilters] = useState<{
    search?: string;
    origin?: string;
    process?: string;
    roastLevel?: string;
  }>({});
  const { data, isLoading, error } = useBeans(
    filters,
    beans.beansCollection ?? { edges: [] }
  );

  if (error) {
    return (
      <EmptyState
        title="Error loading beans"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const beanList = data?.edges ?? [];

  if (!beanList.length) {
    return (
      <EmptyState
        title="No beans found"
        description="Be the first to add a coffee bean!"
      />
    );
  }

  const transformedBeans: Bean[] = beanList.map((bean) => ({
    id: bean.node.id,
    name: bean.node.name,
    origin: bean.node.origin || '',
    process: bean.node.process || '',
    roastLevel: bean.node.roast_level || '',
    notes: bean.node.notes || '',
    roaster: {
      id: bean.node.roasters?.id,
      name: bean.node.roasters?.name || '',
    },
    createdAt: bean.node.created_at,
    updatedAt: bean.node.created_at,
    reviews: bean.node.bean_reviewsCollection?.edges.map((edge) => ({
      id: edge.node.id,
      rating: edge.node.rating,
    })),
  }));

  return (
    <div className="space-y-8">
      <BeanFilter onFilterChange={setFilters} />
      <CardGrid isLoading={isLoading}>
        {transformedBeans.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </CardGrid>
    </div>
  );
};

export default BeanFeed;
