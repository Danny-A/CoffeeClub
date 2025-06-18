import { forwardRef } from 'react';

import { CardGrid } from '@/components/ui/CardGrid';
import { Roaster, User } from '@/lib/graphql/types';

import { RoasterCard } from '../RoasterCard';

export const RoasterGrid = forwardRef<
  HTMLDivElement,
  {
    roasterList: { node: Roaster }[];
    user: User | null;
    isLoading: boolean;
  }
>(({ roasterList, user, isLoading }, ref) => {
  return (
    <CardGrid isLoading={isLoading}>
      {roasterList.map((roaster, index) => (
        <div
          key={roaster.node.id}
          ref={index === roasterList.length - 1 ? ref : undefined}
        >
          <RoasterCard roaster={roaster.node} user={user} />
        </div>
      ))}
    </CardGrid>
  );
});

RoasterGrid.displayName = 'RoasterGrid';
