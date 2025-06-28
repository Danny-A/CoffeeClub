import React, { forwardRef } from 'react';

import { Card } from '@/components/ui/Card';
import { Beans, User } from '@/lib/graphql/types';
import { Bean } from '@/lib/graphql/types';

import { BeanListItem } from '../BeanListItem';

export const BeanList = forwardRef<
  HTMLTableRowElement,
  {
    beanList: Beans['beans'];
    user: User | null;
  }
>(({ beanList, user }, ref) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                Reviews
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Saved
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {beanList.map((bean, index) => (
              <tr
                key={bean.id}
                ref={index === beanList.length - 1 ? ref : undefined}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <BeanListItem bean={bean} user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
});

BeanList.displayName = 'BeanList';
