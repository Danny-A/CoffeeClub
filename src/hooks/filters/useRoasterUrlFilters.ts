'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export type RoasterFilters = {
  search?: string;
  country?: string;
};

export function useRoasterUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: RoasterFilters = {
    search: searchParams.get('search') || undefined,
    country: searchParams.get('country') || undefined,
  };

  const updateFilters = useCallback(
    (newFilters: Partial<RoasterFilters>) => {
      // Get the latest search params each time
      const params = new URLSearchParams(window.location.search);
      let hasChanges = false;

      // Update params with new filters
      Object.entries(newFilters).forEach(([key, value]) => {
        const currentValue = params.get(key);
        const newValue = value && value !== 'all' ? value : null;

        if (currentValue !== newValue) {
          hasChanges = true;
          if (newValue) {
            params.set(key, newValue);
          } else {
            params.delete(key);
          }
        }
      });

      // Only update URL if there are actual changes
      if (hasChanges) {
        const query = params.toString();
        const url = query ? `${pathname}?${query}` : pathname;
        router.replace(url, { scroll: false });
      }
    },
    [pathname, router]
  );

  return { filters, updateFilters };
}
