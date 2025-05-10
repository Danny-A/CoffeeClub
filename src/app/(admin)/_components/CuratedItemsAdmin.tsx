'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { useCuratedHomepageItems } from '@/hooks/dashboard/useCuratedHomepageItems';
import type { Homepage_Curated_Items } from '@/lib/graphql/generated/graphql';

import { CuratedItemForm } from './CuratedItemForm';
import type { CuratedItemFormValues } from './CuratedItemForm';

export function CuratedItemsAdmin() {
  const [showAdd, setShowAdd] = useState(false);
  const {
    items: data,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  } = useCuratedHomepageItems();

  // Reorder helpers
  const handleMove = async (id: string, direction: 'up' | 'down') => {
    if (!data) return;
    const idx = data.findIndex((item) => item.id === id);
    if (idx === -1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= data.length) return;

    // Create a new array with the items swapped
    const newOrder = [...data];
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];

    // Reassign display_order to be strictly sequential
    await Promise.all(
      newOrder.map((item, i) =>
        updateItem.mutateAsync({ id: item.id, display_order: i + 1 })
      )
    );
  };

  // Toggle publish
  const handleTogglePublish = (item: Homepage_Curated_Items) => {
    updateItem.mutate({ id: item.id, published: !item.published });
  };

  // Delete
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this curated item?')) {
      deleteItem.mutate(id);
    }
  };

  // Add new item modal
  const handleAdd = (values: CuratedItemFormValues) => {
    createItem.mutate(values, {
      onSuccess: () => setShowAdd(false),
    });
  };

  return (
    <Card className="overflow-hidden">
      <Button onClick={() => setShowAdd(true)} className="mb-4 ml-6">
        Add Curated Item
      </Button>
      <CuratedItemForm
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleAdd}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4">
                  Loading...
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((item, idx) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text>
                      {item.beans && 'Bean'}
                      {item.recipes && 'Recipe'}
                      {item.roasters && 'Roaster'}
                      {item.locations && 'Location'}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text>
                      {item.beans && item.beans.name}
                      {item.recipes && item.recipes.title}
                      {item.roasters && item.roasters.name}
                      {item.locations && item.locations.name}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      } cursor-pointer`}
                      onClick={() => handleTogglePublish(item)}
                      title="Toggle published state"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          handleTogglePublish(item);
                      }}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text>{item.display_order}</Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMove(item.id, 'up')}
                      disabled={idx === 0}
                      title="Move up"
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMove(item.id, 'down')}
                      disabled={idx === data.length - 1}
                      title="Move down"
                    >
                      ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4">
                  No curated items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
