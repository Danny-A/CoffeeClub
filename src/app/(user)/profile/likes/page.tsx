import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { LikesList } from '@/app/(user)/profile/_components/LikesList';
import { Heading } from '@/components/ui/Heading';
import { fetchLikes } from '@/lib/api/fetchLikes';
import { createClient } from '@/lib/supabase/server';

export default async function LikesPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  await queryClient.prefetchQuery({
    queryKey: ['profile', user.id],
    queryFn: async () => await fetchLikes(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto p-6">
        <Heading level="h4" className="mb-6">
          Your Likes
        </Heading>

        <LikesList />
      </div>
    </HydrationBoundary>
  );
}
