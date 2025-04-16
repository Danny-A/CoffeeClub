"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type BeanFilters = {
  search?: string;
  origin?: string;
  process?: string;
  roastLevel?: string;
};

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current filters directly from URL
  const filters: BeanFilters = {
    search: searchParams.get("search") || undefined,
    origin: searchParams.get("origin") || undefined,
    process: searchParams.get("process") || undefined,
    roastLevel: searchParams.get("roastLevel") || undefined,
  };

  // Update filters by directly updating URL
  const updateFilters = useCallback((newFilters: Partial<BeanFilters>) => {
    // Create new URLSearchParams with current params
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;

    // Update params with new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      const currentValue = params.get(key);
      const newValue = value && value !== "all" ? value : null;

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
  }, [pathname, router, searchParams]);

  return {
    filters,
    updateFilters,
  };
}
