import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

import { ProfileInfo } from './_components/ProfileInfo';

export const metadata: Metadata = {
  title: 'Profile - Daily Bean',
  description: 'Profile for Daily Bean',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
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
            <Heading>Profile</Heading>
            <Button asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
          </div>

          <Card>
            <CardContent>
              <Suspense fallback={<Text>Loading...</Text>}>
                <ProfileInfo profile={profile} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
