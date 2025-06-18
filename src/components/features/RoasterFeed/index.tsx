'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { CardGrid } from '@/components/ui/CardGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterLayout } from '@/components/ui/FilterLayout';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRoasterUrlFilters } from '@/hooks/filters/useRoasterUrlFilters';
import { useRoasters } from '@/hooks/roasters/useRoasters';

import { RoasterCard } from '../RoasterCard';
import { RoasterFilter } from '../RoasterFilter';
import { RoasterGrid } from '../RoasterGrid';
import { RoasterList } from '../RoasterList';

// Add sort options
const SORT_OPTIONS = [
  {
    label: 'Most Beans',
    value: 'most-beans',
    orderBy: [{ bean_count: 'DescNullsLast' }],
  },
  {
    label: 'Most Reviews',
    value: 'most-reviews',
    orderBy: [{ review_count: 'DescNullsLast' }],
  },
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
    orderBy: [{ name: 'AscNullsLast' }],
  },
  {
    label: 'Newest',
    value: 'newest',
    orderBy: [{ created_at: 'DescNullsLast' }],
  },
];

function RoasterSortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label
        htmlFor="roaster-sort"
        className="text-sm font-medium text-gray-700"
      >
        Sort by:
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="roaster-sort" className="bg-white min-w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export const RoasterFeed = () => {
  const { user } = useAuth();
  const { filters } = useRoasterUrlFilters();

  // Add sort state
  const [sort, setSort] = useState<string>(SORT_OPTIONS[3].value);
  const selectedSort = useMemo(
    () => SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[3],
    [sort]
  );

  // Merge orderBy into filters
  const roastersFilters = useMemo(
    () => ({ ...filters, orderBy: selectedSort.orderBy }),
    [filters, selectedSort]
  );

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRoasters(roastersFilters);

  const { ref, inView } = useInView({ threshold: 0 });
  const { ref: refMobile, inView: inViewMobile } = useInView({ threshold: 0 });

  useEffect(() => {
    if ((inView || inViewMobile) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, inViewMobile, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <RoasterSortDropdown value={sort} onChange={setSort} />
      </div>
      <div className="md:hidden">
        <RoasterGrid
          roasterList={roasterList}
          user={user}
          isLoading={isLoading}
          ref={refMobile}
        />
      </div>
      <div className="hidden md:block">
        <RoasterList roasterList={roasterList} user={user} ref={ref} />
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </FilterLayout>
  );
};

export default RoasterFeed;
