import Link from 'next/link';

import { NewBadge } from '@/components/ui/Badge/NewBadge';
import { Heading } from '@/components/ui/Heading';
import { LikeButton } from '@/components/ui/LikeButton';
import { Text } from '@/components/ui/Text';
import { Roaster, User } from '@/lib/graphql/types';
import { formatLocation } from '@/utils/formatLocation';

type RoasterListItemProps = {
  roaster: Roaster;
  user: User | null;
};

export function RoasterListItem({ roaster, user }: RoasterListItemProps) {
  const location = formatLocation({
    city: roaster.city,
    state: roaster.state,
    country: roaster.country,
  });

  return (
    <>
      <td className="px-6 py-4">
        <Link href={`/roasters/${roaster.slug}`} className="hover:underline">
          <Heading level="h6" as="h2">
            {roaster.name}
            {roaster.isNew && <NewBadge className="ml-2 align-middle" />}
          </Heading>
        </Link>
      </td>
      <td className="px-6 py-4">
        <Text variant="small">{location || '-'}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Text variant="small">{roaster.beanCount ?? '0'}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Text variant="small">{roaster.reviewCount ?? '0'}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {user && (
          <LikeButton
            type="roaster"
            id={roaster.id}
            isLiked={
              roaster.likes?.some((like) => like.user_id === user.id) ?? false
            }
          />
        )}
      </td>
    </>
  );
}
