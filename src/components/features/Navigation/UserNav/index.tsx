import Link from 'next/link';

import { SignOutButton } from '@/components/features/SignOutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Text } from '@/components/ui/Text';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';
import { isAdmin, isModerator } from '@/utils/getUserRole';

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

  const [isUserAdmin, isUserModerator] = await Promise.all([
    isAdmin(user),
    isModerator(user),
  ]);

  const profile = await fetchProfile(user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={profile?.profile_image_url ?? ''}
              alt={profile?.display_name ?? profile?.username ?? 'User'}
            />
            <AvatarFallback>{profile?.username?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <Text className="hidden md:block">
            {profile?.display_name || profile?.username || 'User'}
          </Text>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="w-full cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/likes" className="w-full cursor-pointer">
              Likes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/profile/recipes" className="w-full cursor-pointer">
              Recipes
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile/edit" className="w-full cursor-pointer">
            Edit Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {(isUserAdmin || isUserModerator) && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="w-full cursor-pointer">
                Admin
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <SignOutButton>Sign Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
