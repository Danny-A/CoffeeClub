'use client';

import Link from 'next/link';

import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats';

interface TopRatedSectionProps {
  type: 'beans' | 'roasters' | 'locations';
}

export function TopRatedSection({ type }: TopRatedSectionProps) {
  const { items, isLoading } = useDashboardStats(type);

  if (isLoading) {
    return <Card className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800" />;
  }

  return (
    <Card className="p-6">
      <Heading as="h2" className="mb-4">
        Top Rated {type.charAt(0).toUpperCase() + type.slice(1)}
      </Heading>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.node.id}
            href={`/${type}/${item.node.id}`}
            className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
          >
            <div className="flex justify-between items-center">
              <Text>{item.node.name}</Text>
              <Text variant="small">
                {(item.averageRating ?? 0).toFixed(1)}★
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
