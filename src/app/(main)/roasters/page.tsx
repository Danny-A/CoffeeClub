import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';

import RoasterFeed from '@/components/features/RoasterFeed';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchRoasters } from '@/lib/api/fetchRoasters';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Roasters - Latest Grind',
  description: 'Explore a collection of coffee roasters',
};

export default async function RoastersPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: ['roasters'],
    queryFn: async () => await fetchRoasters(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h2">Coffee Roasters</Heading>
            <Heading level="h4" as="h2" muted className="mt-2">
              Discover coffee roasters from around the world
            </Heading>
          </div>
          {user && (
            <Button asChild>
              <Link href="/roasters/new">Add New Roaster</Link>
            </Button>
          )}
        </div>
        <RoasterFeed />
      </div>
    </HydrationBoundary>
  );
}
