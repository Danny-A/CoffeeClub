import { useEffect, useState } from 'react';

import { FormField } from '@/components/ui/FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import { Text } from '@/components/ui/Text';
import { useBeanUrlFilters } from '@/hooks/filters/useBeanUrlFilters';
import { useDebounce } from '@/hooks/useDebounce';
import { COFFEE_REGIONS } from '@/utils/coffeeOrigins';

export function BeanFilter() {
  const { filters, updateFilters } = useBeanUrlFilters();
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const [ratingRange, setRatingRange] = useState<[number, number]>([
    filters.minRating ?? 0,
    filters.maxRating ?? 5,
  ]);

  const debouncedRatingRange = useDebounce(ratingRange, 300);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    updateFilters({
      minRating:
        debouncedRatingRange[0] === 0 ? undefined : debouncedRatingRange[0],
      maxRating:
        debouncedRatingRange[1] === 5 ? undefined : debouncedRatingRange[1],
    });
  }, [debouncedRatingRange, updateFilters]);

  useEffect(() => {
    updateFilters({ search: debouncedSearch || undefined });
  }, [debouncedSearch, updateFilters]);

  const handleRatingChange = (value: number[]) => {
    setRatingRange([value[0], value[1]]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <FormField
            type="text"
            label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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

              {COFFEE_REGIONS.map((region) => (
                <>
                  <SelectItem
                    key={`region-${region.name}`}
                    value={`region-${region.name}`}
                    disabled
                    className="font-semibold"
                  >
                    {region.name}
                  </SelectItem>
                  {region.origins.map((origin) => (
                    <SelectItem
                      key={origin.value}
                      value={origin.value}
                      title={origin.description}
                    >
                      {origin.label}
                    </SelectItem>
                  ))}
                </>
              ))}
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

        <div className="flex-1">
          <Text variant="label" className="block mb-2">
            Rating Range
          </Text>
          <div className="px-2">
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={ratingRange}
              onValueChange={handleRatingChange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{ratingRange[0].toFixed(1)}</span>
              <span>{ratingRange[1].toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
