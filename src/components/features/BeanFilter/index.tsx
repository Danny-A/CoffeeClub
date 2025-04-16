import { useEffect } from 'react';

import { FormField } from '@/components/ui/FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { useUrlFilters } from '@/hooks/filters/useUrlFilters';

type BeanFilterProps = {
  onFilterChange: (filters: {
    search?: string;
    origin?: string;
    process?: string;
    roastLevel?: string;
  }) => void;
};

export function BeanFilter({ onFilterChange }: BeanFilterProps) {
  const { filters, updateFilters } = useUrlFilters();

  // Keep parent component in sync with URL filters
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <FormField
            type="text"
            label="Search"
            value={filters.search ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              updateFilters({ search: value || undefined });
            }}
            placeholder="Search beans..."
          />
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Origin
          </Text>
          <Select
            value={filters.origin ?? 'all'}
            onValueChange={(value) => {
              updateFilters({ origin: value === 'all' ? undefined : value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Origins" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Origins</SelectItem>
              <SelectItem value="Ethiopia">Ethiopia</SelectItem>
              <SelectItem value="Colombia">Colombia</SelectItem>
              <SelectItem value="Kenya">Kenya</SelectItem>
              <SelectItem value="Guatemala">Guatemala</SelectItem>
              <SelectItem value="Costa Rica">Costa Rica</SelectItem>
              <SelectItem value="Brazil">Brazil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Process
          </Text>
          <Select
            value={filters.process ?? 'all'}
            onValueChange={(value) => {
              updateFilters({ process: value === 'all' ? undefined : value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Processes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Processes</SelectItem>
              <SelectItem value="Washed">Washed</SelectItem>
              <SelectItem value="Natural">Natural</SelectItem>
              <SelectItem value="Honey">Honey</SelectItem>
              <SelectItem value="Anaerobic">Anaerobic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Roast Level
          </Text>
          <Select
            value={filters.roastLevel ?? 'all'}
            onValueChange={(value) => {
              updateFilters({
                roastLevel: value === 'all' ? undefined : value,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Roast Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roast Levels</SelectItem>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
