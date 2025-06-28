import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ReviewDialog } from '@/components/features/ReviewDialog';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { fetchBean } from '@/lib/api/fetchBean';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';
import { extractIdFromSlug } from '@/utils/slug';
import { generateBeanMetadata } from '@/utils/structuredData';

type BeanDetailsProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { beans } = await fetchBeans();

  if (!beans) return [];

  return beans.map((bean) => ({
    slug: bean.slug ?? bean.id,
  }));
}

export async function generateMetadata({
  params,
}: BeanDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  const bean = await fetchBean(id);

  return generateBeanMetadata(bean);
}

export default async function BeanPageBySlug({ params }: BeanDetailsProps) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  const bean = await fetchBean(id);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  if (!bean) {
    return (
      <EmptyState
        title="Bean not found"
        description="The bean you're looking for doesn't exist."
      />
    );
  }

  const reviews = bean.reviews;
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
              href={`/roasters/${bean.roaster?.slug ?? bean.roaster?.id}`}
              className="text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              {bean.roaster?.name}
            </Link>
          </Text>
        </div>
        {(isUserAdmin || isUserModerator) && (
          <Button asChild>
            <Link href={`/admin/beans/${bean.slug ?? bean.id}/edit`}>
              Edit Bean
            </Link>
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
              {bean.process && (
                <div className="flex justify-between">
                  <Text variant="label">Process:</Text>
                  <Text>{bean.process}</Text>
                </div>
              )}
              {bean.roastLevel && (
                <div className="flex justify-between">
                  <Text variant="label">Roast Level:</Text>
                  <Text className="capitalize">{bean.roastLevel}</Text>
                </div>
              )}
              {bean.roastType && (
                <div className="flex justify-between">
                  <Text variant="label">Roast Type:</Text>
                  <Text className="capitalize">{bean.roastType}</Text>
                </div>
              )}
              {bean.beanType && (
                <div className="flex justify-between">
                  <Text variant="label">Type:</Text>
                  <Text className="capitalize">{bean.beanType}</Text>
                </div>
              )}
              {/* <div className="flex justify-between">
                <Text variant="label">Variety:</Text>
                <Text>{bean.bean_varieties?.id[0]?.name}</Text>
              </div> */}
              {bean.producer && (
                <div className="flex justify-between">
                  <Text variant="label">Producer:</Text>
                  <Text>{bean.producer}</Text>
                </div>
              )}
              {bean.elevationMin && (
                <div className="flex justify-between">
                  <Text variant="label">Elevation:</Text>
                  <Text>
                    {bean.elevationMin}
                    {bean.elevationMax && `-${bean.elevationMax}`} masl
                  </Text>
                </div>
              )}
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
              {bean.buyUrls &&
                bean.buyUrls
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reviews</h3>
              {user && (
                <ReviewDialog
                  beanId={bean.id}
                  userId={user.id}
                  beanName={bean.name}
                />
              )}
            </div>
            {noReviews ? (
              <Text className="mt-2 text-gray-600 dark:text-gray-400">
                No reviews yet. Be the first to review this bean!
              </Text>
            ) : (
              <div className="mt-4 space-y-6">
                {reviews?.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Image
                          src={
                            review.profile?.profileImageUrl ||
                            '/default-avatar.png'
                          }
                          alt={review.profile?.displayName ?? ''}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <Text className="font-medium">
                            {review.profile?.displayName ??
                              review.profile?.username}
                          </Text>
                          {review.createdAt && (
                            <Text
                              variant="small"
                              className="text-gray-600 dark:text-gray-400"
                            >
                              <TimeAgo time={review.createdAt} />
                            </Text>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Text variant="label">Rating:</Text>
                        <Text>{review.rating}/5</Text>
                      </div>
                      {review.coffeeType && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Text variant="label">Coffee Type:</Text>
                          <Text>{review.coffeeType}</Text>
                        </div>
                      )}
                      {review.content && (
                        <Text className="mt-4">{review.content}</Text>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
