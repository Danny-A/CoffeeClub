import Link from 'next/link';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Roaster } from '@/lib/graphql/types';
import { formatLocation } from '@/utils/formatLocation';

interface RoasterCardProps {
  roaster: Roaster;
}

export const RoasterCard = ({ roaster }: RoasterCardProps) => {
  const location = formatLocation({
    city: roaster.city,
    state: roaster.state,
    country: roaster.country,
  });

  return (
    <Link href={`/roasters/${roaster.id}`}>
      <div className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-6 space-y-4">
          <Heading level="h3">{roaster.name}</Heading>
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
        </div>
      </div>
    </Link>
  );
};
