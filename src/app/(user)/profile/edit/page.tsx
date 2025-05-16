import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { fetchProfile } from '@/lib/api/profile/fetchProfile';
import { createClient } from '@/lib/supabase/server';

import { EditProfileInfo } from '../_components/EditProfileInfo';

export const metadata: Metadata = {
  title: 'Edit Profile - Daily Bean',
  description: 'Edit Profile for Daily Bean',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditProfilePage() {
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
    queryFn: async () => await fetchProfile(user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Heading>Edit Profile</Heading>
              <Button asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
            </div>

            <EditProfileInfo />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
