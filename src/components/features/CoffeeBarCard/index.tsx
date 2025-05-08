import Link from 'next/link';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

interface CoffeeBarCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  website?: string;
  instagram?: string;
  openingHours?: string;
}

export function CoffeeBarCard({
  id,
  name,
  description,
  location,
  address,
  website,
  instagram,
  openingHours,
}: CoffeeBarCardProps) {
  return (
    <Link href={`/coffee-bars/${id}`}>
      <div className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 h-full">
        <div className="p-6 space-y-4">
          <Heading level="h3">{name}</Heading>
          <Text variant="small" className="line-clamp-2">
            {description}
          </Text>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Text variant="label">Location:</Text>
              <Text variant="small">{location}</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="label">Address:</Text>
              <Text variant="small">{address}</Text>
            </div>
            {website && (
              <div className="flex justify-between">
                <Text variant="label">Website:</Text>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Text variant="small">Visit</Text>
                </a>
              </div>
            )}
            {instagram && (
              <div className="flex justify-between">
                <Text variant="label">Instagram:</Text>
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Text variant="small">{instagram}</Text>
                </a>
              </div>
            )}
            {openingHours && (
              <div className="flex justify-between">
                <Text variant="label">Hours:</Text>
                <Text variant="small">{openingHours}</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
