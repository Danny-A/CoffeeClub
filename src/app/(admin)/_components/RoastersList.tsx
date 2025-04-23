'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useRoasters } from '@/hooks/roasters/useRoasters';
import { GetRoastersQuery } from '@/lib/graphql/generated/graphql';

export function RoastersList({ roasters }: { roasters: GetRoastersQuery }) {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRoasters(
    { includeUnpublished: true },
    roasters.roastersCollection ?? {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    }
  );

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
          Error loading roasters: {error.message}
        </Text>
      </Card>
    );
  }

  const roasterList = data?.pages.flatMap((page) => page.edges) ?? [];

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
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Beans
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {roasterList.map((roaster, index) => (
              <tr
                key={roaster.node.id}
                ref={index === roasterList.length - 1 ? ref : undefined}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>{roaster.node.name}</Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>
                    {[
                      roaster.node.city,
                      roaster.node.state,
                      roaster.node.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      roaster.node.is_published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {roaster.node.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Text>{roaster.node.beanCount ?? 0}</Text>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/roasters/${roaster.node.id}/edit`}>
                      Edit
                    </Link>
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
