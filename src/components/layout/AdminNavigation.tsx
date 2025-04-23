import { ChevronDownIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { AdminNavigationLinks } from '@/components/features/navigation/admin-navigation-links';
import { UserNav } from '@/components/features/navigation/user-nav';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export function AdminNavigation() {
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
                  <Link href="/admin/beans/new" className="w-full">
                    Add Bean
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/roasters/new" className="w-full">
                    Add Roaster
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
