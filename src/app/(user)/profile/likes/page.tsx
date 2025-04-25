'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Text } from '@/components/ui/Text';
import { useAuth } from '@/hooks/auth/useAuth';
import { useUserLikes, LikeType } from '@/hooks/likes/useUserLikes';

export default function LikesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<LikeType | 'all'>('all');
  const { likes, isLoading } = useUserLikes(
    user?.id ?? '',
    activeTab === 'all' ? undefined : activeTab
  );

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Heading level="h1">Please sign in to view your likes</Heading>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Heading level="h4" className="mb-6">
        Your Likes
      </Heading>

      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as LikeType | 'all')
        }
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bean">Beans</TabsTrigger>
          <TabsTrigger value="roaster">Roasters</TabsTrigger>
          <TabsTrigger value="location">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : likes.length === 0 ? (
            <Text variant="description">No likes found.</Text>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likes.map((like) => (
                <Card key={like.id}>
                  <CardContent>
                    <Link
                      href={`/${like.type}s/${like.item.id}`}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <div className="relative h-32 mb-4">
                        <Image
                          src={
                            (like.type === 'roaster'
                              ? like.item.profile_image_url
                              : like.item.image_url) ||
                            '/images/placeholder.jpg'
                          }
                          alt={like.item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <Heading as="h3" level="h4" className="mb-2">
                        {like.item.name}
                      </Heading>
                      {like.type === 'bean' && (
                        <Text variant="description">
                          by {like.item.roasters?.name}
                        </Text>
                      )}
                      {like.type === 'roaster' && like.item.location_city && (
                        <Text variant="description">
                          {like.item.location_city}, {like.item.location_state}
                        </Text>
                      )}
                      {like.type === 'location' && (
                        <Text variant="description">{like.item.address}</Text>
                      )}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
