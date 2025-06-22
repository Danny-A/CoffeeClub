'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Text } from '@/components/ui/Text';
import { useBeans } from '@/hooks/beans/useBeans';
import { Bean_Status } from '@/lib/graphql/generated/graphql';

export function BeansList() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBeans({ includeUnpublished: true });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <Card className="p-4">
        <Text className="text-red-600">
          Error loading beans: {error.message}
        </Text>
      </Card>
    );
  }

  const beanList = data?.pages.flatMap((page) => page.edges) ?? [];

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Roaster
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {beanList.map((bean, index) => (
              <tr
                key={bean.node.id}
                ref={index === beanList.length - 1 ? ref : undefined}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>{bean.node.name}</Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>{bean.node.roaster?.name}</Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>{bean.node.origin}</Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={bean.node.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text className="text-sm">
                    {bean.node.averageRating
                      ? `${bean.node.averageRating}`
                      : '-'}
                  </Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/beans/${bean.node.id}/edit`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      )}
    </Card>
  );
}
