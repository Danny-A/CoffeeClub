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

  const roasters = await fetchRoasters({ includeUnpublished: true });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Heading>Coffee Roasters</Heading>
          <Heading level="h2" muted className="mt-2">
            Manage all coffee roasters
          </Heading>
        </div>
        <Button asChild>
          <Link href="/roasters/new">Add New Roaster</Link>
        </Button>
      </div>
      <RoastersList roasters={roasters} />
    </div>
  );
}
