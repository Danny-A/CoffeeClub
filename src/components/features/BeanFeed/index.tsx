'use client';

import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

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
import { useBeans } from '@/hooks/beans/useBeans';
import { useBeanUrlFilters } from '@/hooks/filters/useBeanUrlFilters';
import { BeansOrderBy } from '@/lib/graphql/generated/graphql';

import { BeanFilter } from '../BeanFilter';
import { BeanGrid } from '../BeanGrid';
import { BeanList } from '../BeanList';

// Add sort options
const SORT_OPTIONS = [
  {
    label: 'Most Reviews',
    value: 'most-reviews',
    orderBy: [{ review_count: 'DescNullsLast' } as BeansOrderBy],
  },
  {
    label: 'Highest Rating',
    value: 'highest-rating',
    orderBy: [{ average_rating: 'DescNullsLast' } as BeansOrderBy],
  },
  {
    label: 'Latest',
    value: 'latest',
    orderBy: [{ created_at: 'DescNullsLast' } as BeansOrderBy],
  },
];

function BeanSortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="bean-sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="bean-sort" className="bg-white min-w-[160px]">
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

export const BeanFeed = () => {
  const { user } = useAuth();
  const { filters } = useBeanUrlFilters();

  // Add sort state
  const [sort, setSort] = useState<string>(SORT_OPTIONS[2].value);
  const selectedSort = useMemo(
    () => SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[2],
    [sort]
  );

  // Merge orderBy into filters
  const beansFilters = useMemo(
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
  } = useBeans(beansFilters);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { ref: refMobile, inView: inViewMobile } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if ((inView || inViewMobile) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, inViewMobile, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <EmptyState
        title="Error loading beans"
        description={error.message}
        className="text-red-600"
      />
    );
  }

  const beanList = data?.pages.flatMap((page) => page.beans) ?? [];

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <BeanSortDropdown value={sort} onChange={setSort} />
      </div>
      <div className="md:hidden">
        <BeanGrid
          beanList={beanList}
          user={user}
          isLoading={isLoading}
          ref={refMobile}
        />
      </div>
      <div className="hidden md:block">
        <BeanList beanList={beanList} user={user} ref={ref} />
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </FilterLayout>
  );
};

export default BeanFeed;
