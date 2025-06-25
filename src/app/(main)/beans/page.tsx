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
  title: 'Beans - Latest Grind',
  description: 'Explore a collection of coffee beans',
  openGraph: {
    title: 'Beans - Latest Grind',
    description: 'Explore a collection of coffee beans',
  },
};

export async function generateStaticParams() {
  const { beansCollection } = await fetchBeans();

  if (!beansCollection?.edges) {
    return [];
  }

  return beansCollection.edges.map(({ node }) => ({
    id: node.id,
  }));
}

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
        <div className="flex justify-between items-center">
          <div>
            <Heading level="h2">Coffee Beans</Heading>
            <Heading level="h4" as="h2" muted className="mt-2">
              Explore our collection of coffee beans
            </Heading>
          </div>
          {user && (
            <Button asChild>
              <Link href="/beans/new">Add New Bean</Link>
            </Button>
          )}
        </div>
        <BeanFeed />
      </div>
    </HydrationBoundary>
  );
}
