import Link from 'next/link';

import { BeanCard } from '@/components/features/BeanCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchRoaster } from '@/lib/api/fetchRoaster';
import { createClient } from '@/lib/supabase/server';
import { formatLocation } from '@/utils/formatLocation';
import { transformUser } from '@/utils/transformUser';

type RoasterDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: RoasterDetailsProps) {
  const { id } = await params;
  const roaster = await fetchRoaster(id);
  return {
    title: `${roaster?.name} - Coffee Club`,
    description: `View details about ${roaster?.name}`,
  };
}

export default async function RoasterPage({ params }: RoasterDetailsProps) {
  const { id } = await params;
  const roaster = await fetchRoaster(id);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!roaster) {
    return (
      <EmptyState
        title="Roaster not found"
        description="The roaster you're looking for doesn't exist."
      />
    );
  }

  const location = formatLocation({
    city: roaster.location_city,
    state: roaster.location_state,
    country: roaster.location_country,
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Heading level="h1">{roaster.name}</Heading>
          <Text
            variant="small"
            className="mt-2 text-gray-600 dark:text-gray-400"
          >
            {location}
          </Text>
        </div>
        {user && (
          <Button asChild>
            <Link href={`/roasters/${roaster.id}/edit`}>Edit Roaster</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Heading level="h2">Contact Information</Heading>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <Text variant="label">Location:</Text>
                <Text>{location}</Text>
              </div>
              {roaster.url && (
                <div className="flex justify-between">
                  <Text variant="label">Website:</Text>
                  <Text>
                    <a
                      href={roaster.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {roaster.url}
                    </a>
                  </Text>
                </div>
              )}
              {roaster.instagram && (
                <div className="flex justify-between">
                  <Text variant="label">Instagram:</Text>
                  <Text>
                    <a
                      href={`https://instagram.com/${roaster.instagram.replace(
                        '@',
                        ''
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {roaster.instagram}
                    </a>
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Heading level="h2">Coffee Beans</Heading>
            <Button asChild>
              <Link href={`/beans/new?roasterId=${roaster.id}`}>Add Bean</Link>
            </Button>
          </div>
          {roaster.beansCollection?.edges.length === 0 ? (
            <Text className="mt-4 text-gray-600 dark:text-gray-400">
              No beans available from this roaster yet.
            </Text>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-6">
              {roaster.beansCollection?.edges.map((bean) => (
                <BeanCard
                  key={bean.node.id}
                  user={transformUser(user)}
                  bean={{
                    id: bean.node.id,
                    name: bean.node.name,
                    origin: bean.node.origin || '',
                    process: bean.node.process || '',
                    roastLevel: bean.node.roast_level || '',
                    likes: bean.node.bean_likesCollection?.edges.map(
                      (edge) => ({
                        id: edge.node.id,
                        user_id: edge.node.user_id,
                      })
                    ),
                    reviews: bean.node.bean_reviewsCollection?.edges.map(
                      (edge) => ({
                        id: edge.node.id,
                        rating: edge.node.rating,
                      })
                    ),
                    averageRating: bean.node.average_rating,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
