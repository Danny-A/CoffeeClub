'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { useDashboardStats } from '@/hooks/dashboard/useDashboardStats';

export function DashboardStats() {
  const { data, isLoading } = useDashboardStats('beans'); // type doesn't matter for counts

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
        {[...Array(7)].map((_, i) => (
          <Card
            key={i}
            className="h-32 animate-pulse bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  const counts = data || {
    total_users: 0,
    total_beans: 0,
    total_roasters: 0,
    total_locations: 0,
    total_bean_reviews: 0,
    total_roaster_reviews: 0,
    total_location_reviews: 0,
    total_recipes: 0,
  };

  const stats = [
    {
      title: 'Total Users',
      value: counts.total_users,
    },
    {
      title: 'Total Beans',
      value: counts.total_beans,
    },
    {
      title: 'Total Roasters',
      value: counts.total_roasters,
    },
    {
      title: 'Total Locations',
      value: counts.total_locations,
    },
    {
      title: 'Total Recipes',
      value: counts.total_recipes,
    },
    {
      title: 'Bean Reviews',
      value: counts.total_bean_reviews,
    },
    {
      title: 'Location Reviews',
      value: counts.total_location_reviews,
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent>
            <Text variant="label">{stat.title}</Text>
            <Heading as="h3" className="mt-2">
              {stat.value.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
