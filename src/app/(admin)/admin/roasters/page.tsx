import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';

import { RoastersList } from '@/app/(admin)/_components/RoastersList';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchRoasters } from '@/lib/api/fetchRoasters';

export const metadata: Metadata = {
  title: 'Roasters Admin - Latest Grind',
  description: 'Roasters administration for Latest Grind',
};

export default async function AdminRoastersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['roasters'],
    queryFn: async () => await fetchRoasters({ includeUnpublished: true }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h3">Coffee Roasters</Heading>
            <Heading level="h6" muted>
              Manage all coffee roasters
            </Heading>
          </div>
          <Button asChild>
            <Link href="/roasters/new">Add New Roaster</Link>
          </Button>
        </div>
        <RoastersList />
      </div>
    </HydrationBoundary>
  );
}
