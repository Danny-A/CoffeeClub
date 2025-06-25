import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';

import { BeansList } from '@/app/(admin)/_components/BeansList';
import { BeanTriage } from '@/app/(admin)/_components/BeanTriage';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchBeans } from '@/lib/api/fetchBeans';

export const metadata: Metadata = {
  title: 'Beans Admin - Latest Grind',
  description: 'Beans administration for Latest Grind',
};

export default async function AdminBeansPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['beans'],
    queryFn: async () => await fetchBeans({ includeUnpublished: true }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h3">Coffee Beans</Heading>
            <Heading level="h6" muted>
              Manage all coffee beans
            </Heading>
          </div>
          <Button asChild>
            <Link href="/beans/new">Add New Bean</Link>
          </Button>
        </div>
        <BeanTriage />
        <BeansList />
      </div>
    </HydrationBoundary>
  );
}
