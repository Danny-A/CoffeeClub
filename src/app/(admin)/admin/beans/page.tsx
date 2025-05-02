import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { BeansList } from '@/app/(admin)/_components/BeansList';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/utils/getUserRole';
import { isModerator } from '@/utils/getUserRole';

export const metadata: Metadata = {
  title: 'Beans Admin - Daily Bean',
  description: 'Beans administration for Daily Bean',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminBeansPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  if (!isUserAdmin && !isUserModerator) {
    redirect('/');
  }

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
        <BeansList />
      </div>
    </HydrationBoundary>
  );
}
