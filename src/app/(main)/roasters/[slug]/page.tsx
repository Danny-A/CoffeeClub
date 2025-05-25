import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BeanCard } from '@/components/features/BeanCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchRoaster } from '@/lib/api/fetchRoaster';
import { fetchRoasters } from '@/lib/api/fetchRoasters';
import { createClient } from '@/lib/supabase/server';
import { formatLocation } from '@/utils/formatLocation';
import { isAdmin } from '@/utils/getUserRole';
import { isModerator } from '@/utils/getUserRole';
import { isNew } from '@/utils/isNew';
import { extractIdFromSlug } from '@/utils/slug';
import { transformUser } from '@/utils/transformUser';

type RoasterDetailsProps = {
  params: Promise<{ slug: string }>;
};

// Next.js will invalidate the cache when a
// request comes in, at most once every 3600 seconds.
export const revalidate = 3600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  const roasters = await fetchRoasters();

  if (!roasters.roastersCollection) return [];

  return roasters.roastersCollection?.edges.map((edge) => ({
    slug: edge.node.slug ?? edge.node.id,
  }));
}

export async function generateMetadata({ params }: RoasterDetailsProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) return notFound();

  const roaster = await fetchRoaster(id);

  return {
    title: `${roaster?.name} - Daily Bean`,
    description: `View details about ${roaster?.name}`,
    openGraph: {
      title: `${roaster?.name} - Daily Bean`,
      description: `View details about ${roaster?.name}`,
      images: [{ url: roaster?.profile_image_url || '' }],
    },
  };
}

export default async function RoasterPage({ params }: RoasterDetailsProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
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

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

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
        {(isUserAdmin || isUserModerator) && (
          <Button asChild>
            <Link href={`/admin/roasters/${roaster.slug ?? roaster.id}/edit`}>
              Edit Roaster
            </Link>
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
                    slug: bean.node.slug ?? bean.node.id,
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
                    averageRating: bean.node.average_rating || undefined,
                    isNew: isNew(bean.node.created_at),
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
