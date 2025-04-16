'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRoasters } from '@/hooks/roasters/useRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';

import { RoasterCard } from '../RoasterCard';
import { RoasterFilter } from '../RoasterFilter';

export const RoastersList = ({ roasters }: { roasters: GetRoastersQuery }) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<{
    search?: string;
    country?: string;
  }>({});

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
      <EmptyState
        title="No roasters found"
        description="Be the first to add a coffee roaster!"
      />
    );
  }

  return (
    <div className="space-y-8">
      <RoasterFilter onFilterChange={setFilters} />
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
    </div>
  );
};

export default RoastersList;
