import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BeanCard } from '@/components/features/BeanCard';
import { RoasterHero } from '@/components/features/RoasterHero';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { LikeButton } from '@/components/ui/LikeButton';
import { Text } from '@/components/ui/Text';
import { fetchRoaster } from '@/lib/api/fetchRoaster';
import { fetchRoasters } from '@/lib/api/fetchRoasters';
import { createClient } from '@/lib/supabase/server';
import { formatLocation } from '@/utils/formatLocation';
import { isAdmin } from '@/utils/getUserRole';
import { isModerator } from '@/utils/getUserRole';
import { generateRoasterJsonLd, safeJsonLdStringify } from '@/utils/jsonLd';
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
  const { roasters } = await fetchRoasters();

  if (!roasters) return [];

  return roasters.map((roaster) => ({
    slug: roaster.slug,
  }));
}

export async function generateMetadata({
  params,
}: RoasterDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) return notFound();

  const roaster = await fetchRoaster(id);

  return {
    title: `${roaster?.name} - Latest Grind`,
    description: `View details about ${roaster?.name}`,
    openGraph: {
      title: `${roaster?.name} - Latest Grind`,
      description: `View details about ${roaster?.name}`,
      images: [{ url: roaster?.profileImageUrl || '' }],
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
    city: roaster.city,
    state: roaster.state,
    country: roaster.country,
  });

  const jsonLd = generateRoasterJsonLd(roaster);

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdStringify(jsonLd),
        }}
      />
      <div className="flex justify-between items-start">
        <div>
          <Heading level="h2" as="h1">
            {roaster.name}
          </Heading>
          <Text variant="small" className="mt-2">
            {location}
          </Text>
        </div>

        <div className="flex gap-2">
          {user && (
            <LikeButton
              type="roaster"
              id={roaster.id}
              isLiked={
                roaster.likes.some((like) => like.userId === user.id) ?? false
              }
            />
          )}
          <Button asChild>
            <Link href={`/beans/new?roasterId=${roaster.id}`}>Add Bean</Link>
          </Button>
          {(isUserAdmin || isUserModerator) && (
            <Button asChild>
              <Link href={`/admin/roasters/${roaster.slug ?? roaster.id}/edit`}>
                Edit Roaster
              </Link>
            </Button>
          )}
        </div>
      </div>

      {(roaster.profileImageUrl || roaster.logoUrl) && (
        <RoasterHero
          profileImageUrl={roaster.profileImageUrl}
          logoUrl={roaster.logoUrl}
          name={roaster.name}
        />
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Heading level="h4" as="h3">
            Coffee Beans
          </Heading>
          {roaster.beans.length === 0 ? (
            <Text className="mt-4">
              No beans available from this roaster yet.
            </Text>
          ) : (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roaster.beans.map((bean) => (
                <BeanCard
                  key={bean.id}
                  user={transformUser(user)}
                  bean={bean}
                />
              ))}
            </div>
          )}
        </div>
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="sticky top-8">
            <Heading level="h4" as="h3">
              Contact Information
            </Heading>
            <Card className="mt-4">
              <CardContent>
                <div className="flex flex-col gap-4">
                  <span className="space-y-2">
                    <Text variant="label">About {roaster.name}</Text>
                    {roaster.description && <Text>{roaster.description}</Text>}
                  </span>

                  <Text weight="semibold">{location}</Text>
                  {roaster.url && (
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
                  )}
                  {roaster.instagram && (
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
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
