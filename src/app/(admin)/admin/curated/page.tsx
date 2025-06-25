import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { Heading } from '@/components/ui/Heading';
import { fetchCuratedHomepageItems } from '@/lib/api/fetchCuratedHomepageItems';

import { CuratedItemsAdmin } from '../../_components/CuratedItemsAdmin';

export const metadata: Metadata = {
  title: 'Curated Admin - Latest Grind',
  description: 'Curated administration for Latest Grind',
};

export default async function CuratedAdminPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['curatedHomepageItems'],
    queryFn: async () => await fetchCuratedHomepageItems(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h3">Curated Homepage Items</Heading>
            <Heading level="h6" muted>
              Manage all items
            </Heading>
          </div>
          {/* <Button asChild>
    <Link href="/beans/new">Add curated item</Link>
  </Button> */}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CuratedItemsAdmin />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
