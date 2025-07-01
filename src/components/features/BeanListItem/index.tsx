import Link from 'next/link';

import { NewBadge } from '@/components/ui/Badge/NewBadge';
import { Heading } from '@/components/ui/Heading';
import { LikeButton } from '@/components/ui/LikeButton';
import { Text } from '@/components/ui/Text';
import { type Bean, type User } from '@/lib/graphql/types';

type BeanCardProps = {
  bean: Bean;
  user: User | null;
};

export function BeanListItem({ bean, user }: BeanCardProps) {
  const beanRating = bean.averageRating?.toFixed(2) ?? '-';
  const beanReviewCount =
    bean.reviewCount && bean.reviewCount > 0 ? bean.reviewCount : '0';

  return (
    <>
      <td className="px-6 py-4">
        <Link href={`/beans/${bean.slug}`} className="hover:underline">
          <Heading level="h6" as="h2">
            {bean.name}
            {bean.isNew && <NewBadge className="ml-2 align-middle" />}
          </Heading>
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link
          href={`/roasters/${bean.roaster?.slug}`}
          className="hover:underline"
        >
          <Text variant="small">{bean.roaster?.name ?? '-'}</Text>
        </Link>
      </td>
      <td className="px-6 py-4">
        <Text variant="small">{bean.origin ?? '-'}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Text variant="small">{beanReviewCount}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <Text variant="small">{beanRating}</Text>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {user && (
          <LikeButton
            type="bean"
            id={bean.id}
            isLiked={
              bean.likes?.some((like) => like.userId === user.id) ?? false
            }
          />
        )}
      </td>
    </>
  );
}
