'use client';

import { useState, useEffect } from 'react';

import { FormField } from '@/components/ui/FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { useRoasterUrlFilters } from '@/hooks/filters/useRoasterUrlFilters';
import { useDebounce } from '@/hooks/useDebounce';

export function RoasterFilter() {
  const { filters, updateFilters } = useRoasterUrlFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    updateFilters({ search: debouncedSearch || undefined });
  }, [debouncedSearch, updateFilters]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <FormField
            type="text"
            label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search roasters..."
          />
        </div>

        <div>
          <Text variant="label" className="block mb-2">
            Country
          </Text>
          <Select
            value={filters.country ?? 'all'}
            onValueChange={(value) => {
              updateFilters({ country: value === 'all' ? undefined : value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="Netherlands">Netherlands</SelectItem>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Denmark">Denmark</SelectItem>
              <SelectItem value="Sweden">Sweden</SelectItem>
              <SelectItem value="Norway">Norway</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
