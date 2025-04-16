'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterLayout } from '@/components/ui/FilterLayout';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRoasterUrlFilters } from '@/hooks/filters/useRoasterUrlFilters';
import { useRoasters } from '@/hooks/roasters/useRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';

import { RoasterCard } from '../RoasterCard';
import { RoasterFilter } from '../RoasterFilter';

export const RoastersList = ({ roasters }: { roasters: GetRoastersQuery }) => {
  const { user } = useAuth();
  const { filters } = useRoasterUrlFilters();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRoasters(filters, roasters.roastersCollection ?? undefined);

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
        title="Error loading roasters"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const roasterList = data?.pages.flatMap((page) => page.edges) ?? [];

  if (!roasterList.length && !isLoading) {
    return (
      <FilterLayout sidebar={<RoasterFilter />}>
        <EmptyState
          title="No roasters found"
          description="Try adjusting your filters or be the first to add a coffee roaster!"
        />
      </FilterLayout>
    );
  }

  return (
    <FilterLayout sidebar={<RoasterFilter />}>
      <CardGrid isLoading={isLoading}>
        {roasterList.map((roaster, index) => (
          <div
            key={roaster.node.id}
            ref={index === roasterList.length - 1 ? ref : undefined}
          >
            <RoasterCard roaster={roaster.node} user={user} />
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

export default RoastersList;
