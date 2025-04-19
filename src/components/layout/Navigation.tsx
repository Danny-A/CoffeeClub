import Link from 'next/link';

import { UserNav } from '@/components/features/navigation/user-nav';

import { NavigationLinks } from '../features/navigation/navigation-links';

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Daily Bean
              </Link>
            </div>

            <NavigationLinks />
          </div>
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
