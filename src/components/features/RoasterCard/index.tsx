import Link from 'next/link';

import { Heading } from '@/components/ui/Heading';
import { LikeButton } from '@/components/ui/LikeButton';
import { Text } from '@/components/ui/Text';
import { Roaster, type User } from '@/lib/graphql/types';
import { formatLocation } from '@/utils/formatLocation';

interface RoasterCardProps {
  roaster: Roaster;
  user: User | null;
}

export const RoasterCard = ({ roaster, user }: RoasterCardProps) => {
  const location = formatLocation({
    city: roaster.city,
    state: roaster.state,
    country: roaster.country,
  });

  return (
    <Link href={`/roasters/${roaster.slug}`}>
      <div className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-6 space-y-4 relative">
          <Heading level="h4" as="h2">
            {roaster.name}
          </Heading>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Text variant="label">Location:</Text>
              <Text variant="small">{location}</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="label">Beans:</Text>
              <Text variant="small">{roaster.beanCount}</Text>
            </div>
          </div>

          {user && (
            <div className="absolute right-4 top-4">
              <LikeButton
                type="roaster"
                id={roaster.id}
                isLiked={
                  roaster.likes?.some((like) => like.user_id === user.id) ??
                  false
                }
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
