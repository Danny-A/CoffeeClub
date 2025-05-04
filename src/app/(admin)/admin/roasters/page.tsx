import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { RoastersList } from '@/app/(admin)/_components/RoastersList';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchRoasters } from '@/lib/api/fetchRoasters';
import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/utils/getUserRole';
import { isModerator } from '@/utils/getUserRole';

export const metadata: Metadata = {
  title: 'Roasters Admin - Daily Bean',
  description: 'Roasters administration for Daily Bean',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRoastersPage() {
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
