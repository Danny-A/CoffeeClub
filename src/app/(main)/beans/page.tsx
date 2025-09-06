import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';

import { BeanFeed } from '@/components/features/BeanFeed';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Coffee beans - Latest Grind',
  description: 'Find your next favorite coffee bean',
  openGraph: {
    title: 'Coffee beans - Latest Grind',
    description: 'Find your next favorite coffee bean',
  },
};

export default async function BeansPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: ['beans'],
    queryFn: async () => await fetchBeans(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <div className="md:flex md:flex-row justify-between md:items-center">
          <div>
            <Heading level="h2">Coffee Beans</Heading>
            <Heading level="h4" as="h2" muted className="mt-2">
              Find your next favorite coffee bean
            </Heading>
          </div>
          {user && (
            <Button asChild className="mt-4 md:mt-0">
              <Link href="/beans/new">Add new Bean</Link>
            </Button>
          )}
        </div>
        <BeanFeed />
      </div>
    </HydrationBoundary>
  );
}
