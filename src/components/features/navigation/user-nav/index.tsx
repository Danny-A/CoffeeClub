import Link from 'next/link';

import { SignOutButton } from '@/components/features/SignOutButton';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

export async function UserNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  const profile = await fetchProfile(user.id);

  return (
    <div className="flex items-center space-x-4">
      <Link href="/profile" className="flex items-center space-x-2">
        <Avatar
          src={profile?.profile_image_url || '/default-avatar.png'}
          alt={profile?.display_name || 'User'}
          size="sm"
        />
        <Text className="hidden md:block">
          {profile?.display_name || 'User'}
        </Text>
      </Link>
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
}
