import Link from 'next/link';

import { Heading } from '@/components/ui/Heading';
import { LikeButton } from '@/components/ui/LikeButton';
import { Text } from '@/components/ui/Text';
import { type Bean, type User } from '@/lib/graphql/types';

type BeanCardProps = {
  bean: Bean;
  user: User | null;
};

export function BeanCard({ bean, user }: BeanCardProps) {
  return (
    <Link href={`/beans/${bean.id}`}>
      <div className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-6 space-y-4 relative">
          <Heading level="h4" as="h2">
            {bean.name}
          </Heading>
          {bean.notes && (
            <Text variant="small" className="line-clamp-2">
              {bean.notes}
            </Text>
          )}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Text variant="label">Origin:</Text>
              <Text variant="small">{bean.origin}</Text>
            </div>
            {bean.process && (
              <div className="flex justify-between">
                <Text variant="label">Process:</Text>
                <Text variant="small">{bean.process}</Text>
              </div>
            )}
            {bean.roastLevel && (
              <div className="flex justify-between">
                <Text variant="label">Roast Level:</Text>
                <Text variant="small" className="capitalize">
                  {bean.roastLevel}
                </Text>
              </div>
            )}
            {bean.roaster?.name && (
              <div className="flex justify-between">
                <Text variant="label">Roaster:</Text>
                <Text variant="small">{bean.roaster.name}</Text>
              </div>
            )}
            <div className="flex justify-between">
              <Text variant="label">Reviews:</Text>
              <Text variant="small">
                {bean.reviewCount && bean.reviewCount > 0
                  ? bean.reviewCount
                  : 'No reviews yet'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="label">Rating:</Text>
              <Text variant="small">
                {bean.averageRating !== undefined && bean.averageRating !== null
                  ? bean.averageRating.toFixed(2)
                  : '-'}
              </Text>
            </div>
          </div>

          {user && (
            <div className="absolute right-4 top-4">
              <LikeButton
                type="bean"
                id={bean.id}
                isLiked={
                  bean.likes?.some((like) => like.user_id === user.id) ?? false
                }
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
