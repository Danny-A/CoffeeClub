import { type ReactNode } from 'react';

import { CardSkeleton } from '../CardSkeleton';

interface CardGridProps {
  children?: ReactNode;
  isLoading?: boolean;
  skeletonCount?: number;
}

export function CardGrid({
  children,
  isLoading,
  skeletonCount = 6,
}: CardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}
