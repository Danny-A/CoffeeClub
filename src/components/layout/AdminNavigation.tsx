import { ChevronDownIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { AdminNavigationLinks } from '@/components/features/Navigation/AdminNavigationLinks';
import { UserNav } from '@/components/features/Navigation/UserNav';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { fetchProfile } from '@/lib/api/fetchProfile';
import { createClient } from '@/lib/supabase/server';

export async function AdminNavigation() {
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
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/admin"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Daily Bean Admin
              </Link>
            </div>

            <AdminNavigationLinks />
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusCircleIcon className="h-4 w-4 mr-1" />
                  Add New
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/beans/new" className="w-full">
                    Add Bean
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/roasters/new" className="w-full">
                    Add Roaster
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserNav user={profile} />
          </div>
        </div>
      </div>
    </nav>
  );
}
