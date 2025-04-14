'use client';
import { useState } from 'react';
import { Suspense } from 'react';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { useRoasters } from '@/hooks/roasters/useRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';
import { Roaster } from '@/lib/graphql/types';

import { RoasterCard } from '../RoasterCard';
import { RoasterFilter } from '../RoasterFilter';

export const RoastersList = ({ roasters }: { roasters: GetRoastersQuery }) => {
  const [filters, setFilters] = useState<{
    search?: string;
    country?: string;
  }>({});

  const { data, isLoading, error } = useRoasters(
    filters,
    roasters.roastersCollection!
  );

  if (error) {
    return (
      <EmptyState
        title="Error loading roasters"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  if (!data?.edges?.length && !isLoading) {
    return (
      <EmptyState
        title="No roasters found"
        description="Be the first to add a coffee roaster!"
      />
    );
  }

  const transformedRoasters: Roaster[] =
    data?.edges.map((roaster) => ({
      id: roaster.node.id,
      name: roaster.node.name,
      city: roaster.node.location_city || undefined,
      state: roaster.node.location_state || undefined,
      country: roaster.node.location_country || undefined,
      url: roaster.node.url || undefined,
      instagram: roaster.node.instagram || undefined,
      beanCount: roaster.node.beansCollection?.edges?.length || 0,
      created_at: roaster.node.created_at,
    })) || [];

  return (
    <Suspense fallback={<CardGrid isLoading />}>
      <div className="space-y-8">
        <RoasterFilter onFilterChange={setFilters} />
        <CardGrid isLoading={isLoading}>
          {transformedRoasters.map((roaster) => (
            <RoasterCard key={roaster.id} roaster={roaster} />
          ))}
        </CardGrid>
      </div>
    </Suspense>
  );
};

export default RoastersList;
