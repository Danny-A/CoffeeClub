'use client';

import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats';

type TopRatedSectionProps = {
  type: 'beans' | 'roasters' | 'locations';
};

export function TopRatedSection({ type }: TopRatedSectionProps) {
  const { items, isLoading } = useDashboardStats(type);

  if (isLoading) {
    return <Card className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800" />;
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h2" level="h5">
          Top Rated {type.charAt(0).toUpperCase() + type.slice(1)}
        </Heading>
      </CardHeader>

      <CardContent className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.node.id}
            href={`/${type}/${item.node.id}`}
            className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <Text>{item.node.name}</Text>
                <Text variant="small" className="block text-gray-500">
                  {item.reviewCount} reviews
                </Text>
              </div>
              <Text variant="small">{item.averageRating.toFixed(2)} ★</Text>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
