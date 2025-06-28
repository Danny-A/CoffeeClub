import React, { forwardRef } from 'react';

import { CardGrid } from '@/components/ui/CardGrid';
import { Beans, User } from '@/lib/graphql/types';

import { BeanCard } from '../BeanCard';

export const BeanGrid = forwardRef<
  HTMLDivElement,
  {
    beanList: Beans['beans'];
    user: User | null;
    isLoading: boolean;
  }
>(({ beanList, user, isLoading }, ref) => {
  return (
    <CardGrid isLoading={isLoading}>
      {beanList.map((bean, index) => (
        <div
          key={bean.id}
          ref={index === beanList.length - 1 ? ref : undefined}
        >
          <BeanCard bean={bean} user={user} />
        </div>
      ))}
    </CardGrid>
  );
});

BeanGrid.displayName = 'BeanGrid';
