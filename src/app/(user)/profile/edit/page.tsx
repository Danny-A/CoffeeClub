import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

import { EditProfileInfo } from '../_components/EditProfileInfo';

export const metadata: Metadata = {
  title: 'Edit Profile - Coffee Club',
  description: 'Edit Profile for Coffee Club',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await fetchProfile(user.id);

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Heading>Edit Profile</Heading>
            <Button asChild>
              <Link href="/profile">Cancel</Link>
            </Button>
          </div>

          <Suspense fallback={<Text>Loading...</Text>}>
            <EditProfileInfo profile={profile} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
