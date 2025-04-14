import Link from 'next/link';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { type Bean } from '@/lib/graphql/types';
import { getAverageRating } from '@/utils/getAverageRating';

type BeanCardProps = {
  bean: Bean;
};

export function BeanCard({ bean }: BeanCardProps) {
  return (
    <Link href={`/beans/${bean.id}`}>
      <div className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-6 space-y-4">
          <Heading level="h3">{bean.name}</Heading>
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
            {bean.reviews?.length && bean.reviews.length >= 1 ? (
              <>
                <div className="flex justify-between">
                  <Text variant="label">Reviews:</Text>
                  <Text variant="small">{bean.reviews.length}</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="label">Rating:</Text>
                  <Text variant="small">{getAverageRating(bean)}</Text>
                </div>
              </>
            ) : (
              <div className="flex justify-between">
                <Text variant="label">Reviews:</Text>
                <Text variant="small">No reviews yet</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
