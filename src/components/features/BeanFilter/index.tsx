import { useState } from 'react';

import { Text } from '@/components/ui/Text';

type BeanFilterProps = {
  onFilterChange: (filters: {
    search?: string;
    origin?: string;
    process?: string;
    roastLevel?: string;
  }) => void;
};

export function BeanFilter({ onFilterChange }: BeanFilterProps) {
  const [filters, setFilters] = useState<{
    search?: string;
    origin?: string;
    process?: string;
    roastLevel?: string;
  }>({});

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleOriginChange = (value: string) => {
    const newFilters = { ...filters, origin: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProcessChange = (value: string) => {
    const newFilters = { ...filters, process: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRoastLevelChange = (value: string) => {
    const newFilters = { ...filters, roastLevel: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Search
          </Text>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search beans..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Origin
          </Text>
          <select
            value={filters.origin || ''}
            onChange={(e) => handleOriginChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Origins</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Colombia">Colombia</option>
            <option value="Kenya">Kenya</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Process
          </Text>
          <select
            value={filters.process || ''}
            onChange={(e) => handleProcessChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Processes</option>
            <option value="Washed">Washed</option>
            <option value="Natural">Natural</option>
            <option value="Honey">Honey</option>
            <option value="Anaerobic">Anaerobic</option>
          </select>
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Roast Level
          </Text>
          <select
            value={filters.roastLevel || ''}
            onChange={(e) => handleRoastLevelChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Roast Levels</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
}
