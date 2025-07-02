import React, { forwardRef } from 'react';

import { Card } from '@/components/ui/Card';
import { User, RoasterCardType } from '@/lib/graphql/types';

import { RoasterListItem } from '../RoasterListItem';

export const RoasterList = forwardRef<
  HTMLTableRowElement,
  {
    roasterList: RoasterCardType[];
    user: User | null;
  }
>(({ roasterList, user }, ref) => {
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
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Beans
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Reviews
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Saved
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {roasterList.map((roaster, index) => (
              <tr
                key={roaster.id}
                ref={index === roasterList.length - 1 ? ref : undefined}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <RoasterListItem roaster={roaster} user={user} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
});

RoasterList.displayName = 'RoasterList';
