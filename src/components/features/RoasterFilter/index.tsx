import { useState } from 'react';

import { Text } from '@/components/ui/Text';

type RoasterFilterProps = {
  onFilterChange: (filters: { search?: string; country?: string }) => void;
};

export function RoasterFilter({ onFilterChange }: RoasterFilterProps) {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    onFilterChange({ country: value });
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
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search roasters..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Country
          </Text>
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Countries</option>
            <option value="Netherlands">Netherlands</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="Denmark">Denmark</option>
            <option value="Sweden">Sweden</option>
            <option value="Norway">Norway</option>
          </select>
        </div>
      </div>
    </div>
  );
}
