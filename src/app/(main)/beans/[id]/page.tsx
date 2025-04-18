import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { fetchBean } from '@/lib/api/fetchBean';
import { createClient } from '@/lib/supabase/server';

type BeanDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: BeanDetailsProps) {
  const { id } = await params;
  const bean = await fetchBean(id);
  return {
    title: `${bean?.name} - Coffee Club`,
    description: `View details about ${bean?.name}`,
  };
}

export default async function BeanDetails({ params }: BeanDetailsProps) {
  const { id } = await params;
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
              href={`/roasters/${bean.roasters?.id}`}
              className="text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              {bean.roasters?.name}
            </Link>
          </Text>
        </div>
        {user && (
          <Button asChild>
            <Link href={`/beans/${bean.id}/edit`}>Edit Bean</Link>
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
            {bean.buy_urls &&
              bean.buy_urls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block underline text-blue-600 hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Buy this bean →
                </a>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heading level="h3" as="h2">
              Reviews
            </Heading>
          </CardHeader>
          <CardContent>
            {bean.bean_reviewsCollection?.edges.length === 0 ? (
              <Text className="mt-2 text-gray-600 dark:text-gray-400">
                No reviews yet. Be the first to review this bean!
              </Text>
            ) : (
              <div className="mt-4 space-y-6">
                {bean.bean_reviewsCollection?.edges.map((review) => (
                  <div
                    key={review.node.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          review.node.profiles?.profile_image_url ||
                          '/default-avatar.png'
                        }
                        alt={review.node.profiles?.display_name ?? ''}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <Text className="font-medium">
                          {review.node.profiles?.display_name}
                        </Text>
                        <Text
                          variant="small"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          <TimeAgo time={review.node.created_at} />
                        </Text>
                      </div>
                    </div>
                    <div className="mt-4">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
