import { forwardRef } from 'react';

import { CardGrid } from '@/components/ui/CardGrid';
import { RoasterCardType, User } from '@/lib/graphql/types';

import { RoasterCard } from '../RoasterCard';

export const RoasterGrid = forwardRef<
  HTMLDivElement,
  {
    roasterList: RoasterCardType[];
    user: User | null;
    isLoading: boolean;
  }
>(({ roasterList, user, isLoading }, ref) => {
  return (
    <CardGrid isLoading={isLoading}>
      {roasterList.map((roaster, index) => (
        <div
          key={roaster.id}
          ref={index === roasterList.length - 1 ? ref : undefined}
        >
          <RoasterCard roaster={roaster} user={user} />
        </div>
      ))}
    </CardGrid>
  );
});

RoasterGrid.displayName = 'RoasterGrid';
