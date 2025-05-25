import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { fetchBean } from '@/lib/api/fetchBean';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { createClient } from '@/lib/supabase/server';
import { extractIdFromSlug } from '@/utils/slug';

type BeanDetailsProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  const beans = await fetchBeans();

  if (!beans.beansCollection) return [];
  return beans.beansCollection?.edges.map((edge) => ({
    slug: edge.node.slug ?? edge.node.id,
  }));
}

export async function generateMetadata({ params }: BeanDetailsProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  const bean = await fetchBean(id);

  return {
    title: `${bean?.name} by ${bean?.roasters?.name} - Daily Bean`,
    description: `View details about ${bean?.name}`,
    openGraph: {
      title: `${bean?.name} by ${bean?.roasters?.name} - Daily Bean`,
      description: `View details about ${bean?.name}`,
      images: [{ url: bean?.image_url || '' }],
    },
  };
}

export default async function BeanPageBySlug({ params }: BeanDetailsProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  const bean = await fetchBean(id);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!bean) {
    return (
      <EmptyState
        title="Bean not found"
        description="The bean you're looking for doesn't exist."
      />
    );
  }

  const reviews = bean.bean_reviewsCollection?.edges;
  const noReviews = reviews?.length === 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Heading level="h1">{bean.name}</Heading>
          <Text
            variant="small"
            className="mt-2 text-gray-600 dark:text-gray-400"
          >
            Roasted by{' '}
            <Link
              href={`/roasters/${bean.roasters?.slug ?? bean.roasters?.id}`}
              className="text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              {bean.roasters?.name}
            </Link>
          </Text>
        </div>
        {user && (
          <Button asChild>
            <Link href={`/beans/${bean.slug ?? bean.id}/edit`}>Edit Bean</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Heading level="h3" as="h2">
              Details
            </Heading>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <Text variant="label">Origin:</Text>
                <Text>{bean.origin}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="label">Process:</Text>
                <Text>{bean.process}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="label">Roast Level:</Text>
                <Text className="capitalize">{bean.roast_level}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="label">Roast Type:</Text>
                <Text className="capitalize">{bean.roast_type}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="label">Type:</Text>
                <Text className="capitalize">{bean.bean_type}</Text>
              </div>
              {/* <div className="flex justify-between">
                <Text variant="label">Variety:</Text>
                <Text>{bean.bean_varieties?.id[0]?.name}</Text>
              </div> */}
              <div className="flex justify-between">
                <Text variant="label">Producer:</Text>
                <Text>{bean.producer}</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="label">Elevation:</Text>
                <Text>
                  {bean.elevation_min} - {bean.elevation_max} masl
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>

        {bean.notes && (
          <Card>
            <CardHeader>
              <Heading level="h3" as="h2">
                Tasting Notes
              </Heading>
            </CardHeader>
            <CardContent>
              <Text className="mt-2">{bean.notes}</Text>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <Heading level="h3" as="h2">
              Purchase
            </Heading>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {bean.buy_urls &&
                bean.buy_urls
                  .filter((url) => url !== null)
                  .map((url) => {
                    let domain = '';
                    try {
                      domain = new URL(url).hostname;
                    } catch {
                      domain = '';
                    }
                    return (
                      <div key={url} className="mt-2">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block underline text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Buy this bean →
                        </a>
                        {domain && <Text variant="small">({domain})</Text>}
                      </div>
                    );
                  })}
            </div>
          </CardContent>
        </Card>

        <div>
          <Heading level="h3" as="h2">
            Reviews
          </Heading>
          {noReviews ? (
            <Text className="mt-2 text-gray-600 dark:text-gray-400">
              No reviews yet. Be the first to review this bean!
            </Text>
          ) : (
            <div className="mt-4 space-y-6">
              {reviews?.map((review) => (
                <Card key={review.node.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={
                          review.node.profiles?.profile_image_url ||
                          '/default-avatar.png'
                        }
                        alt={review.node.profiles?.display_name ?? ''}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <Text className="font-medium">
                          {review.node.profiles?.display_name ??
                            review.node.profiles?.username}
                        </Text>
                        <Text
                          variant="small"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          <TimeAgo time={review.node.created_at} />
                        </Text>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Text variant="label">Rating:</Text>
                      <Text>{review.node.rating}/5</Text>
                    </div>
                    {review.node.coffee_type && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Text variant="label">Coffee Type:</Text>
                        <Text>{review.node.coffee_type}</Text>
                      </div>
                    )}
                    {review.node.content && (
                      <Text className="mt-4">{review.node.content}</Text>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
