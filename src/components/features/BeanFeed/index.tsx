'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterLayout } from '@/components/ui/FilterLayout';
import { useAuth } from '@/hooks/auth/useAuth';
import { useBeans } from '@/hooks/beans/useBeans';
import { useBeanUrlFilters } from '@/hooks/filters/useBeanUrlFilters';

import { BeanCard } from '../BeanCard';
import { BeanFilter } from '../BeanFilter';

export const BeanFeed = () => {
  const { user } = useAuth();
  const { filters } = useBeanUrlFilters();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBeans(filters);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <EmptyState
        title="Error loading beans"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const beanList = data?.pages.flatMap((page) => page.edges) ?? [];

  if (!isLoading && !beanList.length) {
    return (
      <FilterLayout sidebar={<BeanFilter />}>
        <EmptyState
          title="No beans found"
          description="Try adjusting your filters or be the first to add a coffee bean!"
        />
      </FilterLayout>
    );
  }

  return (
    <FilterLayout sidebar={<BeanFilter />}>
      <CardGrid isLoading={isLoading}>
        {beanList.map((bean, index) => (
          <div
            key={bean.node.id}
            ref={index === beanList.length - 1 ? ref : undefined}
          >
            <BeanCard bean={bean.node} user={user} />
          </div>
        ))}
      </CardGrid>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </FilterLayout>
  );
};

export default BeanFeed;
