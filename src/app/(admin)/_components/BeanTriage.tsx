'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Text } from '@/components/ui/Text';
import { useBeansByStatus } from '@/hooks/beans/useBeansByStatus';
import { useDeleteBean } from '@/hooks/beans/useDeleteBean';
import { useUpdateBeanStatus } from '@/hooks/beans/useUpdateBeanStatus';
import { Bean_Status } from '@/lib/graphql/generated/graphql';

const statusOptions = [
  Bean_Status.PendingReview,
  Bean_Status.Approved,
  Bean_Status.Rejected,
  Bean_Status.Published,
];

export function BeanTriage() {
  const [status, setStatus] = useState<Bean_Status>(Bean_Status.PendingReview);
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBeansByStatus(status);
  const updateStatus = useUpdateBeanStatus();
  const deleteBean = useDeleteBean();
  const { ref, inView } = useInView();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const beanList =
    data?.pages.flatMap((page) => page.beansCollection?.edges || []) || [];

  const handleDeleteBean = async (beanId: string) => {
    setDeleteError(null);
    if (
      window.confirm(
        'Are you sure you want to delete this bean? This action cannot be undone.'
      )
    ) {
      deleteBean.mutate(beanId, {
        onError: (err: any) => {
          setDeleteError(err?.message || 'Failed to delete bean.');
        },
      });
    }
  };

  const handleUpdateStatus = (beanId: string, newStatus: Bean_Status) => {
    updateStatus.mutate({
      id: beanId,
      status: newStatus,
    });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <Heading level="h6" as="h2">
          Bean Triage
        </Heading>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as Bean_Status)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option
                .replace('_', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>
      {isLoading && <Text>Loading beans...</Text>}
      {error && <Text variant="error">Error: {error.message}</Text>}
      {deleteError && (
        <Text variant="error" className="mb-2">
          {deleteError}
        </Text>
      )}
      <div className="space-y-4">
        {beanList.length === 0 && (
          <Text>No beans with status &quot;{status}&quot;.</Text>
        )}
        {beanList.map((edge, index) => (
          <div
            key={edge.node.id}
            ref={index === beanList.length - 1 ? ref : undefined}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <Text className="font-medium">{edge.node.name}</Text>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={edge.node.status} />
                <Text variant="small">{edge.node.origin}</Text>
              </div>
            </div>
            <div className="flex gap-2">
              {status !== Bean_Status.Published && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() =>
                    handleUpdateStatus(edge.node.id, Bean_Status.Published)
                  }
                  disabled={updateStatus.isPending}
                >
                  Publish
                </Button>
              )}
              {status !== Bean_Status.Approved && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleUpdateStatus(edge.node.id, Bean_Status.Approved)
                  }
                  disabled={updateStatus.isPending}
                >
                  Approve
                </Button>
              )}
              {status !== Bean_Status.Rejected && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    handleUpdateStatus(edge.node.id, Bean_Status.Rejected)
                  }
                  disabled={updateStatus.isPending}
                >
                  Reject
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={() => handleDeleteBean(edge.node.id)}
                disabled={deleteBean.isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    </Card>
  );
}
