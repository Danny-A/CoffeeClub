import { Heading } from '../Heading';

interface FilterBarProps {
  children: React.ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Heading
          level="h4"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Filter by:
        </Heading>
        {children}
      </div>
    </div>
  );
}
